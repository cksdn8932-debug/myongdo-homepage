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


document.addEventListener("DOMContentLoaded", function() {
  const tabButtons = document.querySelectorAll(".org-tab-btn");
  const staffCards = document.querySelectorAll(".staff-card");

  tabButtons.forEach(button => {
    button.addEventListener("click", function() {
      // 1. 활성화된 탭 스타일 처리
      tabButtons.forEach(btn => btn.classList.remove("active"));
      this.classList.add("active");

      // 2. 필터 타겟값 가져오기
      const targetDept = this.getAttribute("data-target");

      // 3. 직원 카드 필터링 동작 (애니메이션 효과 포함)
      staffCards.forEach(card => {
        const cardDept = card.getAttribute("data-dept");

        if (targetDept === "all" || cardDept === targetDept) {
          // 화면에 서서히 보이게 처리
          card.style.display = "flex";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "scale(1)";
          }, 50);
        } else {
          // 화면에서 보이지 않게 처리
          card.style.opacity = "0";
          card.style.transform = "scale(0.95)";
          setTimeout(() => {
            card.style.display = "none";
          }, 200); // 트랜지션 시간 후 display 제거
        }
      });
    });
  });
});
document.addEventListener("DOMContentLoaded", function() {
  
  // ============================================
  // 1. 4단 서브 탭 연동 구현
  // ============================================
  const mainTabButtons = document.querySelectorAll(".main-tab-btn");
  const tabPanels = document.querySelectorAll(".tab-content-panel");

  mainTabButtons.forEach(btn => {
    btn.addEventListener("click", function() {
      // 모든 대분류 탭 비활성화
      mainTabButtons.forEach(b => b.classList.remove("active"));
      tabPanels.forEach(p => p.classList.remove("active"));

      // 클릭한 탭 활성화
      this.classList.add("active");
      const activeTabId = this.getAttribute("data-tab");
      document.getElementById(activeTabId).classList.add("active");
    });
  });

  // ============================================
  // 2. [4번 탭] 직원 소분류 부서 필터 구현
  // ============================================
  const filterButtons = document.querySelectorAll(".filter-btn");
  const staffCards = document.querySelectorAll(".staff-card");

  filterButtons.forEach(btn => {
    btn.addEventListener("click", function() {
      // 부서 필터 버튼 클래스 토글
      filterButtons.forEach(b => b.classList.remove("active"));
      this.classList.add("active");

      const deptTarget = this.getAttribute("data-dept");

      staffCards.forEach(card => {
        const cardCategory = card.getAttribute("data-category");

        if (deptTarget === "all" || cardCategory === deptTarget) {
          card.style.setProperty("display", "flex", "important");
        } else {
          card.style.setProperty("display", "none", "important");
        }
      });
    });
  });

});