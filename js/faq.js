// FAQ Data & Logic
const FAQS = [
    { question: 'O que é a TerçaBox?', answer: 'A TerçaBox é um serviço de assinatura semanal de hortifruti. Você escolhe o tamanho do box (Solteiro, Casal ou Família) e recebe produtos frescos e selecionados toda terça-feira na sua casa.' },
    { question: 'Como funciona a entrega?', answer: 'Fazemos entregas de terça a sábado em Macaé. Você escolhe seu box, faz o pedido via WhatsApp e recebe em casa no mesmo dia ou no dia seguinte, totalmente grátis.' },
    { question: 'Posso escolher os produtos?', answer: 'Nossos boxes são pré-selecionados com variedade balanceada. Mas você pode fazer pedidos personalizados através do WhatsApp, adicionando ou removendo produtos.' },
    { question: 'Qual a garantia de frescor?', answer: 'Garantimos produtos frescos colhidos em até 24h antes da entrega. Se não ficar satisfeito com a qualidade, devolvemos seu dinheiro sem burocracia.' },
    { question: 'Como fazer meu pedido?', answer: 'É super simples! Clique em qualquer botão "Assinar" ou "Pedir" e será direcionado ao nosso WhatsApp. Lá você escolhe seu box e finaliza o pedido.' },
    { question: 'Quais formas de pagamento?', answer: 'Aceitamos Pix, cartão de crédito e débito, e dinheiro na entrega.' },
    { question: 'Atendem fora de Macaé?', answer: 'Atualmente atendemos apenas Macaé com entrega grátis. Para outras regiões, entre em contato via WhatsApp.' },
    { question: 'Posso cancelar a assinatura?', answer: 'Sim! Não há fidelidade. Você pode pausar ou cancelar a qualquer momento, sem taxas.' }
];

// FAQ click handler
document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.faq-question');
        if (!btn) return;
        const answer = btn.nextElementSibling;
        const icon = btn.querySelector('.faq-icon');
        const isOpen = answer.classList.contains('open');

        document.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('open'));
        document.querySelectorAll('.faq-icon').forEach(i => i.style.transform = 'rotate(0deg)');

        if (!isOpen) {
            answer.classList.add('open');
            if (icon) icon.style.transform = 'rotate(180deg)';
        }
    });
});
