$(document).ready(function () {
  let currentIndex = 0;
  let previousIndex = 0;
  let initialX = null;
  let dragging = false;
  let animating = false;
  const images = $(".slide-image");
  const transitionDuration = 600;

  // Preload all images
  function preloadImages() {
    images.each(function() {
      const img = new Image();
      img.src = $(this).attr('src');
    });
  }
  preloadImages();

  // Initialize: show first image
  $(images[currentIndex]).addClass('active');

  // Auto slide
  const slideInterval = 3500;
  setInterval(() => {
    if (!animating) {
      goToSlide(getRandomIndex());
    }
  }, slideInterval);

  function getRandomIndex() {
    let newIndex = currentIndex;
    while (newIndex === currentIndex) {
      newIndex = Math.floor(Math.random() * images.length);
    }
    return newIndex;
  }

  function goToSlide(newIndex) {
    if (newIndex === currentIndex || animating) return;

    animating = true;
    previousIndex = currentIndex;

    // Remove active from current, add to new
    $(images[currentIndex]).removeClass('active');
    $(images[newIndex]).addClass('active');

    currentIndex = newIndex;

    // Wait for transition to complete
    setTimeout(() => {
      animating = false;
    }, transitionDuration);
  }

  function nextSlide() {
    goToSlide(getRandomIndex());
  }

  function prevSlide() {
    goToSlide(previousIndex);
  }

  // Button controls
  $("#prevBtn").click(function () {
    if (!animating) prevSlide();
  });

  $("#nextBtn").click(function () {
    if (!animating) nextSlide();
  });

  // Touch/drag support
  let initialY = null;
  let direction = null;

  $(".half-bg").on('mousedown touchstart', function (e) {
    if (animating) return;
    if (e.type === 'touchstart') {
      initialX = e.originalEvent.touches[0].clientX;
      initialY = e.originalEvent.touches[0].clientY;
    } else {
      initialX = e.clientX;
    }
    dragging = true;
    direction = null;
  });

  $(".half-bg").on('mousemove touchmove', function (e) {
    if (!dragging || animating) return;
    const clientX = e.type === 'touchmove' ? e.originalEvent.touches[0].clientX : e.clientX;
    const distanceX = clientX - initialX;

    if (e.type === 'touchmove' && !direction) {
      const clientY = e.originalEvent.touches[0].clientY;
      const distanceY = clientY - initialY;
      if (Math.abs(distanceX) > 10 || Math.abs(distanceY) > 10) {
        direction = Math.abs(distanceX) > Math.abs(distanceY) ? 'horizontal' : 'vertical';
      }
    }

    if (e.type === 'touchmove' && direction === 'vertical') return;
    if (e.type === 'touchmove' && direction === 'horizontal') {
      e.preventDefault();
    }

    if (Math.abs(distanceX) > 40) {
      distanceX < 0 ? nextSlide() : prevSlide();
      dragging = false;
    }
  });

  $(".half-bg").on('mouseup touchend mouseleave', function () {
    dragging = false;
    initialX = null;
    initialY = null;
    direction = null;
  });
});
