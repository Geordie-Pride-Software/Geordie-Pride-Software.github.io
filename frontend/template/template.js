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
        initialiseDropdowns();

    })

    .catch(error => {

        console.error(
            "GPSoftware template error:",
            error
        );

    });

// =========================================
// Dropdown Menus
// =========================================

function initialiseDropdowns() {

    const dropdowns =
        document.querySelectorAll(".dropdown");

    if (!dropdowns.length) {
        return;
    }

    function closeDropdown(dropdown) {

        const button =
            dropdown.querySelector(".dropdown-button");

        const content =
            dropdown.querySelector(".dropdown-content");

        if (!button || !content) {
            return;
        }

        content.classList.remove("show");
        button.setAttribute("aria-expanded", "false");

    }

    function closeAllDropdowns(except = null) {

        dropdowns.forEach(dropdown => {

            if (dropdown !== except) {
                closeDropdown(dropdown);
            }

        });

    }

    dropdowns.forEach(dropdown => {

        const button =
            dropdown.querySelector(".dropdown-button");

        const content =
            dropdown.querySelector(".dropdown-content");

        if (!button || !content) {
            return;
        }

        button.addEventListener("click", function () {

            const isOpen =
                content.classList.contains("show");

            closeAllDropdowns();

            if (!isOpen) {
                content.classList.add("show");
                button.setAttribute("aria-expanded", "true");
            }

        });

    });

    document.addEventListener("click", function (event) {

        if (!event.target.closest(".dropdown")) {
            closeAllDropdowns();
        }

    });

}

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
            menuButton.classList.toggle("active");


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