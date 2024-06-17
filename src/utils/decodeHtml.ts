export function decodeHtmlEntitiesByBrowser(str: string): string {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = str;
    return textarea.value;
}
