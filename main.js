const songList = [ 
    {
        title: "Acido",
        file: "./audio1.mpeg",
        cover: "./IMG_0541.JPG"
    },
    {
        title: "Abominable Hombre De Las Nieves",
        file: "./audio2.mpeg",
        cover: "./IMG_0570.JPG"
    },
    {
        title: "Haciendo Rock and Roll",
        file: "./audio3.mpeg",
        cover: "./IMG_0573.JPG"
    }
]

//Cancion actual

let actualSong = null

// Capturar elementos del DOM para trabajar en JS

const songs = document.getElementById("songs")
const audio = document.getElementById("audio")
const cover = document.getElementById("cover")
const title = document.getElementById("title")
const play = document.getElementById("play")
const prev = document.getElementById("prev")
const next = document.getElementById("next")
const progress = document.getElementById("progress")
const progressContainer = document.getElementById("progress-container") 

progressContainer.addEventListener("click", setProgress)

//Escuchar el elemento audio

audio.addEventListener("timeupdate", updateProgress)

//Clicks en boton controls
play.addEventListener("click", () => {
    if (audio.paused) {
        playSong()
    } else {
        pauseSong()
    }
})

next.addEventListener("click", () => nextSong())
prev.addEventListener("click", () => prevSong())



//Cargar canciones y mostrar el listado

function loadSongs() {
    songList.forEach((song, index) => {
        //Crear "li"
        const li = document.createElement("li")
        //Crear "a"
        const link = document.createElement("a")
        //Hidratar "a"
        link.textContent = song.title
        link.href = "#"
        //Escuchar "clicks"
        link.addEventListener("click", () => loadSong(index))
        //Añadir a li
        li.appendChild(link)
        //Añadir li a ul
        songs.appendChild(li)

    })

}

//Cargar cancion seleccionada
function loadSong(songIndex){
    if(songIndex !== actualSong){
        changueActiveClass(actualSong, songIndex )
        actualSong = songIndex
        audio.src = "./audios" + songList[songIndex].file
        audio.play()
        playSong()
        changueCover(songIndex)
        
        
    }
   
}

//Actualizar barra de progreso de la cancion

function updateProgress(event) {
    const {duration, currentTime} = event.srcElement
    const percent = (currentTime / duration) * 100 
    progress.style.width = percent + "%"
}

//Hacer la barra de progreso clickeable

function setProgress(event) {
    const totalWidth = this.offsetWidth
    const progressWidth = event.offsetX
    const current = (progressWidth / totalWidth) * audio.duration
    audio.currentTime = current
}

//Actualizar controles
function updateControls() {
    if(audio.paused) {
        play.classList.remove("fa-pause")
        play.classList.add("fa-play")
    } else {
        play.classList.add("fa-pause")
        play.classList.remove("fa-play")
    }
}

//Reproducir cancion

function playSong() {
    if(actualSong !== null){
    audio.play()
    updateControls()
    }
}

//Pausar cancion

function pauseSong() {
    audio.pause()
    updateControls()
}



//Cambiar clase activa 
function changueActiveClass(lastIndex, newIndex) {
    const links = document.querySelectorAll("a")
    if(lastIndex !== null) {
        links[lastIndex].classList.remove("active")
    }
    links[newIndex].classList.add("active")
    
    
}


//Cambiar cover de la cancion
function changueCover(songIndex) {
    cover.src = "./img" + songList[songIndex].cover
}


//Cambiar titulo de la cancion
function changueSongTitle(songIndex){
    title.innerText = songList[songIndex].title
}

//Anterior cancion
function prevSong() {
    if(actualSong > 0) {
       loadSong(actualSong - 1)
    } else {
        loadSong(songList.length - 1)
    }
    
    
    
}

//Proxima cancion
function nextSong() {
    if(actualSong < songList.length -1) {
        loadSong(actualSong + 1)
    } else {
        loadSong(0)
    }
    
    
}

//Que pase a siguiente cancion cuando se termine la actual

audio.addEventListener("ended", () => nextSong())

    
 
//go!

loadSongs()
