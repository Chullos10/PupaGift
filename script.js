const images = ['IMG_E4471.JPG', 'IMG_E4472.JPG', 'IMG_E4473.JPG']; // Ajoute plus d’images ici
let gridSize = 3;
let pieces = [];
let container = document.getElementById('puzzleContainer');

function startPuzzle() {
  gridSize = parseInt(document.getElementById('gridSize').value);
  const totalPieces = gridSize * gridSize;
  const selectedImage = images[Math.floor(Math.random() * images.length)];

  container.innerHTML = '';
  container.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

  pieces = [];

  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      const index = y * gridSize + x;

      const piece = document.createElement('div');
      piece.className = 'piece';
      piece.setAttribute('data-index', index);
      piece.draggable = true;

      piece.style.backgroundImage = `url(images/${selectedImage})`;
      piece.style.backgroundSize = `${gridSize * 100}% ${gridSize * 100}%`;
      piece.style.backgroundPosition = `${(x * 100) / (gridSize - 1)}% ${
        (y * 100) / (gridSize - 1)
      }%`;

      pieces.push(piece);
    }
  }

  shuffleArray(pieces);

  pieces.forEach(p => container.appendChild(p));

  addDragAndDrop();
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function addDragAndDrop() {
  let dragged;

  pieces.forEach(piece => {
    piece.addEventListener('dragstart', e => {
      dragged = piece;
    });

    piece.addEventListener('dragover', e => {
      e.preventDefault();
    });

    piece.addEventListener('drop', e => {
      e.preventDefault();
      if (dragged !== piece) {
        const temp = document.createElement('div');
        container.insertBefore(temp, piece);
        container.insertBefore(piece, dragged);
        container.insertBefore(dragged, temp);
        container.removeChild(temp);
        checkVictory();
      }
    });
  });
}

function checkVictory() {
  const currentPieces = Array.from(container.children);
  const isCorrect = currentPieces.every((piece, index) => {
    return parseInt(piece.getAttribute('data-index')) === index;
  });

  if (isCorrect) {
    setTimeout(() => {
      alert('Bravo ! lo lograste jajaja 🎉');
    }, 100);
    setTimeout(() => {
      window.location.reload();
    }, 110);
  }
}
