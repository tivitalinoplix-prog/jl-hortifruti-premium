import { GEMINI_CONFIG } from './config.js';
import { GeminiService } from './gemini-service.js';

class SearchModalUI {
  constructor() {
    this.service = null;
    this.btn = document.getElementById('search-modal-btn'); // Link no menu ou FAB
    this.modal = document.getElementById('search-modal');
    this.closeBtn = document.getElementById('search-modal-close');
    this.form = document.getElementById('search-form');
    this.input = document.getElementById('search-input');
    this.previewContainer = document.getElementById('search-preview');
    
    this.clayPromptBase = "A cute 3D claymorphism style icon, strictly following a soft puffy design. A rounded square container made of soft, pastel mint green clay. Inside, a sculpted object representing {item} made from high-contrast clay colors. The overall look is puffy, soft, with a matte finish and gentle, rounded shadows giving it depth. Isolated on a plain white background.";
    
    this.init();
  }

  init() {
    if (!this.btn) return;

    this.btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.open();
    });
    this.closeBtn.addEventListener('click', () => this.close());
    this.form.addEventListener('submit', (e) => this.handleSearch(e));
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

  async handleSearch(e) {
    e.preventDefault();
    const term = this.input.value.trim();
    if (!term) return;

    this.showLoading();

    if (GEMINI_CONFIG.apiKey === 'SUA_CHAVE_AQUI') {
        this.showResult(null, "Configure sua API Key para usar o visualizador.");
        return;
    }

    // Nota: Simulação de geração para demonstração visual, 
    // já que o Gemini sem Vertex AI não retorna imagem base64 diretamente fácil via CDN puro.
    // Em uma versão futura, isso conectaria com o endpoint de imagem.
    setTimeout(() => {
        this.showResult("https://i.postimg.cc/76cfLtSc/logo.jpg", "Visualização gerada com sucesso!");
    }, 2000);
  }

  showLoading() {
    this.previewContainer.innerHTML = `
      <div class="flex flex-col items-center gap-6">
        <div class="w-20 h-20 border-8 border-brand-green/20 border-t-brand-green rounded-full animate-spin"></div>
        <p class="text-brand-dark font-black animate-pulse">Moldando seu ícone em argila...</p>
      </div>
    `;
  }

  showResult(imgUrl, msg) {
    if (!imgUrl) {
        this.previewContainer.innerHTML = `<p class="text-slate-400 font-bold">${msg}</p>`;
        return;
    }
    
    this.previewContainer.innerHTML = `
      <div class="animate-fade-in group text-center">
        <div class="relative p-2 bg-white rounded-[3rem] shadow-2xl border-8 border-white mb-6">
          <img src="${imgUrl}" alt="Preview" class="w-64 h-64 object-cover rounded-[2rem]" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
            <span class="text-white font-black text-xs uppercase tracking-widest">Estilo Claymorphism JL</span>
          </div>
        </div>
        <p class="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">${msg}</p>
      </div>
    `;
  }
}

document.addEventListener('DOMContentLoaded', () => new SearchModalUI());
