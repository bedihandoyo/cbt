// server.js

// 1. Impor modul yang dibutuhkan
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Mengizinkan permintaan dari domain berbeda
const app = express();
const PORT = process.env.PORT || 3000; // Server akan berjalan di port 3000

// 2. Middleware
app.use(cors()); // Mengizinkan semua permintaan cross-origin
app.use(bodyParser.json()); // Mengizinkan server menerima data JSON

// 3. Database "sementara" di memori server
let examResults = [];

// 4. API untuk menyimpan hasil ujian
app.post('/api/save-result', (req, res) => {
    const newResult = req.body;
    if (newResult && newResult.name && newResult.score !== undefined) {
        examResults.push(newResult);
        console.log('Hasil ujian baru disimpan:', newResult);
        res.status(200).json({ message: 'Result saved successfully!' });
    } else {
        res.status(400).json({ message: 'Invalid data provided.' });
    }
});

// 5. API untuk mengambil semua hasil ujian
app.get('/api/results', (req, res) => {
    res.status(200).json(examResults);
});

// 6. Jalankan server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});