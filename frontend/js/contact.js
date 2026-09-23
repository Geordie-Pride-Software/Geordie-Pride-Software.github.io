// =========================================
// GPSoftware - Contact Form
// =========================================


// ---------- Get Form ----------

const contactForm =
    document.getElementById("contact-form");

const formStatus =
    document.getElementById("form-status");

const emailJsConfig = {
    publicKey: "uZ0pviwdceKx3zayY",
    serviceId: "service_7r3jj06",
    templateId: "template_izlvx8j"
};

const emailJsConfigured =
    !Object.values(emailJsConfig).some(value => value.startsWith("YOUR_"));

if (emailJsConfigured) {

    emailjs.init({
        publicKey: emailJsConfig.publicKey
    });

}


// ---------- Form Submission ----------

contactForm.addEventListener("submit", async function (event) {

    event.preventDefault();


    // Get form values

    const name =
        document.getElementById("name").value.trim();

    const contact =
        document.getElementById("contact").value.trim();

    const message =
        document.getElementById("message").value.trim();


    // ---------- Validation ----------

    if (name === "") {

        formStatus.textContent =
            "Please enter your name.";

        return;

    }


    if (contact === "") {

        formStatus.textContent =
            "Please provide an email address or phone number.";

        return;

    }


    if (message === "") {

        formStatus.textContent =
            "Please enter a message.";

        return;

    }


    if (!emailJsConfigured) {

        formStatus.textContent =
            "Email service setup is incomplete. Please try again later.";

        return;

    }


    // ---------- Send With EmailJS ----------

    formStatus.textContent =
        "Sending message...";

    const submitButton =
        document.getElementById("contact-submit-button");

    submitButton.disabled = true;

    const subject =
        `Website contact from ${name}`;

    try {

        await emailjs.send(
            emailJsConfig.serviceId,
            emailJsConfig.templateId,
            {
                from_name: name,
                reply_to: contact,
                contact: contact,
                subject: subject,
                message: message
            }
        );

        formStatus.textContent =
            "Your message has been sent successfully.";

        contactForm.reset();

    } catch (error) {

        console.error("EmailJS contact form error:", error);

        formStatus.textContent =
            "Sorry, your message could not be sent. Please try again.";

    } finally {

        submitButton.disabled = false;

    }

});