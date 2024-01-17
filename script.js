// Sample data array of objects with "price" and "date-time" fields
const data = [
    { price: 100, 'date-time': '2022-01-01T12:00:00' },
    { price: 150, 'date-time': '2022-01-02T12:00:00' },
    { price: 100, 'date-time': '2022-01-01T12:00:00' },
    { price: 150, 'date-time': '2022-01-02T12:00:00' },
    { price: 200, 'date-time': '2022-01-03T12:00:00' },
    { price: 180, 'date-time': '2022-01-04T12:00:00' },
    { price: 120, 'date-time': '2022-01-05T12:00:00' },
    { price: 100, 'date-time': '2022-01-01T12:00:00' },
    { price: 150, 'date-time': '2022-01-02T12:00:00' },
    { price: 100, 'date-time': '2022-01-01T12:00:00' },
    { price: 150, 'date-time': '2022-01-02T12:00:00' },
    { price: 20, 'date-time': '2022-01-03T12:00:00' },
    { price: 140, 'date-time': '2022-01-04T12:00:00' },
    { price: 120, 'date-time': '2022-01-05T12:00:00' },
    // Add more data objects as needed
];

document.addEventListener('DOMContentLoaded', function() {

    // Function to render the graph
    function renderGraph(data) {
        const canvas = document.getElementById('priceGraph');
        const ctx = canvas.getContext('2d');

        // Extracting arrays for x and y values from data
        const dates = data.map(entry => new Date(entry['date-time']));
        const prices = data.map(entry => entry.price);

        // Set canvas dimensions based on data length and height
        //width/height was origianlly 40/2
        canvas.width = dates.length * 80; // Adjust the multiplier as needed
        canvas.height = getMaxPrice(prices) * 3; // Adjust the multiplier as needed

        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Drawing the graph x-axis
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);
        ctx.lineTo(canvas.width, canvas.height);
        ctx.stroke();

        // Drawing the graph y-axis
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, canvas.height);
        ctx.stroke();

        // Drawing the line graph
        ctx.beginPath();
        ctx.lineWidth = 6;
        ctx.lineJoin = 'miter';
        ctx.miterLimit = 1;
        // ctx.strokeStyle = '#3498db';
        // ctx.fillStyle = 'red'
        // ctx.fillRect(10, 10, 100, 100)

        for (let i = 0; i < dates.length; i++) {
            // const price = data[i].price;
            const x = i * (canvas.width / (dates.length - 1));
            const y = canvas.height - (prices[i] * (canvas.height / getMaxPrice(prices)));

            if (i === 0) {
                ctx.fillRect(x, y, 10, 10)
                ctx.moveTo(x, y);
            } else {
                ctx.fillRect(x, y, 10, 10)
                ctx.lineTo(x, y);
            }
        }

        // ctx.stroke();
    }
    // end of renderGraph

    // Helper function to get the maximum price for scaling
    function getMaxPrice(prices) {
        return Math.max(...prices);
    }

    // Call the renderGraph function with the sample data
    renderGraph(data);
});

