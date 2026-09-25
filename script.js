(function () {
  var toggle = document.getElementById('menu-toggle');
  var panel = document.getElementById('menu-panel');
  var overlay = document.getElementById('menu-overlay');

  function setOpen(open) {
    panel.classList.toggle('open', open);
    overlay.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  toggle.addEventListener('click', function (event) {
    event.stopPropagation();
    setOpen(!panel.classList.contains('open'));
  });

  panel.addEventListener('click', function (event) {
    if (event.target.tagName === 'A') {
      setOpen(false);
    }
  });

  document.addEventListener('click', function (event) {
    if (!panel.contains(event.target) && event.target !== toggle) {
      setOpen(false);
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      setOpen(false);
    }
  });

  // Number publications in reverse order (newest = highest)
  var pubTables = document.querySelectorAll('.pub-table');
  for (var t = 0; t < pubTables.length; t++) {
    pubTables[t].style.counterReset = 'pub ' + (pubTables[t].rows.length + 1);
  }

  var carousel = document.getElementById('carousel');
  if (carousel) {
    var track = document.getElementById('carousel-track');
    var slides = track.children;
    var dots = document.getElementById('carousel-dots').children;
    var prevBtn = carousel.querySelector('.carousel-prev');
    var nextBtn = carousel.querySelector('.carousel-next');
    var current = 0;

    function goTo(index) {
      current = (index + slides.length) % slides.length;
      for (var i = 0; i < slides.length; i++) {
        slides[i].classList.toggle('active', i === current);
      }
      for (var j = 0; j < dots.length; j++) {
        dots[j].classList.toggle('active', j === current);
      }
    }

    prevBtn.addEventListener('click', function () { goTo(current - 1); });
    nextBtn.addEventListener('click', function () { goTo(current + 1); });

    for (var i = 0; i < dots.length; i++) {
      (function (index) {
        dots[index].addEventListener('click', function () { goTo(index); });
      })(i);
    }

    var touchStartX = null;

    track.addEventListener('touchstart', function (event) {
      touchStartX = event.touches[0].clientX;
    }, { passive: true });

    track.addEventListener('touchend', function (event) {
      if (touchStartX === null) return;
      var delta = event.changedTouches[0].clientX - touchStartX;
      if (Math.abs(delta) > 40) {
        goTo(delta < 0 ? current + 1 : current - 1);
      }
      touchStartX = null;
    });

    goTo(0);
  }
})();
