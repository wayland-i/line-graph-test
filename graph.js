document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');

    // Set up the origin at the bottom-left corner
    ctx.translate(0.5, canvas.height - 0.5);

    // Draw the initial axes
    // drawAxes();

    // Function to draw the axes
    function drawAxes() {
        ctx.translate(0.5, canvas.height - 0.5);
        // Draw the x-axis
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(canvas.width, 0);
        ctx.stroke();

        // Draw the y-axis
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -canvas.height);
        ctx.stroke();
    }

    // Function to dynamically change canvas size based on window width
    function resizeCanvas() {
        const windowWidth = window.innerWidth;

        if (windowWidth >= 2000) {
            // Large screens
            setCanvasSize(1250, 800); // Adjust dimensions as needed
            
            drawAxes();
        } else if (windowWidth >= 1250) {
            // Medium screens
            setCanvasSize(1000, 650); // Adjust dimensions as needed
            
            drawAxes();
        } else {
            // Small screens (phones)
            setCanvasSize(700, 400); // Adjust dimensions as needed
            
            drawAxes();
        }
    }

    // Function to set canvas size and redraw content
    function setCanvasSize(width, height) {
        // Change the size of the canvas
        canvas.width = width;
        canvas.height = height;

        // Redraw the axes or any other content as needed
        drawAxes();
    }

    // Call resizeCanvas initially and on window resize
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
});


// notes on how to proceed after graph is properly resizing
// so now we want to take in our data of price and date objects and plot them on the canvas proportional to the canvas size