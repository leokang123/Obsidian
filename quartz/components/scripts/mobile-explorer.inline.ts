document.addEventListener("nav", () => {
  if (window.innerWidth > 800) return;

  const sidebar = document.querySelector(".sidebar.left") as HTMLElement | null;
  if (!sidebar) return;

  const MAX_HIDE_PERCENT = 72;
  const SCROLL_DISTANCE_FOR_FULL_HIDE = 220;
  const SNAP_THRESHOLD = 0.5;

  let progress = 0;
  let ticking = false;
  let snapTimer: number | null = null;
  let lastScrollY = window.scrollY;

  const clamp = (v: number, min: number, max: number) =>
    Math.min(max, Math.max(min, v));

  const applyUI = () => {
    const translate = -MAX_HIDE_PERCENT * progress;
    const opacity = 1 - progress * 0.8;

    sidebar.style.transform = `translateY(${translate}%)`;
    sidebar.style.opacity = `${opacity}`;
    sidebar.style.pointerEvents = progress > 0.96 ? "none" : "auto";
  };

  const snapTo = (target: 0 | 1) => {
    sidebar.classList.remove("mobile-dragging");
    progress = target;
    applyUI();
  };

  const scheduleSnap = () => {
    if (snapTimer !== null) {
      window.clearTimeout(snapTimer);
    }

    snapTimer = window.setTimeout(() => {
      if (window.scrollY <= 8) {
        snapTo(0);
        return;
      }

      if (progress >= SNAP_THRESHOLD) {
        snapTo(1);
      } else {
        snapTo(0);
      }
    }, 120);
  };

  const updateOnScroll = () => {
    const currentScrollY = window.scrollY;
    const diff = currentScrollY - lastScrollY;

    if (currentScrollY <= 8) {
      progress = 0;
      applyUI();
      lastScrollY = currentScrollY;
      ticking = false;
      scheduleSnap();
      return;
    }

    if (Math.abs(diff) < 1) {
      ticking = false;
      scheduleSnap();
      return;
    }

    sidebar.classList.add("mobile-dragging");

    // 스크롤 양에 비례해서 progress를 연속적으로 갱신
    progress += diff / SCROLL_DISTANCE_FOR_FULL_HIDE;
    progress = clamp(progress, 0, 1);

    applyUI();
    scheduleSnap();

    lastScrollY = currentScrollY;
    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateOnScroll);
    }
  };

  applyUI();
  window.addEventListener("scroll", onScroll, { passive: true });

  window.addCleanup(() => {
    window.removeEventListener("scroll", onScroll);
    if (snapTimer !== null) {
      window.clearTimeout(snapTimer);
    }
  });
});
