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
    spinButton();
}

function spinButton() {
    const button = document.getElementById("m_button");

    button.style.backgroundColor = "transparent";
    button.style.animation = "spin 0.3s";

    button.addEventListener("animationend", () => {
        button.style.animation = "";
        button.style.backgroundColor = "white";
    }, { once: true });
}

// För stängning av sidomenyn
function hideMenu(menu) {
    if (menu.style.left === "0px") {
        menu.style.left = "-250px"; // Dölj menyn
        overlay.style.display = "none"; // Dölj överlägget
        spinButton();
    }
}

function toggleForm(int) {
    if (int == 1) {
        const form = document.getElementById('osa_form');
        const button = document.getElementById('osa_button');

        button.style.opacity = "0";
        button.style.transition = "opacity 0.2s ease";
        button.classList.toggle('open');
        setTimeout(() => {
            button.display = "none";
            form.classList.toggle('open'); // Lägg till/ta bort klassen "open"
        }, 200);

    } else {
        const s_form = document.getElementById('spex_form');
        const s_button = document.getElementById('spex_button');

        s_button.style.opacity = "0";
        s_button.style.transition = "opacity 0.2s ease";
        s_button.classList.toggle('open');
        setTimeout(() => {
            s_button.style.display = "none";
            s_form.classList.toggle('open'); // Lägg till/ta bort klassen "open"
        }, 200);
    }
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
