(function(){
  const coinsEl = document.getElementById('coins');
  const workers = Array.from(document.querySelectorAll('.worker'));
  const resetBtn = document.getElementById('reset');
  const soundToggle = document.getElementById('soundToggle');
  const audioEl = document.getElementById('clickSound');

  const KEY='invos_coins_v1';
  let coins = parseInt(localStorage.getItem(KEY)||'0',10);

  function render(){
    coinsEl.textContent = coins.toLocaleString('cs-CZ') + ' Kč';
  }

  function clickCoin(){
    coins += 1;
    localStorage.setItem(KEY,String(coins));
    render();
    try{ if (!audioEl.muted){ audioEl.currentTime = 0; audioEl.play(); } }catch(e){}
  }

  workers.forEach(w => w.addEventListener('click', clickCoin));
  resetBtn.addEventListener('click', ()=>{ coins=0; localStorage.setItem(KEY,'0'); render(); });

  soundToggle.addEventListener('click', ()=>{
    audioEl.muted = !audioEl.muted;
    soundToggle.textContent = audioEl.muted ? '🔇 Zvuk' : '🔊 Zvuk';
  });

  render();

  // PWA install prompt
  let deferredPrompt;
  const installBtn = document.getElementById('install');
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.hidden = false;
  });
  if (installBtn){
    installBtn.addEventListener('click', async ()=>{
      if (!deferredPrompt) return;
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      installBtn.hidden = true;
      deferredPrompt = null;
    });
  }

  // Register service worker
  if ('serviceWorker' in navigator){
    navigator.serviceWorker.register('./sw.js');
  }
})();