const song = document.querySelector('.song');
const play = document.querySelector('.play');
const replay = document.querySelector('.replay');

//sounds
const sounds = document.querySelectorAll('.sound-picker button');
//time display
const timeDisplay = document.querySelector('.time-display');
//time duration
const timeSelect = document.querySelectorAll('.time-select button');
let fakeDuration = 600;

sounds.forEach(sound => {
    sound.addEventListener("click", function() {
        song.src = this.getAttribute("data-sound");
        checkPlaying(song);
    });
})

play.addEventListener("click", () => {
    checkPlaying(song);
});

replay.addEventListener("click", () => {
    restartSong(song);
});

timeSelect.forEach(option => {
    option.addEventListener("click", function() {
        fakeDuration = this.getAttribute("data-time");
        timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`;
    });
});

const checkPlaying = song => {
    (song.paused) ? (song.play(), play.src = './img/pause.svg') : (song.pause(), play.src = "./img/play.svg")
};

const restartSong = song => {
    let currentTime = song.currentTime;
    song.currentTime = 0;
}

song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsed = fakeDuration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);
    timeDisplay.textContent = `${minutes}:${seconds}`;


    if (currentTime >= fakeDuration) {
        song.pause();
        song.currentTime = 0;
        play.src = "./img/play.svg";
    }
};