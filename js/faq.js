const FAQ = [
  ['Do I need any experience?', 'No. The curriculum starts from absolute basics and builds up gradually, one project at a time.'],
  ['How much time per week?', 'Plan for 10–15 focused hours a week. Everything is self-paced, so you can go faster or slower.'],
  ['Is it really free?', 'This is a demo platform, so yes — all content here is open. Your progress is saved locally in your browser.'],
  ['Will I build a portfolio?', 'Yes. Every module ends in a project, and the final two weeks are a capstone you can show employers.'],
  ['What do I need installed?', 'Just a browser and a free code editor. We cover the terminal and Git along the way.'],
];
const box = document.getElementById('faq');
box.innerHTML = FAQ.map(([q, a]) =>
  `<div class="qa"><button>${q}<span>+</span></button><div class="a"><p>${a}</p></div></div>`).join('');
box.querySelectorAll('.qa button').forEach(btn => btn.onclick = () => {
  const qa = btn.parentElement;
  qa.classList.toggle('open');
  btn.querySelector('span').textContent = qa.classList.contains('open') ? '−' : '+';
});
