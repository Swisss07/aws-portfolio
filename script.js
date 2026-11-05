(function(){
  document.getElementById('yr').textContent=new Date().getFullYear();

  // XP bar fills as you scroll
  var xp=document.getElementById('xp');
  function onScroll(){
    var h=document.documentElement.scrollHeight-window.innerHeight;
    xp.style.width=(h>0?Math.min(100,window.scrollY/h*100):0)+'%';
  }
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();

  // Advancement toasts when a section is reached
  var toast=document.getElementById('toast'),tt=document.getElementById('toast-text'),timer;
  function showToast(text){
    tt.textContent=text;toast.classList.add('show');
    clearTimeout(timer);timer=setTimeout(function(){toast.classList.remove('show')},3200);
  }
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(list){
      list.forEach(function(en){
        if(en.isIntersecting){showToast(en.target.dataset.adv);io.unobserve(en.target)}
      });
    },{threshold:.4});
    document.querySelectorAll('[data-adv]').forEach(function(s){io.observe(s)});
  }

  // Hotbar: click or press 1-9
  var slots=Array.prototype.slice.call(document.querySelectorAll('.slot'));
  var label=document.getElementById('item-name');
  function select(i){
    slots.forEach(function(s,n){s.setAttribute('aria-selected',n===i?'true':'false')});
    label.textContent=slots[i].dataset.name;
  }
  slots.forEach(function(s,i){s.addEventListener('click',function(){select(i)})});
  select(0);
  document.addEventListener('keydown',function(e){
    var tag=(e.target.tagName||'').toLowerCase();
    if(tag==='input'||tag==='textarea'||e.ctrlKey||e.metaKey||e.altKey)return;
    var n=parseInt(e.key,10);
    if(n>=1&&n<=9)select(n-1);
  });

  // Avatar tilts toward the pointer
  var av=document.getElementById('avatar');
  document.addEventListener('pointermove',function(e){
    var r=av.getBoundingClientRect();
    var dx=(e.clientX-(r.left+r.width/2))/window.innerWidth;
    var dy=(e.clientY-(r.top+r.height/2))/window.innerHeight;
    av.style.setProperty('--ry',(dx*40)+'deg');
    av.style.setProperty('--rx',(-dy*40)+'deg');
  });

  // Copy email
  var note=document.getElementById('note'),addr='arunkumarvannadil2007@gmail.com';
  document.getElementById('copy').addEventListener('click',function(){
    function done(ok){note.textContent=ok?'Email address copied to clipboard.':'Copy failed. Select the address above instead.'}
    try{
      if(navigator.clipboard&&navigator.clipboard.writeText){
        navigator.clipboard.writeText(addr).then(function(){done(true)},function(){done(false)});
      }else{
        var t=document.createElement('textarea');t.value=addr;document.body.appendChild(t);t.select();
        var ok=document.execCommand('copy');document.body.removeChild(t);done(ok);
      }
    }catch(e){done(false)}
  });
})();