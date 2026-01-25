$(document).ready(function () {
  let currentIndex = 0;
  let previousIndex = 0;
  let initialX = null;
  let dragging = false;
  let animating = false;
  const images = $(".slide-image");
  const transitionDuration = 400;

  // Initialize: hide all, show first
  images.hide();
  $(images[currentIndex]).show();

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

    // Set up initial position for slide effect
    const slideDistance = direction === 'right' ? 60 : -60;

    // Prepare next image
    nextImg.css({
      display: 'block',
      opacity: 0,
      transform: `translateX(${slideDistance}px)`
    });

    // Animate current image out
    currentImg.animate(
      { opacity: 0 },
      {
        duration: transitionDuration,
        step: function(now) {
          $(this).css('transform', `translateX(${-slideDistance * (1 - now)}px)`);
        },
        complete: function() {
          $(this).hide().css({ opacity: 1, transform: 'translateX(0)' });
        }
      }
    );

    // Animate next image in
    nextImg.animate(
      { opacity: 1 },
      {
        duration: transitionDuration,
        step: function(now) {
          $(this).css('transform', `translateX(${slideDistance * (1 - now)}px)`);
        },
        complete: function() {
          $(this).css('transform', 'translateX(0)');
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
    // Go back to previous slide
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
    e.preventDefault();
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
