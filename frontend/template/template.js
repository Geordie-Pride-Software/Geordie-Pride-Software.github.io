// =========================================
// GPSoftware - Template JavaScript
// =========================================


// ---------- Load Template ----------

const templateScript = document.currentScript;
const templateUrl = new URL("template.html", templateScript.src);

fetch(templateUrl)

    .then(response => {

        if (!response.ok) {
            throw new Error(
                "Could not load template.html: " +
                response.status
            );
        }

        return response.text();

    })

    .then(template => {

        // Create a temporary container
        const container = document.createElement("div");

        container.innerHTML = template;


        // Find header and footer
        const header =
            container.querySelector(".site-header");

        const footer =
            container.querySelector(".site-footer");


        // Find the placeholders
        const headerContainer =
            document.getElementById("template-header");

        const footerContainer =
            document.getElementById("template-footer");


        // Insert header
        if (header && headerContainer) {

            headerContainer.appendChild(header);

        }


        // Insert footer
        if (footer && footerContainer) {

            footerContainer.appendChild(footer);

        }


        // Start menu
        initialiseMenu();

    })

    .catch(error => {

        console.error(
            "GPSoftware template error:",
            error
        );

    });


// =========================================
// Mobile Menu
// =========================================

function initialiseMenu() {

    const menuButton =
        document.getElementById("menu-button");

    const navigation =
        document.getElementById("site-nav");


    if (!menuButton || !navigation) {
        return;
    }


    menuButton.addEventListener(
        "click",
        function () {

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

        }
    );

}