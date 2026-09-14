// =========================================
// GPSoftware - Product Page JavaScript
// =========================================


const informationDialog =
    document.getElementById("information-dialog");

const dialogTitle =
    document.getElementById("dialog-title");

const updateContent =
    document.getElementById("update-content");

const closeDialogButton =
    document.querySelector(".dialog-close");

function closeInformationDialog() {

    if (informationDialog.open) {
        informationDialog.close();
    }

}


document.querySelectorAll(".information-link").forEach(link => {

    link.addEventListener("click", function (event) {

        event.preventDefault();

        const version = link.dataset.version;
        const updatePage = link.dataset.updatePage;

        dialogTitle.textContent = `${version} information`;
        updateContent.src = updatePage;
        updateContent.title = `${version} update information`;
        informationDialog.showModal();

    });

});


closeDialogButton.addEventListener("click", closeInformationDialog);


informationDialog.addEventListener("click", function (event) {

    if (event.target === informationDialog) {
        closeInformationDialog();
    }

});