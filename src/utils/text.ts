/**
 * Truncate text to a specified length with ellipsis
 */
export function truncate(text: string, options: { length: number; omission?: string } = { length: 30 }): string {
    const { length, omission = '...' } = options;

    if (text.length <= length) {
        return text;
    }

    return text.slice(0, length - omission.length) + omission;
}

/**
 * Debounce function to limit the rate of function calls
 */
export function debounce<Args extends unknown[], Return>(
    func: (...args: Args) => Return,
    wait: number
): (...args: Args) => void {
    let timeout: NodeJS.Timeout;

    return function executedFunction(...args: Args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
