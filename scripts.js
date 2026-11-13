let games = [];
let gamesDesc = [];

SetupBoxes();

async function SetupBoxes() {
    await ParseGames();

    for (let i = 0; i < games.length; i++) {
        // 1. Create the parent container (the div)
        const containerDiv = document.createElement('div');
        containerDiv.className = 'gameBox'; // Add a class name
        containerDiv.addEventListener('click', (e) => {
            GameRedirect(games[i])
        })

        // 2. Create the child elements
        const heading = document.createElement('h2');
        heading.textContent = games[i]; // Add text safely

        const image = document.createElement('img');

        const result = games[i].replace(/\s+/g, '').toLowerCase();
        image.src = "/images/games/" + result + "/cover.png"


        // const video = document.createElement('video');
        // video.style.display = 'none';
        // video.autoplay = true;
        // video.preload = 'auto';
        // video.src="/video/trailer1.mov"

        const paragraph = document.createElement('p');
        paragraph.textContent = gamesDesc[i];

        // 3. Nest the elements inside the parent div
        containerDiv.append(heading, image, paragraph);

        // 4. Inject the final container into your actual webpage (e.g., the body)
        const boxes = document.querySelector('#boxes');
        boxes.append(containerDiv)
    }
}

function GameRedirect(gameName) {
    const result = gameName.replace(/\s+/g, '').toLowerCase();
    const url = new URL(window.location.href);
    url.hostname = result + '.' + url.hostname;
    window.location.href = url.href;
}

async function ParseGames() {
     await readTextFile("/games.txt").then(r => {
            const lines = r.split(/\r?\n/)
            let gameAlls=[];
            for (let i = 0; i < lines.length; i++) {

                console.log(lines[i]);
                gameAlls.push(lines[i].split('|'));
            }

            let hep;
            for (let i = 0; i < gameAlls.length; i++) {
                hep = (gameAlls[i]);
                games.push(hep[0])
                gamesDesc.push(hep[1])
                console.log("games is "+ hep[0]);
                console.log(hep[1]);
            }
            console.log(games);
        }
    )
}

async function readTextFile(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const text = await response.text();
        // console.log(text);
        return text; // Handle your text content here
    } catch (error) {
        console.error("Failed to read the file:", error);
    }
}

function ShowTrailer(){
    document.getElementsByClassName('trailerBack')[0].style.display = 'block';
    document.getElementsByClassName('trailerCloseButton')[0].style.display = 'block';

    var trailer = document.getElementById('trailer');
    trailer.style.display = 'block'
    trailer.play();
}

function CloseTrailer(){
    document.getElementsByClassName('trailerBack')[0].style.display = 'none';
    document.getElementsByClassName('trailerCloseButton')[0].style.display = 'none';
    document.getElementsByClassName("pauseIco")[0].style.display = 'none';

    var trailer = document.getElementById('trailer');
    trailer.style.display = 'none'
    trailer.pause();
}

function PlayPauseTrailer(){
    var trailer = document.getElementById('trailer');
    const isPlaying = trailer.currentTime > 0 && !trailer.paused && !trailer.ended && trailer.readyState > 2;

    if(isPlaying){
        trailer.pause();
        document.getElementsByClassName("pauseIco")[0].style.display = 'block';
    }
    else{
        trailer.play();
        document.getElementsByClassName("pauseIco")[0].style.display = 'none';
    }
}

let imgId=2;
const screenshotImg = document.getElementById('screenshotImg');
let intervalId = setInterval(() => {
   IncrementScreenshot();
}, 5000);

function IncrementScreenshot(type){
    screenshotImg.src = '/images/screenshots/'+imgId+".png";
    imgId++;
    if(imgId>8){
        imgId=1;
    }

    if(type===1){
        clearInterval(intervalId);
         intervalId = setInterval(IncrementScreenshot, 5000);
    }
}