const MODULES = [
  ['Weeks 1–2', 'HTML & CSS foundations', 'Semantic markup, the box model, flexbox and grid.',
    ['Semantic HTML & document structure', 'The box model & spacing', 'Flexbox in depth', 'CSS Grid layouts', 'Project: a personal landing page']],
  ['Weeks 3–4', 'Responsive design', 'Media queries, mobile-first layout, accessibility basics.',
    ['Mobile-first workflow', 'Media queries & breakpoints', 'Fluid type & spacing', 'Accessibility fundamentals', 'Project: a responsive portfolio']],
  ['Weeks 5–6', 'JavaScript core', 'Variables, functions, arrays, objects and control flow.',
    ['Values, variables & types', 'Functions & scope', 'Arrays & objects', 'Loops & conditionals', 'Project: a quiz engine']],
  ['Weeks 7–8', 'The DOM & events', 'Building interactive UIs and handling user input.',
    ['Selecting & updating the DOM', 'Events & delegation', 'Forms & validation', 'localStorage', 'Project: a task app']],
  ['Weeks 9–10', 'Async & APIs', 'Promises, fetch, and working with real data.',
    ['Callbacks → Promises', 'async / await', 'The fetch API', 'Rendering real data', 'Project: a weather dashboard']],
  ['Week 11', 'A UI framework', 'Components, state and props with a modern library.',
    ['Thinking in components', 'State & props', 'Lists & conditional rendering', 'Project: a component gallery']],
  ['Week 12', 'Ship it', 'Git, deployment, and your capstone project.',
    ['Git & GitHub workflow', 'Deploying to the web', 'Performance basics', 'Capstone build & demo']],
];
const KEY = 'codepath.done';
let done = JSON.parse(localStorage.getItem(KEY) || '[]');

function render() {
  const box = document.getElementById('modules');
  box.innerHTML = '';
  MODULES.forEach(([wk, title, body], i) => {
    const isDone = done.includes(i);
    const el = document.createElement('div');
    el.className = 'module reveal' + (isDone ? ' done' : '');
    el.style.animationDelay = (i * 60) + 'ms';
    el.innerHTML = `<div class="wk">${wk}</div><div class="chk">${isDone ? '✓' : ''}</div>
      <div><h3>${title}</h3><p>${body}</p></div><span class="open">Details →</span>`;
    el.onclick = () => openModule(i);
    box.appendChild(el);
  });
  const pct = Math.round(done.length / MODULES.length * 100);
  document.getElementById('bar').style.width = pct + '%';
  document.getElementById('progressLabel').textContent = pct + '% complete';
}

function openModule(i) {
  const [wk, title, body, topics] = MODULES[i];
  const isDone = done.includes(i);
  const bd = document.createElement('div'); bd.className = 'mod-bd';
  bd.innerHTML = `<div class="mod-dialog">
    <button class="mx" aria-label="Close">×</button>
    <span class="mwk">${wk}</span>
    <h3>${title}</h3><p class="mbody">${body}</p>
    <h4>You'll cover</h4>
    <ul class="mtopics">${topics.map(t => `<li>${t}</li>`).join('')}</ul>
    <button class="btn mtoggle">${isDone ? 'Mark as not done' : 'Mark complete ✓'}</button>
  </div>`;
  document.body.appendChild(bd);
  requestAnimationFrame(() => bd.classList.add('show'));
  const close = () => { bd.classList.remove('show'); setTimeout(() => bd.remove(), 220); };
  bd.querySelector('.mx').onclick = close;
  bd.onclick = e => { if (e.target === bd) close(); };
  bd.querySelector('.mtoggle').onclick = () => {
    const nowDone = !done.includes(i);
    done = nowDone ? [...done, i] : done.filter(x => x !== i);
    localStorage.setItem(KEY, JSON.stringify(done));
    render(); close();
    if (window.UI) {
      if (nowDone && done.length === MODULES.length) UI.toast('Curriculum complete — congrats! 🎓', 'success', 3400);
      else if (nowDone) UI.toast(`“${title}” done · ${done.length}/${MODULES.length}`, 'success');
    }
  };
}
render();
