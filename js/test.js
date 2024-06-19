// var modal = document.getElementById("imageModal");

// // Get the image and insert it inside the modal - use its "alt" text as a caption
// var img = document.getElementById("zoomableImage");
// var modalImg = document.getElementById("zoomedImage");

// img.onclick = function() {
//     modal.style.display = "block";
//     modalImg.src = this.src;

//     // Apply pinch to zoom functionality to the modal image
//     pinchZoom(modalImg);
// }

// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// // When the user clicks on <span> (x), close the modal
// span.onclick = function() { 
//     modal.style.display = "none";
// }

// // Close the modal when clicking outside the image
// window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// }

// // Pinch to Zoom Functionality
// const pinchZoom = (imageElement) => {
//   let imageElementScale = 1;
//   let start = {};

//   // Calculate distance between two fingers
//   const distance = (event) => {
//     return Math.hypot(event.touches[0].pageX - event.touches[1].pageX, event.touches[0].pageY - event.touches[1].pageY);
//   };

//   imageElement.addEventListener('touchstart', (event) => {
//     if (event.touches.length === 2) {
//         console.log("test == fingle");
//       event.preventDefault(); // Prevent page scroll
//       start.x = (event.touches[0].pageX + event.touches[1].pageX) / 2;
//       start.y = (event.touches[0].pageY + event.touches[1].pageY) / 2;
//       start.distance = distance(event);
//     }
//   });

//   imageElement.addEventListener('touchmove', (event) => {
//     if (event.touches.length === 2) {
//       event.preventDefault(); // Prevent page scroll
//       let scale = event.scale ? event.scale : distance(event) / start.distance;
//       imageElementScale = Math.min(Math.max(1, scale), 4);

//       const deltaX = (((event.touches[0].pageX + event.touches[1].pageX) / 2) - start.x) * 2; // x2 for accelerated movement
//       const deltaY = (((event.touches[0].pageY + event.touches[1].pageY) / 2) - start.y) * 2; // x2 for accelerated movement

//       const transform = `translate3d(${deltaX}px, ${deltaY}px, 0) scale(${imageElementScale})`;
//       imageElement.style.transform = transform;
//       imageElement.style.WebkitTransform = transform;
//       imageElement.style.zIndex = "9999";
//     }
//   });

//   imageElement.addEventListener('touchend', () => {
//     imageElement.style.transform = "";
//     imageElement.style.WebkitTransform = "";
//     imageElement.style.zIndex = "";
//   });
// }

// // Initialize pinchZoom for the image
// const imageElement = document.getElementById('zoomableImage');
// pinchZoom(imageElement);





// const img = document.querySelector('.zoomable-image');
// let scale = 1;
// let lastScale = 1;
// let startX = 0;
// let startY = 0;
// let currentX = 0;
// let currentY = 0;
// let lastX = 0;
// let lastY = 0;

// function setTransform() {
//     img.style.transform = `translate(${currentX}px, ${currentY}px) scale(${scale})`;
// }

// function handleGestureStart(e) {
//     if (e.touches.length === 2) {
//         lastScale = scale;
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
//         }

//         const scaleChange = distance / lastDistance;
//         scale = lastScale * scaleChange;
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
//     scale += e.deltaY * -0.01;
//     scale = Math.min(Math.max(.125, scale), 4);
//     setTransform();
// }

// img.addEventListener('touchstart', handleGestureStart, false);
// img.addEventListener('touchmove', handleGestureMove, false);
// img.addEventListener('touchend', handleGestureEnd, false);
// img.addEventListener('wheel', handleWheel, false);


const img = document.querySelector('.zoomable-image');
let scale = 1;
let lastScale = 1;
let startX = 0;
let startY = 0;
let currentX = 0;
let currentY = 0;
let lastX = 0;
let lastY = 0;
let lastDistance = null;

function setTransform() {
    img.style.transform = `translate(${currentX}px, ${currentY}px) scale(${scale})`;
}

function handleGestureStart(e) {
    if (e.touches.length === 2) {
        lastScale = scale;
        lastDistance = null;
    } else if (e.touches.length === 1) {
        startX = e.touches[0].clientX - currentX;
        startY = e.touches[0].clientY - currentY;
    }
}

function handleGestureMove(e) {
    if (e.touches.length === 2) {
        const [touch1, touch2] = e.touches;
        const distX = touch1.clientX - touch2.clientX;
        const distY = touch1.clientY - touch2.clientY;
        const distance = Math.sqrt(distX * distX + distY * distY);

        if (!lastDistance) {
            lastDistance = distance;
            midpointX = (touch1.clientX + touch2.clientX) / 2;
            midpointY = (touch1.clientY + touch2.clientY) / 2;
        }

        const scaleChange = distance / lastDistance;
        scale = lastScale * scaleChange;

        // Calculate the new position based on the midpoint
        currentX = midpointX - midpointX * scale / lastScale;
        currentY = midpointY - midpointY * scale / lastScale;

        setTransform();
    } else if (e.touches.length === 1) {
        currentX = e.touches[0].clientX - startX;
        currentY = e.touches[0].clientY - startY;
        setTransform();
    }
}

function handleGestureEnd(e) {
    if (e.touches.length === 0) {
        lastX = currentX;
        lastY = currentY;
        lastDistance = null;
    }
}

function handleWheel(e) {
    e.preventDefault();
    const rect = img.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    const deltaScale = e.deltaY * -0.01;
    const newScale = Math.min(Math.max(.125, scale + deltaScale), 4);

    // Calculate the new position based on the mouse pointer
    currentX = offsetX - offsetX * newScale / scale;
    currentY = offsetY - offsetY * newScale / scale;
    
    scale = newScale;
    setTransform();
}

img.addEventListener('touchstart', handleGestureStart, false);
img.addEventListener('touchmove', handleGestureMove, false);
img.addEventListener('touchend', handleGestureEnd, false);
img.addEventListener('wheel', handleWheel, false);

