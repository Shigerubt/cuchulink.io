const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];

class Star {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 1.1;
    this.color = `hsl(${Math.random() * 360}, 80%, 70%)`;
    this.dx = Math.random() * 0.6 - 0.3;
    this.dy = Math.random() * 0.6 - 0.3;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;

    // Reciclar estrella
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
    }
  }
}

function init() {
  for (let i = 0; i < 500; i++) {
    stars.push(new Star());
  }
  animate();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  ctx.save();
  ctx.globalAlpha = 0.8;
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
  
  stars.forEach(star => {
    star.update();
    star.draw();
  });
  
  requestAnimationFrame(animate);
}

// Inicializar animación
init();

const centralImage = document.querySelector('#central-image');
const clickSound = document.querySelector('#click-sound'); // Referencia al sonido de clic
const explosionSound = document.querySelector('#explosion-sound'); // Referencia al sonido de explosión
let clickCount = 0;
let imageSize = parseFloat(getComputedStyle(centralImage).getPropertyValue('--image-size'));

// Asegurarse de que el tamaño inicial sea correcto
centralImage.style.width = `${imageSize}px`;
centralImage.style.height = `${imageSize}px`;

centralImage.addEventListener('click', () => {
  clickCount++;
  clickSound.play(); // Reproducir sonido al hacer clic
  let newSize = imageSize * (1 + clickCount * 0.2);
  centralImage.style.width = `${newSize}px`;
  centralImage.style.height = `${newSize}px`;

  if (clickCount >= 6) {
    explosionSound.play(); // Reproducir sonido de explosión
    centralImage.style.animation = "explode 1s forwards";
    setTimeout(() => {
      document.body.style.transition = "opacity 1s";
      document.body.style.opacity = 0;
      setTimeout(() => {
        window.location.href = 'Landing Page/main.html'; // Redirigir a la página principal después de la "explosión"
      }, 1000);
    }, 1000); // Esperar a que la animación de explosión termine
  }
});

// Rotación aleatoria suave
function randomRotation() {
  const randomDegree = (Math.random() - 0.5) * 20;  // Genera un valor entre -10 y 10 grados
  centralImage.style.transform = `rotate(${randomDegree}deg)`;
  
  setTimeout(randomRotation, 4000);  // Reiniciar la rotación cada 4 segundos
}

// Iniciar la rotación aleatoria
randomRotation();
