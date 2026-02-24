import type { BookConfig, Resource, ReferenceLink, PromptItem, PromotionItem } from "./types";
import { parseResources, parseReferenceLinks, parsePrompts, parsePromotions } from "./parse-csv";

function buildCsvUrl(sheetId: string, gid: string): string {
  return `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&gid=${gid}`;
}

async function fetchCsv(url: string): Promise<string> {
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) {
    throw new Error(`Failed to fetch CSV: ${res.status} ${res.statusText}`);
  }
  return res.text();
}

export async function fetchResources(book: BookConfig): Promise<Resource[]> {
  try {
    const csv = await fetchCsv(buildCsvUrl(book.sheetId, book.resourcesGid));
    return parseResources(csv);
  } catch (error) {
    console.error(`[fetchResources] Error for book "${book.name}":`, error);
    return [];
  }
}

export async function fetchReferences(book: BookConfig): Promise<ReferenceLink[]> {
  try {
    const csv = await fetchCsv(buildCsvUrl(book.sheetId, book.referencesGid));
    return parseReferenceLinks(csv);
  } catch (error) {
    console.error(`[fetchReferences] Error for book "${book.name}":`, error);
    return [];
  }
}

export async function fetchPrompts(book: BookConfig): Promise<PromptItem[]> {
  if (!book.promptsGid) return [];
  try {
    const csv = await fetchCsv(buildCsvUrl(book.sheetId, book.promptsGid));
    return parsePrompts(csv);
  } catch (error) {
    console.error(`[fetchPrompts] Error for book "${book.name}":`, error);
    return [];
  }
}

export async function fetchPromotions(
  sheetId: string,
  gid: string
): Promise<PromotionItem[]> {
  try {
    const csv = await fetchCsv(buildCsvUrl(sheetId, gid));
    return parsePromotions(csv);
  } catch (error) {
    console.error("[fetchPromotions] Error:", error);
    return [];
  }
}
