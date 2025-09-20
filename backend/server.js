const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

let examResults = [];

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

app.get('/api/results', (req, res) => {
    res.status(200).json(examResults);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});