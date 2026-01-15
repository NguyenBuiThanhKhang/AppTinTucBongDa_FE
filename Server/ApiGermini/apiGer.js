const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});
async function translateHTMLInternal(html,targetLang) {
    try {
        if (!html || typeof html !== "string") {
            return false;
        }

        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: [
                {
                    role: "user",
                    parts: [
                        {
                            text: `
Translate the following HTML content to ${targetLang}.
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

        return response.text;

    } catch (error) {
        console.error(error);
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
