var audio = new Audio("static/beep.mp3");
var duration = 1500000;
var isPaused = false;

function init() {
    var currentMinutes = Math.floor(((duration) / 60000) % 60);
    var currentSeconds = Math.floor(((duration) / 1000) % 60);
    if (currentMinutes < 10) currentMinutes = "0" + currentMinutes;
    if (currentSeconds < 10) currentSeconds = "0" + currentSeconds;
    document.getElementById("timer").innerHTML = currentMinutes + ":" + currentSeconds;
}

document.addEventListener("DOMContentLoaded", () => {
    init();
});

function start() {
    var startTime = new Date().getTime();
    update(startTime);
}

function update(startTime) {
    // 25min = 1.5 million ms
    let timer = setInterval(() => {
        var now = new Date().getTime();
        var delta = Math.abs(startTime - now);

        var currentMinutes = Math.floor(((duration - delta) / 60000) % 60);
        var currentSeconds = Math.floor(((duration - delta) / 1000) % 60);

        document.getElementById("timer").innerHTML = currentMinutes + ":" + currentSeconds;
        if (isPaused) {
            clearInterval(timer);
        }
        if (delta >= duration) {
            audio.play();
            clearInterval(timer);
        }
    }, 1000);
}

function pause() {
    return;
}

function reset() {
    document.getElementById("timer").innerHTML = "25:00";
    audio.pause();
    audio.currentTime = 0;
    isPaused = true;
    init();
}

function decrement() {
    if (timer.getSeconds() == 0) {
        timer.setMinutes(timer.getMinutes() - 1);
    }
    else {
        timer.setSeconds(timer.getSeconds() - 1);
    }
}