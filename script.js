'use strict';
// Ordre original del relat: capítol d'obertura (1527) -> flashback a Egipte -> Roma -> 1527 -> desenllaç.
const pages = [
  {id:'lamina-01',src:'01-egipte.webp',title:'L’or dels faraons',period:'ANTIC EGIPTE',description:'El poder del faraó es representa amb or i joies.',narrative:3,chronological:1},
  {id:'lamina-02',src:'02-la-malediccio.webp',title:'L’amulet i la cobdícia',period:'ANTIC EGIPTE',description:'Una joia canvia de mans i es converteix en símbol de poder.',narrative:4,chronological:2},
  {id:'lamina-03',src:'03-roma-egipte.webp',title:'El tresor redescobert',period:'30 aC',description:'Els romans arriben a Egipte i troben l’amulet.',narrative:5,chronological:3},
  {id:'lamina-04',src:'04-codicia.webp',title:'Codícia · El calze',period:'1527 · OBERTURA',description:'Un sacerdot encarrega al cavaller una missió llunyana.',narrative:1,chronological:4},
  {id:'lamina-05',src:'05-el-cavaller.webp',title:'L’armadura i el viatge',period:'1527 · OBERTURA',description:'Fe, orfebreria i un exèrcit disposat a partir.',narrative:2,chronological:5},
  {id:'lamina-06',src:'06-saqueig-roma.webp',title:'El saqueig de Roma',period:'5 DE MAIG DE 1527',description:'El cavaller recupera l’amulet, però descobreix el seu perill.',narrative:6,chronological:6},
  {id:'lamina-07',src:'07-purificacio.webp',title:'La renúncia',period:'1527 · FICCIÓ',description:'El papa purifica la joia i el cavaller abandona la ciutat.',narrative:7,chronological:7},
  {id:'lamina-08',src:'08-el-tresor.webp',title:'El patrimoni de les joies',period:'FINS AL 1530 · FICCIÓ',description:'Una col·lecció recorda l’evolució de les joies i les cultures.',narrative:8,chronological:8},
  {id:'lamina-09',src:'09-coronacio.webp',title:'Tres anys després',period:'1530 · FICCIÓ',description:'El cavaller és coronat rei en el desenllaç fictici del relat.',narrative:9,chronological:9},
  {id:'lamina-10',src:'10-museu.webp',title:'La memòria sota el vidre',period:'ACTUALITAT · FICCIÓ',description:'El penjoll es conserva amb cura: preservar és recordar.',narrative:10,chronological:10}
];
const pagesRoot=document.getElementById('comic-pages');
const orderButtons=[...document.querySelectorAll('[data-order]')];
let displayOrder='chronological';
let orderedPages=[];
let currentIndex=0;
let dialogPages=[];
const dialog=document.getElementById('page-dialog');
const dialogImg=document.getElementById('dialog-image');
const dialogCounter=document.getElementById('dialog-counter');
const dialogTitle=document.getElementById('dialog-title');
const dialogDesc=document.getElementById('dialog-description');
function renderPages(order){
  displayOrder=order;
  orderedPages=[...pages].sort((a,b)=>a[order]-b[order]);
  pagesRoot.replaceChildren();
  orderedPages.forEach((page,index)=>{
    const figure=document.createElement('figure');
    figure.className='comic-card'; figure.id=page.id;
    const image=document.createElement('img'); image.src='assets/pages/'+page.src; image.alt=`${page.title}. ${page.description}`; image.loading=index<2?'eager':'lazy'; image.decoding='async'; image.width=page.src.includes('07-')||page.src.includes('08-')?768:page.src.includes('09-')||page.src.includes('10-')?1086:1055;image.height=page.src.includes('07-')||page.src.includes('08-')?1024:page.src.includes('09-')||page.src.includes('10-')?1448:1491;
    const frame=document.createElement('div');frame.className='comic-frame';frame.appendChild(image);
    const zoom=document.createElement('button');zoom.type='button';zoom.className='zoom-button';zoom.textContent='Ampliar ↗';zoom.setAttribute('aria-label','Ampliar '+page.title);zoom.addEventListener('click',()=>openPage(index));frame.appendChild(zoom);
    const bottom=document.createElement('figcaption');bottom.className='comic-bottom';bottom.innerHTML=`<span class="page-number">${String(index+1).padStart(2,'0')}</span><div><h3>${page.title}</h3><p>${page.description}</p></div><span class="era">${page.period}</span>`;
    figure.append(frame,bottom);pagesRoot.appendChild(figure);
  });
  orderButtons.forEach(btn=>{const active=btn.dataset.order===order;btn.classList.toggle('is-active',active);btn.setAttribute('aria-pressed',String(active));});
  document.getElementById('order-explanation').textContent=order==='chronological'?'Antic Egipte → Roma → 1527 → 1530 → museu':'Pròleg al 1527 → retorn a Egipte → Roma → desenllaç';
}
function openPage(index, sequence=orderedPages){dialogPages=sequence;currentIndex=(index+dialogPages.length)%dialogPages.length;updateDialog();if(!dialog.open)dialog.showModal();}
function updateDialog(){const p=dialogPages[currentIndex];dialogImg.src='assets/pages/'+p.src;dialogImg.alt=p.title+'. '+p.description;dialogCounter.textContent=`LÀMINA ${String(currentIndex+1).padStart(2,'0')} / ${dialogPages.length}`;dialogTitle.textContent=p.title;dialogDesc.textContent=p.period+' — '+p.description;}
orderButtons.forEach(b=>b.addEventListener('click',()=>{const hash=location.hash;renderPages(b.dataset.order);if(hash.startsWith('#lamina-'))document.getElementById(hash.slice(1))?.scrollIntoView({block:'start'});}));
document.getElementById('dialog-close').addEventListener('click',()=>dialog.close());
document.getElementById('dialog-prev').addEventListener('click',()=>openPage(currentIndex-1,dialogPages));
document.getElementById('dialog-next').addEventListener('click',()=>openPage(currentIndex+1,dialogPages));
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
document.addEventListener('keydown',e=>{if(!dialog.open)return;if(e.key==='ArrowRight'){e.preventDefault();openPage(currentIndex+1,dialogPages);}else if(e.key==='ArrowLeft'){e.preventDefault();openPage(currentIndex-1,dialogPages);}});
renderPages('chronological');
// Quan un enllaç apunta a una làmina generada amb JS, cal fer-hi scroll després de crear-la.
function scrollToInitialAnchor(){const id=decodeURIComponent(location.hash.slice(1));if(!id)return;const el=document.getElementById(id);if(el)requestAnimationFrame(()=>el.scrollIntoView({block:'start',behavior:'instant'}));}
window.addEventListener('load',scrollToInitialAnchor);


