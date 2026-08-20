// =========================================
// GPSoftware - Contact Form
// =========================================


// ---------- Get Form ----------

const contactForm =
    document.getElementById("contact-form");

const formStatus =
    document.getElementById("form-status");


// ---------- Form Submission ----------

contactForm.addEventListener("submit", function (event) {

    event.preventDefault();


    // Get form values

    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const message =
        document.getElementById("message").value.trim();


    // ---------- Validation ----------

    if (name === "") {

        formStatus.textContent =
            "Please enter your name.";

        return;

    }


    if (email === "" && phone === "") {

        formStatus.textContent =
            "Please provide an email address or phone number.";

        return;

    }


    if (message === "") {

        formStatus.textContent =
            "Please enter a message.";

        return;

    }


    // ---------- Send To Backend ----------

    formStatus.textContent =
        "Sending message...";


    fetch("/api/contact", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            name: name,
            email: email,
            phone: phone,
            message: message

        })

    })

    .then(response => {

        if (!response.ok) {

            throw new Error(
                "Failed to send message."
            );

        }

        return response.json();

    })

    .then(data => {

        formStatus.textContent =
            "Your message has been sent successfully.";

        contactForm.reset();

    })

    .catch(error => {

        console.error(
            "Contact form error:",
            error
        );

        formStatus.textContent =
            "Sorry, there was a problem sending your message.";

    });

});