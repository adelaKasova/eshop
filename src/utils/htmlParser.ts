export const decodeHtml = (html: string | null | undefined): string => {
    if (!html) return '';
    return html
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        // Remove HTML tags if needed, or keep them if rendering HTML
        .replace(/<[^>]*>/g, '');
};
