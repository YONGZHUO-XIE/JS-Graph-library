const randomHexColor = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

class Analysis {
    constructor(data) {
        this.data = data;
    }

    create() {
        const stats = document.createElement("div");
        stats.classList.add("stats")

        let sum = this.data.reduce((a, b) => { return a + b }, 0);

        const statToltal = document.createElement("div");
        statToltal.innerHTML = `Toltal: ${sum}`;
        stats.append(statToltal);
        const statTotalBar = document.createElement("div");
        statTotalBar.style.width = `${sum / (300 * 0.15)}px`;
        statTotalBar.style.height = "20px";
        statTotalBar.style.backgroundColor = "grey";
        stats.append(statTotalBar);


        const statAvg = document.createElement("div");
        statAvg.innerHTML = `Average: ${(sum / this.data.length).toFixed(2)}`;
        stats.append(statAvg);
        const statAvglBar = document.createElement("div");
        statAvglBar.style.width = `${(sum / this.data.length) / (300 * 0.15)}px`;
        statAvglBar.style.height = "20px";
        statAvglBar.style.backgroundColor = "grey";
        stats.append(statAvglBar);
        return stats;
    }
}

function drawPieChart(data, labels, width = 400, height = 400, title = "This is our Pie Chart") {
    let content = document.createElement("div");
    content.classList.add('pie-chart-content')

    let form = document.createElement("div");
    form.classList.add('form-content')
    content.append(form)

    let canvas = document.createElement('canvas');
    canvas.classList.add("canvas");
    let ctx = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;
    let total = 0;
    for (let i = 0; i < data.length; i++) {
        total += data[i];
    }
    percentage = []
    for (let i = 0; i < data.length; i++) {
        percentage.push((Math.floor((data[i] / total) * 1000)) / 10)
    }
    let startAngle = 0;
    let radius = 125; //100
    let x_location = canvas.width / 2;
    let y_location = canvas.height / 2;


    for (let i = 0; i < data.length; i++) {
        let div = document.createElement("div");
        div.classList.add("checkboxesContainer")

        let label = document.createElement("label");
        label.classList.add("label");
        label.innerHTML = labels[i];

        const checkedbox = document.createElement("input");
        checkedbox.classList.add("checkbox");
        checkedbox.setAttribute("type", "checkbox");
        checkedbox.checked = true;
        checkedbox.onclick = () => {
            let newdataarray = [];
            let newlabelarray = [];
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            let i = 0;
            form.childNodes.forEach((item) => {
                if (item.childNodes[1].checked === true) {
                    newdataarray.push(data[i]);
                    newlabelarray.push(labels[i]);
                }
                i++;
            })
            console.log(newdataarray);
            let total = 0;
            for (let i = 0; i < newdataarray.length; i++) {
                total += newdataarray[i];
            }
            percentage = []
            for (let i = 0; i < newdataarray.length; i++) {
                percentage.push((Math.floor((newdataarray[i] / total) * 1000)) / 10)
            }
            let startAngle = 0;
            let radius = 125;
            let x_location = canvas.width / 2;
            let y_location = canvas.height / 2;
            for (let i = 0; i < newdataarray.length; i++) {
                ctx.fillStyle = randomHexColor();
                ctx.lineWidth = 1;
                ctx.beginPath();
                let endAngle = (newdataarray[i] / total) * Math.PI * 2 + startAngle;
                ctx.moveTo(x_location, y_location);
                ctx.arc(x_location, y_location, radius, startAngle, endAngle, false);
                ctx.lineTo(x_location, y_location);
                ctx.fill();
                ctx.stroke();

                ctx.font = "15px Arial";
                ctx.textAlign = "center";
                let theta = (startAngle + endAngle) / 2;
                let deltaY = Math.sin(theta) * 1.3 * radius;
                let deltaX = Math.cos(theta) * 1.3 * radius;
                // let deltaY_in = Math.sin(theta) * 0.7 * radius;
                // let deltaX_in = Math.cos(theta) * 0.7 * radius;
                let deltaY_in = Math.sin(theta) * 1.3 * radius;
                let deltaX_in = Math.cos(theta) * 1.3 * radius;
                ctx.fillText(newlabelarray[i], deltaX + x_location, deltaY + y_location);
                ctx.fillStyle = "#000"
                ctx.fillText(`${percentage[i]}%`, deltaX_in + x_location, deltaY_in + y_location + 15);
                ctx.closePath();

                startAngle = endAngle;

            }
            ctx.font = "20px Arial";
            ctx.fillStyle = "#000000";
            ctx.fillText(`${title}`, width / 2, 20);
            let sum = newdataarray.reduce((a, b) => { return a + b }, 0);

            //update anaylsis
            rightSide.removeChild(analysis);
            rightSide.removeChild(userInputs);
            analysis = new Analysis(newdataarray).create();
            rightSide.append(analysis);
            rightSide.append(userInputs);
        }
        //appennd
        div.append(label);
        div.append(checkedbox);
        form.append(div);

        ctx.fillStyle = randomHexColor();
        ctx.lineWidth = 1;
        ctx.beginPath();
        let endAngle = (data[i] / total) * Math.PI * 2 + startAngle;
        ctx.moveTo(x_location, y_location);
        ctx.arc(x_location, y_location, radius, startAngle, endAngle, false);
        ctx.lineTo(x_location, y_location);
        ctx.fill();
        ctx.strokeStyle = "white";
        ctx.stroke();

        ctx.font = "15px Arial";
        ctx.textAlign = "center";
        let theta = (startAngle + endAngle) / 2;
        let deltaY = Math.sin(theta) * 1.3 * radius;
        let deltaX = Math.cos(theta) * 1.3 * radius;
        /* let deltaY_in = Math.sin(theta) * 0.7 * radius;
        let deltaX_in = Math.cos(theta) * 0.7 * radius; */
        let deltaY_in = Math.sin(theta) * 1.3 * radius;
        let deltaX_in = Math.cos(theta) * 1.3 * radius;
        ctx.fillText(labels[i], deltaX + x_location, deltaY + y_location);
        ctx.fillStyle = "#000"
        ctx.fillText(`${percentage[i]}%`, deltaX_in + x_location, deltaY_in + y_location + 15);
        ctx.closePath();

        startAngle = endAngle;
    }
    ctx.font = "20px Arial";
    ctx.fillStyle = "#000000";
    ctx.fillText(`${title}`, width / 2, 20);
    content.append(canvas)

    let rightSide = document.createElement("div");
    rightSide.classList.add("rightSide");
    content.append(rightSide);

    console.log("right before create analysis " + data)
    let analysis = new Analysis(data).create();
    rightSide.append(analysis);

    let userInputs = document.createElement("div");
    userInputs.classList.add("userInputs");
    rightSide.append(userInputs);

    let userInputsTitle = document.createElement("div");
    userInputs.classList.add("userInputsTitle");
    userInputsTitle.innerHTML = "Add Data";
    userInputs.append(userInputsTitle);

    let inputName = document.createElement("input");
    inputName.placeholder = "Input Name";
    inputName.classList.add("input");
    userInputs.append(inputName);

    let inputValue = document.createElement("input");
    inputValue.placeholder = "Input Value";
    inputValue.classList.add("input");
    userInputs.append(inputValue);

    let submit = document.createElement("button");
    submit.classList.add("userInputsBtn");
    submit.innerHTML = "Add";
    userInputs.append(submit);
    submit.onclick = () => {
        let name = inputName.value;
        let value = inputValue.value;
        console.log({ name, value });
        if (name == '' || value == '') {
            alert('Invalid input or empty input')
        }
        else {
            data.push(parseInt(value));
            labels.push(name);
            inputValue.value = '';
            inputName.value = '';
            let div = document.createElement("div");
            div.classList.add("checkboxesContainer")

            let label = document.createElement("label");
            label.classList.add("label");
            label.innerHTML = name;

            const checkedbox = document.createElement("input");
            checkedbox.classList.add("checkbox");
            checkedbox.setAttribute("type", "checkbox");
            checkedbox.checked = false;
            div.append(label);
            div.append(checkedbox);
            form.append(div);
            console.log(data)
            console.log(labels)
            checkedbox.onclick = () => {
                let newdataarray = [];
                let newlabelarray = [];
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                let i = 0;
                form.childNodes.forEach((item) => {
                    if (item.childNodes[1].checked === true) {
                        newdataarray.push(data[i]);
                        newlabelarray.push(labels[i]);
                    }
                    i++;
                })
                console.log(newdataarray);
                let total = 0;
                for (let i = 0; i < newdataarray.length; i++) {
                    total += newdataarray[i];
                }
                percentage = []
                for (let i = 0; i < newdataarray.length; i++) {
                    percentage.push((Math.floor((newdataarray[i] / total) * 1000)) / 10)
                }
                let startAngle = 0;
                let radius = 125;
                let x_location = canvas.width / 2;
                let y_location = canvas.height / 2;
                for (let i = 0; i < newdataarray.length; i++) {
                    ctx.fillStyle = randomHexColor();
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    let endAngle = (newdataarray[i] / total) * Math.PI * 2 + startAngle;
                    ctx.moveTo(x_location, y_location);
                    ctx.arc(x_location, y_location, radius, startAngle, endAngle, false);
                    ctx.lineTo(x_location, y_location);
                    ctx.fill();
                    ctx.stroke();

                    ctx.font = "15px Arial";
                    ctx.textAlign = "center";
                    let theta = (startAngle + endAngle) / 2;
                    let deltaY = Math.sin(theta) * 1.3 * radius;
                    let deltaX = Math.cos(theta) * 1.3 * radius;
                    // let deltaY_in = Math.sin(theta) * 0.7 * radius;
                    // let deltaX_in = Math.cos(theta) * 0.7 * radius;
                    let deltaY_in = Math.sin(theta) * 1.3 * radius;
                    let deltaX_in = Math.cos(theta) * 1.3 * radius;
                    ctx.fillText(newlabelarray[i], deltaX + x_location, deltaY + y_location);
                    ctx.fillStyle = "#000"
                    ctx.fillText(`${percentage[i]}%`, deltaX_in + x_location, deltaY_in + y_location + 15);
                    ctx.closePath();

                    startAngle = endAngle;

                }
                ctx.font = "20px Arial";
                ctx.fillStyle = "#000000";
                ctx.fillText(`${title}`, width / 2, 20);
                let sum = newdataarray.reduce((a, b) => { return a + b }, 0);

                //update anaylsis
                rightSide.removeChild(analysis);
                rightSide.removeChild(userInputs);
                analysis = new Analysis(newdataarray).create();
                rightSide.append(analysis);
                rightSide.append(userInputs);
            }
            checkedbox.click();
        }
    }
    return content
}

