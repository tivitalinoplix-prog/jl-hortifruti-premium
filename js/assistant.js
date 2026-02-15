import { GEMINI_CONFIG } from './config.js';
import { GeminiService } from './gemini-service.js';

class AssistantUI {
  constructor() {
    this.service = null;
    this.fab = document.getElementById('assistant-fab');
    this.modal = document.getElementById('assistant-modal');
    this.closeBtn = document.getElementById('assistant-close');
    this.chatForm = document.getElementById('chat-form');
    this.chatInput = document.getElementById('chat-input');
    this.chatMessages = document.getElementById('chat-messages');
    
    this.init();
  }

  init() {
    if (!this.fab) return;

    this.fab.addEventListener('click', () => this.open());
    this.closeBtn.addEventListener('click', () => this.close());
    this.chatForm.addEventListener('submit', (e) => this.handleSubmit(e));
    
    // Add initial message
    this.addMessage('model', 'Olá! Eu sou o Chef Fresco 👨-‍🍳. Como posso te ajudar hoje? Posso sugerir o box ideal ou te dar receitas incríveis!');
  }

  open() {
    this.modal.classList.add('flex');
    this.modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    if (!this.service && GEMINI_CONFIG.apiKey !== 'SUA_CHAVE_AQUI') {
      this.service = new GeminiService(GEMINI_CONFIG.apiKey);
    }
  }

  close() {
    this.modal.classList.add('hidden');
    this.modal.classList.remove('flex');
    document.body.style.overflow = 'unset';
  }

  addMessage(role, text) {
    const div = document.createElement('div');
    div.className = `flex ${role === 'user' ? 'justify-end' : 'justify-start'}`;
    
    const innerDiv = document.createElement('div');
    innerDiv.className = `max-w-[88%] p-4 md:p-5 rounded-2xl shadow-sm text-sm md:text-base leading-relaxed ${
      role === 'user' 
        ? 'bg-brand-orange text-white rounded-tr-none font-medium' 
        : 'bg-white text-slate-800 rounded-tl-none border border-slate-200'
    }`;
    innerDiv.textContent = text;
    
    div.appendChild(innerDiv);
    this.chatMessages.appendChild(div);
    this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
  }

  async handleSubmit(e) {
    e.preventDefault();
    const text = this.chatInput.value.trim();
    if (!text) return;

    this.chatInput.value = '';
    this.addMessage('user', text);

    if (GEMINI_CONFIG.apiKey === 'SUA_CHAVE_AQUI') {
      this.addMessage('model', 'Por favor, configure sua GEMINI_API_KEY no arquivo js/config.js para conversar comigo!');
      return;
    }

    const loadingDiv = this.showLoading();
    const response = await this.service.sendMessage(text);
    this.chatMessages.removeChild(loadingDiv);
    this.addMessage('model', response);
  }

  showLoading() {
    const div = document.createElement('div');
    div.className = 'flex justify-start';
    div.innerHTML = `
      <div class="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-200 flex gap-2">
        <div class="w-2 h-2 bg-brand-green rounded-full animate-bounce"></div>
        <div class="w-2 h-2 bg-brand-green rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
        <div class="w-2 h-2 bg-brand-green rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
      </div>
    `;
    this.chatMessages.appendChild(div);
    this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    return div;
  }
}

document.addEventListener('DOMContentLoaded', () => new AssistantUI());
