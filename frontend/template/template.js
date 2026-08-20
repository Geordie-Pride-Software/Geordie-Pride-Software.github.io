// =========================================
// GPSoftware - Template JavaScript
// =========================================


// ---------- Find Template ----------

function getTemplatePath() {

    const path = window.location.pathname;

    if (path.includes("/frontend/html/products/games/games/")) {
        return "../../../../template/template.html";
    }

    if (path.includes("/frontend/html/products/games/")) {
        return "../../../template/template.html";
    }

    if (path.includes("/frontend/html/products/software/")) {
        return "../../../template/template.html";
    }

    if (path.includes("/frontend/html/products/")) {
        return "../../template/template.html";
    }

    if (path.includes("/frontend/html/")) {
        return "../../template/template.html";
    }

    return "frontend/template/template.html";
}


// ---------- Load Template ----------

fetch(getTemplatePath())

    .then(response => {

        if (!response.ok) {
            throw new Error("Could not load template.html");
        }

        return response.text();

    })

    .then(template => {

        document
            .getElementById("template")
            .innerHTML = template;


        initialiseMenu();

    })

    .catch(error => {

        console.error("Template loading error:", error);

    });


// ---------- Mobile Menu ----------

function initialiseMenu() {

    const menuButton = document.getElementById("menu-button");
    const navigation = document.getElementById("site-nav");


    if (!menuButton || !navigation) {
        return;
    }


    menuButton.addEventListener("click", () => {

        navigation.classList.toggle("active");


        const menuOpen =
            navigation.classList.contains("active");


        menuButton.setAttribute(
            "aria-expanded",
            menuOpen
        );


        menuButton.setAttribute(
            "aria-label",
            menuOpen
                ? "Close menu"
                : "Open menu"
        );

    });

}