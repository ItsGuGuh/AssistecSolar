// Carregar Header e Footer dinamicamente
async function loadLayout() {
    try {
        // Carregar Header
        const headerResponse = await fetch('header.html');
        if (!headerResponse.ok) throw new Error('Falha ao carregar header');
        const headerText = await headerResponse.text();
        document.querySelector('header').innerHTML = headerText;

        // Carregar Footer
        const footerResponse = await fetch('footer.html');
        if (!footerResponse.ok) throw new Error('Falha ao carregar footer');
        const footerText = await footerResponse.text();
        document.querySelector('footer').innerHTML = footerText;

        // Inicializar menu mobile após carregar o header
        initMobileMenu();
        
        // Adicionar classe scrolled ao header quando scrollar
        initScrollHeader();
        
    } catch (error) {
        console.error('Erro ao carregar layout:', error);
    }
}

// Menu Mobile
function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (toggle && navLinks) {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Fechar menu ao clicar em um link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                toggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
}

// Header scroll effect
function initScrollHeader() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
}

// Chamar quando a página carregar
document.addEventListener('DOMContentLoaded', loadLayout);