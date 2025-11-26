(function () {
  'use strict';

  function applyTheme(isDark) {
    const root = document.documentElement;
    root.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }

  const mq =
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
  if (mq) {
    // initial
    applyTheme(mq.matches);

    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', (e) => applyTheme(e.matches));
    } else if (typeof mq.addListener === 'function') {
      mq.addListener((e) => applyTheme(e.matches));
    }
  } else {
    applyTheme(true);
  }

  let timeout = 1000;
  let timeoutID = undefined;
  const repositionFDiv = (x, y) => {
    const fDiv = document.getElementById('f');
    if (fDiv) {
      fDiv.style.transition = '';
      fDiv.style.left = x - 16 + 'px';
      fDiv.style.top = y - 16 + 'px';
    }
  };
  const returnFDivToCenter = () => {
    const fDiv = document.getElementById('f');
    if (fDiv) {
      fDiv.style.transition = 'left 5s ease, top 5s ease';
      fDiv.style.left = '50%';
      fDiv.style.top = '50%';
    }
  };

  // Event listeners
  document.addEventListener('mousemove', (e) => {
    repositionFDiv(e.clientX, e.clientY);
  });
  document.addEventListener(
    'touchmove',
    (e) => {
      if (e.touches.length > 0) {
        repositionFDiv(e.touches[0].clientX, e.touches[0].clientY);
      }
    },
    { passive: true }
  );
  document.addEventListener(
    'touchend',
    (e) => {
      timeoutID = setTimeout(() => {
        returnFDivToCenter();
      }, timeout);
    },
    { passive: true }
  );
  document.addEventListener(
    'touchcancel',
    (e) => {
      timeoutID = setTimeout(() => {
        returnFDivToCenter();
      }, timeout);
    },
    { passive: true }
  );
  document.addEventListener('mouseleave', (e) => {
    timeoutID = setTimeout(() => {
      returnFDivToCenter();
    }, timeout);
  });
  document.addEventListener('mouseenter', (e) => {
    if (timeoutID) {
      clearTimeout(timeoutID);
      timeoutID = undefined;
    }
  });
  document.addEventListener(
    'touchstart',
    (e) => {
      if (timeoutID) {
        clearTimeout(timeoutID);
        timeoutID = undefined;
      }
      repositionFDiv(e.touches[0].clientX, e.touches[0].clientY);
    },
    { passive: true }
  );
})();
