/* Ekant portfolio: interactions */
(function(){
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* hero glow follows cursor */
  var hero = document.getElementById('hero');
  hero.addEventListener('pointermove', function(e){
    var r = hero.getBoundingClientRect();
    hero.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    hero.style.setProperty('--my', (e.clientY - r.top) + 'px');
  });

  /* rotating words */
  var words = ['full-stack apps','REST APIs','Angular interfaces','modern .NET systems','automation tools'];
  var rot = document.getElementById('rot'), wi = 0;
  if(!reduce) setInterval(function(){
    wi = (wi + 1) % words.length;
    var s = document.createElement('span'); s.id = 'rot'; s.textContent = words[wi];
    rot.parentNode.replaceChild(s, rot); rot = s;
  }, 2400);

  /* counters */
  if(!reduce && 'IntersectionObserver' in window){
    var io = new IntersectionObserver(function(es){
      es.forEach(function(en){
        if(!en.isIntersecting) return;
        var el = en.target, end = +el.dataset.count, t0 = null;
        function step(t){ if(!t0) t0 = t; var p = Math.min((t - t0) / 900, 1); el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))); if(p < 1) requestAnimationFrame(step); }
        requestAnimationFrame(step); io.unobserve(el);
      });
    }, {threshold:.6});
    document.querySelectorAll('[data-count]').forEach(function(el){ io.observe(el); });
  }

  /* terminal */
  var out = document.getElementById('out'), term = document.getElementById('term'), input = document.getElementById('term-input');
  var C = {
    help: '<span class="d">Available commands:</span>\n  <span class="k">whoami</span>     who I am\n  <span class="k">skills</span>     what I work with\n  <span class="k">projects</span>   things I have built\n  <span class="k">experience</span> where I have worked\n  <span class="k">contact</span>    how to reach me\n  <span class="k">hire ekant</span> try it\n  <span class="k">clear</span>      clear the screen',
    whoami: '<span class="g">Ekant</span>, Software Engineer at Bosch Global Software Technologies\nFull-stack .NET + Angular · 4+ years · Bengaluru\nI build APIs, clean UIs and modernize legacy systems.',
    skills: '<span class="k">backend </span>  C#, ASP.NET, .NET Core 8, REST APIs, Java\n<span class="k">frontend</span>  Angular 21, HTML, CSS\n<span class="k">data    </span>  Oracle SQL\n<span class="k">ops     </span>  IIS hosting, deployments, releases\n<span class="k">tools   </span>  Visual Studio, Git, Swagger, Postman, Copilot, JIRA',
    projects: '<span class="g">✓</span> SendToPlant 3.0   WCF + MVC → .NET Core + Angular\n<span class="g">✓</span> webFLOW           WCF → Web API, full UI redesign\n<span class="g">✓</span> Log monitor       manual checks → instant alerts\n<span class="g">✓</span> Angular upgrades  3 apps, v7/v11 → v21\n<span class="d">scroll down for details ↓</span>',
    experience: '<span class="k">2024–now</span>  .NET / Angular engineer · PDT Tools suite (10 apps)\n<span class="k">2022–2024</span> Java developer · IPE planning platform\n<span class="k">2018–2022</span> B.E. Computer Science · CGPA 8.41',
    contact: 'email     <span class="g">shuklaekant@gmail.com</span>\nresume    download it in the Contact section\nlinkedin  linkedin.com/in/ekant-38934a222',
    'hire ekant': '<span class="d">Checking requirements...</span>\n  <span class="g">✓</span> full-stack .NET + Angular\n  <span class="g">✓</span> legacy modernization\n  <span class="g">✓</span> production ownership\n<span class="g">All checks passed.</span> Send an email to make it official.'
  };
  function line(html){ var d = document.createElement('div'); d.className = 'l'; d.innerHTML = html; out.appendChild(d); term.scrollTop = term.scrollHeight; }
  function run(cmd){
    cmd = cmd.trim().toLowerCase(); if(!cmd) return;
    line('<span class="p">ekant ~ $</span> ' + cmd.replace(/</g,'&lt;'));
    if(cmd === 'clear'){ out.innerHTML = ''; return; }
    if(cmd === 'sudo hire ekant') cmd = 'hire ekant';
    line(C[cmd] || 'command not found: ' + cmd.replace(/</g,'&lt;') + '\n<span class="d">type</span> <span class="k">help</span> <span class="d">to see what I can do</span>');
  }
  document.getElementById('term-form').addEventListener('submit', function(e){ e.preventDefault(); run(input.value); input.value = ''; });
  document.getElementById('hints').addEventListener('click', function(e){ var b = e.target.closest('button'); if(b) run(b.dataset.cmd); });
  term.addEventListener('click', function(){ if(!getSelection().toString()) input.focus({preventScroll:true}); });

  // intro: type "whoami" then show output
  line('<span class="d">Welcome. This terminal is live, try a command.</span>');
  if(reduce){ run('whoami'); line('<span class="d">type</span> <span class="k">help</span> <span class="d">for more</span>'); }
  else {
    var demo = 'whoami', i = 0;
    var typer = setInterval(function(){
      input.value = demo.slice(0, ++i);
      if(i === demo.length){ clearInterval(typer); setTimeout(function(){ input.value=''; run(demo); line('<span class="d">type</span> <span class="k">help</span> <span class="d">for more</span>'); }, 350); }
    }, 110);
  }

  /* capabilities */
  var caps = [
    {t:'Backend & APIs', h:'Fast, well-structured APIs in C# and .NET', p:'I design and build the services that power applications: clean REST endpoints, sensible data models and code that other developers can pick up easily.',
     pts:['Built REST APIs in C# and ASP.NET for multiple application modules','Moved WCF services to .NET Core 8 and upgraded legacy .NET Framework code','Document and test endpoints with Swagger and Postman','Started my career building features in Java'],
     tools:['C#','ASP.NET','.NET Core 8','REST','Swagger','Postman','Java'],
     code:'<span class="t">[ApiController]</span>\n<span class="t">[Route</span>(<span class="s">"api/releases"</span>)<span class="t">]</span>\n<span class="k">public class</span> ReleasesController : ControllerBase\n{\n  <span class="t">[HttpGet</span>(<span class="s">"{id}"</span>)<span class="t">]</span>\n  <span class="k">public async</span> Task&lt;IActionResult&gt; Get(<span class="k">int</span> id)\n  {\n    <span class="k">var</span> release = <span class="k">await</span> _service.FindAsync(id);\n    <span class="k">return</span> release <span class="k">is null</span> ? NotFound() : Ok(release);\n  }\n}'},
    {t:'Frontend & UI', h:'Interfaces that are clear and easy to use', p:'I build the screens people work in every day, with a focus on clean layouts, consistent components and getting users to their task quickly.',
     pts:['Develop user interfaces in Angular, HTML and CSS','Upgraded three production apps from Angular 7 and 11 to Angular 21','Delivered a full UI redesign as part of the webFLOW modernization','Build reusable components that keep apps consistent'],
     tools:['Angular 21','HTML','CSS','Component design'],
     code:'<span class="t">@Component</span>({\n  selector: <span class="s">\'app-release-list\'</span>,\n  standalone: <span class="k">true</span>,\n  template: <span class="s">`\n    @for (r of releases(); track r.id) {\n      &lt;release-card [release]="r" /&gt;\n    }`</span>\n})\n<span class="k">export class</span> ReleaseListComponent {\n  releases = inject(ReleaseService).all;\n}'},
    {t:'Legacy modernization', h:'Bringing old systems up to date safely', p:'Most of my recognized work is here: taking aging, business-critical applications and moving them to a modern stack without disrupting the people who depend on them.',
     pts:['Migrated SendToPlant from WCF + MVC to .NET Core + Angular (v3.0.0)','Replaced the webFLOW backend with a Web API and redesigned its UI','Jumped three apps across many Angular major versions','Upgraded older .NET Framework projects'],
     tools:['WCF → .NET Core','MVC → Angular','Angular 7/11 → 21','.NET Framework upgrades'],
     code:'<span class="c">// migration checklist</span>\n<span class="g s">✓</span> map every WCF contract to a REST route\n<span class="s">✓</span> keep request/response shapes stable\n<span class="s">✓</span> rebuild UI screen by screen in Angular\n<span class="s">✓</span> test old vs new side by side\n<span class="s">✓</span> release, monitor, retire legacy'},
    {t:'Automation & tools', h:'Removing repetitive work from the team', p:'When I see a task people repeat by hand, I write a tool for it. Small utilities free up time and catch problems earlier.',
     pts:['Built a log monitor that alerts owners on errors or app stoppage','Wrote .NET utilities that automate repetitive data and file tasks','Developed Windows desktop applications for internal projects'],
     tools:['.NET console apps','Windows desktop','Scheduled jobs','Alerting'],
     code:'<span class="k">foreach</span> (<span class="k">var</span> app <span class="k">in</span> monitoredApps)\n{\n  <span class="k">if</span> (!app.IsRunning() || app.Logs.HasNewErrors())\n  {\n    <span class="k">await</span> alerts.NotifyOwnerAsync(app);\n  }\n}'},
    {t:'Data & databases', h:'Keeping application data accurate', p:'I work directly with relational databases to query, maintain and fix the data applications depend on.',
     pts:['Maintain application data in Oracle using SQL Developer','Query data to investigate issues and support releases','Automate routine data maintenance with .NET utilities'],
     tools:['Oracle SQL','SQL Developer','Data maintenance'],
     code:'<span class="k">SELECT</span> r.release_id, r.status, p.plant_name\n  <span class="k">FROM</span> releases r\n  <span class="k">JOIN</span> deliveries d <span class="k">ON</span> d.release_id = r.release_id\n  <span class="k">JOIN</span> plants p <span class="k">ON</span> p.plant_id = d.plant_id\n <span class="k">WHERE</span> r.status = <span class="s">\'PENDING\'</span>;'},
    {t:'Deployment & ownership', h:'Shipping it, and keeping it running', p:'I own two production applications. That means deployments, release planning, user support and making sure things stay up.',
     pts:['Host and deploy web apps and APIs on IIS servers','Support release activities in Agile / Scrum sprints','Application owner for Archiver and SendToPlant','Track work and coordinate releases in JIRA'],
     tools:['IIS','Server deployment','Git','JIRA','Agile / Scrum'],
     code:'<span class="c"># release day</span>\n<span class="s">$</span> git tag v3.0.0\n<span class="s">$</span> dotnet publish -c Release\n<span class="s">$</span> deploy --target iis --site SendToPlant\n<span class="g s">✓</span> health check passed\n<span class="s">✓</span> owners notified'}
  ];
  var list = document.getElementById('cap-list'), panel = document.getElementById('cap-panel');
  var arrow = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  caps.forEach(function(c, i){
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'cap-btn'; b.id = 'cap-' + i; b.setAttribute('role','tab');
    b.innerHTML = '<span class="n">0' + (i+1) + '</span>' + c.t + arrow;
    b.addEventListener('click', function(){ show(i); });
    list.appendChild(b);
  });
  function show(i){
    var c = caps[i];
    list.querySelectorAll('.cap-btn').forEach(function(b, j){ b.setAttribute('aria-selected', j === i ? 'true' : 'false'); });
    panel.style.animation = 'none'; void panel.offsetWidth; panel.style.animation = '';
    panel.innerHTML = '<div class="info"><span class="eyebrow">' + c.t + '</span><h3>' + c.h + '</h3><p>' + c.p + '</p><ul>' +
      c.pts.map(function(x){ return '<li>' + x + '</li>'; }).join('') + '</ul><div class="tools">' +
      c.tools.map(function(x){ return '<span>' + x + '</span>'; }).join('') + '</div></div>' +
      '<div class="code"><span class="cap-t">Example</span><pre>' + c.code + '</pre></div>';
  }
  show(0);

  /* before/after switch */
  var sv = document.getElementById('stackview'), L = document.getElementById('sw-legacy'), M = document.getElementById('sw-modern');
  function setStack(modern){
    sv.classList.toggle('modern', modern);
    L.setAttribute('aria-pressed', !modern); M.setAttribute('aria-pressed', modern);
    document.getElementById('sv-fe').textContent = modern ? 'Angular' : 'ASP.NET MVC';
    document.getElementById('sv-be').textContent = modern ? '.NET Core REST API' : 'WCF services';
  }
  L.addEventListener('click', function(){ setStack(false); });
  M.addEventListener('click', function(){ setStack(true); });


  /* bosch project switcher */
  var tabs = document.querySelectorAll('.ptab'), zones = document.querySelectorAll('.vm .zone');
  function pick(p){
    tabs.forEach(function(t){ t.setAttribute('aria-selected', t.dataset.p === p ? 'true' : 'false'); });
    zones.forEach(function(z){ z.classList.toggle('on', z.dataset.p === p); });
    ['pdt','ipe'].forEach(function(k){
      document.getElementById('panel-' + k).hidden = k !== p;
      document.getElementById('vis-' + k).hidden = k !== p;
      document.getElementById('seg-' + k).classList.toggle('on', k === p);
    });
    if(p === 'ipe'){ document.querySelectorAll('#board .bar').forEach(function(b){ b.style.animation = 'none'; void b.offsetWidth; b.style.animation = ''; }); }
  }
  tabs.forEach(function(t){ t.addEventListener('click', function(){ pick(t.dataset.p); }); });
  zones.forEach(function(z){
    z.addEventListener('click', function(){ pick(z.dataset.p); });
    z.addEventListener('keydown', function(e){ if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); pick(z.dataset.p); } });
  });


  /* PDT architecture map */
  var T = {
    pver:{k:'Input',n:'Release package',r:'The finished, approved software release. It enters the suite here and travels through every tool below until it is handed to the plant systems.',m:'Built and supported the tools that carry each release from intake to handover.'},
    adapter:{k:'Intake',n:'Intake service',r:'Receives the incoming release package and hands it to the build engine.',m:'Contributed as part of the team that builds and maintains all 10 tools in the suite.'},
    toolchain:{k:'Build engine',n:'Build engine',r:'Receives releases from the intake service, with input from the sync service, and runs all three build stages on each one.',m:'Contributed as part of the team that builds and maintains all 10 tools in the suite.'},
    pdtlt:{k:'Suite tool',n:'Sync service',r:'Keeps data in step with the upstream data source in both directions and feeds the build engine.',m:'Contributed as part of the team that builds and maintains all 10 tools in the suite.'},
    cenv:{k:'Suite tool',n:'Data source',r:'An upstream system that shares data with the sync service in both directions.',m:'Contributed as part of the team that builds and maintains all 10 tools in the suite.'},
    steps:{k:'Build pipeline',n:'Three-stage build pipeline',r:'The build engine runs all three stages for every release. Each run is tracked in webFLOW, and users can also start these runs themselves from webFLOW.',m:'Worked on the webFLOW backend and UI that track these runs and let users trigger them.'},
    webflow:{k:'Workflow & tracking',n:'webFLOW',r:'The control center of the suite. It tracks every build-stage run, lets users trigger runs themselves, and hands finished releases on to SendToPlant.',m:'Modernized it: moved the backend from WCF to Web API and delivered a full UI redesign. Recognized for this work.'},
    send:{k:'Handover',n:'SendToPlant',r:'Comes right after webFLOW. Bosch and OEM users rely on it to send finished releases through SAP to their plants.',m:'Application owner. Migrated it from WCF + MVC to .NET Core + Angular, released as SendToPlant 3.0.0. Recognized for this work.'},
    sap:{k:'Destination',n:'SAP / Plant',r:'The plant systems at Bosch and at OEMs, which receive the software through SAP.',m:'SendToPlant, which I own, is the tool teams use to send releases here.'},
    archiver:{k:'Long-term storage',n:'Archiver',r:'Keeps every release and its job for 35 years, so any release can be traced and retrieved decades later.',m:'Application owner, responsible for its features, stability, deployments and support.'},
    pdtdb:{k:'Core database & service',n:'Core database',r:'The main database and service of the suite. It comes into play at every step, from intake to handover.',m:'Maintained application data using Oracle SQL Developer and automated routine tasks with .NET utilities.'}
  };
  var toolEls = document.querySelectorAll('.arch .tool'), tinfo = document.getElementById('tinfo');
  function tsel(k){
    var d = T[k]; if(!d) return;
    toolEls.forEach(function(g){ g.classList.toggle('sel', g.dataset.k === k); });
    document.getElementById('ti-kind').textContent = d.k;
    document.getElementById('ti-name').textContent = d.n;
    document.getElementById('ti-role').textContent = d.r;
    document.getElementById('ti-mine').textContent = d.m;
    tinfo.style.animation = 'none'; void tinfo.offsetWidth; tinfo.style.animation = '';
  }
  toolEls.forEach(function(g){
    g.setAttribute('aria-label', T[g.dataset.k].n);
    g.addEventListener('click', function(){ tsel(g.dataset.k); });
    g.addEventListener('keydown', function(e){ if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); tsel(g.dataset.k); } });
  });
  tsel('webflow');

  /* nav scrollspy */
  var navLinks = document.querySelectorAll('.nav a:not(.pill)');
  if('IntersectionObserver' in window){
    var spy = new IntersectionObserver(function(es){
      es.forEach(function(en){
        if(!en.isIntersecting) return;
        navLinks.forEach(function(a){ a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id); });
      });
    }, {rootMargin:'-45% 0px -50% 0px'});
    navLinks.forEach(function(a){ var t = document.querySelector(a.getAttribute('href')); if(t) spy.observe(t); });
  }

  /* copy buttons */
  document.querySelectorAll('button.copy').forEach(function(btn){
    btn.addEventListener('click', function(){
      var el = document.getElementById(btn.dataset.copy), text = el.textContent.trim();
      var reset = function(){ setTimeout(function(){ btn.textContent = 'Copy'; }, 1600); };
      var fallback = function(){ var r = document.createRange(); r.selectNodeContents(el); var s = getSelection(); s.removeAllRanges(); s.addRange(r); btn.textContent = 'Selected'; reset(); };
      try { navigator.clipboard.writeText(text).then(function(){ btn.textContent = 'Copied'; reset(); }, fallback); } catch(e){ fallback(); }
    });
  });
})();
