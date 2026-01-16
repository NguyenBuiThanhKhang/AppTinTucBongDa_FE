const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});
const model = "gemini-2.5-flash"

const countryCode = ["English", "Spanish", "French"];

async function translateHTMLInternal(title, html) {
    try {
        if (!title || typeof title !== "string") return false;
        if (!html || typeof html !== "string") return false;
        console.log("Translating HTML content...");
        const response = await ai.models.generateContent({
            model: model,
            contents: [
                {
                    role: "user",
                    parts: [
                        {
                            text: `
You are a professional football news translator.

Translate the following TITLE and HTML content into the following languages:
${countryCode.join(", ")}

Rules:
- Keep ALL HTML tags, attributes, src, href unchanged
- Only translate readable text
- Do NOT add or remove tags
- Do NOT explain anything
- Return STRICT JSON ONLY

JSON format:
{
  "English": {
    "title": "...",
    "html": "..."
  },
  "Spanish": {
    "title": "...",
    "html": "..."
  },
  "French": {
    "title": "...",
    "html": "..."
  }
}

ORIGINAL TITLE:
${title}

HTML:
${html}
`
                        }
                    ]
                }
            ]
        });

        const cleanText = response.text
            .replace(/```json|```/g, "")
            .trim();

        return JSON.parse(cleanText);

    } catch (error) {
        console.error("Gemini translate error:", error);
        return false;
    }
}

async function translateHTML(req, res) {
    try {
        const html = req.body;

        if (!html || typeof html !== "string") {
            return res.status(400).json({
                error: "text is required"
            });
        }

        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: [
                {
                    role: "user",
                    parts: [
                        {
                            text: `
Translate the following HTML content to Vietnamese.
Rules:
- Keep ALL HTML tags, attributes, src, href unchanged
- Only translate readable text
- Do NOT add or remove tags
- Do NOT explain anything

HTML:
${html}
`
                        }
                    ]
                }
            ]
        });

        res.status(200).json({
            translatedText: response.text
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error.message
        });
    }
}

module.exports = {
    translateHTML,
    translateHTMLInternal
};
