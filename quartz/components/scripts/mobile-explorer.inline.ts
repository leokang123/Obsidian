document.addEventListener("nav", () => {
  if (window.innerWidth > 800) return;

  const sidebar = document.querySelector(".sidebar.left") as HTMLElement | null;
  if (!sidebar) return;

  const MAX_HIDE_PERCENT = 72;
  const SNAP_THRESHOLD = 0.45;

  let progress = 0;
  let startY = 0;
  let startProgress = 0;
  let dragging = false;
  let rafId = 0;

  const clamp = (value: number, min: number, max: number) =>
    Math.min(max, Math.max(min, value));

  const applyUI = () => {
    const translate = -MAX_HIDE_PERCENT * progress;
    const opacity = 1 - progress * 0.8;

    sidebar.style.transform = `translateY(${translate}%)`;
    sidebar.style.opacity = `${opacity}`;
    sidebar.style.pointerEvents = progress > 0.98 ? "none" : "auto";
  };

  const scheduleApply = () => {
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(applyUI);
  };

  const snapTo = (target: 0 | 1) => {
    progress = target;
    sidebar.classList.remove("mobile-dragging");
    scheduleApply();
  };

  const onTouchStart = (e: TouchEvent) => {
    if (window.innerWidth > 800) return;

    startY = e.touches[0].clientY;
    startProgress = progress;
    dragging = true;
    sidebar.classList.add("mobile-dragging");
  };

  const onTouchMove = (e: TouchEvent) => {
    if (!dragging) return;

    const currentY = e.touches[0].clientY;
    const deltaY = currentY - startY;

    // 위로 드래그하면 progress 증가(숨김 방향)
    // 아래로 드래그하면 progress 감소(표시 방향)
    const deltaProgress = -deltaY / 180;
    progress = clamp(startProgress + deltaProgress, 0, 1);
    scheduleApply();
  };

  const onTouchEnd = () => {
    if (!dragging) return;
    dragging = false;

    if (progress >= SNAP_THRESHOLD) {
      snapTo(1);
    } else {
      snapTo(0);
    }
  };

  let lastScrollY = window.scrollY;
  let scrollAccumulator = 0;
  let ticking = false;

  const HIDE_SCROLL_THRESHOLD = 110;
  const SHOW_SCROLL_THRESHOLD = 80;

  const updateOnScroll = () => {
    const currentScrollY = window.scrollY;
    const diff = currentScrollY - lastScrollY;

    if (dragging) {
      ticking = false;
      return;
    }

    if (currentScrollY <= 8) {
      scrollAccumulator = 0;
      snapTo(0);
      lastScrollY = currentScrollY;
      ticking = false;
      return;
    }

    if (Math.abs(diff) < 4) {
      ticking = false;
      return;
    }

    if (diff > 0) {
      scrollAccumulator += diff;
      if (scrollAccumulator >= HIDE_SCROLL_THRESHOLD) {
        scrollAccumulator = 0;
        snapTo(1);
      }
    } else {
      scrollAccumulator += diff;
      if (Math.abs(scrollAccumulator) >= SHOW_SCROLL_THRESHOLD) {
        scrollAccumulator = 0;
        snapTo(0);
      }
    }

    lastScrollY = currentScrollY;
    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(updateOnScroll);
      ticking = true;
    }
  };

  applyUI();

  sidebar.addEventListener("touchstart", onTouchStart, { passive: true });
  sidebar.addEventListener("touchmove", onTouchMove, { passive: true });
  sidebar.addEventListener("touchend", onTouchEnd, { passive: true });
  window.addEventListener("scroll", onScroll, { passive: true });

  window.addCleanup(() => {
    cancelAnimationFrame(rafId);
    sidebar.removeEventListener("touchstart", onTouchStart);
    sidebar.removeEventListener("touchmove", onTouchMove);
    sidebar.removeEventListener("touchend", onTouchEnd);
    window.removeEventListener("scroll", onScroll);
  });
});
