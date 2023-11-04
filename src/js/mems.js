const imageInput = document.getElementById('imageInput');
const canvas = document.getElementById('memCanvas');
const ctx = canvas.getContext('2d');
const topText = document.getElementById('topText');
const bottomText = document.getElementById('bottomText');
const fontText = document.getElementById('font');
const color = document.getElementById('color');
const italic = document.getElementById('italic');
const textAlignLeft = document.getElementById('textAlignLeft');
const textAlignCenter = document.getElementById('textAlignCenter');
const textAlignRight = document.getElementById('textAlignRight');
const bold = document.getElementById('bold');
const fontSize = document.getElementById('fontSize');
const topTextY = document.getElementById('topTextY');
const bottomTextY = document.getElementById('bottomTextY');
const generateMemeBtn = document.getElementById('generateMeme');
const download = document.getElementById('download');

let image = new Image();
let italicBoolean = false
let boldBoolean = false
let underlineBoolean = false
let textAlignFont = 'left'
let canvasTextPosition = 0


if (textAlignFont === "left") {
  textAlignLeft.className = 'active'
  textAlignCenter.className = ''
  textAlignRight.className = ''
} else if (textAlignFont === "right") {
  textAlignLeft.className = ''
  textAlignCenter.className = ''
  textAlignRight.className = 'active'
} else {
  textAlignLeft.className = ''
  textAlignCenter.className = 'active'
  textAlignRight.className = ''
}

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
  const fontBoldValue = boldBoolean ? "bold" : "normal"
  const fontItalicValue = italicBoolean ? "italic" : 'normal'
  const textAlign = textAlignFont
  const canvasText = canvasTextPosition
  ctx.fillStyle = textColorValue;
  ctx.font = `${fontItalicValue} ${fontBoldValue} ${fontSizeValue} ${fontTextValue}`;
  ctx.textAlign = textAlign;

  const topTextYValue = parseInt(topTextY.value);
  const bottomTextYValue = parseInt(bottomTextY.value);

  ctx.fillText(topTextValue, canvasText, topTextYValue);
  ctx.fillText(bottomTextValue, canvasText, bottomTextYValue);
}

// Обновление холста при изменении элементов управления
topText.addEventListener('input', updateCanvas);
bottomText.addEventListener('input', updateCanvas);
color.addEventListener('input', updateCanvas);
fontSize.addEventListener('input', updateCanvas);
topTextY.addEventListener('input', updateCanvas);
bottomTextY.addEventListener('input', updateCanvas);
fontText.addEventListener("input", updateCanvas)
italic.addEventListener("click", () => {
  if (italicBoolean) {
    italicBoolean = false
    italic.className = ''
    return updateCanvas()
  }
  if (!italicBoolean) {
    italicBoolean = true
    italic.className = 'active'
    return updateCanvas()
  }
})

bold.addEventListener("click", () => {
  if (boldBoolean) {
    boldBoolean = false
    bold.className = ''
    return updateCanvas()
  }
  if (!boldBoolean) {
    boldBoolean = true
    bold.className = 'active'
    return updateCanvas()
  }
})

textAlignCenter.addEventListener("click", () => {
  textAlignFont = 'center'
  canvasTextPosition = canvas.width / 2
  textAlignCenter.className = 'active'
  textAlignLeft.className = ''
  textAlignRight.className = ''
  return updateCanvas()
})
textAlignLeft.addEventListener("click", () => {
  textAlignFont = 'left'
  canvasTextPosition = 0
  textAlignLeft.className = 'active'
  textAlignCenter.className = ''
  textAlignRight.className = ''
  return updateCanvas()
})
textAlignRight.addEventListener("click", () => {
  textAlignFont = 'right'
  canvasTextPosition = canvas.width
  textAlignRight.className = 'active'
  textAlignCenter.className = ''
  textAlignLeft.className = ''
  return updateCanvas()
})
// bold.addEventListener("click", () =>{
//   updateCanvas(null,'bold')
// })

// font.addEventListener('input', updateCanvas);


generateMemeBtn.addEventListener('click', () => {
  // Создание мема и скачивание
  const memeDataURL = canvas.toDataURL('image/png');
  download.href = memeDataURL;
  download.download = 'meme.png';
  download.style.display = 'inline';
});
