var currentSlide = 0;
var slides = document.querySelectorAll('.slide');
var slideInterval = setInterval(nextSlide, 3000);
var overlay = document.querySelector('.overlay');

document.onload = initialize();

function initialize() {
  var todayDate = new Date();

  todayDate.month = todayDate.getMonth() + 1;

  var date =  todayDate.month +'/'+ todayDate.getDate() +'/'+ todayDate.getFullYear() + '<br> ' + todayDate.getHours() + ':' + todayDate.getMinutes();

  document.getElementById('currentDate').innerHTML = date;

  slides[currentSlide].style.zIndex=1;
}

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}


function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

function nextSlide() {

  overlay.classList.add('hide');

  setTimeout( slideTransition, 300);

  setTimeout(function(){
      overlay.classList.remove('hide');
  }, 300)

}

function slideTransition() {
  currentSlide++;

  if (currentSlide >= slides.length) {
      currentSlide = 0;
  }


  for (var i = 0; i < slides.length; i++) {
      if (i == currentSlide) {
          slides[i].style.zIndex = 1;
      }
      else {
          slides[i].style.zIndex = 0;
      }
  }
}

