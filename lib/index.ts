declare global {
    interface Window {
        __maloon__: {
            navfn: {
                navigate(page: string, queryString?: URLSearchParams | string | object): Promise<void>,
                navigateFresh(page: string, queryString?: URLSearchParams | string | object): Promise<void>,
                open(page: string, queryString?: URLSearchParams | string | object): PageInfo,
                Page(): PageInfo
            },
            state: {
                [key: string]: StateCompatible
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
 * @returns {Promise<void>}
 */
export async function navigate(page: string, queryString?: URLSearchParams | string | object): Promise<void> {
    return await window.__maloon__.navfn.navigate(page, queryString)
}

/**
 * Navigates to a different page / route and enforces a fresh component load. This can be useful when javascript is rendered on the server
 * @param page A page name, a page path or an absolute url to an external website
 * @param queryString Here you can optionally provide a queryString
 * @returns {Promise<void>}
 */
export async function navigateFresh(page: string, queryString?: URLSearchParams | string | object): Promise<void> {
    return await window.__maloon__.navfn.navigateFresh(page, queryString)
}

/**
 * Opens a new tab with the specified page / route
 * @param page A page name, a page path or an absolute url to an external website
 * @param queryString Here you can optionally provide a queryString
 * @returns {PageInfo} Will look like this: 
```ts
{
    name: string,
    path: string,
    query: ParsedQueryString => Object,
    close(): void,
    isControlledByOtherPage(): boolean,
    refresh(): void,
    back(): void
    forward(): void
}
```
 */
export function open(page: string, queryString?: URLSearchParams | string | object): PageInfo {
    return window.__maloon__.navfn.open(page, queryString)
}

/**
 * Returns info and methods giving useful information about the current page
* @returns {PageInfo} Will look like this:
```ts
{
    name: string,
    path: string,
    query: ParsedQueryString => Object,
    close(): void,
    isControlledByOtherPage(): boolean,
    refresh(): void,
    back(): void
    forward(): void
}
```
 */
export function Page(): PageInfo {
    return window.__maloon__.navfn.Page()
}

type StateCompatibleObject = {
    [key: string]: StateCompatible
}
type StateCompatible = string | null | number | boolean | StateCompatible[] | StateCompatibleObject
/**
 * Saves current state so that it can be recovered on reload. 
 * NOTE: This is done automatically when using open() or navigating to an external page.
 * NOTE2: State will only be saved until next page load
 */
function saveState() {
    const serialized = JSON.stringify(window.__maloon__.state)
    localStorage.setItem('__maloon_state__', serialized)
}

/**
 * Loads stored state.
 * NOTE: This will be done automatically when using definePages()
 */
function loadState() {
    const storage = window.localStorage.getItem('__maloon_state__')
    if (typeof storage === 'string') {
        const parsed = JSON.parse(storage)
        window.__maloon__.state = parsed
        clearSavedState()
    }
}

function clearSavedState() {
    window.localStorage.removeItem('__maloon_state__')
}

/**
 * Stores a value in the state
 * @param key Key for the data
 * @param value Whatever you want to save. Just make sure it's JSON serializable
 * @example setState('key', 'value')
 */
function setState(key: string | number, value: StateCompatible) {
    if (value === undefined) value = null
    window.__maloon__.state[key.toString()] = value
}

/**
 * Retrieves some data from the state
 * @param key Key for the data
 * @returns {StateCompatible} Anything that is JSON serializable
 * @example getState('key')
 */
function getState(key: string | number): StateCompatible {
    return window.__maloon__.state[key.toString()]
}

export const state = {
    get: getState,
    set: setState,
    save: saveState,
    load: loadState
}