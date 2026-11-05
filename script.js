(function(){
  document.documentElement.classList.add('js');
  document.getElementById('yr').textContent=new Date().getFullYear();

  // Spotlight follows the pointer in the hero
  var hero=document.getElementById('hero');
  hero.addEventListener('pointermove',function(e){
    var r=hero.getBoundingClientRect();
    hero.style.setProperty('--mx',(e.clientX-r.left)+'px');
    hero.style.setProperty('--my',(e.clientY-r.top)+'px');
  });

  // Reveal on scroll
  var els=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(list){
      list.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target)}});
    },{threshold:.15});
    els.forEach(function(el,i){el.style.transitionDelay=(i%3)*90+'ms';io.observe(el)});
  }else{els.forEach(function(el){el.classList.add('in')})}

  // Copy email
  var note=document.getElementById('note'),addr='arunkumarvannadil2007@gmail.com';
  document.getElementById('copy').addEventListener('click',function(){
    function done(ok){note.textContent=ok?'Email address copied.':'Copy failed. Select the address above instead.'}
    try{
      if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(addr).then(function(){done(true)},function(){done(false)})}
      else{var t=document.createElement('textarea');t.value=addr;document.body.appendChild(t);t.select();var ok=document.execCommand('copy');document.body.removeChild(t);done(ok)}
    }catch(e){done(false)}
  });
})();