function drawBarGraph(data, labels, width = 400, height = 400, title = "This is our Bar Graph") {
    let content = document.createElement("div");
    content.classList.add('pie-chart-content')

    let form = document.createElement("div");
    form.classList.add('form-content')
    content.append(form)

    let canvas = document.createElement('canvas');
    canvas.classList.add("canvas");
    let ctx = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;
    content.append(canvas);

    var bar_width = 40; //bar width
    var X = 50; // first bar position

    let total = 0;
    for (let i = 0; i < data.length; i++) {
        total += data[i];
    }

    let new_data = [];
    for (let i = 0; i < data.length; i++) {
        let value = (data[i] / total) * (width - 50);
        new_data.push(value);
    }

    let elementslist = [];
    let newDataArray = [];
    let newLabelArray = [];
    newDataArray = data;
    newLabelArray = labels;

    for (let i = 0; i < new_data.length; i++) {
        let div = document.createElement("div");
        div.classList.add("checkboxesContainer")

        let label = document.createElement("label");
        label.classList.add("label");
        label.innerHTML = labels[i];

        const checkedbox = document.createElement("input");
        checkedbox.classList.add("checkbox");
        checkedbox.setAttribute("type", "checkbox");
        checkedbox.checked = true;
        checkedbox.onclick = () => {
            newDataArray = [];
            newLabelArray = [];
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            let i = 0;
            form.childNodes.forEach((item) => {
                if (item.childNodes[1].checked === true) {
                    newDataArray.push(data[i]);
                    newLabelArray.push(labels[i]);
                }
                i++;
            })
            console.log(newDataArray);
            console.log(newLabelArray);

            let total = 0;
            for (let i = 0; i < newDataArray.length; i++) {
                total += newDataArray[i];
            }

            new_data = [];
            for (let i = 0; i < newDataArray.length; i++) {
                let value = (newDataArray[i] / total) * (width - 50);
                new_data.push(value);
            }
            console.log(new_data);
            X = 50;
            elementslist = [];
            for (let i = 0; i < new_data.length; i++) {
                ctx.fillStyle = "#000000";
                ctx.font = "12px Arial";
                ctx.fillText(newLabelArray[i], 350, 50 + i * 15);
                ctx.fillStyle = randomHexColor();
                ctx.fillRect(330, 43 + i * 15, 8, 8);

                //TODO fix bar max height
                let h = new_data[i];
                // ctx.fillRect(X, canvas.height - h, bar_width, h);
                let rectangle = new Path2D();
                rectangle.rect(X, canvas.height - h, bar_width, h);
                elementslist.push(rectangle)
                ctx.fill(rectangle);
                X += bar_width + 15;
            }

            ctx.fillStyle = "#000000";
            ctx.font = "20px Arial";
            ctx.fillText(`${title}`, width / 2 - 100, 20);

            //update anaylsis
            rightSide.removeChild(analysis);
            rightSide.removeChild(userInputs);
            analysis = new Analysis(newDataArray).create();
            rightSide.append(analysis);
            rightSide.append(userInputs);
        }
        //appennd
        div.append(label);
        div.append(checkedbox);
        form.append(div);


        ctx.fillStyle = "#000000";
        ctx.font = "10px Arial";
        ctx.fillText(labels[i], 350, 50 + i * 15);
        ctx.fillStyle = randomHexColor();
        ctx.fillRect(330, 43 + i * 15, 8, 8);
        var h = new_data[i];
        // ctx.fillRect(X, canvas.height - h, bar_width, h);
        let rectangle = new Path2D();
        rectangle.rect(X, canvas.height - h, bar_width, h);
        elementslist.push(rectangle)
        ctx.fill(rectangle);

        X += bar_width + 15;
        // ctx.fillStyle = "#4da6ff";
        // ctx.font = "10px Arial";
        // ctx.fillText(data[i], X - 45, canvas.height - h - 10);
        // ctx.stroke();
    }

    canvas.addEventListener('mousemove', function (event) {
        console.log("i am in the event listener?")
        for (let i = 0; i < newDataArray.length; i++) {
            if (ctx.isPointInPath(elementslist[i], event.offsetX, event.offsetY)) {
                canvas.style.cursor = 'pointer';
                var bar_h = new_data[i];
                let new_x = X - (bar_width + 15) * (newDataArray.length - i - 1);
                ctx.stroke();
                ctx.fillStyle = "#000";
                ctx.font = "12px Arial";
                ctx.fillText(newDataArray[i], new_x - 45, canvas.height - bar_h - 10);
                ctx.stroke();
                return
            }
            else {
                canvas.style.cursor = 'default';
                for (let d = 0; d < newDataArray.length; d++) {
                    var bar_h = new_data[d];
                    let new_x = X - (bar_width + 15) * (newDataArray.length - d - 1);
                    // ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.clearRect(new_x - 45, canvas.height - bar_h - 20, 30, 15);
                }
            }
        }
    })

    ctx.fillStyle = "#000000";
    ctx.font = "20px Arial";
    ctx.fillText(`${title}`, width / 2 - 100, 20);

    let rightSide = document.createElement("div");
    rightSide.classList.add("rightSide");
    content.append(rightSide);

    console.log("right before create analysis " + data)
    let analysis = new Analysis(data).create();
    rightSide.append(analysis);

    let userInputs = document.createElement("div");
    userInputs.classList.add("userInputs");
    rightSide.append(userInputs);

    let userInputsTitle = document.createElement("div");
    userInputs.classList.add("userInputsTitle");
    userInputsTitle.innerHTML = "Add Data";
    userInputs.append(userInputsTitle);

    let inputName = document.createElement("input");
    inputName.placeholder = "Input Name";
    inputName.classList.add("input");
    userInputs.append(inputName);

    let inputValue = document.createElement("input");
    inputValue.placeholder = "Input Value";
    inputValue.classList.add("input");
    userInputs.append(inputValue);

    let submit = document.createElement("button");
    submit.classList.add("userInputsBtn");
    submit.innerHTML = "Add";
    userInputs.append(submit);
    submit.onclick = () => {
        let name = inputName.value;
        let value = inputValue.value;
        console.log({ name, value });
        if (name == '' || value == '') {
            alert('Invalid input or empty input')
        }
        else {
            data.push(parseInt(value));
            labels.push(name);
            inputValue.value = '';
            inputName.value = '';
            let div = document.createElement("div");
            div.classList.add("checkboxesContainer")

            let label = document.createElement("label");
            label.classList.add("label");
            label.innerHTML = name;

            const checkedbox = document.createElement("input");
            checkedbox.classList.add("checkbox");
            checkedbox.setAttribute("type", "checkbox");
            checkedbox.checked = false;
            div.append(label);
            div.append(checkedbox);
            form.append(div);
            console.log(data)
            console.log(labels)
            checkedbox.onclick = () => {
                newDataArray = [];
                newLabelArray = [];
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                let i = 0;
                form.childNodes.forEach((item) => {
                    if (item.childNodes[1].checked === true) {
                        newDataArray.push(data[i]);
                        newLabelArray.push(labels[i]);
                    }
                    i++;
                })
                console.log(newDataArray);
                console.log(newLabelArray);

                let total = 0;
                for (let i = 0; i < newDataArray.length; i++) {
                    total += newDataArray[i];
                }

                new_data = [];
                for (let i = 0; i < newDataArray.length; i++) {
                    let value = (newDataArray[i] / total) * (width - 50);
                    new_data.push(value);
                }
                console.log(new_data);
                X = 50;
                elementslist = [];
                for (let i = 0; i < new_data.length; i++) {
                    ctx.fillStyle = "#000000";
                    ctx.font = "12px Arial";
                    ctx.fillText(newLabelArray[i], 350, 50 + i * 15);
                    ctx.fillStyle = randomHexColor();
                    ctx.fillRect(330, 43 + i * 15, 8, 8);

                    //TODO fix bar max height
                    let h = new_data[i];
                    // ctx.fillRect(X, canvas.height - h, bar_width, h);
                    let rectangle = new Path2D();
                    rectangle.rect(X, canvas.height - h, bar_width, h);
                    elementslist.push(rectangle)
                    ctx.fill(rectangle);
                    X += bar_width + 15;
                }

                ctx.fillStyle = "#000000";
                ctx.font = "20px Arial";
                ctx.fillText(`${title}`, width / 2 - 100, 20);

                //update anaylsis
                rightSide.removeChild(analysis);
                rightSide.removeChild(userInputs);
                analysis = new Analysis(newDataArray).create();
                rightSide.append(analysis);
                rightSide.append(userInputs);
            }
            checkedbox.click();
        }
    }

    return content;
}

