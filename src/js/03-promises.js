import { Notify } from 'notiflix/build/notiflix-notify-aio';
const refs = {
  formEl: document.querySelector('.form'),
  delayInputEl: document.querySelector('[name="delay"]'),
  stepInputEl: document.querySelector('[name="step"]'),
  amountInputEl: document.querySelector('[name="amount"]'),
};

refs.formEl.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  let delay = Number(refs.delayInputEl.value);
  let step = Number(refs.stepInputEl.value);
  let amount = Number(refs.amountInputEl.value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise({ position: i, delay: delay })
      .then(result => Notify.success(result))
      .catch(error => Notify.failure(error));
    delay += step;
  }
  setTimeout(() => {
    refs.formEl.reset();
  }, delay);
}

function createPromise({ position, delay }) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}
