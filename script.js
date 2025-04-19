console.log('Hello, world!');
let currentFolder;
let currentAudio = new Audio(); 
let currentImg = null; 
function secondsToMinutes(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = Math.floor(seconds % 60); 

    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

async function songFetch(folder) {
    currentFolder = folder
    let song = await fetch(`/${folder}/`);
    let response = await song.text();
    let songList = document.createElement('div');
    songList.innerHTML = response;
    let as = songList.getElementsByTagName("a");
    let list = [];

    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            list.push(element.href.split(`/${folder}/`)[1];
        }
    }
    return list;
}

async function main() {
    let songs = await songFetch();  
    console.log(songs);
    let songUL = document.querySelector('.leftsong').getElementsByTagName("ul")[0];

    for (const song of songs) {
        
        const songName = song.split('/').pop()
            .replace('http://127.0.0.1:3000/music/', ' ')
            .replace('.mp3', ' ')
            .replace(/%20/g, ' ');

        songUL.innerHTML += `<li> 
            <img src="2995035.png" alt="">${songName}
            <img class="hello" onclick="leftchange(event, '${song}', '${songName}')" src="9073187.png" alt="">
        </li>`;
        
        console.log(songName);
    }
}

main();  

function changeImg() {
    let img = document.querySelector('.changeit');
    if (currentAudio) {
        if (currentAudio.paused) {
            currentAudio.play();
            img.src = 'pause.png';
            if (currentImg) {
                currentImg.src = 'pause.png';
            }
        } else {
            currentAudio.pause();
            img.src = '9073187.png';
            let allImgs = document.querySelectorAll('.hello');
            allImgs.forEach(otherImg => {
                otherImg.src = '9073187.png';
            });
        }
    }
}

function leftchange(event, songUrl, songName) {
    let nameofsong = document.querySelector('.songkaname');
    let playbutton = document.querySelector('.changeit');
    nameofsong.textContent = songName;

    let img = event.target;   

    if (currentAudio && currentAudio.src === songUrl) {
        if (currentAudio.paused) {
            currentAudio.play();
            img.src = 'pause.png'; 
            playbutton.src = 'pause.png';
        } else {
            currentAudio.pause();
            img.src = '9073187.png'; 
            playbutton.src = '9073187.png';
        }
        return;
    }

    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio.src = ""; 
        if (currentImg) {
            currentImg.src = '9073187.png'; 
        }
    }

    currentAudio = new Audio(songUrl); 
    currentAudio.play();
    playbutton.src = 'pause.png';

    let allImgs = document.querySelectorAll('.hello'); 
    allImgs.forEach(otherImg => {
        if (otherImg !== img) {
            otherImg.src = '9073187.png';
        }
    });

    img.src = 'pause.png';
    currentImg = img;
    currentAudio.addEventListener("timeupdate", ()=> {
        document.querySelector('.time').innerHTML=`${secondsToMinutes(currentAudio.currentTime)}`;    
        document.querySelector('.remain').innerHTML=`${secondsToMinutes(currentAudio.duration)}`;    
document.querySelector('.bindu').style.left= (currentAudio.currentTime / currentAudio.duration) * 100 + "%";    
    })
        document.querySelector('.bar').addEventListener("click", (e) => {
            let percent =(e.offsetX / e.target.getBoundingClientRect().width) * 100;
            document.querySelector('.bindu').style.left= percent + "%";
            currentAudio.curentTime = currentAudio.duration * (percent / 100);
        })
}
document.getElementById("menu-toggle").addEventListener("click", function () {
    document.getElementById("sidebar").classList.toggle("active");
});
