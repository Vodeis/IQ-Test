"use strict";
import { tests } from "./config.js";

const startBtns = document.querySelectorAll(".start");
const startNav = document.getElementById("start-test");
const root = document.querySelector(".start_page");
const headerTitle = document.querySelector(".header__title");
const detailsBtn = document.querySelector(".details_btn");
const details = document.querySelector(".details");
const footer = document.querySelector(".footer__bg");
const linkToDetails = document.getElementById("link-to-details");

let page = 0;
let percentSuccess = 0;

startBtns.forEach((elem) => elem.addEventListener("click", nextTest));
startNav.addEventListener("click", startTestWithHideNav);
detailsBtn.addEventListener("click", showDetailsToogle);
linkToDetails.addEventListener("click", linkToDetailsFunc);

function linkToDetailsFunc() {
  document.getElementById("menu__toggle").checked = false;
  document.querySelector(".details_btn svg").classList.remove("rotateSvg");
  details.classList.remove("hide");
  window.location.href = "#details";
}

function showDetailsToogle() {
  document.querySelector(".details_btn svg").classList.toggle("rotateSvg");
  details.classList.toggle("hide");
}

function startTestWithHideNav() {
  document.getElementById("menu__toggle").checked = false;
  nextTest();
}

function nextTest() {
  window.scroll(0, 0);
  if (!footer.classList.contains("hide")) footer.classList.add("hide");
  if (!details.classList.contains("hide")) details.classList.add("hide");
  if (headerTitle.classList.contains("hide"))
    headerTitle.classList.remove("hide");
  if (page < tests.length) {
    percentSuccess += 260 / (tests.length + 1);
    root.innerHTML = `
    <div class="progress_line">
      <div class="progress_line-main"></div>
      <div class="progress_line-green" style="width: ${percentSuccess}px"></div>
    </div>
    <form onsubmit="return false" id="test__form" class="test__form ${
      tests[page].layout
    }">
      <p class="test__main_text test_subtitle wrapper">${
        tests[page].question
      }</p>
      ${
        tests[page].img
          ? `<img class='img' src="${tests[page].img}" alt="img"/>`
          : ""
      }
      <div class="inputs_container wrapper">
         ${
           tests[page].layout !== "color"
             ? tests[page].answers
                 .map(
                   (answer) =>
                     `<label class="test__text__label">
                  <input type="radio" name="male" onclick="changeInputBg(event)" />
                  <p class="test__main_text">${answer}</p>
                </label>`
                 )
                 .toString()
                 .split(",")
                 .join("")
             : ""
         }
           ${
             tests[page].layout === "color"
               ? tests[page].answers
                   .map(
                     (answer) =>
                       `<input style="background: ${answer}" type="radio" name="male" onclick="(()=>{document.getElementById('btn_submit').disabled = false})()" />`
                   )
                   .toString()
                   .split(",")
                   .join("")
               : ""
           }
           </div>
    </form>
    <button
      id="btn_submit"
      form="test__form"
      class="btn-primary"
      type="submit"
      disabled
    >
      Далее
    </button>
`;
    const btnSubmit = document.getElementById("btn_submit");
    document.querySelector("input").focus();
    btnSubmit.addEventListener("click", nextTest);
    if (btnSubmit) btnSubmit.disabled = true;
    page++;
  } else if (page === tests.length) {
    root.innerHTML = `
    <div class="progress_line">
      <div class="progress_line-main"></div>
      <div class="progress_line-green" style="width: 100%"></div>
    </div>
    <p class="result__text result__text__title">Обработка результатов</p>
    <svg class="loader" width="65" height="69" viewBox="0 0 65 69" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M29.992 14.9627C34.127 14.9627 37.4791 11.6132 37.4791 7.48135C37.4791 3.34951 34.127 0 29.992 0C25.857 0 22.5049 3.34951 22.5049 7.48135C22.5049 11.6132 25.857 14.9627 29.992 14.9627Z" fill="#3BDE7C"/>
      <path d="M44.657 18.2974C48.4177 18.2974 51.4664 15.2511 51.4664 11.4933C51.4664 7.73551 48.4177 4.68921 44.657 4.68921C40.8963 4.68921 37.8477 7.73551 37.8477 11.4933C37.8477 15.2511 40.8963 18.2974 44.657 18.2974Z" fill="#3BDE7C"/>
      <path d="M55.2326 28.5432C58.6168 28.5432 61.3603 25.8019 61.3603 22.4203C61.3603 19.0387 58.6168 16.2974 55.2326 16.2974C51.8484 16.2974 49.105 19.0387 49.105 22.4203C49.105 25.8019 51.8484 28.5432 55.2326 28.5432Z" fill="#3BDE7C"/>
      <path d="M64.1271 38.084C64.609 35.1174 62.593 32.3222 59.6241 31.8407C56.6553 31.3591 53.8579 33.3736 53.376 36.3402C52.8941 39.3067 54.9101 42.1019 57.879 42.5834C60.8478 43.065 63.6452 41.0505 64.1271 38.084Z" fill="#3BDE7C"/>
      <path d="M54.2373 56.4805C56.8685 56.4805 59.0015 54.3491 59.0015 51.72C59.0015 49.0908 56.8685 46.9595 54.2373 46.9595C51.6061 46.9595 49.4731 49.0908 49.4731 51.72C49.4731 54.3491 51.6061 56.4805 54.2373 56.4805Z" fill="#3BDE7C"/>
      <path d="M42.9487 65.9935C45.2056 65.9935 47.0351 64.1654 47.0351 61.9103C47.0351 59.6552 45.2056 57.827 42.9487 57.827C40.6919 57.827 38.8623 59.6552 38.8623 61.9103C38.8623 64.1654 40.6919 65.9935 42.9487 65.9935Z" fill="#3BDE7C"/>
      <path d="M28.0419 68.3223C29.9222 68.3223 31.4466 66.7992 31.4466 64.9202C31.4466 63.0413 29.9222 61.5182 28.0419 61.5182C26.1615 61.5182 24.6372 63.0413 24.6372 64.9202C24.6372 66.7992 26.1615 68.3223 28.0419 68.3223Z" fill="#3BDE7C"/>
      <path d="M13.6785 62.643C15.1824 62.643 16.4015 61.4248 16.4015 59.9221C16.4015 58.4195 15.1824 57.2013 13.6785 57.2013C12.1747 57.2013 10.9556 58.4195 10.9556 59.9221C10.9556 61.4248 12.1747 62.643 13.6785 62.643Z" fill="#3BDE7C"/>
      <path d="M3.86886 50.3457C4.99619 50.3457 5.91008 49.4325 5.91008 48.306C5.91008 47.1795 4.99619 46.2664 3.86886 46.2664C2.74152 46.2664 1.82764 47.1795 1.82764 48.306C1.82764 49.4325 2.74152 50.3457 3.86886 50.3457Z" fill="#3BDE7C"/>
      <path d="M1.36346 34.678C2.11647 34.678 2.72692 34.068 2.72692 33.3156C2.72692 32.5632 2.11647 31.9532 1.36346 31.9532C0.610439 31.9532 0 32.5632 0 33.3156C0 34.068 0.610439 34.678 1.36346 34.678Z" fill="#3BDE7C"/>
      <path d="M6.85323 19.8222C6.71807 19.8238 6.5855 19.7852 6.47235 19.7113C6.3592 19.6374 6.27059 19.5315 6.21777 19.4072C6.16496 19.2829 6.15032 19.1457 6.17572 19.013C6.20112 18.8804 6.26542 18.7582 6.36044 18.6622C6.45546 18.5661 6.57691 18.5005 6.70936 18.4735C6.84182 18.4466 6.97929 18.4596 7.10433 18.5109C7.22936 18.5622 7.3363 18.6495 7.41157 18.7617C7.48683 18.8739 7.52703 19.0059 7.52704 19.141C7.52705 19.3203 7.45631 19.4924 7.33017 19.6199C7.20403 19.7474 7.03266 19.8201 6.85323 19.8222Z" fill="#3BDE7C"/>
    </svg>
    <p class="result__text result__text__main">Определение стиля мышления...........<br/>
    .......................................................</p>
    `;
    setTimeout(showResult, 3000);
  }
}

