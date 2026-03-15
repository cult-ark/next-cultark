import { load } from 'cheerio';

export function getGridPosition(index: number, total: number) {
    const mid = Math.ceil(total / 2); // Determine the middle index
    // console.log(mid);
    const column = index <= mid ? 1 : 2; // If the index is less than or equal to the middle index, the column is 1, otherwise it is 2
    const row = (index % mid) + 1;
    // console.log(index, { row, column });
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

// Helper to handle malformed API responses (e.g. PHP warnings/injections mixed with JSON)
export const cleanApiResponse = (data: any): any => {
    if (Array.isArray(data) || (typeof data === 'object' && data !== null)) return data;

    if (typeof data === 'string') {
        const trimmedData = data.trim();
        
        // Try finding valid array JSON
        const endArr = trimmedData.lastIndexOf(']');
        if (endArr !== -1) {
            let searchIndex = 0;
            while (true) {
                const arrIdx = trimmedData.indexOf('[{', searchIndex);
                if (arrIdx === -1 || arrIdx > endArr) break;
                try {
                    const potentialJson = trimmedData.substring(arrIdx, endArr + 1);
                    return JSON.parse(potentialJson);
                } catch (e) {
                    searchIndex = arrIdx + 1;
                }
            }
        }

        // Try finding valid object JSON
        const endObj = trimmedData.lastIndexOf('}');
        if (endObj !== -1) {
            let searchIndex = 0;
            while (true) {
                const objIdx = trimmedData.indexOf('{', searchIndex);
                if (objIdx === -1 || objIdx > endObj) break;
                try {
                    const potentialJson = trimmedData.substring(objIdx, endObj + 1);
                    return JSON.parse(potentialJson);
                } catch (e) {
                    searchIndex = objIdx + 1;
                }
            }
        }
        
        try {
            return JSON.parse(data);
        } catch (e) {
            console.error('Failed to parse malformed API response');
        }
    }
    
    return [];
};