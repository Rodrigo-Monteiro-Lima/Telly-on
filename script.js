const fetchMovie = async () => {
  const response = await fetch(
    'https://api.themoviedb.org/3/trending/all/day?api_key=afc625c17b8cef39a65e1f1fda778860&language=pt-BR'
  );
  const data = await response.json();
  const randomMovie = Math.floor(Math.random() * 20);
  const name =
    data.results[randomMovie].title !== undefined
      ? data.results[randomMovie].title
      : data.results[randomMovie].name;
  document.querySelector(
    '#full-page'
  ).style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(https://image.tmdb.org/t/p/original${data.results[randomMovie].backdrop_path})`;
  document.querySelector('#show-name').innerHTML = name;
};

fetchMovie();

const release = new Date(
  new Date().setDate(new Date().getDate() + 90)
).getTime();

const updateTimer = () => {
  const today = new Date().getTime();
  const dif = release - today;
  let days = Math.floor(dif / (1000 * 60 * 60 * 24));
  days = days < 10 ? `0${days}` : days;
  let hours = Math.floor((dif % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  hours = hours < 10 ? `0${hours}` : hours;
  let mins = Math.floor((dif % (1000 * 60 * 60)) / (1000 * 60));
  mins = mins < 10 ? `0${mins}` : mins;
  let seconds = Math.floor((dif % (1000 * 60)) / 1000);
  seconds = seconds < 10 ? `0${seconds}` : seconds;
  document.querySelector('#time-left').innerHTML = `
    <ul>
        <li>
          <span class="time-num">${days}</span>
          <span class="time-txt">dias</span>
         </li>
         <li>
          <span class="time-num">${hours}</span>
          <span class="time-txt">horas</span>
         </li>
         <li>
          <span class="time-num">${mins}</span>
          <span class="time-txt">minutos</span>
         </li>
         <li>
          <span class="time-num">${seconds}</span>
          <span class="time-txt">segundos</span>
         </li>
    </ul>
  `;
  if (dif < 0) {
    clearInterval(updateTimer);
    document.querySelector('#time-left').innerHTML = 'Tempo finalizado!';
  }
};

setInterval(updateTimer, 1000);
time - left;
