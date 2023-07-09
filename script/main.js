//adding songs to the scene
let Songs = [
  {
    songname: "Telling the world",
    filePath: "musicData\\1.m4a",
    coverPath: "images\\1.jpg",
    artist: "Taio Cruz",
  },
  {
    songname: "Rockstar",
    filePath: "musicData\\2.m4a",
    coverPath: "images\\2.jpg",
    artist: "Post Malone",
  },
  {
    songname: "Bad Boy",
    filePath: "musicData\\3.m4a",
    coverPath: "images\\3.jpg",
    artist: "Tungevaag & Raaban",
  },
  {
    songname: "Star Boy",
    filePath: "musicData\\4.m4a",
    coverPath: "images\\4.jpeg",
    artist: "The Weeknd",
  },
  {
    songname: "Bam Bam Bholey ",
    filePath: "musicData\\5.m4a",
    coverPath: "images\\5.jpg",
    artist: "Dope Boy Leo & Lil Golu ",
  },
  {
    songname: "Love me Like You do",
    filePath: "musicData\\6.m4a",
    coverPath: "images\\6.jpeg",
    artist: "Ellie Goulding",
  },
  {
    songname: "All Rise",
    filePath: "musicData\\7.m4a",
    coverPath: "images\\7.jpg",
    artist: "Blue",
  },
  {
    songname: "Shape of You",
    filePath: "musicData\\8.m4a",
    coverPath: "images\\8.jpg",
    artist: "Ed Sheeran",
  },
  {
    songname: "One Love",
    filePath: "musicData\\9.m4a",
    coverPath: "images\\9.jpg",
    artist: "Blue",
  },
  {
    songname: "Till i collapse",
    filePath: "musicData\\10.m4a",
    coverPath: "images\\10.jpg",
    artist: "Eminem",
  },
  {
    songname: "Peaky Blinder",
    filePath: "musicData\\11.m4a",
    coverPath: "images\\11.jpeg",
    artist: "otnicka",
  },
];
var MusicList = document.getElementById("musicList");
document.addEventListener("DOMContentLoaded", () => {
  var idn = 0;
  for (let song of Songs) {
    idn++;
    var listItem = document.createElement("li");
    listItem.className = "list-group-item";
    listItem.id = "ListMusic";
    listItem.id = idn;

    var row = document.createElement("div");
    row.className = "row d-flex align-items-center";

    var coverDiv = document.createElement("div");
    coverDiv.className = "col-2";

    var coverImage = document.createElement("img");
    coverImage.src = song.coverPath;
    coverImage.className = "rounded-circle img-thumbnail";

    coverDiv.appendChild(coverImage);

    var detailsDiv = document.createElement("div");
    detailsDiv.className = "col-8";

    var songNameDiv = document.createElement("p");
    songNameDiv.className = "lead text-start songNameee";
    songNameDiv.textContent = song.songname;

    var artsongNameDiv = document.createElement("div");
    artsongNameDiv.textContent = song.artist;

    var playIconDiv = document.createElement("div");
    playIconDiv.className = "col-2";

    var playIcon = document.createElement("i");
    playIcon.className = "fa-solid fa-play";
    playIcon.id = "play-btn";
    playIcon.setAttribute("type", "button");
    playIcon.addEventListener("click", function () {
      playMusic(song.songname, song.filePath, song.coverPath, song.artist);
    });

    playIconDiv.appendChild(playIcon);

    detailsDiv.appendChild(songNameDiv, artsongNameDiv);

    row.appendChild(coverDiv);
    row.appendChild(detailsDiv);
    row.appendChild(playIconDiv);

    listItem.appendChild(row);

    MusicList.appendChild(listItem);
  }
});

// getting things to play
let songIndex = 0;
let masterPlay = document.getElementById("play-btn-m");
let myProgressBar = document.getElementById("myProgressBar");
let coverImage = document.getElementsByClassName("card-img-top")[0];
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let masterArtishName = document.getElementById("masterArtishName");
let songItems = Array.from(document.getElementsByClassName("ListMusic"));
let player = new Audio();
let currentTimePause;

