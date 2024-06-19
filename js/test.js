// const img = document.querySelector('.zoomable-image');
// let scale = 1;
// let lastScale = 1;
// let startX = 0;
// let startY = 0;
// let currentX = 0;
// let currentY = 0;
// let lastX = 0;
// let lastY = 0;
// let lastDistance = null;

// function setTransform() {
//     img.style.transform = `translate3d(${currentX}px, ${currentY}px) scale(${scale})`;
// }

// function handleGestureStart(e) {
//     if (e.touches.length === 2) {
//         lastScale = scale;
//         lastDistance = null;
//     } else if (e.touches.length === 1) {
//         startX = e.touches[0].clientX - currentX;
//         startY = e.touches[0].clientY - currentY;
//     }
// }

// function handleGestureMove(e) {
//     if (e.touches.length === 2) {
//         const [touch1, touch2] = e.touches;
//         const distX = touch1.clientX - touch2.clientX;
//         const distY = touch1.clientY - touch2.clientY;
//         const distance = Math.sqrt(distX * distX + distY * distY);

//         if (!lastDistance) {
//             lastDistance = distance;
//             midpointX = (touch1.clientX + touch2.clientX) / 2;
//             midpointY = (touch1.clientY + touch2.clientY) / 2;
//         }

//         const scaleChange = distance / lastDistance;
//         scale = lastScale * scaleChange;

//         // Calculate the new position based on the midpoint
//         // currentX = midpointX - midpointX * scale / lastScale;
//         // currentY = midpointY - midpointY * scale / lastScale;
//         // currentX = midpointX - startX;
//         // currentY = midpointY - startY;

//         currentX = (((touch1.pageX + touch2.pageX) / 2) - startX) * 2; // x2 for accelarated movement
//         currentY = (((touch1.pageY + touch2.pageY) / 2) - startY) * 2; // x2 for accelarated movement

//         setTransform();
//     } else if (e.touches.length === 1) {
//         currentX = e.touches[0].clientX - startX;
//         currentY = e.touches[0].clientY - startY;
//         setTransform();
//     }
// }

// function handleGestureEnd(e) {
//     if (e.touches.length === 0) {
//         lastX = currentX;
//         lastY = currentY;
//         lastDistance = null;
//     }
// }

// function handleWheel(e) {
//     e.preventDefault();
//     const rect = img.getBoundingClientRect();
//     const offsetX = e.clientX - rect.left;
//     const offsetY = e.clientY - rect.top;

//     const deltaScale = e.deltaY * -0.01;
//     const newScale = Math.min(Math.max(.125, scale + deltaScale), 4);

//     // Calculate the new position based on the mouse pointer
//     currentX = offsetX - offsetX * newScale / scale;
//     currentY = offsetY - offsetY * newScale / scale;
    
//     scale = newScale;
//     setTransform();
// }

// img.addEventListener('touchstart', handleGestureStart, false);
// img.addEventListener('touchmove', handleGestureMove, false);
// img.addEventListener('touchend', handleGestureEnd, false);
// img.addEventListener('wheel', handleWheel, false);


const pinchZoom = (imageElement) => {
  let imageElementScale = 1;
  let start = {};
  let currentX = 0;
  let currentY = 0;
  let startX = 0;
  let startY = 0;

  // Calculate distance between two fingers
  const distance = (event) => {
    return Math.hypot(event.touches[0].pageX - event.touches[1].pageX, event.touches[0].pageY - event.touches[1].pageY);
  };

  const setTransform = () => {
    const transform = `translate3d(${currentX}px, ${currentY}px, 0) scale(${imageElementScale})`;
    imageElement.style.transform = transform;
    imageElement.style.WebkitTransform = transform;
  };

  imageElement.addEventListener('touchstart', (event) => {
    console.log('touchstart', event);
    if (event.touches.length === 2) {
      event.preventDefault(); // Prevent page scroll

      // Calculate where the fingers have started on the X and Y axis
      start.x = (event.touches[0].pageX + event.touches[1].pageX) / 2;
      start.y = (event.touches[0].pageY + event.touches[1].pageY) / 2;
      start.distance = distance(event);
    } else if (event.touches.length === 1) {
      startX = event.touches[0].clientX - currentX;
      startY = event.touches[0].clientY - currentY;
    }
  });

  imageElement.addEventListener('touchmove', (event) => {
    console.log('touchmove', event);
    if (event.touches.length === 2) {
      event.preventDefault(); // Prevent page scroll
      let scale;

      // Safari provides event.scale as two fingers move on the screen
      // For other browsers just calculate the scale manually
      if (event.scale) {
        scale = event.scale;
      } else {
        const deltaDistance = distance(event);
        scale = deltaDistance / start.distance;
      }

      imageElementScale = Math.min(Math.max(1, scale), 4);

      // Calculate how much the fingers have moved on the X and Y axis
      const deltaX = (((event.touches[0].pageX + event.touches[1].pageX) / 2) - start.x) * 2; // x2 for accelerated movement
      const deltaY = (((event.touches[0].pageY + event.touches[1].pageY) / 2) - start.y) * 2; // x2 for accelerated movement

      currentX += deltaX;
      currentY += deltaY;

      setTransform();
    } else if (event.touches.length === 1) {
      currentX = event.touches[0].clientX - startX;
      currentY = event.touches[0].clientY - startY;
      setTransform();
    }
  });

  imageElement.addEventListener('touchend', (event) => {
    console.log('touchend', event);
    if (event.touches.length === 0) {
      start = {};
    }
  });

  const handleWheel = (e) => {
    e.preventDefault();
    const rect = imageElement.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    const deltaScale = e.deltaY * -0.01;
    const newScale = Math.min(Math.max(0.125, imageElementScale + deltaScale), 4);

    currentX = offsetX - offsetX * newScale / imageElementScale;
    currentY = offsetY - offsetY * newScale / imageElementScale;

    imageElementScale = newScale;
    setTransform();
  };

  imageElement.addEventListener('wheel', handleWheel, false);
};

const img = document.querySelector('.zoomable-image');
pinchZoom(img);
