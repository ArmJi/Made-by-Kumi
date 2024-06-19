const img = document.querySelector('.zoomable-image');
let scale = 1;
let lastScale = 1;
let startX_One = 0;
let startY_One = 0;
let startX_two = 0;
let startY_two = 0;
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
        startX_two = (e.touches[0].pageX + e.touches[1].pageX) / 2;
        startY_two = (e.touches[0].pageY + e.touches[1].pageY) / 2;
    } else if (e.touches.length === 1) {
        startX_One = e.touches[0].clientX - currentX;
        startY_One = e.touches[0].clientY - currentY;
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
        // currentX = midpointX - midpointX * scale / lastScale;
        // currentY = midpointY - midpointY * scale / lastScale;
        // const deltaX = (((event.touches[0].pageX + event.touches[1].pageX) / 2) - start.x) * 2; // x2 for accelarated movement
        // const deltaY = (((event.touches[0].pageY + event.touches[1].pageY) / 2) - start.y) * 2; // x2 for accelarated movement

        currentX = (midpointX - startX_two) * 2;
        currentY = (midpointY - startY_two) * 2;

        setTransform();
    } else if (e.touches.length === 1) {
        currentX = e.touches[0].clientX - startX_One;
        currentY = e.touches[0].clientY - startY_One;
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