function drawHistogram(data, labels, width = 400, height = 400, title = "This is our Bar Graph") {
    let content = document.createElement("div");
    content.classList.add('pie-chart-content')

    let form = document.createElement("div");
    form.classList.add('form-content')
    content.append(form)

    let canvas = document.createElement('canvas');
    canvas.classList.add("canvas");
    let ctx = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;
    content.append(canvas);

    var bar_width = 40; //bar width
    var X = 50; // first bar position

    let total = 0;
    for (let i = 0; i < data.length; i++) {
        total += data[i];
    }

    let new_data = [];
    for (let i = 0; i < data.length; i++) {
        let value = (data[i] / total) * (width - 50);
        new_data.push(value);
    }

    let elementslist = [];
    let newDataArray = [];
    let newLabelArray = [];
    newDataArray = data;
    newLabelArray = labels;

    for (let i = 0; i < new_data.length; i++) {
        let div = document.createElement("div");
        div.classList.add("checkboxesContainer")

        let label = document.createElement("label");
        label.classList.add("label");
        label.innerHTML = labels[i];

        const checkedbox = document.createElement("input");
        checkedbox.classList.add("checkbox");
        checkedbox.setAttribute("type", "checkbox");
        checkedbox.checked = true;
        checkedbox.onclick = () => {
            newDataArray = [];
            newLabelArray = [];
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            let i = 0;
            form.childNodes.forEach((item) => {
                if (item.childNodes[1].checked === true) {
                    newDataArray.push(data[i]);
                    newLabelArray.push(labels[i]);
                }
                i++;
            })
            console.log(newDataArray);
            console.log(newLabelArray);

            let total = 0;
            for (let i = 0; i < newDataArray.length; i++) {
                total += newDataArray[i];
            }

            new_data = [];
            for (let i = 0; i < newDataArray.length; i++) {
                let value = (newDataArray[i] / total) * (width - 50);
                new_data.push(value);
            }
            console.log(new_data);
            X = 50;
            elementslist = [];
            for (let i = 0; i < new_data.length; i++) {
                ctx.fillStyle = "#000000";
                ctx.font = "12px Arial";
                ctx.fillText(newLabelArray[i], 350, 50 + i * 15);
                ctx.fillStyle = randomHexColor();
                ctx.fillRect(330, 43 + i * 15, 8, 8);

                //TODO fix bar max height
                let h = new_data[i];
                // ctx.fillRect(X, canvas.height - h, bar_width, h);
                let rectangle = new Path2D();
                rectangle.rect(X, canvas.height - h, bar_width, h);
                elementslist.push(rectangle)
                ctx.fill(rectangle);
                X += bar_width;
            }

            ctx.fillStyle = "#000000";
            ctx.font = "20px Arial";
            ctx.fillText(`${title}`, width / 2 - 100, 20);

            //update anaylsis
            rightSide.removeChild(analysis);
            rightSide.removeChild(userInputs);
            analysis = new Analysis(newDataArray).create();
            rightSide.append(analysis);
            rightSide.append(userInputs);
        }
        //appennd
        div.append(label);
        div.append(checkedbox);
        form.append(div);


        ctx.fillStyle = "#000000";
        ctx.font = "10px Arial";
        ctx.fillText(labels[i], 350, 50 + i * 15);
        ctx.fillStyle = randomHexColor();
        ctx.fillRect(330, 43 + i * 15, 8, 8);
        var h = new_data[i];
        // ctx.fillRect(X, canvas.height - h, bar_width, h);
        let rectangle = new Path2D();
        rectangle.rect(X, canvas.height - h, bar_width, h);
        elementslist.push(rectangle)
        ctx.fill(rectangle);

        X += bar_width;
        // ctx.fillStyle = "#4da6ff";
        // ctx.font = "10px Arial";
        // ctx.fillText(data[i], X - 45, canvas.height - h - 10);
        // ctx.stroke();
    }

    canvas.addEventListener('mousemove', function (event) {
        console.log("i am in the event listener?")
        for (let i = 0; i < newDataArray.length; i++) {
            if (ctx.isPointInPath(elementslist[i], event.offsetX, event.offsetY)) {
                canvas.style.cursor = 'pointer';
                var bar_h = new_data[i];
                let new_x = X - (bar_width) * (newDataArray.length - i - 1) + 15;
                ctx.stroke();
                ctx.fillStyle = "#000";
                ctx.font = "12px Arial";
                ctx.fillText(newDataArray[i], new_x - 45, canvas.height - bar_h - 10);
                ctx.stroke();
                return
            }
            else {
                canvas.style.cursor = 'default';
                for (let d = 0; d < newDataArray.length; d++) {
                    var bar_h = new_data[d];
                    let new_x = X - (bar_width) * (newDataArray.length - d - 1) + 15;
                    // ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.clearRect(new_x - 45, canvas.height - bar_h - 20, 30, 15);
                }
            }
        }
    })

    ctx.fillStyle = "#000000";
    ctx.font = "20px Arial";
    ctx.fillText(`${title}`, width / 2 - 100, 20);

    let rightSide = document.createElement("div");
    rightSide.classList.add("rightSide");
    content.append(rightSide);

    console.log("right before create analysis " + data)
    let analysis = new Analysis(data).create();
    rightSide.append(analysis);

    let userInputs = document.createElement("div");
    userInputs.classList.add("userInputs");
    rightSide.append(userInputs);

    let userInputsTitle = document.createElement("div");
    userInputs.classList.add("userInputsTitle");
    userInputsTitle.innerHTML = "Add Data";
    userInputs.append(userInputsTitle);

    let inputName = document.createElement("input");
    inputName.placeholder = "Input Name";
    inputName.classList.add("input");
    userInputs.append(inputName);

    let inputValue = document.createElement("input");
    inputValue.placeholder = "Input Value";
    inputValue.classList.add("input");
    userInputs.append(inputValue);

    let submit = document.createElement("button");
    submit.classList.add("userInputsBtn");
    submit.innerHTML = "Add";
    userInputs.append(submit);
    submit.onclick = () => {
        let name = inputName.value;
        let value = inputValue.value;
        console.log({ name, value });
        if (name == '' || value == '') {
            alert('Invalid input or empty input')
        }
        else {
            data.push(parseInt(value));
            labels.push(name);
            inputValue.value = '';
            inputName.value = '';
            let div = document.createElement("div");
            div.classList.add("checkboxesContainer")

            let label = document.createElement("label");
            label.classList.add("label");
            label.innerHTML = name;

            const checkedbox = document.createElement("input");
            checkedbox.classList.add("checkbox");
            checkedbox.setAttribute("type", "checkbox");
            checkedbox.checked = false;
            div.append(label);
            div.append(checkedbox);
            form.append(div);
            console.log(data)
            console.log(labels)
            checkedbox.onclick = () => {
                newDataArray = [];
                newLabelArray = [];
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                let i = 0;
                form.childNodes.forEach((item) => {
                    if (item.childNodes[1].checked === true) {
                        newDataArray.push(data[i]);
                        newLabelArray.push(labels[i]);
                    }
                    i++;
                })
                console.log(newDataArray);
                console.log(newLabelArray);
    
                let total = 0;
                for (let i = 0; i < newDataArray.length; i++) {
                    total += newDataArray[i];
                }
    
                new_data = [];
                for (let i = 0; i < newDataArray.length; i++) {
                    let value = (newDataArray[i] / total) * (width - 50);
                    new_data.push(value);
                }
                console.log(new_data);
                X = 50;
                elementslist = [];
                for (let i = 0; i < new_data.length; i++) {
                    ctx.fillStyle = "#000000";
                    ctx.font = "12px Arial";
                    ctx.fillText(newLabelArray[i], 350, 50 + i * 15);
                    ctx.fillStyle = randomHexColor();
                    ctx.fillRect(330, 43 + i * 15, 8, 8);
    
                    //TODO fix bar max height
                    let h = new_data[i];
                    // ctx.fillRect(X, canvas.height - h, bar_width, h);
                    let rectangle = new Path2D();
                    rectangle.rect(X, canvas.height - h, bar_width, h);
                    elementslist.push(rectangle)
                    ctx.fill(rectangle);
                    X += bar_width;
                }
    
                ctx.fillStyle = "#000000";
                ctx.font = "20px Arial";
                ctx.fillText(`${title}`, width / 2 - 100, 20);
    
                //update anaylsis
                rightSide.removeChild(analysis);
                rightSide.removeChild(userInputs);
                analysis = new Analysis(newDataArray).create();
                rightSide.append(analysis);
                rightSide.append(userInputs);
            }
            checkedbox.click();
        }
    }

    return content;
}

