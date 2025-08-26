// Animação de contadores
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const count = +counter.innerText;
        const increment = target / speed;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(animateCounters, 1);
        } else {
            counter.innerText = target;
        }
    });
}

// Observador de elementos para animações no scroll
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                
                // Se for a seção de stats, animar os contadores
                if (entry.target.classList.contains('stats-section')) {
                    animateCounters();
                }
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Elementos que devem ser animados
    document.querySelectorAll('.benefit-item, .feature-item, .stat-item, .service-card, .process-item, .vacancy-item').forEach((el, index) => {
        el.classList.add(`delay-${(index % 4) + 1}`);
        observer.observe(el);
    });
    
    // Seções principais
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// Simulador de economia
function initSimulator() {
    const simulatorForm = document.querySelector('.simulator-form');
    if (!simulatorForm) return;
    
    const calcularBtn = document.getElementById('calcular');
    const resultadoDiv = document.getElementById('resultado');
    
    calcularBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        const consumo = parseFloat(document.getElementById('consumo').value) || 0;
        const valor = parseFloat(document.getElementById('valor').value) || 0;
        
        if (consumo <= 0 || valor <= 0) {
            alert('Por favor, preencha valores válidos.');
            return;
        }
        
        // Cálculo simples (apenas para demonstração)
        const economiaPercentual = Math.min(95, 30 + Math.floor(consumo / 10));
        const valorEconomia = (valor * economiaPercentual / 100).toFixed(2);
        
        document.getElementById('economia').textContent = economiaPercentual;
        document.getElementById('valor-economia').textContent = valorEconomia;
        
        resultadoDiv.style.display = 'block';
    });
}

// Formulários
function initForms() {
    // Formulário de contato
    const contactForm = document.getElementById('contato-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            contactForm.reset();
        });
    }
    
    // Formulário trabalhe conosco
    const trabalhoForm = document.getElementById('trabalhe-conosco-form');
    if (trabalhoForm) {
        trabalhoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Obrigado por se candidatar! Analisaremos seu currículo e entraremos em contato.');
            trabalhoForm.reset();
        });
    }
}

// Inicializar tudo quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initSimulator();
    initForms();
    
    // Ativar menu ativo conforme a página
    const currentPage = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (currentPage === linkPage) {
            link.classList.add('active');
        }
    });
});