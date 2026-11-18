
// Find alle billedbokse på siden
const galleries = document.querySelectorAll(".billed-boks");

// Find lightbox-elementerne
const lightbox = document.getElementById("lightbox");
const galleryImage = document.getElementById("galleryImage");
const imageCounter = document.getElementById("imageCounter");

const closeGallery = document.getElementById("closeGallery");
const prevImage = document.getElementById("prevImage");
const nextImage = document.getElementById("nextImage");

// Aktuelt galleri og billede
let currentGallery = [];
let currentImage = 0;

// Åbn det valgte projekts galleri
galleries.forEach(gallery => {
    const images = Array.from(gallery.querySelectorAll("img"));
    const imageSources = images.map(img => img.src);

    if (images.length > 0) {
        images[0].addEventListener("click", () => {
            currentGallery = imageSources;
            currentImage = 0;

            lightbox.style.display = "flex";
            showImage();
        });
    }
});

// Vis aktuelt billede
function showImage() {
    if (currentGallery.length === 0) return;

    galleryImage.src = currentGallery[currentImage];

    imageCounter.textContent =
        `${currentImage + 1} / ${currentGallery.length}`;

    // Vis kun pile, hvis der er flere billeder
    prevImage.style.display =
        currentGallery.length > 1 ? "block" : "none";

    nextImage.style.display =
        currentGallery.length > 1 ? "block" : "none";
}

// Skift billede
function changeImage(direction) {
    if (currentGallery.length <= 1) return;

    currentImage += direction;

    if (currentImage >= currentGallery.length) {
        currentImage = 0;
    }

    if (currentImage < 0) {
        currentImage = currentGallery.length - 1;
    }

    showImage();
}

// Luk galleri
function closeLightbox() {
    lightbox.style.display = "none";
}

closeGallery.addEventListener("click", closeLightbox);

prevImage.addEventListener("click", () => {
    changeImage(-1);
});

nextImage.addEventListener("click", () => {
    changeImage(1);
});

// Luk ved klik på den mørke baggrund
lightbox.addEventListener("click", event => {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

// Tastaturfunktioner
document.addEventListener("keydown", event => {
    if (lightbox.style.display === "flex") {
        if (event.key === "Escape") {
            closeLightbox();
        }

        if (event.key === "ArrowRight") {
            changeImage(1);
        }

        if (event.key === "ArrowLeft") {
            changeImage(-1);
        }
    }
});
