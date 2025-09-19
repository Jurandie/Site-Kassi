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

    // --- Nova Animação de digitação por linha (mais performática) ---
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
});