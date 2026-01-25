$(document).ready(function () {
  let currentIndex = 0;
  let initialX = null;
  let dragging = false;
  let animating = false;
  const images = $(".slide-image");

  // Show the first image initially
  $(images[currentIndex]).show();

  // Auto slide images
  const slideInterval = 3000; // 3 seconds
  const autoSlide = setInterval(() => {
    if (!animating) {
      nextSlide();
    }
  }, slideInterval);

  function getRandomIndex(currentIndex, maxIndex) {
    let newIndex = currentIndex;
    while (newIndex === currentIndex) {
      newIndex = Math.floor(Math.random() * maxIndex);
    }
    return newIndex;
  }

  function nextSlide() {
    animating = true;
    $(images[currentIndex]).fadeOut(1000).promise().done(function () {
      currentIndex = getRandomIndex(currentIndex, images.length);
      $(images[currentIndex]).fadeIn(1000).promise().done(function () {
        animating = false;
      });
    });
  }

  function prevSlide() {
    animating = true;
    $(images[currentIndex]).fadeOut(1000).promise().done(function () {
      currentIndex = getRandomIndex(currentIndex, images.length);
      $(images[currentIndex]).fadeIn(1000).promise().done(function () {
        animating = false;
      });
    });
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

  $(".half-bg").mousedown(function (e) {
    if (animating) return;
    e.preventDefault();
    initialX = e.clientX;
    dragging = true;
  });

  $(".half-bg").mousemove(function (e) {
    if (dragging && !animating) {
      const finalX = e.clientX;
      const distance = finalX - initialX;
      if (distance < -50) {
        nextSlide();
        dragging = false;
      } else if (distance > 50) {
        prevSlide();
        dragging = false;
      }
    }
  });

  $(".half-bg").mouseup(function () {
    dragging = false;
    initialX = null;
  });

  $(".half-bg").mouseleave(function () {
    dragging = false;
    initialX = null;
  });
});
