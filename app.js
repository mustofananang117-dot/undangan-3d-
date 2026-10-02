function initGuestData() {
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('to') || "Tamu Undangan";
    const guestCategory = urlParams.get('seat') || "Reguler";

    document.getElementById("guest-name-display").textContent = guestName;
    document.getElementById("guest-badge").textContent = `Kategori: ${guestCategory}`;
    document.getElementById("rsvp-name").value = guestName;

    // Generate Kode QR Unik
    if (window.QRCode) {
        new QRCode(document.getElementById("qrcode-access"), {
            text: `GUEST:${guestName}|CAT:${guestCategory}`,
            width: 140,
            height: 140,
            colorDark : "#1e1b4b",
            colorLight : "#ffffff"
        });
    }
}

function openInvitation() {
    document.getElementById("cover-gate").style.display = "none";
    document.getElementById("main-content").classList.remove("hidden");
    const audio = document.getElementById("bgm");
    if(audio) audio.play();
}

async function submitRSVP(event) {
    event.preventDefault();
    const data = {
        name: document.getElementById("rsvp-name").value,
        status: document.getElementById("rsvp-status").value,
        pax: document.getElementById("rsvp-pax").value,
        message: document.getElementById("rsvp-message").value
    };

    alert(`Terima kasih ${data.name}, konfirmasi Anda (${data.status}) telah terkirim!`);
}

window.addEventListener('DOMContentLoaded', initGuestData);


