document.addEventListener("nav", () => {
  if (window.innerWidth > 800) return;

  const sidebar = document.querySelector(
    ".page #quartz-body .sidebar.left",
  ) as HTMLElement | null;

  if (!sidebar) return;

  let lastScrollY = window.scrollY;
  let ticking = false;

  let isTouching = false;
  let progress = 0; // 0 = fully visible, 1 = fully hidden

  const NOISE_THRESHOLD = 1;
  const FULL_HIDE_DISTANCE = 140;
  const SNAP_THRESHOLD = 0.18;

  const clamp = (v: number, min: number, max: number) =>
    Math.min(max, Math.max(min, v));

  const applyProgress = () => {
    const eased = 1 - Math.pow(1 - progress, 1.6);
    const opacity = 1 - eased;
    sidebar.style.opacity = `${opacity}`;
    sidebar.style.pointerEvents = progress >= 0.98 ? "none" : "auto";
  };

  const animateTo = (target: 0 | 1) => {
    sidebar.classList.remove("mobile-interacting");

    requestAnimationFrame(() => {
      progress = target;
      applyProgress();
    });
  };

  const updateSidebar = () => {
    const currentScrollY = window.scrollY;
    const diff = currentScrollY - lastScrollY;

    if (currentScrollY <= 10) {
      if (isTouching) {
        progress = 0;
        applyProgress();
      } else {
        animateTo(0);
      }
      lastScrollY = currentScrollY;
      ticking = false;
      return;
    }

    if (Math.abs(diff) < NOISE_THRESHOLD) {
      ticking = false;
      return;
    }

    if (isTouching) {
      sidebar.classList.add("mobile-interacting");
    }

    const HIDE_DISTANCE = 140; // 아래로 스크롤해서 숨길 때
    const SHOW_DISTANCE = 240; // 위로 스크롤해서 다시 보일 때

    if (diff > 0) {
      progress += diff / HIDE_DISTANCE;
    } else {
      progress += diff / SHOW_DISTANCE;
    }

    if (diff > 0) {
      progress += diff / HIDE_DISTANCE;
    } else {
      progress += diff / SHOW_DISTANCE;
    }
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
      animateTo(0);
      return;
    }

    if (progress >= SNAP_THRESHOLD) {
      animateTo(1);
    } else {
      animateTo(0);
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
