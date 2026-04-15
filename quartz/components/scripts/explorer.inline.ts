document.addEventListener("nav", () => {
  if (window.innerWidth > 800) return;

  const sidebar = document.querySelector(
    ".page #quartz-body .sidebar.left",
  ) as HTMLElement | null;

  if (!sidebar) return;

  let lastScrollY = window.scrollY;
  let ticking = false;
  let snapTimer: number | null = null;

  // 0 = 완전 표시, 1 = 완전 숨김
  let progress = 0;

  const NOISE_THRESHOLD = 1;
  const FULL_HIDE_DISTANCE = 120;
  const SNAP_THRESHOLD = 0.22;

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

  const scheduleSnap = () => {
    if (snapTimer !== null) {
      window.clearTimeout(snapTimer);
    }

    snapTimer = window.setTimeout(() => {
      if (window.scrollY <= 10) {
        snapTo(0);
        return;
      }

      if (progress >= SNAP_THRESHOLD) {
        snapTo(1);
      } else {
        snapTo(0);
      }
    }, 70);
  };

  const updateSidebar = () => {
    const currentScrollY = window.scrollY;
    const diff = currentScrollY - lastScrollY;

    if (currentScrollY <= 10) {
      progress = 0;
      applyProgress();
      lastScrollY = currentScrollY;
      ticking = false;
      scheduleSnap();
      return;
    }

    if (Math.abs(diff) < NOISE_THRESHOLD) {
      ticking = false;
      scheduleSnap();
      return;
    }

    // 스크롤 중에는 transition 없이 손가락 의도에 맞춰 조금씩 변함
    sidebar.classList.add("mobile-interacting");

    progress += diff / FULL_HIDE_DISTANCE;
    progress = clamp(progress, 0, 1);

    applyProgress();
    lastScrollY = currentScrollY;
    ticking = false;

    // 손 떼고 스크롤이 멈추면 빠르게 snap
    scheduleSnap();
  };

  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateSidebar);
      ticking = true;
    }
  };

  applyProgress();
  window.addEventListener("scroll", onScroll, { passive: true });

  window.addCleanup(() => {
    window.removeEventListener("scroll", onScroll);
    if (snapTimer !== null) {
      window.clearTimeout(snapTimer);
    }
  });
});
