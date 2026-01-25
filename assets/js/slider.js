$(document).ready(function () {
  let currentIndex = 0;
  let previousIndex = 0;
  let initialX = null;
  let dragging = false;
  let animating = false;
  const images = $(".slide-image");
  const transitionDuration = 500;

  // Initialize: hide all, show first
  images.css({ opacity: 0, display: 'block' });
  $(images[currentIndex]).css('opacity', 1);

  // Auto slide
  const slideInterval = 3500;
  setInterval(() => {
    if (!animating) {
      goToSlide(getRandomIndex(), 'right');
    }
  }, slideInterval);

  function getRandomIndex() {
    let newIndex = currentIndex;
    while (newIndex === currentIndex) {
      newIndex = Math.floor(Math.random() * images.length);
    }
    return newIndex;
  }

  function goToSlide(newIndex, direction) {
    if (newIndex === currentIndex || animating) return;

    animating = true;
    previousIndex = currentIndex;

    const currentImg = $(images[currentIndex]);
    const nextImg = $(images[newIndex]);

    // Simple crossfade - both images stacked, just change opacity
    currentImg.animate(
      { opacity: 0 },
      { duration: transitionDuration }
    );

    nextImg.animate(
      { opacity: 1 },
      {
        duration: transitionDuration,
        complete: function() {
          currentIndex = newIndex;
          animating = false;
        }
      }
    );
  }

  function nextSlide() {
    goToSlide(getRandomIndex(), 'right');
  }

  function prevSlide() {
    goToSlide(previousIndex, 'left');
  }

  // Button controls
  $("#prevBtn").click(function () {
    if (!animating) {
      prevSlide();
    }
  });

  $("#nextBtn").click(function () {
    if (!animating) {
      nextSlide();
    }
  });

  // Touch/drag support
  $(".half-bg").on('mousedown touchstart', function (e) {
    if (animating) return;
    initialX = e.type === 'touchstart' ? e.originalEvent.touches[0].clientX : e.clientX;
    dragging = true;
  });

  $(".half-bg").on('mousemove touchmove', function (e) {
    if (dragging && !animating) {
      const clientX = e.type === 'touchmove' ? e.originalEvent.touches[0].clientX : e.clientX;
      const distance = clientX - initialX;
      if (distance < -50) {
        nextSlide();
        dragging = false;
      } else if (distance > 50) {
        prevSlide();
        dragging = false;
      }
    }
  });

  $(".half-bg").on('mouseup touchend mouseleave', function () {
    dragging = false;
    initialX = null;
  });
});
