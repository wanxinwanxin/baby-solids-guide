/**
 * Renders a schema.org JSON-LD block. "<" is escaped so page content can
 * never close the script tag and inject markup.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
