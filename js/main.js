// Glipearte Website JavaScript
// Plataforma de Locação de Artigos para Festas - Estilo "Pegue e Monte"

class GlipearteApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupScrollAnimations();
        this.setupModal();
        this.setupForm();
        this.setupHeroAnimation();
        this.setupProductInteractions();
        this.setupContactForm();
    }

    // Navigation Functions
    setupNavigation() {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Mobile menu toggle
        if (navToggle) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                this.animateMenuToggle(navToggle);
            });
        }

        // Smooth scrolling for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    this.smoothScrollTo(targetSection);
                    
                    // Close mobile menu if open
                    if (navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                    }
                }
            });
        });

        // Header scroll effect
        window.addEventListener('scroll', () => {
            this.handleHeaderScroll();
        });
    }

    animateMenuToggle(toggle) {
        const spans = toggle.querySelectorAll('span');
        const isActive = toggle.classList.contains('active');
        
        if (isActive) {
            spans[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
        
        toggle.classList.toggle('active');
    }

    handleHeaderScroll() {
        const header = document.querySelector('.header');
        const scrollY = window.scrollY;
        
        if (scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.background = 'var(--white)';
            header.style.backdropFilter = 'none';
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    }

    smoothScrollTo(element) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const elementPosition = element.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }

    // Scroll Animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animatedElements = document.querySelectorAll('.produto-card, .servico-card, .info-item, .feature');
        animatedElements.forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    }

    // Hero Animation
    setupHeroAnimation() {
        const heroImg = document.querySelector('.hero-img');
        if (heroImg) {
            // Add parallax effect
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                heroImg.style.transform = `translateY(${rate}px)`;
            });
        }
    }

    // Modal Functions
    setupModal() {
        const modal = document.getElementById('produtoModal');
        const modalBody = document.getElementById('modal-body');
        const closeBtn = document.querySelector('.close');
        const verMaisBtns = document.querySelectorAll('.btn-ver-mais');

        verMaisBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const produto = btn.getAttribute('data-produto');
                this.openProductModal(produto, modal, modalBody);
            });
        });

        // Close modal
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        }

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                modal.style.display = 'none';
            }
        });
    }

    openProductModal(produto, modal, modalBody) {
        const produtos = {
            decoracao: {
                titulo: 'Decoração',
                descricao: 'Transforme seu ambiente com nossa variedade de artigos de decoração.',
                itens: [
                    'Enfeites temáticos para mesas',
                    'Arranjos florais artificiais',
                    'Guirlandas e lustres decorativos',
                    'Balões e acessórios para festas',
                    'Tapetes e carpetes decorativos',
                    'Velas e castiçais ornamentais'
                ],
                cores: ['Dourado', 'Prateado', 'Rosê', 'Azul', 'Verde', 'Multicolorido'],
                pacotes: [
                    { nome: 'Básico', preco: 'R$ 150/dia', itens: '10 peças' },
                    { nome: 'Intermediário', preco: 'R$ 280/dia', itens: '20 peças' },
                    { nome: 'Completo', preco: 'R$ 450/dia', itens: '35 peças' }
                ]
            },
            mesa: {
                titulo: 'Mesa Posta',
                descricao: 'Messa posta completa para todos os estilos de eventos.',
                itens: [
                    'Jogos americanos coloridos',
                    'Guardanapos em tecido premium',
                    'Porta-guardanapos decorativos',
                    'Louças e pratos temáticos',
                    'Talheres em aço inox',
                    'Copos e taças variadas'
                ],
                cores: ['Branco', 'Preto', 'Dourado', 'Rosé', 'Azul', 'Verde'],
                pacotes: [
                    { nome: 'Casual', preco: 'R$ 25/pessoa', itens: 'Kit básico' },
                    { nome: 'Elegante', preco: 'R$ 45/pessoa', itens: 'Kit completo' },
                    { nome: 'Premium', preco: 'R$ 75/pessoa', itens: 'Kit luxo' }
                ]
            },
            iluminacao: {
                titulo: 'Iluminação',
                descricao: 'Crie o clima perfeito com nossa iluminação especial.',
                itens: [
                    'Luzes LED coloridas',
                    'Luminárias de mesa',
                    'Fios de luz e pisca-pisca',
                    'Refletores coloridos',
                    'Lâmpadas decorativas',
                    'Velas eletrônicas'
                ],
                cores: ['Branco', 'Colorido', 'Quente', 'Frio', 'RGB'],
                pacotes: [
                    { nome: 'Ambiente', preco: 'R$ 120/dia', itens: '5 peças' },
                    { nome: 'Festa', preco: 'R$ 220/dia', itens: '10 peças' },
                    { nome: 'Premium', preco: 'R$ 380/dia', itens: '18 peças' }
                ]
            },
            tintas: {
                titulo: 'Tintas Spray',
                descricao: 'Personalize objetos e decorações com nossas tintas spray.',
                itens: [
                    'Tintas spray metálicas',
                    'Tintas neon fluorescentes',
                    'Tintas fosca e acetinada',
                    'Spray glitter e efeitos',
                    'Primers e vernizes',
                    'Removedores e limpadores'
                ],
                cores: ['Dourado', 'Prateado', 'Rosa', 'Azul', 'Verde', 'Roxo', 'Preto', 'Branco'],
                pacotes: [
                    { nome: 'Kit Básico', preco: 'R$ 80/dia', itens: '5 cores' },
                    { nome: 'Kit Criativo', preco: 'R$ 150/dia', itens: '10 cores' },
                    { nome: 'Kit Artista', preco: 'R$ 280/dia', itens: '20 cores' }
                ]
            }
        };

        const produtoData = produtos[produto];
        
        if (produtoData) {
            modalBody.innerHTML = this.createProductModalContent(produtoData);
            modal.style.display = 'block';
            
            // Add animation to modal
            setTimeout(() => {
                modalBody.parentElement.style.animation = 'slideIn 0.3s ease';
            }, 10);
        }
    }

    createProductModalContent(data) {
        return `
            <div class="modal-produto">
                <h2 class="modal-title">${data.titulo}</h2>
                <p class="modal-description">${data.descricao}</p>
                
                <div class="modal-section">
                    <h3>Itens Disponíveis:</h3>
                    <ul class="modal-list">
                        ${data.itens.map(item => `<li><i class="fas fa-check"></i> ${item}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="modal-section">
                    <h3>Cores Disponíveis:</h3>
                    <div class="modal-cores">
                        ${data.cores.map(cor => `<span class="cor-tag">${cor}</span>`).join('')}
                    </div>
                </div>
                
                <div class="modal-section">
                    <h3>Pacotes de Locação:</h3>
                    <div class="modal-pacotes">
                        ${data.pacotes.map(pacote => `
                            <div class="pacote-card">
                                <h4>${pacote.nome}</h4>
                                <p class="pacote-preco">${pacote.preco}</p>
                                <p class="pacote-itens">${pacote.itens}</p>
                                <button class="btn-selecionar" data-pacote="${pacote.nome}">
                                    Selecionar
                                </button>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="modal-actions">
                    <button class="btn-fechar-modal">Fechar</button>
                </div>
            </div>
        `;
    }

    // Product Interactions
    setupProductInteractions() {
        // Add hover effects to product cards
        const produtoCards = document.querySelectorAll('.produto-card');
        produtoCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Add click tracking for products (analytics simulation)
        const verMaisBtns = document.querySelectorAll('.btn-ver-mais');
        verMaisBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const produto = btn.getAttribute('data-produto');
                console.log(`Produto visualizado: ${produto}`);
                // Here you could add Google Analytics or other tracking
            });
        });
    }

    // Form Setup
    setupForm() {
        const contatoForm = document.getElementById('contatoForm');
        
        if (contatoForm) {
            contatoForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit(contatoForm);
            });

            // Add input animations
            const inputs = contatoForm.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.addEventListener('focus', () => {
                    input.parentElement.classList.add('focused');
                });
                
                input.addEventListener('blur', () => {
                    if (!input.value) {
                        input.parentElement.classList.remove('focused');
                    }
                });
            });
        }
    }

    setupContactForm() {
        // Phone number formatting
        const telefoneInput = document.getElementById('telefone');
        if (telefoneInput) {
            telefoneInput.addEventListener('input', (e) => {
                this.formatPhoneNumber(e.target);
            });
        }

        // Email validation
        const emailInput = document.getElementById('email');
        if (emailInput) {
            emailInput.addEventListener('blur', (e) => {
                this.validateEmail(e.target);
            });
        }
    }

    formatPhoneNumber(input) {
        let value = input.value.replace(/\D/g, '');
        
        if (value.length > 11) {
            value = value.slice(0, 11);
        }
        
        if (value.length > 6) {
            value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
        } else if (value.length > 2) {
            value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
        } else if (value.length > 0) {
            value = `(${value}`;
        }
        
        input.value = value;
    }

    validateEmail(input) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(input.value);
        
        if (!isValid && input.value) {
            input.classList.add('invalid');
            input.classList.remove('valid');
        } else {
            input.classList.remove('invalid');
            if (input.value) {
                input.classList.add('valid');
            }
        }
    }

    handleFormSubmit(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Add loading state
        const submitBtn = form.querySelector('.btn-enviar');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Here you would normally send the data to your API
            console.log('Form data:', data);
            
            // Show success message
            this.showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
            
            // Reset form
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Remove validation classes
            form.querySelectorAll('input, textarea').forEach(input => {
                input.classList.remove('valid', 'invalid');
            });
            
        }, 2000);
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
                <p>${message}</p>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.2);
            z-index: 3000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            this.removeNotification(notification);
        }, 5000);
        
        // Manual close
        notification.querySelector('.notification-close').addEventListener('click', () => {
            this.removeNotification(notification);
        });
    }

    removeNotification(notification) {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    // Form submission
    handleFormSubmit(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Add loading state
        const submitBtn = form.querySelector('.btn-enviar');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Here you would normally send the data to your API
            console.log('Form data:', data);
            
            // Show success message
            this.showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
            
            // Reset form
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Remove validation classes
            form.querySelectorAll('input, textarea').forEach(input => {
                input.classList.remove('valid', 'invalid');
            });
            
        }, 2000);
    }
}

