// script.js

const container = document.getElementById('gridContainer');

function createGrid(size) {
  container.innerHTML = '';
  const squareSize = 960 / size;
  for (let i = 0; i < size * size; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.style.width = `${squareSize}px`;
    square.style.height = `${squareSize}px`;
    square.style.backgroundColor = 'rgb(255, 255, 255)';
    square.addEventListener('mouseenter', () => {
      let currentColor = square.style.backgroundColor;
      if (currentColor === 'rgb(255, 255, 255)') {
        currentColor = hexToRgb(getRandomColor());
      }

      square.style.backgroundColor = darkenColor(currentColor, 0.1);
    });
    container.appendChild(square);
  }
}

function darkenColor(color, percent) {
  const rgb = color.match(/\d+/g);
  const r = Math.floor(rgb[0] * (1 - percent));
  const g = Math.floor(rgb[1] * (1 - percent));
  const b = Math.floor(rgb[2] * (1 - percent));
  return `rgb(${r}, ${g}, ${b})`;
}

function getRandomColor() {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return `#${randomColor.padStart(6, '0')}`;
}

function hexToRgb(hex) {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgb(${r}, ${g}, ${b})`;
}

function promptForGridSize() {
  let size;
  do {
    size = prompt('Enter the number of squares per side (max 100):');
  } while (size < 1 || size > 100 || isNaN(size));
  createGrid(size);
}

const button = document.getElementById('newGridButton');
button.addEventListener('click', promptForGridSize);

createGrid(16);
