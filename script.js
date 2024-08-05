function handleKeyDown(event) {
    const searchButton = document.querySelector("button");

    if (event.key === "Enter") {
        searchButton.classList.add("hover-effect");
        generateLink();
        event.preventDefault();
    }
}

function copyText() {
    const text = document.getElementById("resultLink").innerText;
    navigator.clipboard.writeText(text).then(() => {
        const notification = document.getElementById("notification");
        notification.className = "show";
        setTimeout(() => {
            notification.className = notification.className.replace("show", "");
        }, 3000);
    }).catch(err => {
        console.error("Could not copy text: ", err);
    });
}

function generateLink() {
    const link = document.getElementById("link").value;

    if (link !== "") {
        let directLink;
        if (link.includes("drive.google.com")) {
            const downloadLink = "https://drive.google.com/uc?export=download&id=";
            const linkID = link.slice(link.indexOf("/d/") + 3, link.indexOf("/view"));
            directLink = downloadLink.concat(linkID);
        } else {
            directLink = link.concat("&download=1"); // OneDrive Link
        }

        showLink(directLink);
        copyText();
    } else {
        console.error("Link is empty. Please provide a valid link.");
        refresh();
    }
}

function showLink(directLink) {
    refresh();
    document.getElementById("resultLink").innerText = directLink;
    document.getElementById("result").style.display = "block";
}

function refresh() {
    document.getElementById("resultLink").innerText = "";
    document.getElementById("result").style.display = "none";
}