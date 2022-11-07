console.log("Welcome to Spotify");
// audioElement.play();
// Initialize the variables
songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgress = document.getElementById("myProgress");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songitem = Array.from(document.getElementsByClassName("songitem"));

let songs = [
	{
		songname: "Let me love you",
		filePath: "songs/1.mp3",
		coverPath: "covers/1.jpg",
	},
	{
		songname: "Kabhi Alvida na Kehna",
		filePath: "songs/2.mp3",
		coverPath: "covers/2.jpg",
	},
	{
		songname: "Amaro Porano Jaha Chay",
		filePath: "songs/3.mp3",
		coverPath: "covers/3.webp",
	},
	// {
	// 	songname: "Salam-E-Ishq",
	// 	filePath: "songs/1.mp3",
	// 	coverPath: "covers/1.jpg",
	// },
	// {
	// 	songname: "Salam-E-Ishq",
	// 	filePath: "songs/1.mp3",
	// 	coverPath: "covers/1.jpg",
	// },
	// {
	// 	songname: "Salam-E-Ishq",
	// 	filePath: "songs/1.mp3",
	// 	coverPath: "covers/1.jpg",
	// },
];

songitem.forEach((element, i) => {
	// console.log(element, i);
	element.getElementsByTagName("img")[0].src = songs[i].coverPath;
	element.getElementsByClassName("songName")[0].innerText = songs[i].songname;
});

//Handle play/pause click
masterPlay.addEventListener("click", () => {
	if (audioElement.paused || audioElement.currentTime <= 0) {
		audioElement.play();
		masterPlay.classList.remove("fa-circle-play");
		masterPlay.classList.add("fa-circle-pause");
		gif.style.opacity = 1;
	} else {
		audioElement.pause();
		masterPlay.classList.remove("fa-circle-pause");
		masterPlay.classList.add("fa-circle-play");
		gif.style.opacity = 0;
	}
});

// Listen to Events
audioElement.addEventListener("timeupdate", () => {
	// Updating the seekbar
	progress = (audioElement.currentTime / audioElement.duration) * 100;
	myProgress.value = progress;
});

myProgress.addEventListener("change", () => {
	audioElement.currentTime = (myProgress.value * audioElement.duration) / 100;
});

const makeAllPlays = () => {
	Array.from(document.getElementsByClassName("songItemPlay")).forEach(
		(element) => {
			element.classList.remove("fa-circle-pause");
			element.classList.add("fa-circle-play");
		}
	);
};

Array.from(document.getElementsByClassName("songItemPlay")).forEach(
	(element) => {
		element.addEventListener("click", (e) => {
			// console.log(e.target.classList);
			songIndex = parseInt(e.target.id);
			makeAllPlays();
			e.target.classList.remove("fa-circle-play");
			e.target.classList.add("fa-circle-pause");
			masterSongName.innerText = songs[songIndex].songname;
			gif.style.opacity = 1;
			audioElement.src = `songs/${songIndex + 1}.mp3`;
			audioElement.currentTime = 0;
			audioElement.play();
			masterPlay.classList.remove("fa-circle-play");
			masterPlay.classList.add("fa-circle-pause");
		});
	}
);

document.getElementById("next").addEventListener("click", () => {
	if (songIndex >= 2) {
		songIndex = 0;
	} else songIndex += 1;
	masterSongName.innerText = songs[songIndex].songname;
	gif.style.opacity = 1;
	audioElement.src = `songs/${songIndex + 1}.mp3`;
	audioElement.currentTime = 0;
	audioElement.play();
	masterPlay.classList.remove("fa-circle-play");
	masterPlay.classList.add("fa-circle-pause");
});

document.getElementById("previous").addEventListener("click", () => {
	if (songIndex <= 0) {
		songIndex = 2;
	} else songIndex -= 1;
	masterSongName.innerText = songs[songIndex].songname;
	gif.style.opacity = 1;
	audioElement.src = `songs/${songIndex + 1}.mp3`;
	audioElement.currentTime = 0;
	audioElement.play();
	masterPlay.classList.remove("fa-circle-play");
	masterPlay.classList.add("fa-circle-pause");
});
