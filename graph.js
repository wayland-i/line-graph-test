const data = [
    { price: 100, date: '2022-01-01T12:00:00' },

    // { price: 110, date: '2022-01-02T12:00:00' },
    // { price: 120, date: '2022-01-03T12:00:00' },
    // { price: 130, date: '2022-01-04T12:00:00' },
    // { price: 140, date: '2022-01-05T12:00:00' },

    { price: 150, date: '2022-01-06T12:00:00' },
    { price: 100, date: '2022-01-07T12:00:00' },
    { price: 150, date: '2022-01-08T12:00:00' },
    { price: 200, date: '2022-01-09T12:00:00' },
    { price: 180, date: '2022-01-10T12:00:00' },
    { price: 120, date: '2022-01-11T12:00:00' },
    { price: 100, date: '2022-01-12T12:00:00' },
    { price: 150, date: '2022-01-13T12:00:00' },
    { price: 100, date: '2022-01-14T12:00:00' },
    { price: 150, date: '2022-01-15T12:00:00' },
    { price: 20, date: '2022-01-16T12:00:00' },
    { price: 140, date: '2022-01-17T12:00:00' },
    { price: 120, date: '2022-01-18T12:00:00' },
    // Add more data objects as needed
];

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
            //invoke data function here
        } else if (windowWidth >= 1250) {
            // Medium screens
            setCanvasSize(1000, 650); // Adjust dimensions as needed
            // invoke data function here
            originalPoints(data)
        } else {
            // Small screens (phones)
            setCanvasSize(700, 400); // Adjust dimensions as needed
            // invoke data function here
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

    

    function originalPoints(data) {
        // console.log(data.map((record) => {
        //     console.log(record.price)
        // }))
        let prices = []
        let dates = []
        data.map((record) => {
            prices.push(record.price)
            dates.push(record.date)
            // let dates = 
        })
        console.log(dates)
        console.log(prices)

        for (let i = 0; i < dates.length; i++) {
            const x = i * (canvas.width / (dates.length - 1));
            const nextX = (i + 1) * (canvas.width / (dates.length - 1));
            const y = canvas.height - (prices[i] * (canvas.height / getMaxPrice(prices)));
            const nextY = ((canvas.height - (prices[i] * (canvas.height / getMaxPrice(prices)))) + (canvas.height - (prices[i + 1] * (canvas.height / getMaxPrice(prices))))) / 2;
        



            if (i === 0) {
                ctx.fillRect(x, y, 10, 10)
                console.log(dates[i])
                console.log(dates[i + 1])
                ctx.moveTo(x, y);
                ctx.fillRect((i + .5) * (canvas.width / (dates.length - 1)), nextY, 10, 10)
                ctx.lineTo(x, y);
            } else {
                ctx.fillRect(x, y, 10, 10)
                ctx.lineTo(x, y);
                // if (prices[i])
                console.log(prices[i])
                if (prices[i] < prices[i + 1]) {
                    console.log("going up")
                    // console.log(dates[i])
                    const newDate = new Date(dates[i])
                    newDate.setHours(dates[i].getHours + 1) //deleted '()' after .getHours
                    // console.log(newDate)
                    let counter = 1
                    for (let j = new Date(dates[i]); j < newDate; j.setMinutes(j.getMinutes() + 1)) {
                        // console.log("j:", j);
                        // console.log("y:", y)
                        
                        ctx.fillRect((i + .5) * (canvas.width / (dates.length - 1)), nextY, 10, 10)
                        ctx.fillRect((i + .6) * (canvas.width / (dates.length - 1)), nextY, 10, 10)
                        
                        ctx.lineTo(x, y);
                    }
                } else if (prices[i] > prices[i + 1]) {
                    console.log("going down")
                    console.log("y:", y)
                    // ctx.fillRect((i + .5) * (canvas.width / (dates.length - 1)), nextY, 10, 10)
                    ctx.lineTo(x, y);
                } else if (prices[i] == prices [i + 1]){
                    // console.log("price remained the same")
                }
            }





        }

        




    }

    function getMaxPrice(prices) {
        return Math.max(...prices);
    }


    // Call resizeCanvas initially and on window resize
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
});


// notes on how to proceed after graph is properly resizing
// so now we want to take in our data of price and date objects and plot them on the canvas proportional to the canvas size

// first we want to write a function that handles the data as we recieve it...
// if the data is 12 dates across the x axis we want that to be shown proportionally there
// the first price/date is (0, y) the last price date is (canvas.width, y)

// once that data sizes the graph, then we can add all the filler data points
// the amount of points we add will hopefully be dependent on the canvas size only
// I think as long as the initial array size is the same each time then ther won't be an issue with the canvas size and filler points