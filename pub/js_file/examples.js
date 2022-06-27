let data = [5000, 2000, 3000, 500, 1000];
let label = ['country1', 'country2', 'country3', 'country4', 'country5'];
let label_time = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

let example1 = document.getElementsByClassName('examples')[0];
const pie = drawPieChart(data, label);
// example1.innerHTML += pie;
example1.appendChild(pie);

let example2 = document.getElementsByClassName('examples')[1];
const bar = drawBarGraph(data, label);
example2.appendChild(bar);

let example3 = document.getElementsByClassName('examples')[2];
const Histogram = drawHistogram(data, label);
example3.appendChild(Histogram);

let example4 = document.getElementsByClassName('examples')[3];
const LineGraph = drawLineGraph(data, label_time, x_lable = "Day of week", y_lable = "hours");
example4.appendChild(LineGraph);

data_scatter = [];
for (let i = 0; i < 100; i++){
    data_scatter.push([Math.random() * 1000, Math.random()*500])
}
let example5 = document.getElementsByClassName('examples')[4];
const ScatterPlot = drawScatterPlot(data_scatter, x_lable = "population", y_lable = "hours");
example5.appendChild(ScatterPlot);