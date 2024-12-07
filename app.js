// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAJ8vxOZ6Gx7N0cfidTPuS2EkDHS5R4PXQ",
    authDomain: "linkabsen-bb38f.firebaseapp.com",
    projectId: "linkabsen-bb38f",
    storageBucket: "linkabsen-bb38f.firebasestorage.app",
    messagingSenderId: "909980411728",
    appId: "1:909980411728:web:b2d154a57310561fa1ae55"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);

// Get elements
const absenButton = document.getElementById("absenButton");
const namaDropdown = document.getElementById("nama");
const statusDropdown = document.getElementById("status");
const hariDropdown = document.getElementById("hari");
const absensiList = document.getElementById("absensiList");

// Function to add data to Firebase
function addAbsensi(nama, status, hari) {
    const lokasi = `https://www.google.com/maps?q=Your+Location`; // Replace with actual location logic
    db.collection("absensi").add({
        nama: nama,
        status: status,
        hari: hari,
        lokasi: lokasi,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        console.log("Absensi ditambahkan!");
        loadAbsensi();
    }).catch((error) => {
        console.error("Error adding document: ", error);
    });
}

// Function to load data from Firebase
function loadAbsensi() {
    db.collection("absensi").orderBy("timestamp", "desc").get()
    .then((querySnapshot) => {
        absensiList.innerHTML = "<h2>Daftar Absensi</h2>";
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const div = document.createElement("div");
            div.classList.add("absensiItem");
            div.innerHTML = `
                <p><strong>${data.nama}</strong> - ${data.status} (${data.hari} Hari)</p>
                <a href="${data.lokasi}" target="_blank">Lihat Lokasi</a>
            `;
            absensiList.appendChild(div);
        });
    });
}

// Add event listener to the absen button
absenButton.addEventListener("click", () => {
    const nama = namaDropdown.value;
    const status = statusDropdown.value;
    const hari = hariDropdown.value;
    
    // Add absensi data to Firestore
    addAbsensi(nama, status, hari);
});

// Initial load of absensi data
loadAbsensi();
