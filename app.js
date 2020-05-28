const app = () => {
    const alarm = document.querySelector(".alarm");
    const play = document.querySelector(".play");
    const outline = document.querySelector(".moving-outline circle");

    const timeDisplay = document.querySelector(".time-display");

    const outlineLen = outline.getTotalLength();

    const timeSelect = document.querySelectorAll(".time-select button");
    let duration = 30;
    let running = false;
    let paused = false;
    let currentTime = 0;

    outline.style.strokeDasharray = outlineLen;
    outline.style.strokeDashoffset = outlineLen;
    let min = Math.floor(duration / 60);
    let sec = Math.floor(duration % 60);
    min = String(min).padStart(2, '0');
    sec = String(sec).padStart(2, '0');
    timeDisplay.textContent = `${min}:${sec}`;

    play.addEventListener("click", function() {
        if(!running) { 
            running = true;
            paused = false;
            play.src = "./svg/pause.svg";
        } else {
            running = false;
            play.src = "./svg/play.svg";
            paused = true;
        }
        updateTimer;
    });

    timeSelect.forEach(option => {
        option.addEventListener("click", function() {
            duration = this.getAttribute("data-time");
            let min = Math.floor(duration / 60);
            let sec = Math.floor(duration % 60);
            min = String(min).padStart(2, '0');
            sec = String(sec).padStart(2, '0');
            timeDisplay.textContent = `${min}:${sec}`;
            currentTime = 0;
            running = false;
            play.src = "./svg/play.svg";
        });
    });

    const updateTimer = setInterval(timer, 1000);
    function timer() {
        if (!paused && running) {
            currentTime ++;
        }
        let elapsed = duration - currentTime;
        let min = Math.floor(elapsed / 60);
        let sec = Math.floor(elapsed % 60);
        min = String(min).padStart(2, '0');
        sec = String(sec).padStart(2, '0');
        timeDisplay.textContent = `${min}:${sec}`;
        let progress = outlineLen - (currentTime / duration) * outlineLen;      
        outline.style.strokeDashoffset = progress;
      
        if (currentTime >= duration) {
            let min = Math.floor(duration / 60);
            let sec = Math.floor(duration % 60);
            min = String(min).padStart(2, '0');
            sec = String(sec).padStart(2, '0');
            timeDisplay.textContent = `${min}:${sec}`;
            outline.style.strokeDashoffset = outlineLen;
            alarm.play();
            currentTime = 0;
            updateTimer;
        }
    };

}

app();