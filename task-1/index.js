const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {
  return (seconds) => {
    let currTime = seconds;

    const calculateTimeFormat = () => {
      const ss = currTime < 60 ? currTime : currTime % 60;
      const mm = (currTime >= 60 && currTime < 3600) ? ~~(currTime / 60) :
        currTime > 3600 ? (~~(currTime / 60)) % 60 : 0;
      const hh = currTime < 3600 ? 0 : ~~(currTime / 3600);

      const getTimeFormat = time => time <= 9 ? `0${time}` : time;
      return `${getTimeFormat(hh)}:${getTimeFormat(mm)}:${getTimeFormat(ss)}`;
    }

    const timer = () => {
      if (currTime > 0) {
        currTime -= 1;
        timerEl.textContent = calculateTimeFormat();
      }
    }

    timerEl.textContent = calculateTimeFormat();
    const interval = setInterval(timer, 1000);
    inputEl.addEventListener('input', () => clearInterval(interval));
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', () => {
  // Очистите input так, чтобы в значении
  // оставались только числа
  inputEl.value = inputEl.value.replace(/\D/, '');
});

buttonEl.addEventListener('click', () => {
  const seconds = Number(inputEl.value);

  animateTimer(seconds);

  inputEl.value = '';
});
