const whislistApiURL = "https://sheetdb.io/api/v1/qb88clf5emd60"
let cachedItems = [];
let currentItemId = null;

// Hämta alla items från databasen
async function loadItems() {
    const response = await fetch(whislistApiURL);
    cachedItems = await response.json();

    const list = document.getElementById("whishlist");
    list.innerHTML = "";

    const validItems = cachedItems.filter(item => item.name && item.quantity > 0);

    validItems.forEach(item => {
        const listItem = document.createElement("div");
        listItem.className = "item";
        listItem.innerHTML = `
            <p class="ocentrerad_text">
            ${item.name} - Antal: ${item.quantity}
            </p>
            <button class="reserve-button" onclick="openPopup(${item.id})">
            Reservera ${item.name}
            </button><br><br>
        `;
        list.appendChild(listItem);
    });
}

// Reservera ett item
async function reserveItem() {

    const item = cachedItems.find(i => i.id == currentItemId);
    if (!item) {
        alert("Reserveringsfel: Objektet kunde inte hittas.");
        return;
    }

    const quantity = parseInt(document.getElementById("reservationQuantity").value, 10);
    const reserver_name = document.getElementById("reserver_name").value.toString();

    if (quantity <= 0) {
        alert("Reservera ett giltigt antal!")
        window.location.reload();
        return;
    }

    if (item.quantity > 0 && item.quantity >= quantity) {
        const updatedQuantity = item.quantity - quantity;

        await fetch(`${whislistApiURL}/id/${currentItemId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                data: {
                    quantity: updatedQuantity,
                }
            })
        });

        console.log(reserver_name);

        await fetch(`${whislistApiURL}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                    data: {
                        person_id: reserver_name,
                        item_id: item.id,
                        item_name: item.name,
                        reserved_quantity: quantity,
                        date_reservation_id: new Date().toISOString()
                    }
                }
            )
        });

        closePopupAndOverlay();
        alert("Du har reserverat " + quantity + " " + item.name);
        window.location.reload();
    } else {
        alert("Hoppsan! Du försöker reservera fler " + item.name + " än paret har önskat sig.");
        window.location.reload();
    }
}

async function openPopup(itemID) {
    currentItemId = itemID;

    const item = cachedItems.find(i => i.id == itemID);
    if (!item) {
        alert("Popupfel: Föremålet " + item.name + " kunde inte laddas. Försök igen eller kontakta Liam.");
        return;
    }

    const overlay = document.getElementById("overlay");
    overlay.style.display = "block";

    const popup = document.getElementById("popup");
    popup.style.display = "Block";
    popup.style.transition = "opacity 0.2 ease"
    popup.style.opacity = "100";
    popup.innerHTML = ""
    popup.innerHTML = `
            <button class="close" onclick="closePopupAndOverlay()"><strong>×</strong></button>
            <p>Reservera ${item.name}</p>
            <br>
            <p class="ocentrerad_text">Ange hur många du vill reservera:</p>
            <br>
            <input id="reservationQuantity" type="number" min="1" max="${item.quantity}"placeholder="Antal" required>
            <br>
            <br>
            <p class="ocentrerad_text">Skriv ditt namn så att du kan ändra din resreverade mängd om du ångrar dig 
            (Brudparet ser inte ditt namn eller vad du ressreverar):</p>
            <br>
            <input id="reserver_name" type="text" placeholder="För och efternamn" required>
            <br>
            <br>
            <button class="send-button" onclick="reserveItem()">Reservera</button>
        `;
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
    currentItemId = null;
}

function closePopupAndOverlay() {
    document.getElementById("popup").style.display = "none";
    document.getElementById("overlay").style.display = "none";
    currentItemId = null;
}

// För öppning och stängning av sidomenyn
function toggleMenu() {
    const overlay = document.getElementById("overlay");
    const menu = document.getElementById("sideMenu");

    if (menu.style.left === "0px") {
        overlay.style.display = "none";
        menu.style.left = "-250px";
    } else {
        menu.style.left = "0px";
        overlay.style.display = "block";
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
    const overlay = document.getElementById("overlay");

    if (menu.style.left === "0px") {
        menu.style.left = "-250px"; // Dölj menyn
        overlay.style.display = "none"; // Dölj överlägget
        spinButton();
    }
}

function toggleWishlist() {
    loadItems();

    const whishlist = document.getElementById("whishlist_section");
    const button = document.getElementById("whishlist_button")

    button.style.opacity = "0";
    button.style.transition = "opacity 0.2 ease";
    button.classList.toggle('open');

    setTimeout(() => {
        button.display = "none";
        whishlist.classList.toggle('open');
    }, 200);
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

document.addEventListener("click", function (event) {
    const button = document.querySelector(".menu-button");
    const popup = document.getElementById("popup");
    const overlay = document.getElementById("overlay");
    const menu = document.getElementById("sideMenu");

    if (!popup.contains(event.target) && overlay.style.display === "none") {
        closePopup();
        if (!button.contains(event.target)) {
            overlay.style.display = "none";
        }
    } else if (!popup.contains(event.target) && overlay.contains(event.target)) {
        closePopup();
        overlay.style.display = "none";
    } else if (button.contains(event.target)) {
        closePopup();
    }

});

async function hashString(str) {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

