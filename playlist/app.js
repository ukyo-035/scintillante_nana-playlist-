const API_URL = "YOUR_API_URL";

let songs=[];
let currentList=[];
let currentIndex=0;

const songList=document.getElementById("songList");
const audio=document.getElementById("audioPlayer");
const nowPlaying=document.getElementById("nowPlaying");

fetch(API_URL)
.then(r=>r.json())
.then(data=>{
songs=data;
renderPlaylists();
renderUnits();
renderMembers();
showAllSongs();
});

function renderPlaylists(){
let playlists=[...new Set(songs.map(s=>s.playlist))];
const list=document.getElementById("playlistList");
list.innerHTML="";
playlists.forEach(p=>{
let li=document.createElement("li");
li.textContent=p;
li.onclick=()=>loadList(songs.filter(s=>s.playlist==p),p);
list.appendChild(li);
});
}

function renderUnits(){
let units=[...new Set(songs.map(s=>s.unit))];
const list=document.getElementById("unitList");
list.innerHTML="";
units.forEach(u=>{
let li=document.createElement("li");
li.textContent=u;
li.onclick=()=>loadList(songs.filter(s=>s.unit==u),u);
list.appendChild(li);
});
}

function renderMembers(){
let members=[...new Set(songs.map(s=>s.members).flat())];
const list=document.getElementById("memberList");
list.innerHTML="";
members.forEach(m=>{
let li=document.createElement("li");
li.textContent=m;
li.onclick=()=>loadList(songs.filter(s=>s.members.includes(m)),m);
list.appendChild(li);
});
}

function loadList(list,title){
document.getElementById("listTitle").textContent=title;
currentList=list.sort((a,b)=>new Date(a.date)-new Date(b.date));
songList.innerHTML="";
currentList.forEach((s,i)=>{
let li=document.createElement("li");
li.textContent="▶ "+s.title+" / "+s.members.join(",");
li.onclick=()=>playSong(i);
songList.appendChild(li);
});
}

function showAllSongs(){
loadList(songs,"全曲");
}

function playSong(i){
currentIndex=i;
let s=currentList[i];
audio.src=s.audio;
audio.play();
nowPlaying.textContent=s.title;
}

function togglePlay(){
if(audio.paused){audio.play()}else{audio.pause()}
}

function nextSong(){
currentIndex++;
if(currentIndex>=currentList.length)currentIndex=0;
playSong(currentIndex);
}

function prevSong(){
currentIndex--;
if(currentIndex<0)currentIndex=currentList.length-1;
playSong(currentIndex);
}

audio.onended=()=>nextSong();
