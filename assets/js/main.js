/* ==========================================================================
   greynomy — 사진·영상 포트폴리오
   외부 라이브러리를 쓰지 않습니다. 이 파일 하나로 동작합니다.
   ========================================================================== */

(function () {
  "use strict";

  /* ---------------------------------------------------------------
     푸터 연도 — 해가 바뀌어도 직접 고칠 필요가 없도록 자동으로 채웁니다.
     --------------------------------------------------------------- */
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  /* ---------------------------------------------------------------
     영상 — 썸네일만 먼저 보여주고, 누를 때 재생기를 넣습니다.

     이렇게 하면 페이지를 열자마자 YouTube 스크립트를 내려받지 않아
     로딩이 빠르고, 방문자가 재생하기 전까지는 YouTube에 아무것도
     기록되지 않습니다.
     --------------------------------------------------------------- */
  var frames = document.querySelectorAll(".video-frame");

  Array.prototype.forEach.call(frames, function (frame) {
    var id = frame.getAttribute("data-youtube");

    // 아직 영상 ID를 넣지 않은 자리 표시용 카드는 건너뜁니다.
    if (!id) return;

    // YouTube가 제공하는 썸네일을 배경으로 깔아줍니다.
    frame.style.backgroundImage =
      "url(https://i.ytimg.com/vi/" + encodeURIComponent(id) + "/maxresdefault.jpg)";

    function play() {
      var iframe = document.createElement("iframe");
      // nocookie 도메인은 재생 전까지 추적 쿠키를 남기지 않습니다.
      iframe.src =
        "https://www.youtube-nocookie.com/embed/" +
        encodeURIComponent(id) +
        "?autoplay=1&rel=0";
      iframe.title = frame.getAttribute("aria-label") || "영상";
      iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture";
      iframe.allowFullscreen = true;

      frame.innerHTML = "";
      frame.appendChild(iframe);
      frame.style.cursor = "default";
      frame.removeAttribute("role");
      frame.removeAttribute("tabindex");
    }

    frame.addEventListener("click", play);

    // 마우스 없이 키보드만으로도 재생할 수 있어야 합니다.
    frame.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        play();
      }
    });
  });

  /* ---------------------------------------------------------------
     사진 확대 보기
     --------------------------------------------------------------- */
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightbox-img");

  if (!lightbox || !lightboxImg) return;

  var closeBtn = lightbox.querySelector(".lightbox-close");
  var lastFocused = null;

  function openLightbox(img) {
    lastFocused = document.activeElement;
    lightboxImg.src = img.currentSrc || img.src;
    lightboxImg.alt = img.alt;
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    if (closeBtn) closeBtn.focus();
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lightboxImg.src = "";
    lightboxImg.alt = "";
    document.body.style.overflow = "";
    // 닫은 뒤 원래 보던 사진으로 초점을 되돌려줍니다.
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  // 사진은 나중에 추가될 수 있으므로, 개별 이미지가 아니라
  // 그리드 전체에 한 번만 이벤트를 겁니다.
  var grid = document.querySelector(".photo-grid");
  if (grid) {
    grid.addEventListener("click", function (e) {
      var img = e.target.closest(".photo img");
      if (img) openLightbox(img);
    });
  }

  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);

  // 사진 바깥의 어두운 영역을 누르면 닫힙니다.
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !lightbox.hidden) closeLightbox();
  });
})();
