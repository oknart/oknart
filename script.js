const words = [
    { english: "APPLE", turkish: "Elma" },
    { english: "BOOK", turkish: "Kitap" },
    { english: "CAR", turkish: "Araba" },
    { english: "DOG", turkish: "Köpek" },
    { english: "FISH", turkish: "Balık" },
    { english: "HOUSE", turkish: "Ev" },
    { english: "SCHOOL", turkish: "Okul" },
    { english: "TABLE", turkish: "Masa" },
    { english: "WATER", turkish: "Su" },
    { english: "FAMILY", turkish: "Aile" }
];

let currentWordIndex = 0;
const lettersContainer = document.getElementById("lettersContainer");
const targetWordElement = document.querySelector("#targetWord span");
const messageElement = document.getElementById("message");
const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");
const nextButton = document.getElementById("nextButton");

let currentLetterIndex = 0; // Doğru harfin sırası

function loadWord() {
    const currentWord = words[currentWordIndex];
    targetWordElement.textContent = currentWord.turkish; // Türkçe kelimeyi göster
    lettersContainer.innerHTML = ''; // Önceki harfleri temizle
    createLetters(currentWord.english); // Yeni kelimenin harflerini oluştur
    messageElement.textContent = ''; // Mesajı temizle
    nextButton.style.display = 'none'; // Sonraki butonu gizle
    currentLetterIndex = 0; // Doğru harf sırasını sıfırla
}

function createLetters(targetWord) {
    const letters = targetWord.split("").sort(() => 0.5 - Math.random());
    letters.forEach(letter => {
        const letterDiv = document.createElement("div");
        letterDiv.textContent = letter;
        letterDiv.className = "letter";
        letterDiv.addEventListener("click", () => selectLetter(letterDiv, letter));
        lettersContainer.appendChild(letterDiv);
    });
}

function selectLetter(letterDiv, letter) {
    const currentWord = words[currentWordIndex].english;

    if (letterDiv.classList.contains("found")) return; // Zaten bulunduysa tekrar seçme

    // Doğru harf mi?
    if (letter === currentWord[currentLetterIndex]) {
        letterDiv.classList.add("found");
        correctSound.play();
        currentLetterIndex++; // Sıradaki harfe geç

        // Doğru kelimeyi kontrol et
        checkWord(currentWord);
    } else {
        letterDiv.classList.add("wrong"); // Yanlış harfi işaretle
        wrongSound.play();
    }
}

function checkWord(currentWord) {
    if (currentLetterIndex === currentWord.length) {
        messageElement.textContent = `Tebrikler! '${currentWord}' kelimesini buldunuz.`;
        nextButton.style.display = 'block'; // Sonraki butonu göster
    }
}

nextButton.addEventListener("click", () => {
    currentWordIndex++;
    if (currentWordIndex < words.length) {
        loadWord();
    } else {
        messageElement.textContent = "Tüm kelimeleri buldunuz! Oyun bitti.";
        nextButton.style.display = 'none'; // Sonraki butonu gizle
        lettersContainer.innerHTML = ''; // Harfleri temizle
        targetWordElement.textContent = ''; // Hedef kelimeyi temizle
    }
});

// Oyun başlat
loadWord();
