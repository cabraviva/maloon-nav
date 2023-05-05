declare global {
    interface Window {
        __maloon__: {
            navfn: {
                navigate(page: string, queryString?: URLSearchParams | string | object): Promise<void>,
                navigateFresh(page: string, queryString?: URLSearchParams | string | object): Promise<void>,
                open(page: string, queryString?: URLSearchParams | string | object): PageInfo,
                Page(): PageInfo
            }
        }
    }
}

interface ParsedQueryString {
    [key: string]: string | number | boolean
}

interface PageInfo {
    /**
     * Name of the current page
     */
    name: string,
    /**
     * Path of the current page
     */
    path: string,
    /**
     * An object containing the parsed query string
     */
    query: ParsedQueryString,
    /**
     * Closes the current page, if it was opened by another page.
     * If not, silently does nothing
     */
    close(): void,
    /**
     * Shows whether the page was opened by another page (e.g. using open())
     */
    isControlledByOtherPage(): boolean,
    /**
     * Refreshes the current page
     * @donotuse This shouldn't be used in most cases
     */
    refresh(): void,
    /**
     * Navigates one step back. If not possible, silently does nothing
     */
    back(): void
    /**
     * Navigates one step forward. If not possible, silently does nothing
     */
    forward(): void
}

/**
 * Navigates to a different page / route
 * @param page A page name, a page path or an absolute url to an external website
 * @param queryString Here you can optionally provide a queryString
 */
export async function navigate(page: string, queryString?: URLSearchParams | string | object): Promise<void> {
    return await window.__maloon__.navfn.navigate(page, queryString)
}

/**
 * Navigates to a different page / route and enforces a fresh component load. This can be useful when javascript is renderd on the server
 * @param page A page name, a page path or an absolute url to an external website
 * @param queryString Here you can optionally provide a queryString
 */
export async function navigateFresh(page: string, queryString?: URLSearchParams | string | object): Promise<void> {
    return await window.__maloon__.navfn.navigateFresh(page, queryString)
}

/**
 * Opens a new tab with the specified page / route
 * @param page A page name, a page path or an absolute url to an external website
 * @param queryString Here you can optionally provide a queryString
 */
export function open(page: string, queryString?: URLSearchParams | string | object): PageInfo {
    return window.__maloon__.navfn.open(page, queryString)
}

/**
 * Returns info and methods giving useful information about the current page
 */
export function Page(): PageInfo {
    return window.__maloon__.navfn.Page()
}