function drawLineGraph(data, label, x_label, y_label, width = 400, height = 400, title = "This is our Line Graph") {
    let content = document.createElement("div");
    content.style.display = "flex";

    //4 inputs; x min max, y min max, submit button 
    let form = document.createElement("div");
    form.style.display = "flex";
    form.style.flexDirection = "column";
    form.style.maxWidth = "150px";
    form.style.padding = "1.6rem";
    form.style.gap = "0.5rem";
    content.append(form);

    let yInput = document.createElement("input");
    yInput.placeholder = "Input y";
    yInput.style.display = "block";
    form.append(yInput);


    let submit = document.createElement("button");
    submit.innerHTML = "Submit";
    submit.style.width = "max-content";
    submit.style.display = "block";

    let added_array = [];
    submit.onclick = () => {
        let yInputArray = yInput.value.split(',');
        yInput.value = '';
        let new_data = [];
        for (let i = 0; i < yInputArray.length; i++) {
            let value = (yInputArray[i] / total) * (width - 50);
            new_data.push(value);
        }
        added_array.push(new_data)
        // console.log(yInputArray)
        // console.log(new_data)
        let x = 50;
        ctx.beginPath();
        ctx.moveTo(x, GRAPH_BOTTOM - new_data[0]);
        for (let i = 0; i < new_data.length; i++) {
            ctx.strokeStyle = "orange";
            ctx.lineTo(x, GRAPH_BOTTOM - new_data[i]);
            ctx.stroke();
            ctx.strokeStyle = "red";
            let circle = new Path2D();
            circle.arc(x, GRAPH_BOTTOM - new_data[i], 5, 0, 2 * Math.PI);
            ctx.stroke(circle);
            x += (width - 50) / data.length
        }

    }
    form.append(submit);

    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;
    content.append(canvas);

    // declare graph start and end  
    let GRAPH_TOP = 25;
    let GRAPH_BOTTOM = width - 25;
    let GRAPH_LEFT = 25;
    let GRAPH_RIGHT = height - 25;

    let total = 0;
    for (let i = 0; i < data.length; i++) {
        total += data[i];
    }

    let new_data = [];
    for (let i = 0; i < data.length; i++) {
        let value = (data[i] / total) * (width - 50);
        new_data.push(value);
    }

    // draw X and Y axis  
    ctx.beginPath();
    ctx.moveTo(GRAPH_LEFT, GRAPH_BOTTOM);
    ctx.lineTo(GRAPH_RIGHT, GRAPH_BOTTOM);
    ctx.lineTo(GRAPH_RIGHT, GRAPH_TOP);
    ctx.stroke();

    //makeing 4 dividend line
    ctx.strokeStyle = "#BBB";
    for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.moveTo(GRAPH_LEFT, (GRAPH_BOTTOM - 25) / 4 * i + GRAPH_TOP);
        ctx.lineTo(GRAPH_RIGHT, (GRAPH_BOTTOM - 25) / 4 * i + GRAPH_TOP);
        ctx.fillText(`${total / 4 * (4 - i)}`, 10, (GRAPH_BOTTOM - 25) / 4 * i + GRAPH_TOP + 5);
        ctx.stroke();
    }

    //plot line 
    let x = 50;
    ctx.beginPath();
    ctx.moveTo(x, GRAPH_BOTTOM - new_data[0]);
    let elementslist = [];
    for (let i = 0; i < new_data.length; i++) {
        ctx.strokeStyle = "orange";
        ctx.lineTo(x, GRAPH_BOTTOM - new_data[i]);
        ctx.stroke();
        ctx.strokeStyle = "red";
        let circle = new Path2D();
        circle.arc(x, GRAPH_BOTTOM - new_data[i], 5, 0, 2 * Math.PI);
        elementslist.push(circle)
        ctx.stroke(circle);
        ctx.fillText(label[i], x - 20, GRAPH_BOTTOM + 10);
        x += (width - 50) / new_data.length
    }
    ctx.closePath();
    ctx.fillStyle = 'black';

    ctx.font = "14px Arial";
    ctx.fillText(`${x_label}`, width / 2 - 50, height - 4);

    ctx.save();
    ctx.translate(width - 10, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = "center";
    ctx.fillText(`${y_label}`, 0, 0);
    ctx.restore();

    ctx.fillStyle = "#000000";
    ctx.font = "20px Arial";
    ctx.fillText(`${title}`, width / 2 - 100, 20);

    canvas.addEventListener('mousemove', function (event) {
        for (let i = 0; i < elementslist.length; i++) {
            if (ctx.isPointInPath(elementslist[i], event.offsetX, event.offsetY)) {
                canvas.style.cursor = 'pointer';
                ctx.strokeStyle = "#000000";
                let rectangle = new Path2D();
                let new_x = x - (((width - 50) / new_data.length) * (elementslist.length - i))
                rectangle.rect(new_x, GRAPH_BOTTOM - new_data[i] - 20, 85, 15);
                ctx.stroke(rectangle);
                ctx.font = "10px Arial";
                ctx.fillText(`${label[i]} : ${data[i]}`, new_x, GRAPH_BOTTOM - new_data[i] - 10);
                return
            }
            else {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                canvas.style.cursor = 'default';
                ctx.font = "10px Arial";
                ctx.strokeStyle = "#000000";
                ctx.beginPath();
                ctx.moveTo(GRAPH_LEFT, GRAPH_BOTTOM);
                ctx.lineTo(GRAPH_RIGHT, GRAPH_BOTTOM);
                ctx.lineTo(GRAPH_RIGHT, GRAPH_TOP);
                ctx.stroke();

                //makeing 4 dividend line
                ctx.strokeStyle = "#BBB";
                for (let i = 0; i < 4; i++) {
                    ctx.beginPath();
                    ctx.moveTo(GRAPH_LEFT, (GRAPH_BOTTOM - 25) / 4 * i + GRAPH_TOP);
                    ctx.lineTo(GRAPH_RIGHT, (GRAPH_BOTTOM - 25) / 4 * i + GRAPH_TOP);
                    ctx.fillText(`${total / 4 * (4 - i)}`, 10, (GRAPH_BOTTOM - 25) / 4 * i + GRAPH_TOP + 5);
                    ctx.stroke();
                }

                //plot line 
                let x = 50;
                ctx.beginPath();
                ctx.moveTo(x, GRAPH_BOTTOM - new_data[0]);
                let elementslist = [];
                for (let i = 0; i < new_data.length; i++) {
                    ctx.strokeStyle = "orange";
                    ctx.lineTo(x, GRAPH_BOTTOM - new_data[i]);
                    ctx.stroke();
                    ctx.strokeStyle = "red";
                    let circle = new Path2D();
                    circle.arc(x, GRAPH_BOTTOM - new_data[i], 5, 0, 2 * Math.PI);
                    elementslist.push(circle)
                    ctx.stroke(circle);
                    ctx.fillText(label[i], x - 20, GRAPH_BOTTOM + 10);
                    x += (width - 50) / new_data.length
                }
                for (let j = 0; j < added_array.length; j++){
                    let x = 50;
                    ctx.beginPath();
                    ctx.moveTo(x, GRAPH_BOTTOM - added_array[j][0]);
                    for (let k = 0; k < added_array[j].length; k++){
                        ctx.strokeStyle = "orange";
                        ctx.lineTo(x, GRAPH_BOTTOM - added_array[j][k]);
                        ctx.stroke();
                        ctx.strokeStyle = "red";
                        let circle = new Path2D();
                        circle.arc(x, GRAPH_BOTTOM - added_array[j][k], 5, 0, 2 * Math.PI);
                        ctx.stroke(circle);
                        x += (width - 50) / new_data.length
                    }
                }
                ctx.closePath();
                ctx.fillStyle = 'black';

                ctx.font = "14px Arial";
                ctx.fillText(`${x_label}`, width / 2 - 50, height - 4);

                ctx.save();
                ctx.translate(width - 10, height / 2);
                ctx.rotate(-Math.PI / 2);
                ctx.textAlign = "center";
                ctx.fillText(`${y_label}`, 0, 0);
                ctx.restore();

                ctx.fillStyle = "#000000";
                ctx.font = "20px Arial";
                ctx.fillText(`${title}`, width / 2 - 100, 20);
                ////  
            }
        }
    })


    return content;
}



