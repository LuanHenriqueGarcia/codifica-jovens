const menuIcon = document.getElementById('menu-icon');
const navbar = document.querySelector('.navbar');

if (menuIcon && navbar) {
    menuIcon.addEventListener('click', () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        menuIcon.setAttribute('aria-expanded', navbar.classList.contains('active'));
    });

    const navLinks = document.querySelectorAll('.navbar a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuIcon.classList.remove('bx-x');
            navbar.classList.remove('active');
            document.body.classList.remove('menu-open');
            menuIcon.setAttribute('aria-expanded', 'false');
        });
    });

    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && !menuIcon.contains(e.target)) {
            menuIcon.classList.remove('bx-x');
            navbar.classList.remove('active');
            document.body.classList.remove('menu-open');
            menuIcon.setAttribute('aria-expanded', 'false');
        }
    });
}

const header = document.querySelector('.header');
if (header) {
    window.addEventListener('scroll', () => {
        header.classList.toggle('sticky', window.scrollY > 100);
    });
}

const sections = document.querySelectorAll('section');
const navLinksScroll = document.querySelectorAll('.navbar a');
if (sections.length && navLinksScroll.length) {
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinksScroll.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

const nextBtn = document.getElementById('next-btn');
if (nextBtn) {
    const professores = [
        {
            genero: 'Professora',
            nome: 'Eduarda',
            imagem: 'img/image.png',
            materias: 'Realidade virtual, Robótica e IA'
        },
        {
            genero: 'Professor',
            nome: 'Cleber',
            imagem: 'img/image1.png',
            materias: 'Word e Excel'
        }
    ];

    let professorIndex = 0;

    nextBtn.addEventListener('click', () => {
        professorIndex = (professorIndex + 1) % professores.length;
        const professor = professores[professorIndex];

        const generoEl = document.getElementById('professor-genero');
        const nomeEl = document.getElementById('professor-name');
        const imagemEl = document.getElementById('content-image');
        const materiasEl = document.getElementById('content-text');

        const aboutSection = document.querySelector('.about');
        aboutSection.style.opacity = '0';
        aboutSection.style.transform = 'translateY(20px)';

        setTimeout(() => {
            if (generoEl) generoEl.textContent = professor.genero;
            if (nomeEl) nomeEl.textContent = professor.nome;
            if (imagemEl) {
                imagemEl.src = professor.imagem;
                imagemEl.alt = `Foto do ${professor.genero.toLowerCase()} ${professor.nome}`;
            }
            if (materiasEl) materiasEl.textContent = professor.materias;

            aboutSection.style.opacity = '1';
            aboutSection.style.transform = 'translateY(0)';
        }, 300);
    });
}
