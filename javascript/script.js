document.addEventListener('DOMContentLoaded', () => {
    // --- Gerenciamento do Header Sticky ---
    const header = document.getElementById('header');
    const placeholder = document.getElementById('header-placeholder');

    function stickyHeader() {
        if (window.scrollY > 0) {
            header.classList.add("sticky");
            placeholder.classList.add("active");
        } else {
            header.classList.remove("sticky");
            placeholder.classList.remove("active");
        }
    }

    window.addEventListener('scroll', stickyHeader, { passive: true });
    stickyHeader();

    // --- Slideshow Automático com Dots ---
    let slideIndex = 0;
    let slideTimeoutId = null;

    function showSlides() {
        const slides = document.getElementsByClassName("mySlides");
        const dots = document.getElementsByClassName("dot");

        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
            slides[i].classList.remove('active');
        }
        slideIndex++;
        if (slideIndex > slides.length) { slideIndex = 1; }

        for (let i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }

        if (slides[slideIndex - 1]) {
            slides[slideIndex - 1].style.display = "block";
            slides[slideIndex - 1].classList.add('active');
        }
        if (dots[slideIndex - 1]) dots[slideIndex - 1].className += " active";

        // limpa timeout anterior para evitar acumular múltiplos timers se necessário
        if (slideTimeoutId) clearTimeout(slideTimeoutId);
        slideTimeoutId = setTimeout(showSlides, 5000);
    }

    window.currentSlide = (n) => {
        slideIndex = n - 1;
        showSlides();
    };
    showSlides();

    // --- Animação de digitação por linha (mais performática) ---
    const typingElements = document.querySelectorAll('.typing-text');

    const observer = new IntersectionObserver(entries => {
        let delay = 0;
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
                const textElement = entry.target;

                setTimeout(() => {
                    textElement.classList.add('is-visible');
                    textElement.setAttribute('data-animated', 'true');
                }, delay);

                // Aumenta o atraso para a próxima linha
                delay += 350; // Atraso de 350ms entre cada linha
            }
        });
    }, {
        threshold: 0.8 // Inicia a animação quando 80% do elemento estiver visível
    });

    typingElements.forEach(el => observer.observe(el));


    // --- Funcionalidade de Tradução (NOVO) ---
    
    // Objeto com todas as traduções
    const translations = {
        'pt': {
            'header-title': 'Kassiane Lins dos Santos',
            'header-subtitle': 'Psicóloga Clínica - CRP 15/6551',
            'slide-text-1': 'Nenhum sofrimento é pequeno demais para não ser escutado.',
            'slide-text-2': 'Todo sujeito merece um espaço para dizer de si.',
            'slide-text-3': 'Na fala, cada um pode encontrar novos caminhos para viver.',
            'about-title': 'Sobre Mim',
            'about-text-1': 'Oi, que bom te ter aqui!',
            'about-text-2': 'Deixa eu me apresentar para que você me conheça um pouquinho melhor:',
            'about-text-3': 'Eu tenho 27 anos, sou de Maceió - Alagoas, formada em Psicologia pelo Centro Universitário de Maceió (2021), com capacitação em Saúde Mental pela FAVENI e atualmente pós-graduanda em Psicologia Clínica pela PUC-RS.',
            'about-text-4': 'Amo estudar Psicanálise e ler, desde romances a poesias. Também amo ouvir jazz e o mar. Estar na natureza nos ajuda a nos conectar com nós mesmos, não é poético?',
            'about-text-5': 'Já morei por um tempo na Argentina e trago comigo uma alma viajante, apaixonada por conhecer novas culturas e lugares.',
            'about-text-6-content': 'Meus atendimentos acontecem apenas on-line para qualquer lugar do Brasil e do mundo. Ah, em português e <em>en español</em>',
            'about-text-7': 'Vamos começar?',
            'about-text-8': 'Mas antes, leia um pouquinho sobre a minha abordagem, minha linha teórica e o meu trabalho clínico. ⤵️',
            'approach-title': 'Minha Abordagem',
            'approach-text-1': 'Dedico-me ao atendimento clínico de adultos, oferecendo um espaço de escuta que considera a singularidade de cada sujeito. Entendo que todo sofrimento merece ser acolhido e que, muitas vezes, é nos detalhes do que se diz que se revelam sentidos importantes sobre a vida de cada uno.',
            'approach-text-2': 'A psicanálise parte da ideia de que o inconsciente se manifesta na fala, nos sintomas e nos impasses que encontramos ao longo da vida. Meu trabalho é acompanhar o sujeito nesse percurso, possibilitando que encontre novas formas de se implicar em sua história e de lidar com aquilo que o faz sofrer.',
            'services-title': 'Serviços',
            'service-item-1': 'Sessões Online',
            'service-item-2': 'Aconselhamento Psicológico',
            'service-item-3': 'Psicoterapia individual para adultos',
            'contact-title': 'Contato',
            'contact-instagram': ' @kassianelinspsi',
            'footer-text': '"Cuidar de si é acolher o que insiste em ser dito."',
        },
        'es': {
            'header-title': 'Kassiane Lins dos Santos',
            'header-subtitle': 'Psicóloga Clínica - CRP 15/6551',
            'slide-text-1': 'Ningún sufrimiento es demasiado pequeño para no ser escuchado.',
            'slide-text-2': 'Todo sujeto merece un espacio para hablar de sí mismo.',
            'slide-text-3': 'Al hablar, cada uno puede encontrar nuevos caminos para vivir.',
            'about-title': 'Sobre Mí',
            'about-text-1': '¡Hola, qué bueno tenerte aquí!',
            'about-text-2': 'Permíteme presentarte para que me conozcas un poco mejor:',
            'about-text-3': 'Tengo 27 años, soy de Maceió - Alagoas, graduada en Psicología por el Centro Universitario de Maceió (2021), con capacitación en Salud Mental por FAVENI y actualmente posgraduada en Psicología Clínica por la PUC-RS.',
            'about-text-4': 'Me encanta estudiar Psicoanálisis y leer, desde novelas hasta poesías. También me encanta escuchar jazz y el mar. Estar en la naturaleza nos ayuda a conectar con nosotros mismos, ¿no es poético?',
            'about-text-5': 'Ya viví un tiempo en Argentina y traigo conmigo un alma viajera, apasionada por conocer nuevas culturas y lugares.',
            'about-text-6-content': 'Mis consultas son solo en línea para cualquier lugar de Brasil y del mundo. Ah, en portugués y en español',
            'about-text-7': '¿Empezamos?',
            'about-text-8': 'Pero antes, lee un poco sobre mi enfoque, mi línea teórica y mi trabajo clínico. ⤵️',
            'approach-title': 'Mi Enfoque',
            'approach-text-1': 'Me dedico a la atención clínica de adultos, ofreciendo un espacio de escucha que considera la singularidad de cada sujeto. Entiendo que todo sufrimiento merece ser acogido y que, a menudo, es en los detalles de lo que se dice que se revelan sentidos importantes sobre la vida de cada uno.',
            'approach-text-2': 'El psicoanálisis parte de la idea de que el inconsciente se manifiesta en el habla, en los síntomas y en los impasses que encontramos a lo largo de la vida. Mi trabajo es acompañar al sujeto en este recorrido, posibilitando que encuentre nuevas formas de implicarse en su historia y de lidiar con aquello que lo hace sufrir.',
            'services-title': 'Servicios',
            'service-item-1': 'Sesiones Online',
            'service-item-2': 'Asesoramiento Psicológico',
            'service-item-3': 'Psicoterapia individual para adultos',
            'contact-title': 'Contacto',
            'contact-instagram': ' @kassianelinspsi',
            'footer-text': '"Cuidar de uno mismo es acoger lo que insiste en ser dicho."',
        }
    };

    const langButtons = document.querySelectorAll('.lang-icon');

    // Função que aplica as traduções
    function setLanguage(lang) {
        document.documentElement.lang = lang; // Define o atributo 'lang' do HTML
        const elementsToTranslate = document.querySelectorAll('[data-key]');
        
        elementsToTranslate.forEach(el => {
            const key = el.getAttribute('data-key');
            if (translations[lang] && translations[lang][key]) {
                if (key === 'contact-instagram' || key === 'about-text-6') {
                    // Não altera o conteúdo do link ou do container
                } else {
                    el.innerHTML = translations[lang][key];
                }
            }
        });
    }

    // Adiciona o evento de clique a todos os botões de idioma
    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.id.replace('lang-', ''); // Extrai 'pt' ou 'es' do ID
            setLanguage(lang);
        });
    });

    // Inicia a tradução para o idioma padrão (pt) ao carregar a página
    setLanguage('pt');
});