function drawScatterPlot(data, x_label, y_label, width = 400, height = 400, title = "This is our Scatter plot") {
    let content = document.createElement("div");
    content.style.display = "flex";

    //4 inputs; x min max, y min max, submit button 
    let form = document.createElement("div");
    form.style.display = "flex";
    form.style.flexDirection = "column";
    form.style.maxWidth = "150px";
    form.style.padding = "1.6rem";
    form.style.gap = "0.5rem";
    content.append(form);

    let xMinInput = document.createElement("input");
    xMinInput.placeholder = "x minimun";
    xMinInput.style.display = "block";
    form.append(xMinInput);

    let xMaxInput = document.createElement("input");
    xMaxInput.placeholder = "x maximun";
    xMaxInput.style.display = "block";
    form.append(xMaxInput);

    let yMinInput = document.createElement("input");
    yMinInput.placeholder = "y minimun";
    yMinInput.style.display = "block";
    form.append(yMinInput);

    let yMaxInput = document.createElement("input");
    yMaxInput.placeholder = "y maximun";
    yMaxInput.style.display = "block";
    form.append(yMaxInput);

    let colorInput = document.createElement("input");
    colorInput.placeholder = "color";
    colorInput.style.display = "block";
    form.append(colorInput);

    let submit = document.createElement("button");
    submit.innerHTML = "Submit";
    submit.style.width = "max-content";
    submit.style.display = "block";
    submit.onclick = () => {
        if (xMinInput.value == '' || xMaxInput.value == '' || yMinInput.value == '' || yMaxInput.value == '' || colorInput.value == '' ){
            alert('Input cannot be empty')
        }
        else if (xMinInput.value < 0 || xMaxInput.value > x_max || yMinInput.value < 0 || yMaxInput.value > y_max){
            alert('Invalid input')
        }
        else{
            let inputData = {
                xMin: xMinInput.value,
                xMax: xMaxInput.value,
                yMin: yMinInput.value,
                yMax: yMaxInput.value,
                color: colorInput.value
            }
            let data_x_range = [];
            let data_y_range = [];
            for (let i = 0; i < x_value.length; i++) {
                console.log("I go loop")
                if ((x_value[i] > inputData.xMin) && (x_value[i] < inputData.xMax)
                    && (y_value[i] > inputData.yMin) && (y_value[i] < inputData.yMax)
                ) {
                    data_x_range.push(x_value[i])
                    data_y_range.push(y_value[i])
                }
            }

            let normalized_range_x = [];
            let normalized_range_y = [];
            for (let i = 0; i < data_x_range.length; i++) {
                normalized_range_x.push((data_x_range[i] / x_max) * (width - 50));
                normalized_range_y.push((data_y_range[i] / y_max) * (height - 50));
            }

            // console.log(normalized_range_x)
            // console.log(normalized_range_y)

            ctx.fillStyle = inputData.color;
            for (let i = 0; i < normalized_range_x.length; i++) {
                ctx.beginPath();
                let scaleX = normalized_range_x[i];
                let scaleY = normalized_range_y[i];
                ctx.arc(scaleX + 25, GRAPH_BOTTOM - scaleY, 2, 0, 2 * Math.PI);
                ctx.fill();
                ctx.closePath();
            }
        }
        xMinInput.value = '';
        xMaxInput.value = '';
        yMinInput.value = '';
        yMaxInput.value = '';
        colorInput.value = '';
    }
    form.append(submit);

    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;
    content.append(canvas);

    // declare graph start and end  
    let GRAPH_TOP = 25;
    let GRAPH_BOTTOM = height - 25;
    let GRAPH_LEFT = 25;
    let GRAPH_RIGHT = width - 25;

    let x_value = [];
    let y_value = [];
    for (let i = 0; i < data.length; i++) {
        x_value.push(Math.floor(data[i][0] * 100) / 100);
        y_value.push(Math.floor(data[i][1] * 100) / 100);
    }

    x_max = Math.max.apply(null, x_value);
    y_max = Math.max.apply(null, y_value);
    x_max += x_max / 10;
    y_max += y_max / 10;

    let normalized_x = [];
    let normalized_y = [];

    for (let i = 0; i < data.length; i++) {
        normalized_x.push((x_value[i] / x_max) * (width - 50));
        normalized_y.push((y_value[i] / y_max) * (height - 50));
    }

    // draw X and Y axis  
    ctx.beginPath();
    ctx.moveTo(GRAPH_LEFT, GRAPH_BOTTOM);
    ctx.lineTo(GRAPH_RIGHT, GRAPH_BOTTOM);
    ctx.lineTo(GRAPH_RIGHT, GRAPH_TOP);
    ctx.stroke();

    //makeing 4 dividend line
    ctx.strokeStyle = "#BBB";
    for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.moveTo(GRAPH_LEFT, (GRAPH_BOTTOM - 25) / 4 * i + GRAPH_TOP);
        ctx.lineTo(GRAPH_RIGHT, (GRAPH_BOTTOM - 25) / 4 * i + GRAPH_TOP);

        ctx.moveTo((GRAPH_RIGHT - 25) / 4 * i + GRAPH_LEFT, GRAPH_TOP);
        ctx.lineTo((GRAPH_RIGHT - 25) / 4 * i + GRAPH_LEFT, GRAPH_BOTTOM);

        ctx.fillText(`${Math.floor(y_max / 4 * (4 - i))}`, 10, (GRAPH_BOTTOM - 25) / 4 * i + GRAPH_TOP + 5);
        ctx.fillText(`${Math.floor(x_max / 4 * (4 - i))}`, ((GRAPH_RIGHT - 25) / 4 * (4 - i) + GRAPH_LEFT - 10), GRAPH_BOTTOM + 10);
        ctx.stroke();
    }

    ctx.fillStyle = "#777";
    for (let i = 0; i < data.length; i++) {
        ctx.beginPath();
        let scaleX = normalized_x[i];
        let scaleY = normalized_y[i];
        ctx.arc(scaleX + 25, GRAPH_BOTTOM - scaleY, 2, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }

    ctx.fillStyle = "#000000";
    ctx.font = "14px Arial";

    ctx.save();
    ctx.translate(width - 10, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = "center";
    ctx.fillText(`${y_label}`, 0, 0);
    ctx.restore();

    ctx.font = "14px Arial";
    ctx.fillText(`${x_label}`, width / 2 - 50, height - 4);


    ctx.font = "20px Arial";
    ctx.fillText(`${title}`, width / 2 - 100, 20);

    return content;
}








