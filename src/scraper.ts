import * as cheerio from "cheerio";
import axios from "axios";

interface ScrapeOptions {
  onlyData?: boolean;
  includeTags?: string[];
  excludeTags?: string[];
  selector?: string[];
}

const scrape = async (
  url: string,
  options: ScrapeOptions = {}
): Promise<any> => {
  try {
    const response = await axios.get(url);
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
        } else if (selector.startsWith("#")) {
          // ID selector
          elements = $(selector).toArray();
        } else {
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
  } catch (error: any) {
    throw error;
  }
};

export default scrape;