// Additional utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new GlipearteApp();
    
    // Add loading animation
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="loading-spinner">
            <div class="spinner"></div>
            <p>Carregando...</p>
        </div>
    `;
    
    loadingOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255,255,255,0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(loadingOverlay);
    
    // Remove loading overlay after page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                if (loadingOverlay.parentNode) {
                    loadingOverlay.parentNode.removeChild(loadingOverlay);
                }
            }, 300);
        }, 500);
    });
});

// Add modal styles
const modalStyles = `
    .modal-produto {
        padding: 20px 0;
    }
    
    .modal-title {
        color: var(--primary-color);
        font-size: 2rem;
        margin-bottom: 10px;
        text-align: center;
    }
    
    .modal-description {
        text-align: center;
        color: var(--text-light);
        margin-bottom: 30px;
        line-height: 1.6;
    }
    
    .modal-section {
        margin-bottom: 30px;
    }
    
    .modal-section h3 {
        color: var(--text-dark);
        font-size: 1.3rem;
        margin-bottom: 15px;
        border-bottom: 2px solid var(--secondary-color);
        padding-bottom: 5px;
    }
    
    .modal-list {
        list-style: none;
        padding: 0;
    }
    
    .modal-list li {
        padding: 8px 0;
        border-bottom: 1px solid #eee;
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .modal-list i {
        color: var(--secondary-color);
        font-size: 1.1rem;
    }
    
    .modal-cores {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }
    
    .cor-tag {
        background: var(--accent-color);
        color: var(--text-dark);
        padding: 5px 12px;
        border-radius: 20px;
        font-size: 0.9rem;
        font-weight: 500;
    }
    
    .modal-pacotes {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
        margin-top: 20px;
    }
    
    .pacote-card {
        background: var(--light-color);
        padding: 20px;
        border-radius: 12px;
        text-align: center;
        transition: all 0.3s ease;
        border: 2px solid transparent;
    }
    
    .pacote-card:hover {
        border-color: var(--primary-color);
        transform: translateY(-5px);
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
    }
    
    .pacote-card h4 {
        color: var(--text-dark);
        font-size: 1.2rem;
        margin-bottom: 10px;
    }
    
    .pacote-preco {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--primary-color);
        margin-bottom: 5px;
    }
    
    .pacote-itens {
        color: var(--text-light);
        margin-bottom: 20px;
    }
    
    .btn-selecionar {
        background: var(--gradient-primary);
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 25px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s ease;
        width: 100%;
    }
    
    .btn-selecionar:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(255, 107, 107, 0.4);
    }
    
    .modal-actions {
        text-align: center;
        margin-top: 30px;
    }
    
    .btn-fechar-modal {
        background: var(--text-light);
        color: white;
        border: none;
        padding: 12px 30px;
        border-radius: 25px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s ease;
    }
    
    .btn-fechar-modal:hover {
        background: var(--dark-color);
        transform: translateY(-2px);
    }
    
    .form-group.focused {
        transform: translateY(-2px);
    }
    
    .form-group input.valid {
        border-color: var(--secondary-color);
        background-color: rgba(78, 205, 196, 0.1);
    }
    
    .form-group input.invalid {
        border-color: var(--primary-color);
        background-color: rgba(255, 107, 107, 0.1);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        margin-left: auto;
    }
    
    .loading-spinner {
        text-align: center;
    }
    
    .spinner {
        width: 50px;
        height: 50px;
        border: 5px solid #f3f3f3;
        border-top: 5px solid var(--primary-color);
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 20px;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .loading-spinner p {
        color: var(--text-light);
        font-size: 1.1rem;
    }
`;

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = modalStyles;
document.head.appendChild(styleSheet);