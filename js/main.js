// ===== Edit your services here =====
const services=[
 {id:'oil-filter',t:'Oil & Filter Service',d:'Premium synthetic oil change with full fluid top-up.',p:'From ₹1,499',img:'https://images.unsplash.com/photo-1635784063388-3b1b2f2f1f7b?auto=format&fit=crop&w=900&q=85',alt:'Car engine oil service'},
 {id:'engine-tuning',t:'Engine Diagnostics & Tuning',d:'ECU diagnostics, performance checks and engine tuning.',p:'From ₹3,999',img:'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=900&q=85',alt:'Mechanic checking a car engine'},
 {id:'brake-service',t:'Brake Service',d:'Brake pads, discs, fluid flush and ABS inspection.',p:'From ₹1,999',img:'https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&w=900&q=85',alt:'Car wheel and brake maintenance'},
 {id:'ac-repair',t:'Car AC Repair',d:'AC gas refill, compressor check and cabin filter replacement.',p:'From ₹1,299',img:'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=85',alt:'Modern car interior'},
 {id:'tyres-alignment',t:'Tyres & Wheel Alignment',d:'Wheel balancing, 3D alignment and tyre replacement.',p:'From ₹799',img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=85',alt:'Car tyre close up'},
 {id:'detailing',t:'Car Detailing',d:'Ceramic coating, paint protection and deep interior cleaning.',p:'From ₹2,499',img:'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=900&q=85',alt:'Professional car detailing'},
 {id:'battery-electrical',t:'Battery & Electrical',d:'Battery testing, replacement and electrical fault checks.',p:'From ₹499',img:'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=900&q=85',alt:'Car battery and electrical maintenance'},
 {id:'body-paint',t:'Body & Paint Repair',d:'Dent removal, scratch repair and professional repainting.',p:'From ₹2,999',img:'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=85',alt:'Polished sports car'}
];
const grid=document.getElementById('serviceGrid');
services.forEach((s,i)=>{
 grid.insertAdjacentHTML('beforeend',`<div class="service-slide"><a class="service-card" href="service-detail.html?service=${s.id}"><div class="service-image"><img src="${s.img}" alt="${s.alt}" loading="lazy"></div><div class="service-card-body"><span class="tag">SERVICE 0${i+1}</span><h5>${s.t}</h5><p>${s.d}</p><div class="service-card-bottom"><span class="price">${s.p}</span><span class="service-more">View details ↗</span></div></div></a></div>`);

});

// ===== Service Image Mouse Movement Effect =====
document.querySelectorAll('.service-image').forEach(container => {
  const image = container.querySelector('img');

  container.addEventListener('mousemove', () => {
    image.classList.add('color-active');
  });

  container.addEventListener('mouseleave', () => {
    image.classList.remove('color-active');
  });
});

// Responsive services carousel controls
let serviceIndex=0;
function moveServices(direction){
 const first=grid.querySelector('.service-slide');if(!first)return;
 const gap=parseFloat(getComputedStyle(grid).gap)||0;
 const step=first.getBoundingClientRect().width+gap;
 const visible=Math.max(1,Math.floor(grid.parentElement.getBoundingClientRect().width/step));
 const max=Math.max(0,services.length-visible);
 serviceIndex=Math.max(0,Math.min(max,serviceIndex+direction));
 grid.style.transform=`translateX(${-serviceIndex*step}px)`;
}
document.getElementById('servicePrev').addEventListener('click',()=>moveServices(-1));
document.getElementById('serviceNext').addEventListener('click',()=>moveServices(1));
window.addEventListener('resize',()=>{serviceIndex=0;grid.style.transform='translateX(0)'});
// loader
window.addEventListener('load',()=>setTimeout(()=>{document.getElementById('loader').classList.add('done');document.body.classList.add('loaded');runSpeedo()},1300));
// cursor
const c=document.getElementById('cursor');
document.addEventListener('mousemove',e=>{c.style.left=e.clientX+'px';c.style.top=e.clientY+'px'});
document.querySelectorAll('a,button,.card-s').forEach(el=>{el.addEventListener('mouseenter',()=>c.classList.add('hover'));el.addEventListener('mouseleave',()=>c.classList.remove('hover'))});
// navbar
const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>50));
document.querySelectorAll('#menu .nav-link').forEach(l=>l.addEventListener('click',()=>bootstrap.Collapse.getInstance(document.getElementById('menu'))?.hide()));
// reveal + counters
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');e.target.querySelectorAll('.count').forEach(count);io.unobserve(e.target)}}),{threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
function count(el){const to=+el.dataset.to;let n=0;const step=to/60;const t=setInterval(()=>{n+=step;if(n>=to){n=to;clearInterval(t)}el.textContent=Math.floor(n).toLocaleString()+(to>=1000?'+':'')},25)}
// speedometer
function runSpeedo(){const arc=document.getElementById('arc'),num=document.getElementById('speedNum');let v=0;const t=setInterval(()=>{v+=4;if(v>=320){v=320;clearInterval(t)}num.textContent=v;arc.style.strokeDashoffset=252-252*(v/340)},15)}
// 3D tilt + glow
document.querySelectorAll('.card-s').forEach(card=>{
 card.addEventListener('mousemove',e=>{const r=card.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;
  card.style.setProperty('--x',x+'px');card.style.setProperty('--y',y+'px');
  card.style.transform=`perspective(800px) rotateY(${(x/r.width-.5)*14}deg) rotateX(${-(y/r.height-.5)*14}deg)`});
 card.addEventListener('mouseleave',()=>card.style.transform='');
});

