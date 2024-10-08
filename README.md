# Scrapyyy : **Scrape the web in one line!**

A web scraping tool built with TypeScript, utilizing Cheerio and Axios to fetch and filter HTML content from web pages.

#### **Update : Can also run on CLI now!**

## Installation

```
npm install scrapyyy
```

## Features

- Fetch and parse HTML from web pages.

- Include or exclude specific HTML tags during scraping.

- Filter content based on CSS selectors.
- Optionally return only the data (text content) or full HTML.

## Usage

First, import the scraper module and use it to scrape web pages.

```bash

import  {  scraper  }  from  "scrapyyy";

//  Example  usage
(async () => {
const  result  =  await  scraper("https://example.com",  {
onlyData:  true,
includeTags: ["div", "span"],
excludeTags: ["script", "style"],
selector: ["#content", ".main"],
});

console.log(result);
})();

```

## API

```ts
scraper(url, options):
```

### Parameters:

- **url** (`string`): The URL of the webpage to scrape.
- **options** (`object`): Optional configuration to modify the scraping process.
  - **onlyData** (`boolean`): If `true`, returns only the text content of the page (default: `false`).
  - **includeTags** (`string[]`): List of tag names to include in the result.
  - **excludeTags** (`string[]`): List of tag names to exclude from the result.
  - **selector** (`string[]`): CSS selectors to filter the content (e.g., `#id`, `.class`, `tagName`).

### Returns:

- **Promise<any>**: A promise that resolves with the scraped content (either HTML or plain text).

## Example:

#### Scrape HTML Content

```ts
const html = await scraper("https://example.com");

console.log(html); // Full HTML content of the page
```

<br/>


#### Scrape with Tag Inclusion/Exclusion

```ts
const filtered = await scraper("https://example.com", {
  includeTags: ["html", "body", "head", "title", "p", "div"],

  excludeTags: ["script"],
});

console.log(filtered); // HTML content with only <p> and <div>, excluding <script>
```

**Note :** If you are including a certain tag but not its parent tag, it won't be present in the result.

eg. If you include **_p_** tag but not include **_body_**, no **_p_** tags will actually be included.

<br/>

#### Scrape Using CSS Selectors

```ts
const selectedContent = await scraper("https://example.com", {
  selector: [".header", "#main"],
});

console.log(selectedContent); // Text content from elements matching the provided selectors
```

  <br/>

#### Scrape Only Data (Text Content)

```ts
const data = await scraper("https://example.com", { onlyData: true });

console.log(data); // Plain text content of the page
```

<br/>

## For CLI usage :

```bash

scrapyyy "https://example.com" '{"onlyData": true,"includeTags":["html","body"], "excludeTags": ["script", "style"] , "selector": [".header", "#main"]}'


```

## License

MIT
