let gridSize = 10;
let words = [];
let wordGrid = [];
let foundWords = new Set();

// Fungsi untuk membuat puzzle di halaman Admin
function generatePuzzle() {
    gridSize = parseInt(document.getElementById("gridSize").value);
    words = document.getElementById("wordList").value.toUpperCase().split(',').map(word => word.trim());

    if (words.length > 0 && gridSize > 0) {
        createGrid();
        Swal.fire({
            icon: 'success',
            title: 'Puzzle Berhasil Dibuat',
            text: 'Permainan siap dimainkan.',
            confirmButtonText: 'Mainkan Puzzle'
        }).then(() => {
            sessionStorage.setItem("gridSize", gridSize);
            sessionStorage.setItem("words", JSON.stringify(words));
            sessionStorage.setItem("wordGrid", JSON.stringify(wordGrid));
            window.location.href = "main.html";
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Kesalahan',
            text: 'Silakan masukkan lebar kotak dan kata yang dicari.',
        });
    }
}

// Fungsi untuk membuat grid puzzle
function createGrid() {
    wordGrid = Array.from({ length: gridSize }, () => Array(gridSize).fill(''));
    words.forEach(word => placeWord(word));
    fillEmptyCells();
}

// Fungsi untuk meletakkan kata di grid
function placeWord(word) {
    const directions = [
        [1, 0],
        [0, 1],
        [1, 1]
    ];
    const [dx, dy] = directions[Math.floor(Math.random() * directions.length)];
    let x, y, validPosition;

    do {
        x = Math.floor(Math.random() * gridSize);
        y = Math.floor(Math.random() * gridSize);
        validPosition = true;

        for (let i = 0; i < word.length; i++) {
            const nx = x + i * dx;
            const ny = y + i * dy;
            if (nx >= gridSize || ny >= gridSize || (wordGrid[nx][ny] && wordGrid[nx][ny] !== word[i])) {
                validPosition = false;
                break;
            }
        }
    } while (!validPosition);

    for (let i = 0; i < word.length; i++) {
        wordGrid[x + i * dx][y + i * dy] = word[i];
    }
}

// Fungsi untuk mengisi cell kosong dengan huruf acak
function fillEmptyCells() {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (!wordGrid[i][j]) {
                wordGrid[i][j] = alphabet[Math.floor(Math.random() * alphabet.length)];
            }
        }
    }
}

// Fungsi untuk inisialisasi grid puzzle di halaman
function initializePuzzle() {
    gridSize = parseInt(sessionStorage.getItem("gridSize"));
    words = JSON.parse(sessionStorage.getItem("words"));
    wordGrid = JSON.parse(sessionStorage.getItem("wordGrid"));

    const gridElement = document.getElementById("grid");
    gridElement.style.gridTemplateColumns = `repeat(${gridSize}, 30px)`;

    wordGrid.forEach((row, i) => {
        row.forEach((cell, j) => {
            const cellElement = document.createElement("div");
            cellElement.classList.add("cell");
            cellElement.textContent = cell;
            cellElement.dataset.row = i;
            cellElement.dataset.col = j;
            gridElement.appendChild(cellElement);
        });
    });
}

// Fungsi untuk memeriksa kata yang dimasukkan
function checkWord() {
    const inputWord = document.getElementById("wordInput").value.toUpperCase().trim();
    if (words.includes(inputWord) && !foundWords.has(inputWord)) {
        foundWords.add(inputWord);
        highlightWord(inputWord);
        document.getElementById("wordInput").value = '';

        // Cek apakah semua kata telah ditemukan
        if (foundWords.size === words.length) {
            document.getElementById("newGameButton").style.display = "block";
        }
    }
}

// Fungsi untuk menyoroti kata yang ditemukan
function highlightWord(word) {
    const directions = [
        [1, 0],
        [0, 1],
        [1, 1]
    ];

    for (let x = 0; x < gridSize; x++) {
        for (let y = 0; y < gridSize; y++) {
            for (const [dx, dy] of directions) {
                let found = true;

                for (let i = 0; i < word.length; i++) {
                    const nx = x + i * dx;
                    const ny = y + i * dy;
                    if (nx >= gridSize || ny >= gridSize || wordGrid[nx][ny] !== word[i]) {
                        found = false;
                        break;
                    }
                }

                if (found) {
                    for (let i = 0; i < word.length; i++) {
                        const nx = x + i * dx;
                        const ny = y + i * dy;
                        const cell = document.querySelector(`.cell[data-row='${nx}'][data-col='${ny}']`);
                        cell.classList.add("highlight");
                    }
                    return;
                }
            }
        }
    }
}

// Fungsi untuk memulai game baru
function startNewGame() {
    window.location.href = "index.html";
}