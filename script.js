const videos=[
 {title:'Morning Energy — Lifestyle Vlog',cat:'Entertainment',desc:'Fresh entertainment and lifestyle vibes to start the day.',img:'assets/lifestyle.svg'},
 {title:'City Vibes — A Day Outside',cat:'Lifestyle',desc:'A fun look at city life, style and everyday moments.',img:'assets/city.svg'},
 {title:'Creator Day — Behind the Scenes',cat:'Lifestyle',desc:'Go behind the scenes with creators and their daily routines.',img:'assets/talk.svg'},
 {title:"Trending Talk — What's Hot Today?",cat:'Trending',desc:'Quick conversations about the topics everyone is talking about.',img:'assets/talk.svg'},
 {title:'Weekend Vibes — Music & Fun',cat:'Music',desc:'Music, fun moments and weekend energy.',img:'assets/music.svg'},
 {title:'Street Style & Quick Interviews',cat:'Interviews',desc:'Short street conversations and interesting opinions.',img:'assets/street.svg'}
];
const player=document.querySelector('#player'),title=document.querySelector('#videoTitle'),meta=document.querySelector('#videoMeta'),desc=document.querySelector('#videoDescription'),grid=document.querySelector('#grid'),up=document.querySelector('#upNext'),count=document.querySelector('#count'),search=document.querySelector('#searchInput');
let current=0;
function play(i){current=i;const v=videos[i];title.textContent=v.title;meta.textContent=`DÏÑØ RÏĆHÍĘ TV SHOW • ${v.cat} • 2026`;desc.textContent=v.desc;player.poster=v.img;player.currentTime=0;document.querySelectorAll('.card').forEach((x,n)=>x.classList.toggle('selected',n===i));}
function render(list=videos){grid.innerHTML='';count.textContent=`${list.length} videos`;list.forEach((v,i)=>{const real=videos.indexOf(v);const c=document.createElement('article');c.className='card';c.innerHTML=`<img src="${v.img}" alt=""><div class="card-body"><b>${v.title}</b><small>${v.cat}</small></div>`;c.onclick=()=>play(real);grid.appendChild(c)});up.innerHTML=videos.filter((_,i)=>i!==current).slice(0,4).map(v=>{const i=videos.indexOf(v);return `<div class="next-card" data-i="${i}"><img src="${v.img}"><div><b>${v.title}</b><small>${v.cat}</small></div></div>`}).join('');up.querySelectorAll('.next-card').forEach(x=>x.onclick=()=>play(+x.dataset.i));}
document.querySelectorAll('.chip').forEach(ch=>ch.onclick=()=>{document.querySelectorAll('.chip').forEach(x=>x.classList.remove('active'));ch.classList.add('active');const cat=ch.dataset.category;render(cat==='All'?videos:videos.filter(v=>v.cat===cat))});
search.oninput=()=>{const q=search.value.toLowerCase();render(videos.filter(v=>(v.title+' '+v.cat+' '+v.desc).toLowerCase().includes(q)))};
document.querySelector('#shareBtn').onclick=async()=>{try{await navigator.share({title:title.textContent,text:'Watch on DÏÑØ RÏĆHÍĘ TV SHOW',url:location.href})}catch(e){navigator.clipboard?.writeText(location.href);alert('Link copied')}};
document.querySelector('#downloadBtn').onclick=()=>alert('Add your own licensed video URL to enable downloads.');
document.querySelector('#likeBtn').onclick=e=>{e.target.textContent=e.target.textContent.includes('♡')?'♥ Liked':'♡ Like'};
player.onended=()=>{if(document.querySelector('#autoplay').checked)play((current+1)%videos.length)};
render();setTimeout(()=>document.querySelector('#toast').remove(),4500);
