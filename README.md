# library Project
## Link to landing page
https://afternoon-everglades-68232.herokuapp.com/

## Geting Started
You should include the following files for the library:

<script src="./js_file/drawing.js"></script>
<script src="./css_file/drawing.css"></script>

A code snippet of some basic functionality:

data_scatter = []; for (let i = 0; i < 100; i++){data_scatter.push([Math.random() * 1000, Math.random()*500])}
const ScatterPlot = drawScatterPlot(data_scatter, x_lable = "population", y_lable = "hours");

const LineGraph = drawLineGraph([5000, 2000, 3000, 500, 1000],
'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], x_lable = "Day of week", y_lable = "hours");

const pie = drawPieChart([5000, 2000, 3000, 500, 1000], ['country1', 'country2', 'country3', 'country4', 'country5']);

## Link to documentation
https://afternoon-everglades-68232.herokuapp.com/documentation.html
