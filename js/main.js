document.addEventListener('DOMContentLoaded', () => {
    // FAQ Logic
    const faqContainer = document.getElementById('faq-container');
    const faqs = [
        {
            question: 'Por que escolher a TerçaBox?',
            answer: 'A TerçaBox oferece praticidade, frescor garantido e economia. Você recebe produtos selecionados sem sair de casa, com entrega grátis em Macaé e preços justos direto do produtor.'
        },
        {
            question: 'Como funciona a entrega?',
            answer: 'Fazemos entregas de terça a sábado em Macaé. Você escolhe seu box, faz o pedido via WhatsApp e recebe em casa no mesmo dia ou no dia seguinte, totalmente grátis.'
        },
        {
            question: 'Posso escolher os produtos que vêm no box?',
            answer: 'Nossos boxes são pré-selecionados com variedade balanceada. Mas você pode fazer pedidos personalizados através do WhatsApp, adicionando ou removendo produtos conforme sua preferência.'
        },
        {
            question: 'Qual a garantia de frescor?',
            answer: 'Garantimos produtos frescos colhidos em até 24h antes da entrega. Se você não ficar satisfeito com a qualidade, devolvemos seu dinheiro sem burocracia.'
        }
    ];

    faqs.forEach(faq => {
        const div = document.createElement('div');
        div.className = 'faq-item bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-all border border-slate-100';
        div.innerHTML = `
            <button class="faq-question w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors">
                <span class="font-bold text-base md:text-lg text-brand-green pr-4">${faq.question}</span>
                <span class="iconify text-2xl text-brand-green-light transition-transform duration-300" data-icon="solar:alt-arrow-down-bold"></span>
            </button>
            <div class="faq-answer px-6 max-h-0 opacity-0 transition-all duration-300 overflow-hidden">
                <p class="text-slate-500 font-medium pb-5">${faq.answer}</p>
            </div>
        `;
        faqContainer.appendChild(div);
    });

    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const answer = btn.nextElementSibling;
            const icon = btn.querySelector('.iconify');
            const isOpen = answer.classList.contains('max-h-96');

            document.querySelectorAll('.faq-answer').forEach(a => {
                a.classList.remove('max-h-96', 'opacity-100', 'mt-2');
                a.classList.add('max-h-0', 'opacity-0');
            });

            if (!isOpen) {
                answer.classList.remove('max-h-0', 'opacity-0');
                answer.classList.add('max-h-96', 'opacity-100', 'mt-2');
                icon.style.transform = 'rotate(180deg)';
            } else {
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });

    // Mobile Menu
    const menuBtn = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Scroll Navbar
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            nav.classList.add('bg-brand-green', 'shadow-lg');
            nav.classList.remove('transparent');
        } else {
            nav.classList.remove('bg-brand-green', 'shadow-lg');
            nav.classList.add('transparent');
        }
    });
});
