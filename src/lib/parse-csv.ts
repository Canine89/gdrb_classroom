import type { Resource, ResourceType, ReferenceLink } from "./types";

/**
 * RFC 4180 compliant CSV parser.
 * Handles quoted fields, embedded commas, newlines inside quotes, and Korean text.
 */
export function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;
  let i = 0;

  while (i < text.length) {
    const ch = text[i];

    if (inQuotes) {
      if (ch === '"') {
        if (i + 1 < text.length && text[i + 1] === '"') {
          field += '"';
          i += 2;
        } else {
          inQuotes = false;
          i++;
        }
      } else {
        field += ch;
        i++;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
        i++;
      } else if (ch === ",") {
        row.push(field.trim());
        field = "";
        i++;
      } else if (ch === "\r") {
        // skip \r, handle \n next
        i++;
      } else if (ch === "\n") {
        row.push(field.trim());
        field = "";
        rows.push(row);
        row = [];
        i++;
      } else {
        field += ch;
        i++;
      }
    }
  }

  // Last field / row
  if (field || row.length > 0) {
    row.push(field.trim());
    rows.push(row);
  }

  return rows;
}

const KNOWN_TYPES: ResourceType[] = [
  "구글 스프레드시트",
  "구글 슬라이드",
  "노트북LM",
  "실습 파일",
];

function extractType(title: string): { type: ResourceType; displayTitle: string } {
  // Try to extract [유형] from the beginning of the title
  const match = title.match(/^\[(.+?)\]\s*/);
  if (match) {
    const extracted = match[1];
    const found = KNOWN_TYPES.find((t) => extracted.includes(t));
    return {
      type: found ?? "기타",
      displayTitle: title.replace(match[0], "").trim(),
    };
  }

  // Check if title contains a known type keyword
  for (const t of KNOWN_TYPES) {
    if (title.includes(t)) {
      return { type: t, displayTitle: title };
    }
  }

  return { type: "기타", displayTitle: title };
}

function ensureUrl(link: string): string {
  if (!link) return "";
  if (link.startsWith("http://") || link.startsWith("https://")) return link;
  return `https://${link}`;
}

/**
 * Parse resources sheet (gid=0).
 * Columns: 순번, 목차, 제목, 링크, 이미지 링크
 */
export function parseResources(csvText: string): Resource[] {
  const rows = parseCSV(csvText);
  if (rows.length <= 1) return []; // header only or empty

  return rows.slice(1).map((cols) => {
    const rawTitle = cols[2] ?? "";
    const { type, displayTitle } = extractType(rawTitle);

    return {
      id: parseInt(cols[0], 10) || 0,
      chapter: cols[1] ?? "",
      title: rawTitle,
      link: ensureUrl(cols[3] ?? ""),
      imageUrl: cols[4] ?? "",
      type,
      displayTitle,
    };
  }).filter((r) => r.title && r.link);
}

/**
 * Parse reference links sheet (gid=2013574828).
 * Columns: 순번, (그룹명), 제목, 링크
 * The second column acts as a category header (present in rows 1 and 10).
 */
export function parseReferenceLinks(csvText: string): ReferenceLink[] {
  const rows = parseCSV(csvText);
  if (rows.length <= 1) return [];

  let currentCategory = "";

  return rows.slice(1).map((cols) => {
    const groupName = cols[1]?.trim() ?? "";
    if (groupName) {
      currentCategory = groupName;
    }

    return {
      id: parseInt(cols[0], 10) || 0,
      category: currentCategory,
      title: cols[2] ?? "",
      link: ensureUrl(cols[3] ?? ""),
    };
  }).filter((r) => r.title && r.link);
}
