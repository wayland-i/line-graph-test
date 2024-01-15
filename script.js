document.addEventListener('DOMContentLoaded', function() {
    // Sample data array of objects with "price" and "date-time" fields
    const data = [
        { price: 100, 'date-time': '2022-01-01T12:00:00' },
        { price: 150, 'date-time': '2022-01-02T12:00:00' },
        // Add more data objects as needed
    ];

    // Function to render the graph
    function renderGraph(data) {
        const canvas = document.getElementById('priceGraph');
        const ctx = canvas.getContext('2d');

        // Extracting arrays for x and y values from data
        const dates = data.map(entry => new Date(entry['date-time']));
        const prices = data.map(entry => entry.price);

        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Drawing the line graph
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#3498db';

        for (let i = 0; i < dates.length; i++) {
            const x = i * (canvas.width / (dates.length - 1));
            const y = canvas.height - (prices[i] * (canvas.height / getMaxPrice(prices)));

            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }

        ctx.stroke();
    }

    // Helper function to get the maximum price for scaling
    function getMaxPrice(prices) {
        return Math.max(...prices);
    }

    // Call the renderGraph function with the sample data
    renderGraph(data);
});