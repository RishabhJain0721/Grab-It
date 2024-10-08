#!/usr/bin/env node
import scrape from "../scraper";
// const fs = require('fs');

function parseJSONArgument(arg: any) {
  try {
    return JSON.parse(arg.replace(/'/g, '"'));
  } catch (e) {
    console.error("Error: Invalid JSON format for options");
    process.exit(1);
  }
}

const [, , url, options] = process.argv;

if (!url) {
  console.error("Error: URL is required");
  process.exit(1);
}

const parsedOptions = options ? parseJSONArgument(options) : {};

scrape(url, parsedOptions)
  .then((result) => {
    console.log("Scraped Data:", result);
  })
  .catch((err) => {
    console.error("Error scraping the website:", err);
  });
