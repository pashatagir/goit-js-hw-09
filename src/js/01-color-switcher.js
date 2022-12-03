const refs = {
  body: document.querySelector('body'),
  btnStart: document.querySelector('[data-start]'),
  btnStop: document.querySelector('[data-stop]'),
};

let timerId = null;
let isActive = false;

refs.btnStart.addEventListener('click', onChangeColorBody);
refs.btnStop.addEventListener('click', onStopChangeColorBody);

function onChangeColorBody() {
  if (isActive) {
    return;
  }
  isActive = true;
  timerId = setInterval(
    () => (refs.body.style.backgroundColor = getRandomHexColor()),
    1000
  );
}

function onStopChangeColorBody() {
  clearInterval(timerId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
