document.addEventListener("DOMContentLoaded", () => {
    // Función para el suavizado de scroll
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const targetId = link.getAttribute("href");
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                window.scroll({
                    top: targetSection.offsetTop - 70, // Ajusta el desplazamiento para la altura del encabezado
                    left: 0,
                    behavior: "smooth"
                });
            }
        });
    });

    // Animación de las secciones al hacer scroll
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(section => {
        observer.observe(section);
    });
});