function showResult() {
  footer.classList.remove("hide");
  footer.classList.add("footer__result");
  footer.firstElementChild.firstElementChild.classList.remove("hide");
  footer.firstElementChild.lastElementChild.classList.add("hide");
  document.querySelector(".header__title h1").innerText = "ГОТОВО!";
  document.querySelector(".header__title h1").classList.add("bold");
  root.classList.add("wrapper", "result");
  root.innerHTML = `
  <p class="result__title">Ваш результат рассчитан:</p>  
  <p class="result__text">
    <u>Вы относитесь к 3%</u> респондентов, чей уровень интеллекта более чем на 15 пунктов отличается от среднего в большую или меньшую сторону!
  </p>
  <h2 class="result__subtitle">Скорее получите свой результат!</h2>
  <p class="result__confidencial">
    В целях защиты персональных данных результат теста, их подробная интерпретация и рекомендации доступны в виде голосового сообщения по звонку с вашего мобильного телефона
  </p>  
  <p class="result__timer"> Звоните скорее, запись доступна всего<br/> <span id="timer">10 : 00</span> минут</p>
  <button id='call_btn' class="result__call_btn">
    <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.0378 15.205C19.9815 15.2895 19.9815 15.3741 19.9533 15.4868C19.9251 15.8532 20.2069 16.1914 20.5733 16.2195C20.9397 16.2477 21.2779 15.9659 21.3061 15.5995C21.3061 15.515 21.3061 15.4304 21.3343 15.2895C21.3343 15.1486 21.3343 15.064 21.3343 14.9795C21.3343 14.1622 21.1933 13.3731 20.9397 12.6121C20.6015 11.6257 20.0097 10.752 19.3051 10.0193C18.4314 9.1456 17.3604 8.52558 16.1486 8.18738C15.5849 8.04646 14.9649 7.96191 14.373 7.96191C14.1758 7.96191 13.9785 7.96191 13.753 7.9901C13.5557 8.01828 13.3585 8.04646 13.1612 8.07465C12.7948 8.13101 12.5411 8.49739 12.6257 8.83559C12.6821 9.20197 13.0484 9.45562 13.3866 9.37107C13.5557 9.34288 13.6967 9.3147 13.8658 9.3147C13.8939 9.3147 13.9221 9.3147 13.9503 9.3147C14.0912 9.3147 14.2321 9.28652 14.373 9.28652C15.9231 9.28652 17.3604 9.90654 18.375 10.9493C19.3896 11.9639 20.0097 13.3449 20.0378 14.8949V14.9513C20.0378 15.064 20.0378 15.1486 20.0378 15.205Z" fill="white"/>
      <path d="M23.7581 15.825C23.7299 16.1914 24.0118 16.5296 24.3782 16.5577C24.7445 16.5859 25.0827 16.3041 25.1109 15.9377C25.1391 15.6277 25.1391 15.3177 25.1391 15.0077C25.1391 14.3876 25.0827 13.7958 24.9982 13.204C24.6318 10.9493 23.5327 8.92013 21.9826 7.37006C20.2071 5.59453 17.8397 4.43903 15.2187 4.24174C14.9368 4.21356 14.6268 4.21356 14.345 4.21356C14.035 4.21356 13.725 4.21356 13.4149 4.24174C13.1049 4.26993 12.7949 4.29811 12.4849 4.35448C12.1185 4.41084 11.8649 4.77722 11.9494 5.11542C12.0058 5.4818 12.3722 5.73545 12.7104 5.6509C12.9077 5.62271 13.0768 5.59453 13.274 5.56635C13.3586 5.56635 13.4431 5.53816 13.5277 5.53816C13.8095 5.50998 14.0913 5.50998 14.345 5.50998C15.3032 5.50998 16.2051 5.6509 17.0787 5.90454C18.6006 6.35547 19.9534 7.17278 21.0526 8.27192C21.9544 9.17378 22.6872 10.2729 23.1663 11.4566C23.589 12.5276 23.8427 13.7112 23.8427 14.9513C23.8427 15.0359 23.8427 15.1486 23.8427 15.2331C23.7863 15.4586 23.7581 15.6277 23.7581 15.825Z" fill="white"/>
      <path d="M24.7163 4.66448C22.0389 1.98709 18.3752 0.352478 14.3168 0.352478C13.894 0.352478 13.4713 0.380661 13.0486 0.408844C12.6258 0.437027 12.2031 0.493393 11.7803 0.577942C11.4139 0.634308 11.1603 1.00069 11.2448 1.33888C11.3012 1.70526 11.6676 1.95891 12.0058 1.87436C12.2031 1.84618 12.3722 1.818 12.5694 1.78981C12.7667 1.76163 12.964 1.73345 13.1613 1.73345C13.5558 1.70526 13.9222 1.67708 14.3168 1.67708C17.9806 1.67708 21.3062 3.17078 23.7299 5.56634C26.1255 7.9619 27.6192 11.2875 27.6192 14.9795C27.6192 15.1768 27.6192 15.4022 27.6192 15.5995C27.6192 15.7686 27.591 15.9377 27.591 16.135C27.5628 16.5014 27.8447 16.8396 28.211 16.8677C28.5774 16.8959 28.9156 16.6141 28.9438 16.2477C28.972 15.825 29.0002 15.4022 29.0002 15.0077C29.0002 10.9775 27.3655 7.31369 24.7163 4.66448Z" fill="white"/>
      <path d="M27.9572 21.7434L22.9688 19.066C21.306 18.1641 21.2497 18.756 19.5023 20.6161C19.0796 21.067 18.2905 22.2507 17.3604 22.0252C15.4158 21.5461 11.7802 18.6996 10.5965 17.4032C10.0328 16.7832 7.60909 13.824 7.5809 12.8657C7.52454 11.4002 10.7374 10.6675 9.69463 7.87733L7.46817 2.88894C5.38263 -1.90218 -0.451265 5.76361 0.0278472 9.34285C1.2679 18.1641 16.7404 32.4248 25.3644 27.7182C27.2808 26.6472 29.8737 22.8989 27.9572 21.7434Z" fill="white"/>
    </svg>
    <p>Позвонить и прослушать результат</p>
  </button>
  <ul class="userData"></ul>
  `;
  timer();
  document.getElementById("call_btn").addEventListener("click", fetchData);
}

