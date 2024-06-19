var modal = document.getElementById("imageModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.getElementById("zoomableImage");
var modalImg = document.getElementById("zoomedImage");

img.onclick = function() {
    modal.style.display = "block";
    modalImg.src = this.src;

    // Apply pinch to zoom functionality to the modal image
    pinchZoom(modalImg);
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() { 
    modal.style.display = "none";
}

// Close the modal when clicking outside the image
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Pinch to Zoom Functionality
const pinchZoom = (imageElement) => {
  let imageElementScale = 1;
  let start = {};
  console.log("เข้า");

  console.log(imageElement);

  // Calculate distance between two fingers
  const distance = (event) => {
    return Math.hypot(event.touches[0].pageX - event.touches[1].pageX, event.touches[0].pageY - event.touches[1].pageY);
  };

  imageElement.addEventListener('touchstart', (event) => {
    console.log("touch start : ",event);
    console.log("num finger : ", event.touches.length);
    if (event.touches.length === 2) {
        console.log("test == fingle");
      event.preventDefault(); // Prevent page scroll
      start.x = (event.touches[0].pageX + event.touches[1].pageX) / 2;
      start.y = (event.touches[0].pageY + event.touches[1].pageY) / 2;
      start.distance = distance(event);
    }
  });

  imageElement.addEventListener('touchmove', (event) => {
    console.log("touch move : ",event);
    if (event.touches.length === 2) {
      event.preventDefault(); // Prevent page scroll
      let scale = event.scale ? event.scale : distance(event) / start.distance;
      imageElementScale = Math.min(Math.max(1, scale), 4);

      const deltaX = (((event.touches[0].pageX + event.touches[1].pageX) / 2) - start.x) * 2; // x2 for accelerated movement
      const deltaY = (((event.touches[0].pageY + event.touches[1].pageY) / 2) - start.y) * 2; // x2 for accelerated movement

      const transform = `translate3d(${deltaX}px, ${deltaY}px, 0) scale(${imageElementScale})`;
      imageElement.style.transform = transform;
      imageElement.style.WebkitTransform = transform;
      imageElement.style.zIndex = "9999";
    }
  });

  imageElement.addEventListener('touchend', () => {
    imageElement.style.transform = "";
    imageElement.style.WebkitTransform = "";
    imageElement.style.zIndex = "";
  });
}

// Initialize pinchZoom for the image
const imageElement = document.getElementById('zoomableImage');
pinchZoom(imageElement);
