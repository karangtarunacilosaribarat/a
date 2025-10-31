// THEME: auto/on/off via settings.main.darkMode
window.applyTheme = function(mode){
  const root = document.documentElement;
  function setDark(){ root.removeAttribute('data-theme'); }
  function setLight(){ root.setAttribute('data-theme','light'); }
  if(mode === 'on'){ setDark(); return; }      // on => dark
  if(mode === 'off'){ setLight(); return; }    // off => light
  // auto: follow prefers-color-scheme
  const mq = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
  if(mq && mq.matches){ setDark(); } else { setLight(); }
  if(mq && mq.addEventListener){
    mq.addEventListener('change', e=>{ e.matches ? setDark() : setLight(); });
  }
};

(async function initTheme(){
  try{
    if(window.firebase && firebase.firestore){
      const snap = await firebase.firestore().collection('settings').doc('main').get();
      const s = snap.data()||{};
      window.applyTheme(s.darkMode || 'auto');
    } else {
      window.applyTheme('auto');
    }
  }catch(e){ window.applyTheme('auto'); }
})();
