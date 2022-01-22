function countdown(background,counter,titre,time) {
  if (time == 60) {
    counter.style.color = "red";
  }
  if(time > 0) {
    var s = time % 60;
    var m = (time - s) / 60;
    s = (s < 10) ? "0" + s : s;
    m = (m < 10) ? "0" + m : m;
    counter.innerHTML = m + ":" + s;
    setTimeout(function() {countdown(background,counter,titre,time-1); }, 1000);
  } else if (time == 0) {
    counter.style.color = "black";
    counter.innerHTML = "C'est terminé&nbsp;!";
    titre.style.color = "black";
    background.style.backgroundColor = "red";
  }
}

function countdownQCM() {
  var background = document.getElementsByClassName('slide-background present')[0];
  var counter = document.getElementById( 'qcm' );
  var title = document.getElementById( 'titre' );
  countdown(background,counter,titre,600);
}
