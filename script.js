// För öppning och stängning av sidomenyn
function toggleMenu() {
    const menu = document.getElementById("sideMenu");
    if (menu.style.left === "0px") {
        menu.style.left = "-250px"; // Dölj menyn
        overlay.style.display = "none"; // Dölj överlägget
    } else {
        menu.style.left = "0px"; // Visa menyn
        overlay.style.display = "block"; // Visa överlägget
    }
}

// För stängning av sidomenyn
function hideMenu(menu) {
    if (menu.style.left === "0px") {
        menu.style.left = "-250px"; // Dölj menyn
        overlay.style.display = "none"; // Dölj överlägget
    }
}

function toggleForm() {
    const form = document.getElementById('osa_form');
    const button = document.getElementById('osa_button');
    form.classList.toggle('open'); // Lägg till/ta bort klassen "open"
    button.classList.toggle('open'); // Lägg till/ta bort klassen "open"
    button.style.opacity = "0"; 

    const s_form = document.getElementById('spex_form');
    const s_button = document.getElementById('spex_button');
    s_form.classList.toggle('open'); // Lägg till/ta bort klassen "open"
    s_button.classList.toggle('open'); // Lägg till/ta bort klassen "open"
    s_button.style.opacity = "0"; 
}

// Kör när sidan har laddats
window.addEventListener("load", function () {
    const preloader = document.getElementById("preloader");
    const content = document.getElementById("body");

    // Lägg till en fade-out-klass
    this.setTimeout(() => {
        preloader.style.opacity = "0";
        preloader.style.transition = "opacity 1.0s ease";

        // Vänta tills animationen är klar och ta bort preloader
        setTimeout(() => {
            preloader.style.display = "none";
            content.style.display = "block"; // Visa huvudinnehållet
        }, 500); // Matchar fade-tiden
    }, 500)
});

// För att stänga sidomenyn när användaren klickar utanför menyn
document.addEventListener("click", function (event) {
    const menu = document.getElementById("sideMenu");
    const button = document.querySelector(".menu-button");

    if (!menu.contains(event.target) && !button.contains(event.target)) {
        hideMenu(menu);
    }
});
