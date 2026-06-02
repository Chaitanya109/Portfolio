// ===== Typing effect =====
const typedEl = document.getElementById('typed');
const phrases = [
  'Aspiring Cloud Engineer',
  'Computer Science Student',
  'Python Developer',
  'Cloud Computing Enthusiast'
];
let pIdx = 0, cIdx = 0, deleting = false;
function type(){
  const cur = phrases[pIdx];
  typedEl.textContent = cur.substring(0, cIdx);
  if(!deleting && cIdx < cur.length){ cIdx++; setTimeout(type,90); }
  else if(deleting && cIdx > 0){ cIdx--; setTimeout(type,45); }
  else { deleting = !deleting; if(!deleting) pIdx = (pIdx+1) % phrases.length; setTimeout(type,1200); }
}
type();

// ===== Navbar scroll =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll',()=>{
  navbar.classList.toggle('scrolled', window.scrollY > 30);
  document.getElementById('backToTop').classList.toggle('show', window.scrollY > 400);
});

// ===== Mobile menu =====
const toggle = document.getElementById('menuToggle');
const links = document.getElementById('navLinks');
toggle.addEventListener('click',()=>links.classList.toggle('open'));
links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>links.classList.remove('open')));

// ===== Reveal on scroll =====
const revealEls = document.querySelectorAll('.section, .timeline-item, .project-card, .cert-card, .skill-group, .stat-card');
revealEls.forEach(el=>el.classList.add('reveal'));
const io = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('visible');
      // animate skill bars
      e.target.querySelectorAll('.fill').forEach(f=>{
        f.style.width = f.dataset.width + '%';
      });
      io.unobserve(e.target);
    }
  });
},{threshold:.12});
revealEls.forEach(el=>io.observe(el));

// ===== Back to top =====
document.getElementById('backToTop').addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

// ===== Contact form =====
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');
form.addEventListener('submit',e=>{
  e.preventDefault();
  status.textContent = '✓ Thanks! Your message has been recorded. I\'ll reach out soon.';
  form.reset();
  setTimeout(()=>status.textContent='',5000);
});

// ===== Year =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Force resume download =====
const dl = document.getElementById('downloadResume');
if (dl) {
  dl.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('resume.pdf');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'V_Sri_Chaitanya_Resume.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (err) {
      window.location.href = 'resume.pdf';
    }
  });
}
