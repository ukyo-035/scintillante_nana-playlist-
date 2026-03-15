function autoFetch(){

const url=document.getElementById("url").value

fetch(url)
.then(r=>r.text())
.then(html=>{

const doc=new DOMParser().parseFromString(html,"text/html")

const title=doc.querySelector("title").innerText

document.getElementById("title").value=title

const audio=doc.querySelector("audio source")

if(audio)
document.getElementById("audio").value=audio.src

})

}
