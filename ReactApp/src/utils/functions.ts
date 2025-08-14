import { load } from 'cheerio';

export function getGridPosition(index: number, total: number) {
  const mid = Math.ceil(total / 2); // Determine the middle index
  console.log(mid);
  const column = index <= mid ? 1 : 2; // If the index is less than or equal to the middle index, the column is 1, otherwise it is 2
  const row = (index % mid) + 1;
  console.log(index, { row, column });
  return { row, column };
}

export const extractListItemsRegex = (html: string): string[] => {
  return [...html.matchAll(/<li[^>]*>(.*?)<\/li>/g)].map((match) =>
    match[1].trim()
  );
};

export const extractListItems = (html: string): string[] => {
  const $ = load(html);
  return $('li')
    .map((_, el) => $(el).text().trim()) // `.text()` automatically decodes entities
    .get();
};

export function formatToTwoDigits(number: number) {
  return number < 10 ? `0${number}` : `${number}`;
}