// Lector horitzontal: pàgines seguint l'ordre narratiu original.
const bookPages = [...pages].sort((a,b)=>a.narrative-b.narrative);
const bookRoot = document.getElementById('book-spread');
const bookCounter = document.getElementById('book-counter');
const bookChapter = document.getElementById('book-chapter');
const bookProgress = document.getElementById('book-progress');
const bookPrevious = document.getElementById('book-prev');
const bookNext = document.getElementById('book-next');
const compactBook = window.matchMedia('(max-width: 700px)');
let bookIndex = 0;
const bookStep = () => compactBook.matches ? 1 : 2;

function renderBook() {
  const step=bookStep();
  bookIndex=Math.max(0,Math.min(bookIndex,bookPages.length-1));
  if(step===2)bookIndex=Math.floor(bookIndex/2)*2;
  const shown=bookPages.slice(bookIndex,bookIndex+step);
  bookRoot.replaceChildren();
  bookRoot.classList.toggle('single-page',step===1);
  shown.forEach((page,idx)=>{
    const leaf=document.createElement('button');
    leaf.type='button';
    leaf.className='book-leaf';
    leaf.setAttribute('aria-label',`Ampliar pàgina ${bookIndex+idx+1}: ${page.title}`);
    leaf.title='Ampliar la il·lustració';
    const img=document.createElement('img');
    img.src='assets/pages/'+page.src;
    img.alt=page.title+' — '+page.description;
    img.decoding='async';
    img.loading='eager';
    const folio=document.createElement('span');
    folio.className='book-folio';
    folio.textContent=String(bookIndex+idx+1).padStart(2,'0');
    leaf.append(img,folio);
    leaf.addEventListener('click',()=>openPage(bookIndex+idx,bookPages));
    bookRoot.append(leaf);
  });
  const first=String(bookIndex+1).padStart(2,'0');
  const last=String(bookIndex+shown.length).padStart(2,'0');
  bookCounter.textContent=`${step===1?first:first+'–'+last} / ${bookPages.length}`;
  bookChapter.textContent=shown.map(p=>p.title).join(' · ');
  bookPrevious.disabled=bookIndex===0;
  bookNext.disabled=bookIndex+step>=bookPages.length;
  bookProgress.replaceChildren();
  const spreadCount=Math.ceil(bookPages.length/step);
  for(let s=0;s<spreadCount;s++){
    const dot=document.createElement('button');
    dot.type='button';
    dot.setAttribute('aria-label',`Anar a ${step===1?'la pàgina':'les pàgines'} ${s*step+1}${step===2?' i '+Math.min(s*step+2,bookPages.length):''}`);
    const active=Math.floor(bookIndex/step)===s;
    dot.className='book-progress-segment'+(active?' is-current':'');
    if(active)dot.setAttribute('aria-current','step');
    dot.addEventListener('click',()=>{bookIndex=s*step;renderBook();});
    bookProgress.append(dot);
  }
}
function turnBook(delta) {
  bookIndex += delta*bookStep();
  renderBook();
}
bookPrevious.addEventListener('click',()=>turnBook(-1));
bookNext.addEventListener('click',()=>turnBook(1));
compactBook.addEventListener('change',renderBook);
const bookSection=document.getElementById('comic');
bookSection.addEventListener('keydown',e=>{
  if(dialog.open||!bookSection.contains(document.activeElement))return;
  if(e.key==='ArrowRight'&&!bookNext.disabled){e.preventDefault();turnBook(1);}
  if(e.key==='ArrowLeft'&&!bookPrevious.disabled){e.preventDefault();turnBook(-1);}
});
let touchX=0,touchY=0;
bookRoot.addEventListener('touchstart',e=>{
  if(e.touches.length!==1)return;
  touchX=e.touches[0].clientX;
  touchY=e.touches[0].clientY;
},{passive:true});
bookRoot.addEventListener('touchend',e=>{
  if(e.changedTouches.length!==1)return;
  const deltaX=e.changedTouches[0].clientX-touchX;
  const deltaY=e.changedTouches[0].clientY-touchY;
  if(Math.abs(deltaX)>55&&Math.abs(deltaX)>Math.abs(deltaY)*1.3){
    if(deltaX<0&&!bookNext.disabled)turnBook(1);
    if(deltaX>0&&!bookPrevious.disabled)turnBook(-1);
    // Evita que un toc de lliscament obri també la imatge.
    swipeUntil=Date.now()+350;
  }
},{passive:true});
let swipeUntil=0;
bookRoot.addEventListener('click',e=>{if(Date.now()<swipeUntil)e.stopPropagation();},true);
renderBook();
