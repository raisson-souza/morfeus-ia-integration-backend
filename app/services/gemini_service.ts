import { cuid } from "@adonisjs/core/helpers"
import { GoogleGenAI, createUserContent, createPartFromUri } from "@google/genai"
import app from "@adonisjs/core/services/app"
import env from "#start/env"
import fs from "fs/promises"

export default class GeminiService {
    private model = new GoogleGenAI({ apiKey: env.get("GEMINI_API_KEY") })

    protected async GenerateText(systemPrompt: string, userPrompt: string): Promise<string> {
        try {
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
        catch (ex) {
            console.log("Erro ao gerar texto", ex.message)
            return "Não foi possível gerar a interpretação."
        }
    }

    protected async GenerateImage(prompt: string): Promise<string | null> {
        try {
            const response = await this.model.models.generateContent({
                model: "gemini-2.0-flash-exp-image-generation",
                contents: prompt,
                config: {
                    responseModalities: ["Text", "Image"],
                    // systemInstruction: // NÃO PERMITE
                },
            })

            if (response.candidates) {
                if (response.candidates.length > 0) {
                    if (response.candidates[0].content) {
                        if (response.candidates[0].content.parts) {
                            for (const part of response.candidates[0].content.parts) {
                                if (part.inlineData) {
                                    if (part.inlineData.data) {
                                        const buffer = Buffer.from(part.inlineData.data, "base64")
                                        return await this.saveImage(buffer)
                                    }
                                }
                            }
                        }
                    }
                }
            }

            return null
        }
        catch (ex) {
            console.log("erro ao gerar imagem", ex.message)
            return null
        }
    }

    protected async TranscribeAudio(audioFilePath: string, audioFileMimeType: string): Promise<string> {
        try {
            const audioFile = await this.model.files.upload({
                file: audioFilePath,
                config: {
                    mimeType: `audio/${ audioFileMimeType }`,
                },
            })

            const systemPrompt = "Transcreva o que foi dito no áudio"

            const response = await this.model.models.generateContent({
                model: "gemini-2.0-flash",
                contents: createUserContent([
                    createPartFromUri(audioFile.uri!, audioFile.mimeType!),
                    systemPrompt,
                ]),
            })

            return response.text ?? ""
        }
        catch (ex) {
            console.log("erro ao transcrever áudio", ex.message)
            return "Não foi possível transcrever o áudio."
        }
    }

    private async saveImage(bufferImage: Buffer): Promise<string | null> {
        try {
            const imageFileName = cuid()
            await fs.writeFile(`${ app.makePath("public") }/${ imageFileName }.png`, bufferImage as any)
            return imageFileName
        }
        catch (ex) {
            console.log("erro ao salvar imagem", ex.message)
            return null
        }
    }
}