function timer() {
  const timerInMinutes = 10;
  const timeNow = new Date();
  const endTime = timeNow.setMinutes(timeNow.getMinutes() + timerInMinutes);

  const timer = setInterval(() => {
    const now = new Date().getTime();
    const timeLeft = endTime - now;
    let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    if (timeLeft <= 1000) {
      clearInterval(timer);
      minutes = "00";
      seconds = "00";
    }
    document.getElementById("timer").innerHTML = minutes + ":" + seconds;
  }, 1000);
}

function fetchData() {
  fetch("https://swapi.dev/api/people/1/")
    .then((res) => res.json())
    .then((data) => {
      renderData(data);
    });
}

function renderData(data) {
  const container = document.querySelector(".userData");
  let itemsList = "";
  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      const element = data[key];
      if (typeof data[key] === "object" && data[key].length) {
        itemsList += `
        <li class="field">${key}:</br> ${data[key]
          .map(
            (link) =>
              `<a class="data" target="_blank" href=${link}>
            ${link}
          </a>`
          )
          .toString()
          .split(",")
          .join("</br>")}
        </li>`;
      } else if (data[key].indexOf("https") !== -1) {
        itemsList += `
        <li class="field">${key}: 
          <a href=${element} target="_blank" class="data">${element}</a>
        </li>`;
      } else {
        itemsList += `
      <li class="field">${key}: 
        <span class="data">${element}</span>
      </li>`;
      }
    }
  }
  container.innerHTML = itemsList;
}
