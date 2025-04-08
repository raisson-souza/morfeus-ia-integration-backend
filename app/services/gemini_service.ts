import { GoogleGenAI } from "@google/genai"
import env from "#start/env"

export default class GeminiService {
    private model = new GoogleGenAI({ apiKey: env.get("GEMINI_APi_KEY") })

    protected async GenerateText(systemPrompt: string, userPrompt: string): Promise<string> {
        return await this.model.models.generateContent({
            model: "gemini-2.0-flash",
            contents: userPrompt,
            config: {
                systemInstruction: systemPrompt,
            },
        })
            .then(response => {
                return response.text ?? ""
            })
    }

    protected async GenerateImage() {
        // https://ai.google.dev/gemini-api/docs/image-generation?hl=pt-br
    }
}