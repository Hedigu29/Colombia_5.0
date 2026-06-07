document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. SISTEMA NATIVO DE PESTAÑAS (TABS)
    // ==========================================
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');

            // Remover estados activos previos
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));

            // Activar pestaña e interfaz correspondiente
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
            
            // Auto-scroll suave hacia arriba al cambiar de panel
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // ==========================================
    // 2. MOTOR DE TRADUCCIÓN DINÁMICA (ES / EN)
    // ==========================================
    const langToggleBtn = document.getElementById('lang-toggle');
    let currentLang = 'es'; // Estado por defecto

    langToggleBtn.addEventListener('click', () => {
        // Alternar bandera de idioma
        currentLang = (currentLang === 'es') ? 'en' : 'es';

        // Buscar todos los elementos con soporte bilingüe
        const translatableElements = document.querySelectorAll('[data-es], [data-en]');

        translatableElements.forEach(element => {
            if (currentLang === 'en') {
                const textEn = element.getAttribute('data-en');
                if (textEn) {
                    // Si es un nodo de texto plano, se cambia directamente
                    if (element.children.length === 0) {
                        element.textContent = textEn;
                    } else {
                        // Si contiene etiquetas internas (como strong), manejamos HTML
                        element.innerHTML = textEn;
                    }
                }
            } else {
                const textEs = element.getAttribute('data-es');
                if (textEs) {
                    if (element.children.length === 0) {
                        element.textContent = textEs;
                    } else {
                        element.innerHTML = textEs;
                    }
                }
            }
        });

        // Actualizar el atributo de idioma global en el HTML
        document.documentElement.lang = currentLang;
    });
});