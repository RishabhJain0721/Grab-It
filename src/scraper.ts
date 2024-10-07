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
        let elements: any;
        if (selector.startsWith(".")) {
          // Class selector
          elements = $(selector);
        } else if (selector.startsWith("#")) {
          // ID selector
          elements = $(selector);
        } else {
          // Tag name
          elements = $(selector);
        }

        elements.each((_: any, element: any) => {
          result += $(element).text().trim() + "\n";
        });
      }

      return result.trim();
    }

    console.log($("html").html());
    if (options.onlyData) {
      return $("html").text() || "";
    }
    return $("html").html() || "";
  } catch (error: any) {
    throw error;
  }
};

scrape("https://quiz-phi-three.vercel.app/", {
  //   includeTags: ["html", "body", "head", "title", "p", "div"],
  selector: [".w", "#skull"],
});

export default scrape;
