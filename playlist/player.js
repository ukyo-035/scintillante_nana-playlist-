let db
let currentList=[]
let currentIndex=0

fetch(API_URL)
.then(r=>r.json())
.then(data=>{

db=data

renderPlaylists()
renderUnits()
renderMembers()

})

function renderPlaylists(){

const menu=document.getElementById("playlistMenu")

db.playlists.forEach(p=>{

const li=document.createElement("li")

li.textContent=p.name

li.onclick=()=>loadPlaylist(p.playlist_id)

menu.appendChild(li)

})

}

function loadPlaylist(id){

const songIDs=db.song_playlists
.filter(s=>s.playlist_id==id)
.map(s=>s.song_id)

currentList=db.songs.filter(s=>songIDs.includes(s.song_id))

renderSongs()

}

function renderSongs(){

const list=document.getElementById("songList")
list.innerHTML=""

currentList.forEach((s,i)=>{

const li=document.createElement("li")

li.textContent=s.title

li.onclick=()=>playSong(i)

list.appendChild(li)

})

}

function playSong(i){

currentIndex=i

const s=currentList[i]

const audio=document.getElementById("audio")

audio.src=s.audio
audio.play()

document.getElementById("nowPlaying").textContent=s.title

}

function togglePlay(){

const audio=document.getElementById("audio")

if(audio.paused)audio.play()
else audio.pause()

}

function nextSong(){

currentIndex++

if(currentIndex>=currentList.length)
currentIndex=0

playSong(currentIndex)

}

function prevSong(){

currentIndex--

if(currentIndex<0)
currentIndex=currentList.length-1

playSong(currentIndex)

}

document.getElementById("audio").onended=nextSong
