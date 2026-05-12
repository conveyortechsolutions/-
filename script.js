document.addEventListener("DOMContentLoaded", () => {

  // Active Navbar
  const links = document.querySelectorAll('.nav-link');
  links.forEach(link => {
    if (link.href === window.location.href) {
      link.classList.add('active');
    }
  });

  // Lightbox
  const images = document.querySelectorAll(".gallery-img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".close");

  if (images.length > 0 && lightbox && lightboxImg && closeBtn) {

    let isZoomed = false;

    images.forEach(img => {
      img.addEventListener("click", () => {
        lightbox.style.display = "flex";
        lightboxImg.src = img.src;

        isZoomed = false;
        lightboxImg.style.transform = "scale(1)";
        lightboxImg.style.transformOrigin = "center center";
      });
    });

    closeBtn.addEventListener("click", () => {
      lightbox.style.display = "none";
    });

    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        lightbox.style.display = "none";
      }
    });

    // Zoom
    lightboxImg.addEventListener("click", (e) => {
      e.stopPropagation();

      if (!isZoomed) {
        isZoomed = true;

        const rect = lightboxImg.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        lightboxImg.style.transformOrigin = `${x}% ${y}%`;
        lightboxImg.style.transform = "scale(2)";
      } else {
        isZoomed = false;
        lightboxImg.style.transform = "scale(1)";
      }
    });

    // Cursor follow
    lightboxImg.addEventListener("mousemove", (e) => {
      if (!isZoomed) return;

      const rect = lightboxImg.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      lightboxImg.style.transformOrigin = `${x}% ${y}%`;
    });

  }


  const track = document.querySelector(".testimonial-track");
const slides = document.querySelectorAll(".testimonial-slide");

const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let index = 0;
const totalSlides = slides.length;

function updateSlider() {
  track.style.transform = `translateX(-${index * 100}%)`;
}

// Next
nextBtn.addEventListener("click", () => {
  index = (index + 1) % totalSlides;
  updateSlider();
});

// Prev
prevBtn.addEventListener("click", () => {
  index = (index - 1 + totalSlides) % totalSlides;
  updateSlider();
});

// Auto Slide
setInterval(() => {
  index = (index + 1) % totalSlides;
  updateSlider();
}, 4000);

document.querySelector('.card').onclick = () => {
  window.location.href = "leadership.html";
};


});

// Stats Container Counting animation
const counters = document.querySelectorAll('.counter');

let started = false;

function startCounting() {
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    let count = 0;

    const speed = 50; // lower = faster

    const updateCount = () => {
      const increment = target / speed;

      if (count < target) {
        count += increment;
        counter.innerText = Math.ceil(count) + "+";
        setTimeout(updateCount, 20);
      } else {
        counter.innerText = target + "+";
      }
    };

    updateCount();
  });
}

// Trigger when section is visible
window.addEventListener('scroll', () => {
  const statsSection = document.querySelector('.stats');
  const sectionTop = statsSection.offsetTop;
  const sectionHeight = statsSection.offsetHeight;

  if (!started && window.scrollY > sectionTop - window.innerHeight + 50) {
    startCounting();
    started = true; // run only once
  }
});
