# Navigator functions for maloon 🧭
**NOTE: This package is intended for use with maloon. For guides and install look [here](https://github.com/greencoder001/maloon)**

# Import
```js
import { navigate, navigateFresh, open, Page, state } from 'maloon-nav'
```

## Exports

<dl>
<dt><a href="#navigate">navigate(page, queryString)</a> ⇒ <code>Promise.&lt;void&gt;</code></dt>
<dd><p>Navigates to a different page / route</p>
</dd>
<dt><a href="#navigateFresh">navigateFresh(page, queryString)</a> ⇒ <code>Promise.&lt;void&gt;</code></dt>
<dd><p>Navigates to a different page / route and enforces a fresh component load. This can be useful when javascript is rendered on the server</p>
</dd>
<dt><a href="#open">open(page, queryString)</a> ⇒ <code>PageInfo</code></dt>
<dd><p>Opens a new tab with the specified page / route</p>
</dd>
<dt><a href="#Page">Page()</a> ⇒ <code>PageInfo</code></dt>
<dd><p>Returns info and methods giving useful information about the current page</p>
</dd>
<dt><a href="#saveState">state.save()</a></dt>
<dd><p>Saves current state so that it can be recovered on reload.
NOTE: This is done automatically when using open() or navigating to an external page.
NOTE2: State will only be saved until next page load</p>
</dd>
<dt><a href="#loadState">state.load()</a></dt>
<dd><p>Loads stored state.
NOTE: This will be done automatically when using definePages()</p>
</dd>
<dt><a href="#setState">state.set(key, value)</a></dt>
<dd><p>Stores a value in the state</p>
</dd>
<dt><a href="#getState">state.get(key)</a> ⇒ <code>StateCompatible</code></dt>
<dd><p>Retrieves some data from the state</p>
</dd>
</dl>

<a name="navigate"></a>

## navigate(page, queryString) ⇒ <code>Promise.&lt;void&gt;</code>
Navigates to a different page / route

**Kind**: global function  

| Param | Description |
| --- | --- |
| page | A page name, a page path or an absolute url to an external website |
| queryString | Here you can optionally provide a queryString |

<a name="navigateFresh"></a>

## navigateFresh(page, queryString) ⇒ <code>Promise.&lt;void&gt;</code>
Navigates to a different page / route and enforces a fresh component load. This can be useful when javascript is rendered on the server

**Kind**: global function  

| Param | Description |
| --- | --- |
| page | A page name, a page path or an absolute url to an external website |
| queryString | Here you can optionally provide a queryString |

<a name="open"></a>

## open(page, queryString) ⇒ <code>PageInfo</code>
Opens a new tab with the specified page / route

**Kind**: global function  
**Returns**: <code>PageInfo</code> - Will look like this:
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

| Param | Description |
| --- | --- |
| page | A page name, a page path or an absolute url to an external website |
| queryString | Here you can optionally provide a queryString |

<a name="Page"></a>

## Page() ⇒ <code>PageInfo</code>
Returns info and methods giving useful information about the current page

**Kind**: global function  
**Returns**: <code>PageInfo</code> - Will look like this:
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
<a name="saveState"></a>

## state.save()
Saves current state so that it can be recovered on reload.
NOTE: This is done automatically when using open() or navigating to an external page.
NOTE2: State will only be saved until next page load

**Kind**: global function  
<a name="loadState"></a>

## state.load()
Loads stored state.
NOTE: This will be done automatically when using definePages()

**Kind**: global function  
<a name="setState"></a>

## state.set(key, value)
Stores a value in the state

**Kind**: global function  

| Param | Description |
| --- | --- |
| key | Key for the data |
| value | Whatever you want to save. Just make sure it's JSON serializable |

**Example**  
```js
state.set('key', 'value')
```
<a name="getState"></a>

## state.get(key) ⇒ <code>StateCompatible</code>
Retrieves some data from the state

**Kind**: global function  
**Returns**: <code>StateCompatible</code> - Anything that is JSON serializable  

| Param | Description |
| --- | --- |
| key | Key for the data |

**Example**  
```js
state.get('key')
```
