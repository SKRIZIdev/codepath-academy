const MODULES = [
  ['Weeks 1–2', 'HTML & CSS foundations', 'Semantic markup, the box model, flexbox and grid.'],
  ['Weeks 3–4', 'Responsive design', 'Media queries, mobile-first layout, accessibility basics.'],
  ['Weeks 5–6', 'JavaScript core', 'Variables, functions, arrays, objects and control flow.'],
  ['Weeks 7–8', 'The DOM & events', 'Building interactive UIs and handling user input.'],
  ['Weeks 9–10', 'Async & APIs', 'Promises, fetch, and working with real data.'],
  ['Week 11', 'A UI framework', 'Components, state and props with a modern library.'],
  ['Week 12', 'Ship it', 'Git, deployment, and your capstone project.'],
];
const KEY = 'codepath.done';
let done = JSON.parse(localStorage.getItem(KEY) || '[]');
function render() {
  const box = document.getElementById('modules');
  box.innerHTML = '';
  MODULES.forEach(([wk, title, body], i) => {
    const isDone = done.includes(i);
    const el = document.createElement('div');
    el.className = 'module' + (isDone ? ' done' : '');
    el.innerHTML = `<div class="wk">${wk}</div><div class="chk">${isDone ? '✓' : ''}</div>
      <div><h3>${title}</h3><p>${body}</p></div>`;
    el.onclick = () => {
      done = done.includes(i) ? done.filter(x => x !== i) : [...done, i];
      localStorage.setItem(KEY, JSON.stringify(done)); render();
    };
    box.appendChild(el);
  });
  const pct = Math.round(done.length / MODULES.length * 100);
  document.getElementById('bar').style.width = pct + '%';
  document.getElementById('progressLabel').textContent = pct + '% complete';
}
render();
