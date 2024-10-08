"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio = __importStar(require("cheerio"));
const axios_1 = __importDefault(require("axios"));
const scrape = async (url, options = {}) => {
    try {
        const response = await axios_1.default.get(url);
        if (response.status !== 200) {
            throw new Error(`Request failed with status ${response.status}`);
        }
        const $ = cheerio.load(response.data);
        if (options.includeTags && options.includeTags.length > 0) {
            $("*").each((_, element) => {
                const tagName = $(element).prop("tagName");
                if (tagName && !options.includeTags?.includes(tagName.toLowerCase())) {
                    $(element).remove();
                }
            });
        }
        if (options.excludeTags && options.excludeTags.length > 0) {
            for (const tag of options.excludeTags) {
                $(tag).remove();
            }
        }
        if (options.selector && options.selector.length > 0) {
            let result = "";
            for (const selector of options.selector) {
                let elements;
                if (selector.startsWith(".")) {
                    // Class selector
                    elements = $(selector).toArray();
                }
                else if (selector.startsWith("#")) {
                    // ID selector
                    elements = $(selector).toArray();
                }
                else {
                    // Tag name
                    elements = $(selector).toArray();
                }
                elements.forEach((element) => {
                    const htmlString = $.html(element);
                    result += htmlString + "\n";
                });
            }
            if (options.onlyData) {
                return result.replace(/<[^>]*>/g, "").trim();
            }
            return result.trim();
        }
        if (options.onlyData) {
            return $("html").text() || "";
        }
        return $("html").html() || "";
    }
    catch (error) {
        throw { error: error.message, statusText: error.response.statusText };
    }
};
exports.default = scrape;
