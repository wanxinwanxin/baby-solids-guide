import { describe, expect, it } from "vitest";
import { combineDateClock, localDateIso, parseClockText } from "./time";

describe("parseClockText", () => {
  it("parses 24-hour and bare forms", () => {
    expect(parseClockText("19:35")).toEqual({ h: 19, m: 35 });
    expect(parseClockText("7:35")).toEqual({ h: 7, m: 35 });
    expect(parseClockText("7.35")).toEqual({ h: 7, m: 35 });
    expect(parseClockText("735")).toEqual({ h: 7, m: 35 });
    expect(parseClockText("1935")).toEqual({ h: 19, m: 35 });
    expect(parseClockText("7")).toEqual({ h: 7, m: 0 });
    expect(parseClockText("12:5")).toEqual({ h: 12, m: 5 });
  });

  it("parses am/pm forms", () => {
    expect(parseClockText("7:35 pm")).toEqual({ h: 19, m: 35 });
    expect(parseClockText("7:35PM")).toEqual({ h: 19, m: 35 });
    expect(parseClockText("7pm")).toEqual({ h: 19, m: 0 });
    expect(parseClockText("7 a.m.")).toEqual({ h: 7, m: 0 });
    expect(parseClockText("7:35p")).toEqual({ h: 19, m: 35 });
    expect(parseClockText("12am")).toEqual({ h: 0, m: 0 });
    expect(parseClockText("12pm")).toEqual({ h: 12, m: 0 });
    expect(parseClockText("12:30 AM")).toEqual({ h: 0, m: 30 });
  });

  it("parses Chinese clock forms", () => {
    expect(parseClockText("下午7:35")).toEqual({ h: 19, m: 35 });
    expect(parseClockText("上午7:35")).toEqual({ h: 7, m: 35 });
    expect(parseClockText("晚上8点")).toEqual({ h: 20, m: 0 });
    expect(parseClockText("7点35分")).toEqual({ h: 7, m: 35 });
    expect(parseClockText("凌晨2点15")).toEqual({ h: 2, m: 15 });
    expect(parseClockText("中午12点")).toEqual({ h: 12, m: 0 });
  });

  it("rejects nonsense", () => {
    expect(parseClockText("")).toBeNull();
    expect(parseClockText("banana")).toBeNull();
    expect(parseClockText("25:00")).toBeNull();
    expect(parseClockText("7:75")).toBeNull();
    expect(parseClockText("13pm")).toBeNull();
  });
});

describe("combineDateClock", () => {
  it("builds a local Date from date input + clock", () => {
    const d = combineDateClock("2026-09-06", { h: 19, m: 35 })!;
    expect(d.getFullYear()).toBe(2026);
    expect(d.getMonth()).toBe(8);
    expect(d.getDate()).toBe(6);
    expect(d.getHours()).toBe(19);
    expect(d.getMinutes()).toBe(35);
    expect(combineDateClock("garbage", { h: 1, m: 0 })).toBeNull();
  });

  it("round-trips with localDateIso", () => {
    const d = new Date(2026, 0, 3, 7, 5);
    expect(localDateIso(d)).toBe("2026-01-03");
  });
});
