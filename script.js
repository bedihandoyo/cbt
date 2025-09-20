// Data pertanyaan ujian dengan 5 opsi jawaban
const questions = [
    {
        question: "Apa ibu kota Indonesia?",
        options: ["Bandung", "Surabaya", "Jakarta", "Medan", "Yogyakarta"],
        correctAnswer: "Jakarta"
    },
    {
        question: "Siapa presiden pertama Indonesia?",
        options: ["Soeharto", "Soekarno", "Jokowi", "Megawati", "B.J. Habibie"],
        correctAnswer: "Soekarno"
    },
    {
        question: "Berapa hasil dari 7 * 8?",
        options: ["54", "64", "56", "49", "42"],
        correctAnswer: "56"
    },
    {
        question: "Dimana letak Candi Borobudur?",
        options: ["Jawa Timur", "Bali", "Sumatera Utara", "Jawa Tengah", "Lombok"],
        correctAnswer: "Jawa Tengah"
    },
    {
        question: "Apa singkatan dari HTML?",
        options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language"],
        correctAnswer: "Hyper Text Markup Language"
    }
];

// Dapatkan elemen-elemen HTML yang dibutuhkan
const loginScreen = document.getElementById('login-screen');
const loginForm = document.getElementById('login-form');
const studentNameInput = document.getElementById('student-name');
const studentClassInput = document.getElementById('student-class');
const examTokenInput = document.getElementById('exam-token');
const quizScreen = document.getElementById('quiz-screen');
const questionNumberElement = document.getElementById('question-number');
const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options-container');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const resultScreen = document.getElementById('result-screen');
const restartButton = document.getElementById('restart-button');
const namaPesertaQuiz = document.getElementById('nama-peserta-quiz');
const kelasPesertaQuiz = document.getElementById('kelas-peserta-quiz');

let currentQuestionIndex = 0;
let studentAnswers = [];
const correctAnswers = questions.map(q => q.correctAnswer);

// Fungsi untuk menampilkan pertanyaan
function showQuestion() {
    const questionData = questions[currentQuestionIndex];
    questionNumberElement.textContent = `Soal ${currentQuestionIndex + 1} dari ${questions.length}`;
    questionElement.textContent = questionData.question;
    optionsContainer.innerHTML = '';
    
    questionData.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-button');
        
        // Cek apakah jawaban sudah dipilih sebelumnya
        if (studentAnswers[currentQuestionIndex] === option) {
            button.classList.add('selected');
        }

        button.addEventListener('click', () => {
            // Hapus kelas 'selected' dari semua tombol opsi
            document.querySelectorAll('.option-button').forEach(btn => {
                btn.classList.remove('selected');
            });
            // Tambahkan kelas 'selected' ke tombol yang diklik
            button.classList.add('selected');
            studentAnswers[currentQuestionIndex] = option;
        });
        optionsContainer.appendChild(button);
    });

    // Atur tombol navigasi
    prevButton.style.display = currentQuestionIndex === 0 ? 'none' : 'inline-block';
    nextButton.textContent = currentQuestionIndex === questions.length - 1 ? 'Selesai' : 'Selanjutnya';
}

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const enteredToken = examTokenInput.value;
    const currentToken = localStorage.getItem('examToken') || "SMA1CIJERUK";

    if (enteredToken === currentToken) {
        loginScreen.style.display = 'none';
        quizScreen.style.display = 'block';
        
        namaPesertaQuiz.textContent = studentNameInput.value;
        kelasPesertaQuiz.textContent = studentClassInput.value;

        showQuestion();
    } else {
        alert("Token ujian salah. Silakan coba lagi.");
    }
});

nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {
        submitQuiz();
    }
});

prevButton.addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion();
    }
});

function submitQuiz() {
    let score = 0;
    for (let i = 0; i < questions.length; i++) {
        if (studentAnswers[i] === correctAnswers[i]) {
            score++;
        }
    }
    
    const studentResult = {
        name: studentNameInput.value,
        class: studentClassInput.value,
        score: score,
        total: questions.length
    };

    // Kirim data ke server backend
    fetch('https://cbt.up.railway.app/api/save-result', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentResult),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Hasil berhasil disimpan di server:', data);
        alert('Ujian selesai! Hasil Anda telah tersimpan.');
    })
    .catch((error) => {
        console.error('Terjadi kesalahan saat menyimpan hasil:', error);
        alert('Gagal menyimpan hasil. Silakan hubungi admin.');
    });

    quizScreen.style.display = 'none';
    resultScreen.style.display = 'block';
}

restartButton.addEventListener('click', () => {
    window.location.reload();
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

// Panggil fungsi untuk memperbarui waktu setiap detik
setInterval(updateTime, 1000);