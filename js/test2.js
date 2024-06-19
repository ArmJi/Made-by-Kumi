<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pinch to Zoom Example</title>
    <style>
        .zoom-container {
            overflow: hidden;
            position: relative;
            width: 100%;
            max-width: 500px;
            margin: auto;
        }

        .zoomable-image {
            width: 100%;
            transition: transform 0.25s ease;
        }
    </style>
</head>
<body>
    <div class="zoom-container">
        <img src="/img/img_index/home/img_2.jpg" alt="Zoomable Image" class="zoomable-image">
    </div>

    <script>
        const pinchZoom = (imageElement) => {
            let imageElementScale = 1;

            let start = {};

            // Calculate distance between two fingers
            const distance = (event) => {
                return Math.hypot(event.touches[0].pageX - event.touches[1].pageX, event.touches[0].pageY - event.touches[1].pageY);
            };

            imageElement.addEventListener('touchstart', (event) => {
                console.log('touchstart', event);
                if (event.touches.length === 2) {
                    event.preventDefault(); // Prevent page scroll

                    // Calculate where the fingers have started on the X and Y axis
                    start.x = (event.touches[0].pageX + event.touches[1].pageX) / 2;
                    start.y = (event.touches[0].pageY + event.touches[1].pageY) / 2;
                    start.distance = distance(event);
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

                    // Transform the image to make it grow and move with fingers
                    const transform = `translate3d(${deltaX}px, ${deltaY}px, 0) scale(${imageElementScale})`;
                    imageElement.style.transform = transform;
                    imageElement.style.WebkitTransform = transform;
                    imageElement.style.zIndex = "9999";
                }
            });

            imageElement.addEventListener('touchend', (event) => {
                console.log('touchend', event);
                // Reset image to its original format
                imageElement.style.transform = "";
                imageElement.style.WebkitTransform = "";
                imageElement.style.zIndex = "";
            });
        }

        document.addEventListener('DOMContentLoaded', () => {
            const imageElement = document.querySelector('.zoomable-image');
            pinchZoom(imageElement);
        });
    </script>
</body>
</html>