//playing
function playMusic(songname, filePath, coverPath, artist) {
  if (masterSongName.innerText === songname) {
    masterSongName.innerText = songname;
    masterArtishName.innerText = artist;
    coverImage.src = coverPath;
    player.src = filePath;
    player.load();
    pandp();
  } else {
    masterSongName.innerText = songname;
    masterArtishName.innerText = artist;
    coverImage.src = coverPath;
    player.src = filePath;
    player.load();
    masterPlay.firstChild.classList.remove("fa-play");
    masterPlay.firstChild.classList.add("fa-pause");
    var allpause = document.getElementsByClassName("fa-solid");
    for (var i = 0; i < allpause.length; i++) {
      if (allpause[i].classList.contains("fa-pause")) {
        allpause[i].classList.remove("fa-pause");
        allpause[i].classList.add("fa-play");
      }
    }
    // btn.classList.remove("fa-play");
    // btn.classList.add("fa-pause");
    player.play();
  }
  var MusicBg = document.getElementsByClassName("MusicBg");

  // Loop through the collection of elements with the class "MusicBg"
  for (var i = 0; i < MusicBg.length; i++) {
    var element = MusicBg[i];
    element.style.background = "url(" + coverImage.src + ")";
    element.style.backgroundPosition = "left center"
    element.classList.add("blur-effect");

  }
}
// slider time and seek
var currentTime = document.getElementById("current-time");
var totalTime = document.getElementById("total-time");
var progress = document.getElementsByClassName("progress");

player.addEventListener("loadedmetadata", () => {
  totalTime.textContent = formatTime(player.duration);
});
player.addEventListener("timeupdate", updateProgress);
var nextBtn = document.getElementById("next-btn");
var prevBtn = document.getElementById("previous-btn");
nextBtn.addEventListener("click", playNextSong);
prevBtn.addEventListener("click", playPrevSong);
masterPlay.addEventListener("click", pandp);

// total time
function formatTime(time) {
  var min = Math.floor(time / 60);
  var sec = Math.floor(time % 60);
  return min + ":" + (sec < 10 ? "0" + sec : sec);
}
// current time
function updateProgress() {
  var current = player.currentTime;
  currentTime.textContent = formatTime(current);
  currentTimePause = current;
}
// song end and playing next
player.addEventListener("ended", function () {
  player.currentTime = 0;
  playNextSong();
});
//next song
function playNextSong() {
  if (songIndex == 0) {
    let nextSong = Songs[songIndex];
    playMusic(
      nextSong.songname,
      nextSong.filePath,
      nextSong.coverPath,
      nextSong.artist
    );
  } else {
    let nextSong = Songs[songIndex];
    playMusic(
      nextSong.songname,
      nextSong.filePath,
      nextSong.coverPath,
      nextSong.artist
    );
  }
  songIndex = (songIndex + 1) % Songs.length;
}
//prev song
function playPrevSong() {
  songIndex = (songIndex - 1 + Songs.length) % Songs.length;
  let nextSong = Songs[songIndex];
  playMusic(
    nextSong.songname,
    nextSong.filePath,
    nextSong.coverPath,
    nextSong.artist
  );
}
// play and pause
function pandp() {
  // var currentTimePause = 0;
  if (isFinite(currentTimePause) && currentTimePause !== 0) {
    if (masterPlay.firstChild.classList.contains("fa-play")) {
      masterPlay.firstChild.classList.remove("fa-play");
      masterPlay.firstChild.classList.add("fa-pause");
      player.currentTime = currentTimePause;
      player.play();
    } else {
      masterPlay.firstChild.classList.add("fa-play");
      masterPlay.firstChild.classList.remove("fa-pause");
      player.currentTime = currentTimePause;
      player.pause();
      Shuffle.style.display = "block";
    }
  } else {
    playNextSong();
  }
}
function search_music() {
  Shuffle.style.display = "block";
  let input = document.getElementById("searchbar").value;
  var x = document.getElementsByClassName("songNameee");
  for (var i = 0; i < x.length; i++) {
    if (x[i].innerHTML.toLowerCase().includes(input)) {
      const divElement = x[i].closest("li");
      divElement.style.display = "block";
    } else {
      const divElement = x[i].closest("li");
      divElement.style.display = "none";
    }
  }
}
var Shuffle = document.getElementById("shuffle-btn");
var sort = document.getElementById("unshuffle-btn");
Shuffle.addEventListener("click", function shuffle() {
  playRandom()
  Shuffle.style.display = "none";
});

function playRandom() {
  songIndex = Math.floor(Math.random() * Songs.length);
  let nextSong = Songs[songIndex];
  playMusic(
    nextSong.songname,
    nextSong.filePath,
    nextSong.coverPath,
    nextSong.artist
  );
}
