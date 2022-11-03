let counter = 1;

let images = document.querySelectorAll('img');
let playButton = document.querySelector('button');
let doc = document.documentElement;



function setSlides(num) {
    counter += num;
    displaySlides(counter);
}

function displaySlides(index) {
    if (index == 0) {
        index = images.length;
    }
    if (index > images.length ) {
        index = 1;
    }
    counter = index;
    for (let i = 0; i < images.length; i++){
        images[i].style.display = 'none';
    }
    images[index - 1].style.display = 'block';
}

displaySlides(1);

function openFullScreen() {
    if (playButton.innerHTML === 'End slideshow') {
        closeFullscreen();
    }
    else {
        if (doc.requestFullscreen) {
            doc.requestFullscreen();
        } else if (doc.webkitRequestFullscreen) { /* Safari */
            doc.webkitRequestFullscreen();
        } else if (doc.msRequestFullscreen) { /* IE11 */
            doc.msRequestFullscreen();
        }
    }

}

addEventListener('fullscreenchange', (event) => {
    if (playButton.innerHTML === 'End slideshow') {
        playButton.innerHTML = 'Start slideshow';
    } else {
        playButton.innerHTML = 'End slideshow';
    }
});

function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
}


