const container = document.querySelector('.kanji__container')
const video = document.querySelector('video')
// var browser = browser || chrome
var playbackSpeed = 1;

fetch("https://kanjialive-api.p.rapidapi.com/api/public/kanji/all", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "kanjialive-api.p.rapidapi.com",
		"x-rapidapi-key": "51b78dd7b4mshc279edfc34eae28p15a677jsna55844206fcc"
	}
})
.then(response => 
    response.json()
)
.then(data => {
    const loader = document.querySelector('.loader')
    loader.parentNode.removeChild(loader)

    for(i=0;i<data.length;i++){
        const newDiv = document.createElement('div')
        newDiv.classList.add('kanji')
        container.appendChild(newDiv)
        const newP1 = document.createElement('p')
        const newP2 = document.createElement('p')
        const newP3 = document.createElement('p')
        const newP4 = document.createElement('p')
        const kanjiData = data[i].kanji
        let na = false
        newP1.textContent = kanjiData.character
        newP1.dataset.video = kanjiData.video.mp4
        // if(k)
        newP2.innerHTML = kanjiData.kunyomi.hiragana != 'n/a' ? `${kanjiData.kunyomi.hiragana}</br> ${kanjiData.kunyomi.romaji}` : na=true
        if(na==true){
            newP2.classList.add('none')
            newP2.textContent = ''
        }
        newP3.innerHTML = `${kanjiData.onyomi.katakana}</br> ${kanjiData.onyomi.romaji}`
        newP4.textContent = kanjiData.meaning.english
        newP4.classList.add('lastchild')
        
        
        newP1.addEventListener('mousedown',(e)=>{
            video.src = e.target.dataset.video;
            newP1.classList.toggle(`selected`)
            video.play()
            video.playbackRate = playbackSpeed
        })

        newDiv.appendChild(newP1)
        newDiv.appendChild(newP2)
        newDiv.appendChild(newP3)
        newDiv.appendChild(newP4)
    }
})
.catch(err => {
	console.error(err);
});

video.addEventListener('ended',()=>{ setTimeout(()=> video.play(), 750) });

const spd = document.querySelectorAll('.spd')
spd.forEach((element,i)=>{
    element.addEventListener('mousedown',()=>{
        if (!element.classList.contains('spdselect')){
            for(j=0;j<spd.length;j++){
                if(j!=i) spd[j].classList.remove('spdselect')
            }
            element.classList.add('spdselect')
            playbackSpeed = element.dataset.speed
            video.playbackRate = playbackSpeed
        }
    })
})

