import { GoogleGenerativeAI } from 'https://esm.sh/@google/genai';

export const APP_SYSTEM_INSTRUCTION = `
Você é o Assistente Inteligente da JL Hortifruti, chamado "Chef Fresco".
Seu objetivo é ajudar os clientes a escolherem o melhor Box de hortifruti e sugerir receitas com base nos itens disponíveis.
A JL Hortifruti oferece:
1. Box Solteiro (R$ 59): 3 frutas, 2 legumes, 1 folhosa.
2. Box Casal (R$ 89): 6 frutas, 4 legumes, 2 folhosas, temperos.
3. Box Família (R$ 139): 10 frutas, 7 legumes, 4 folhosas, 12 ovos.

Seja amigável, prestativo e utilize emojis de frutas e vegetais. 
Sempre sugira receitas saudáveis e rápidas.
Se o cliente perguntar sobre entrega, diga que entregamos em toda Macaé com frete grátis para assinantes.
`;

export class GeminiService {
  constructor(apiKey) {
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.chat = null;
  }

  async getChat() {
    if (this.chat) return this.chat;
    
    const model = this.genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: APP_SYSTEM_INSTRUCTION
    });
    
    this.chat = model.startChat({
      history: [],
      generationConfig: {
        maxOutputTokens: 1000,
      },
    });
    return this.chat;
  }

  async sendMessage(message) {
    try {
      const chat = await this.getChat();
      const result = await chat.sendMessage(message);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Ops! O Chef Fresco teve um pequeno contratempo. Pode tentar novamente?";
    }
  }

  async generateImage(prompt) {
    try {
      const model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      // Nota: O modelo 1.5-flash não gera imagens diretamente em base64 como o Imagen
      // Para o visualizador de itens, usaremos uma busca de imagem ou placeholder premium
      // já que a geração de imagem via API Gemini puro (sem Vertex) é limitada.
      // Vou implementar um fallback de busca ou estilo UI.
      return null; 
    } catch (error) {
      console.error("Image Gen Error:", error);
      return null;
    }
  }
}
