document.addEventListener("nav", () => {
  if (window.innerWidth > 800) return;

  const sidebar = document.querySelector(
    ".page #quartz-body .sidebar.left",
  ) as HTMLElement | null;

  if (!sidebar) return;

  let lastScrollY = window.scrollY;
  let ticking = false;

  let isTouching = false;
  let progress = 0; // 0 = 보임, 1 = 숨김

  const NOISE_THRESHOLD = 1;
  const FULL_HIDE_DISTANCE = 120;
  const SNAP_THRESHOLD = 0.2;

  const clamp = (v: number, min: number, max: number) =>
    Math.min(max, Math.max(min, v));

  const applyProgress = () => {
    const eased = 1 - Math.pow(1 - progress, 1.6);
    const opacity = 1 - eased;
    sidebar.style.opacity = `${opacity}`;
    sidebar.style.pointerEvents = progress >= 0.98 ? "none" : "auto";
  };

  const snapTo = (target: 0 | 1) => {
    sidebar.classList.remove("mobile-interacting");
    progress = target;
    applyProgress();
  };

  const updateSidebar = () => {
    const currentScrollY = window.scrollY;
    const diff = currentScrollY - lastScrollY;

    if (currentScrollY <= 10) {
      if (!isTouching) {
        snapTo(0);
      } else {
        progress = 0;
        applyProgress();
      }
      lastScrollY = currentScrollY;
      ticking = false;
      return;
    }

    if (Math.abs(diff) < NOISE_THRESHOLD) {
      ticking = false;
      return;
    }

    sidebar.classList.add("mobile-interacting");

    progress += diff / FULL_HIDE_DISTANCE;
    progress = clamp(progress, 0, 1);

    applyProgress();
    lastScrollY = currentScrollY;
    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateSidebar);
      ticking = true;
    }
  };

  const onTouchStart = () => {
    isTouching = true;
    sidebar.classList.add("mobile-interacting");
  };

  const onTouchEnd = () => {
    isTouching = false;

    if (window.scrollY <= 10) {
      snapTo(0);
      return;
    }

    if (progress >= SNAP_THRESHOLD) {
      snapTo(1);
    } else {
      snapTo(0);
    }
  };

  applyProgress();

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("touchstart", onTouchStart, { passive: true });
  window.addEventListener("touchend", onTouchEnd, { passive: true });
  window.addEventListener("touchcancel", onTouchEnd, { passive: true });

  window.addCleanup(() => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("touchstart", onTouchStart);
    window.removeEventListener("touchend", onTouchEnd);
    window.removeEventListener("touchcancel", onTouchEnd);
  });
});
