"""Import the supplied bilingual summary without modifying the workbook.

Usage: python3 scripts/import-babysparks.py "babysparks summary.xlsx"
Uses only Python's standard library; app data has no Excel runtime dependency.
"""
import json
from pathlib import Path
import sys
import xml.etree.ElementTree as ET
import zipfile

NS = {"m": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}
AREAS = {
    "Gross Motor": "moving", "Fine Motor": "hands", "Sensory": "senses",
    "Cognitive": "thinking", "Speech": "talking",
    "Social - Emotional": "people", "Self Care": "routines",
}

with zipfile.ZipFile(sys.argv[1]) as archive:
    strings = ["".join(item.itertext()) for item in
               ET.fromstring(archive.read("xl/sharedStrings.xml")).findall("m:si", NS)]
    sheet = ET.fromstring(archive.read("xl/worksheets/sheet2.xml"))
    rows = []
    for row in sheet.findall("m:sheetData/m:row", NS):
        values = {}
        for cell in row:
            column = "".join(filter(str.isalpha, cell.get("r")))
            value = cell.find("m:v", NS)
            if cell.get("t") == "inlineStr":
                text = "".join(cell.find("m:is", NS).itertext())
            elif cell.get("t") == "s":
                text = strings[int(value.text)]
            else:
                text = value.text if value is not None else ""
            values[column] = text
        rows.append(values)

# Fail if the source layout changes, rather than silently swapping notes.
assert rows[4]["R"] == "另加提醒 English", "Expected the summary workbook's bilingual columns"
entries = []
for row in rows:
    if not row.get("A", "").isdigit():
        continue
    number = int(row["A"])
    entry = {
        "slug": f"babysparks-{number:03}", "catalogId": number,
        "title": {"en": row["B"], "zh": row["C"]},
        "area": AREAS[row["D"]],
        "activity": "exercise" if row["D"] == "Gross Motor" else "play",
        "ageBand": "4-6" if number <= 93 else "7-9",
    }
    assert row["P"] == ("4–6 months" if number <= 93 else "7–9 months")
    for field, english, chinese in [
        ("goal", "F", "G"), ("instructions", "H", "I"),
        ("materials", "J", "K"), ("duration", "L", "M"),
    ]:
        assert row[english] and row[chinese], f"Missing {field} for {number}"
        entry[field] = {
            "en": row[english].replace("doing BabySparks exercises", "doing play activities"),
            "zh": row[chinese].replace("做BabySparks活动或其他动作", "做亲子活动或其他动作"),
        }
    if row["N"] != "No complete milestone card transcribed":
        entry["milestone"] = {"en": row["N"], "zh": row["O"]}
    if row["R"]:
        assert row["S"] and row["T"], f"Incomplete reminder for {number}"
        entry["reminder"] = {"en": row["R"], "zh": row["S"]}
        entry["reminderBasis"] = row["T"]
    entries.append(entry)

assert [entry["catalogId"] for entry in entries] == list(range(1, 194))
destination = Path(__file__).resolve().parents[1] / "content/activities/babysparks.json"
destination.write_text(json.dumps(entries, ensure_ascii=False, indent=2) + "\n")
print(f"Imported {len(entries)} activities into {destination}")
