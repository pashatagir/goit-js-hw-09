import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  btnStart: document.querySelector('[data-start]'),
  btnReset: document.querySelector('[data-reset]'),
  input: document.querySelector('#datetime-picker'),
  outputDays: document.querySelector('[data-days]'),
  outputHours: document.querySelector('[data-hours]'),
  outputMinutes: document.querySelector('[data-minutes]'),
  outputSeconds: document.querySelector('[data-seconds]'),
};

const DELAY_INTERVAL = 1000;
let intervalId = null;
let selectedTimeInMs = null;
let objectTime = {};
const initOutputTextContent = ({
  days = '0',
  hours = '0',
  minutes = '0',
  seconds = '0',
}) => {
  refs.outputDays.textContent = addLeadingZero(days);
  refs.outputHours.textContent = addLeadingZero(hours);
  refs.outputMinutes.textContent = addLeadingZero(minutes);
  refs.outputSeconds.textContent = addLeadingZero(seconds);
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  parseDate: true,
  onClose: function (selectedDates) {
    if (selectedDates[0] <= new Date()) {
      // alert('Оберіь дату або час в майбутньому!');
      Notify.failure('Choose a date or time in the future!');
      refs.btnStart.setAttribute('disabled', true);
    } else {
      refs.btnStart.removeAttribute('disabled');
      selectedTimeInMs = Date.parse(selectedDates) - Date.now();
      objectTime = convertMs(selectedTimeInMs);
      // if we want to immediately see the date in the output
      initOutputTextContent(objectTime);
    }
  },
};

flatpickr(refs.input, options);

refs.btnStart.addEventListener('click', onClickBtnStart);
refs.btnReset.addEventListener('click', onClickBtnReset);

function onClickBtnStart(selectedDates) {
  refs.btnStart.setAttribute('disabled', true);
  refs.input.setAttribute('disabled', true);
  intervalId = setInterval(() => {
    if (selectedTimeInMs <= 0) {
      refs.btnStart.removeAttribute('disabled');
      refs.input.removeAttribute('disabled');
      clearInterval(intervalId);
      return;
    }
    objectTime = convertMs(selectedTimeInMs);
    initOutputTextContent(objectTime);
    selectedTimeInMs -= DELAY_INTERVAL;
  }, DELAY_INTERVAL);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function onClickBtnReset() {
  clearInterval(intervalId);
  initOutputTextContent({});
  refs.input.removeAttribute('disabled');
  options.defaultDate = new Date();
  flatpickr(refs.input, options);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
