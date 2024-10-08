#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const scraper_1 = __importDefault(require("../scraper"));
// const fs = require('fs');
function parseJSONArgument(arg) {
    try {
        return JSON.parse(arg.replace(/'/g, '"'));
    }
    catch (e) {
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
(0, scraper_1.default)(url, parsedOptions)
    .then((result) => {
    console.log("Scraped Data:", result);
})
    .catch((err) => {
    console.error("Error scraping the website:", err);
});
