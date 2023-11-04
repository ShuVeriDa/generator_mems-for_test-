const imageInput = document.getElementById('imageInput');
const canvas = document.getElementById('memCanvas');
const ctx = canvas.getContext('2d');
const topText = document.getElementById('topText');
const bottomText = document.getElementById('bottomText');
const fontText = document.getElementById('font');
const color = document.getElementById('color');
const fontSize = document.getElementById('fontSize');
const topTextY = document.getElementById('topTextY');
const bottomTextY = document.getElementById('bottomTextY');
const generateMemeBtn = document.getElementById('generateMeme');
const download = document.getElementById('download');

let image = new Image();

imageInput.addEventListener('change', () => {
  const file = imageInput.files[0];
  if (file) {
    const imgURL = URL.createObjectURL(file);
    image.src = imgURL;
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);
      document.getElementById('canvas').style.display = 'flex';
      document.getElementById('memCanvas').style.display = 'block';
    };
  }
});

function updateCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, 0, 0);

  const topTextValue = topText.value;
  const bottomTextValue = bottomText.value;
  const textColorValue = color.value;
  const fontSizeValue = `${fontSize.value}px`;
  const fontTextValue = fontText.value

  ctx.fillStyle = textColorValue;
  ctx.font = `bold ${fontSizeValue} ${fontTextValue}`;
  ctx.textAlign = 'center';

  const topTextYValue = parseInt(topTextY.value);
  const bottomTextYValue = parseInt(bottomTextY.value);

  ctx.fillText(topTextValue, canvas.width / 2, topTextYValue);
  ctx.fillText(bottomTextValue, canvas.width / 2, bottomTextYValue);
}

// Обновление холста при изменении элементов управления
topText.addEventListener('input', updateCanvas);
bottomText.addEventListener('input', updateCanvas);
color.addEventListener('input', updateCanvas);
fontSize.addEventListener('input', updateCanvas);
topTextY.addEventListener('input', updateCanvas);
bottomTextY.addEventListener('input', updateCanvas);
fontText.addEventListener("input", updateCanvas)
// font.addEventListener('input', updateCanvas);


generateMemeBtn.addEventListener('click', () => {
  // Создание мема и скачивание
  const memeDataURL = canvas.toDataURL('image/png');
  download.href = memeDataURL;
  download.download = 'meme.png';
  download.style.display = 'inline';
});
