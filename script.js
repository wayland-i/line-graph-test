// Sample data array of objects with "price" and "date-time" fields
const data = [
    { price: 100, 'date-time': '2022-01-01T12:00:00' },
    // { price: 110, 'date-time': '2022-01-02T12:00:00' },
    // { price: 120, 'date-time': '2022-01-03T12:00:00' },
    // { price: 130, 'date-time': '2022-01-04T12:00:00' },
    // { price: 140, 'date-time': '2022-01-05T12:00:00' },

    { price: 150, 'date-time': '2022-01-06T12:00:00' },
    { price: 100, 'date-time': '2022-01-07T12:00:00' },
    { price: 150, 'date-time': '2022-01-08T12:00:00' },
    { price: 200, 'date-time': '2022-01-09T12:00:00' },
    { price: 180, 'date-time': '2022-01-10T12:00:00' },
    { price: 120, 'date-time': '2022-01-11T12:00:00' },
    { price: 100, 'date-time': '2022-01-12T12:00:00' },
    { price: 150, 'date-time': '2022-01-13T12:00:00' },
    { price: 100, 'date-time': '2022-01-14T12:00:00' },
    { price: 150, 'date-time': '2022-01-15T12:00:00' },
    { price: 20, 'date-time': '2022-01-16T12:00:00' },
    { price: 140, 'date-time': '2022-01-17T12:00:00' },
    { price: 120, 'date-time': '2022-01-18T12:00:00' },
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
        ctx.strokeStyle = '#3498db';
        // ctx.fillRect(10, 10, 100, 100)

        for (let i = 0; i < dates.length; i++) {
            const x = i * (canvas.width / (dates.length - 1));
            const nextX = (i + 1) * (canvas.width / (dates.length - 1));
            const y = canvas.height - (prices[i] * (canvas.height / getMaxPrice(prices)));
            const nextY = canvas.height - (prices[i + 1] * (canvas.height / getMaxPrice(prices)));

            if (i === 0) {
                ctx.fillRect(x, y, 10, 10)
                console.log(dates[i])
                console.log(dates[i + 1])
                ctx.moveTo(x, y);
            } else {
                ctx.fillRect(x, y, 10, 10)
                ctx.lineTo(x, y);
                // if (prices[i])
                console.log(prices[i])
                if (prices[i] < prices[i + 1]) {
                    console.log("going up")
                    console.log(dates[i])
                    const newDate = new Date(dates[i])
                    newDate.setHours(dates[i].getHours() + 1)
                    console.log(newDate)
                    let counter = 1
                    for (let j = new Date(dates[i]); j < newDate; j.setMinutes(j.getMinutes() + 1)) {
                        console.log("j:", j);
                    }
                } else if (prices[i] > prices[i + 1]) {
                    // console.log("going down")
                } else if (prices[i] == prices [i + 1]){
                    // console.log("price remained the same")
                }
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


// notes
// I need to figure out how to place more datapoints to my array the plot smaller incremental steps inbetween the actual price and date data
// Function: I need to take the OG data, and between each "real value" I need to insert incremental values between
//      The function should say: until I get to the next REAL date and price, +1 to price +1hr to date. if (x[i + 1] > x[i] then + for price) else if (x[i + 1] < x[i] then - for price) IF PRICES ARE THE SAME, DO NOT ADD TO PRICE ONLY TO DATE
//      This function determining how many datapoints should be added should work relative to the users' screen-size/viewport (we can worry about this later)
//
// 

