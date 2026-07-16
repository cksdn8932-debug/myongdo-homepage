/* =============================================
   명도복지관 메인 JavaScript - main.js
   ============================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ─────────────────────────────
     1. 히어로 슬라이더
  ───────────────────────────── */
  const slides     = document.querySelectorAll('.slide');
  const indicators = document.querySelectorAll('.ind');
  const prevBtn    = document.querySelector('.prev-btn');
  const nextBtn    = document.querySelector('.next-btn');
  const playBtn    = document.querySelector('.play-btn');

  if (slides.length) {
    let current   = 0;
    let autoTimer = null;
    let isPlaying = true;

    function goTo(idx) {
      slides[current].classList.remove('active');
      indicators[current].classList.remove('active');
      current = (idx + slides.length) % slides.length;
      slides[current].classList.add('active');
      indicators[current].classList.add('active');
    }

    function startAuto() {
      autoTimer = setInterval(function () { goTo(current + 1); }, 5000);
      isPlaying = true;
      playBtn.innerHTML = '&#9646;&#9646;';
      playBtn.setAttribute('aria-label', '일시정지');
    }

    function stopAuto() {
      clearInterval(autoTimer);
      isPlaying = false;
      playBtn.innerHTML = '&#9654;';
      playBtn.setAttribute('aria-label', '재생');
    }

    prevBtn.addEventListener('click', function () { stopAuto(); goTo(current - 1); startAuto(); });
    nextBtn.addEventListener('click', function () { stopAuto(); goTo(current + 1); startAuto(); });
    playBtn.addEventListener('click', function () { isPlaying ? stopAuto() : startAuto(); });

    indicators.forEach(function (ind, i) {
      ind.addEventListener('click', function () { stopAuto(); goTo(i); startAuto(); });
    });

    startAuto();
  }

  /* ─────────────────────────────
     2. 알림마당 탭
  ───────────────────────────── */
  const tabs      = document.querySelectorAll('.news-tabs .tab');
  const newsLists = document.querySelectorAll('.news-list');
  const moreLink  = document.getElementById('tab-more-link');

  var tabUrls = {
    notice:  'news/news01.html',
    welfare: 'news/news02.html',
    news:    'news/news03.html',
    voice:   'news/news05.html'
  };

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var target = this.dataset.tab;

      tabs.forEach(function (t) { t.classList.remove('active'); });
      this.classList.add('active');

      newsLists.forEach(function (list) { list.classList.remove('active'); });
      var targetList = document.getElementById('tab-' + target);
      if (targetList) targetList.classList.add('active');

      if (moreLink && tabUrls[target]) {
        moreLink.href = tabUrls[target];
      }
    });
  });

  /* ─────────────────────────────
     3. 이미지 로드 실패 시 처리
  ───────────────────────────── */
  document.querySelectorAll('.photo-thumb img').forEach(function (img) {
    img.addEventListener('error', function () {
      this.parentElement.classList.add('placeholder');
      var span = document.createElement('span');
      span.textContent = '사진 영역';
      this.parentElement.appendChild(span);
      this.remove();
    });
  });

});
