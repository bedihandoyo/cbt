<<<<<<< HEAD
document.addEventListener('DOMContentLoaded', (event) => {
    const tokenElement = document.getElementById('current-token');
    const tableBody = document.querySelector('#results-table tbody');
    const regenerateButton = document.getElementById('regenerate-token');

    // Dapatkan token saat ini dari localStorage
    let currentToken = localStorage.getItem('examToken') || "SMA1CIJERUK";
    tokenElement.textContent = currentToken;

    // Fungsi untuk menampilkan hasil ujian
    function displayResults() {
        tableBody.innerHTML = ''; // Kosongkan tabel
        
        // Ambil data dari server backend
        fetch('http://localhost:3000/api/results')
        .then(response => response.json())
        .then(results => {
            if (results.length === 0) {
                const row = tableBody.insertRow();
                const cell = row.insertCell(0);
                cell.colSpan = 3;
                cell.textContent = "Belum ada hasil ujian.";
            } else {
                results.forEach(result => {
                    const row = tableBody.insertRow();
                    row.innerHTML = `
                        <td>${result.name}</td>
                        <td>${result.class}</td>
                        <td>${result.score}/${result.total}</td>
                    `;
                });
            }
        })
        .catch((error) => {
            console.error('Terjadi kesalahan:', error);
            const row = tableBody.insertRow();
            const cell = row.insertCell(0);
            cell.colSpan = 3;
            cell.textContent = "Gagal mengambil data dari server. Pastikan server berjalan.";
        });
    }

    // Fungsi untuk membuat token baru secara acak
    function generateNewToken() {
        return Math.random().toString(36).substring(2, 8).toUpperCase();
    }

    // Tambahkan event listener untuk tombol "Refresh Token"
    regenerateButton.addEventListener('click', () => {
        const newToken = generateNewToken();
        currentToken = newToken;
        localStorage.setItem('examToken', currentToken);
        tokenElement.textContent = currentToken;
        alert('Token berhasil diperbarui!');
    });

    // Fungsi untuk memperbarui waktu di footer
    function updateTime() {
        const timeElement = document.getElementById('current-time');
        if (timeElement) {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            timeElement.textContent = `${hours}:${minutes}:${seconds}`;
        }
    }

    // Panggil fungsi untuk menampilkan hasil saat halaman dimuat
    displayResults();
    
    // Perbarui waktu setiap detik
    setInterval(updateTime, 1000);
=======
document.addEventListener('DOMContentLoaded', (event) => {
    const tokenElement = document.getElementById('current-token');
    const tableBody = document.querySelector('#results-table tbody');
    const regenerateButton = document.getElementById('regenerate-token');

    // Dapatkan token saat ini dari localStorage
    let currentToken = localStorage.getItem('examToken') || "SMA1CIJERUK";
    tokenElement.textContent = currentToken;

    // Fungsi untuk menampilkan hasil ujian
    function displayResults() {
        tableBody.innerHTML = ''; // Kosongkan tabel
        
        // Ambil data dari server backend
        fetch('http://localhost:3000/api/results')
        .then(response => response.json())
        .then(results => {
            if (results.length === 0) {
                const row = tableBody.insertRow();
                const cell = row.insertCell(0);
                cell.colSpan = 3;
                cell.textContent = "Belum ada hasil ujian.";
            } else {
                results.forEach(result => {
                    const row = tableBody.insertRow();
                    row.innerHTML = `
                        <td>${result.name}</td>
                        <td>${result.class}</td>
                        <td>${result.score}/${result.total}</td>
                    `;
                });
            }
        })
        .catch((error) => {
            console.error('Terjadi kesalahan:', error);
            const row = tableBody.insertRow();
            const cell = row.insertCell(0);
            cell.colSpan = 3;
            cell.textContent = "Gagal mengambil data dari server. Pastikan server berjalan.";
        });
    }

    // Fungsi untuk membuat token baru secara acak
    function generateNewToken() {
        return Math.random().toString(36).substring(2, 8).toUpperCase();
    }

    // Tambahkan event listener untuk tombol "Refresh Token"
    regenerateButton.addEventListener('click', () => {
        const newToken = generateNewToken();
        currentToken = newToken;
        localStorage.setItem('examToken', currentToken);
        tokenElement.textContent = currentToken;
        alert('Token berhasil diperbarui!');
    });

    // Fungsi untuk memperbarui waktu di footer
    function updateTime() {
        const timeElement = document.getElementById('current-time');
        if (timeElement) {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            timeElement.textContent = `${hours}:${minutes}:${seconds}`;
        }
    }

    // Panggil fungsi untuk menampilkan hasil saat halaman dimuat
    displayResults();
    
    // Perbarui waktu setiap detik
    setInterval(updateTime, 1000);
>>>>>>> c51e1214e355fddba517eeceb64325193e821bd0
});