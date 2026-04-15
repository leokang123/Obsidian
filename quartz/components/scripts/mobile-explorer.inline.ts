document.addEventListener("nav", () => {
  if (window.innerWidth > 800) return;

  const sidebar = document.querySelector(
    ".page #quartz-body .sidebar.left",
  ) as HTMLElement | null;

  if (!sidebar) return;

  let lastScrollY = window.scrollY;
  let ticking = false;
  const threshold = 8;

  sidebar.classList.add("mobile-show");

  const updateSidebar = () => {
    const currentScrollY = window.scrollY;
    const diff = currentScrollY - lastScrollY;

    if (currentScrollY <= 10) {
      sidebar.classList.remove("mobile-hide");
      sidebar.classList.add("mobile-show");
      lastScrollY = currentScrollY;
      ticking = false;
      return;
    }

    if (Math.abs(diff) < threshold) {
      ticking = false;
      return;
    }

    if (diff > 0) {
      sidebar.classList.add("mobile-hide");
      sidebar.classList.remove("mobile-show");
    } else {
      sidebar.classList.remove("mobile-hide");
      sidebar.classList.add("mobile-show");
    }

    lastScrollY = currentScrollY;
    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateSidebar);
      ticking = true;
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addCleanup(() => {
    window.removeEventListener("scroll", onScroll);
  });
});
