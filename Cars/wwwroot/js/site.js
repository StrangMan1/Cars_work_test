﻿<script>


document.addEventListener('DOMContentLoaded', () => {
    let Car1Model = @Html.Raw(Json.Serialize(Model.Car1));
    let Car2Model = @Html.Raw(Json.Serialize(Model.Car2));

    let shouldTriggerIntersectionsPaint = true;
    const speed = 50;
    const moveCar1 = (callback) => {
        Car1Model = Car1Model.map(callback);

        shouldTriggerIntersectionsPaint = true;

        chart.data.datasets[0].data = Car1Model;
        chart.update();
    };

    const moveCar2 = (callback) => {
        Car2Model = Car2Model.map(callback);

        shouldTriggerIntersectionsPaint = true;

        chart.data.datasets[1].data = Car2Model;
        chart.update();
    };

    const moveCar1Left = () => {
        moveCar1(({ x, y }) => ({ x: x - speed, y }));
    };

    const moveCar2Left = () => {
        moveCar2(({ x, y }) => ({ x: x - speed, y }));
    };

    const moveCar1Right = () => {
        moveCar1(({ x, y }) => ({ x: x + speed, y }));
    };

    const moveCar2Right = () => {
        moveCar2(({ x, y }) => ({ x: x + speed, y }));
    };

    const moveCar1Up = () => {
        moveCar1(({ x, y }) => ({ x, y: y + speed }));
    };

    const moveCar2Up = () => {
        moveCar2(({ x, y }) => ({ x, y: y + speed }));
    };

    const moveCar1Down = () => {
        moveCar1(({ x, y }) => ({ x, y: y - speed }));
    };

    const moveCar2Down = () => {
        moveCar2(({ x, y }) => ({ x, y: y - speed }));
    };

    const getIntersections = () => {
        const car1Coordinates = Car1Model.reduce((result, { x, y }) => [...result, `${x}:${y}`], []);
        const car2Coordinates = Car2Model.reduce((result, { x, y }) => [...result, `${x}:${y}`], []);
        const intersections = car1Coordinates.filter(el => car2Coordinates.includes(el));

        return intersections.map(el => {
            const [x, y] = el.split(':');

            return { x, y };
        });
    };

    const handleAfterDraw = (chart) => {
        if (!shouldTriggerIntersectionsPaint) {
            return;
        }

        shouldTriggerIntersectionsPaint = false;

        chart.data.datasets[2].data = getIntersections();
        chart.update();
    };

    const chart = new Chart(document.getElementById('canvas'), {
        type: 'scatter',
        data: {
            datasets: [
                {
                    label: 'Car 1',
                    data: Car1Model,
                    backgroundColor: 'crimson',
                    order: 1,
                },
                {
                    label: 'Car 2',
                    data: Car2Model,
                    backgroundColor: 'dodgerblue',
                    order: 2,
                },
                {
                    label: 'Intersections',
                    data: [],
                    backgroundColor: 'mediumseagreen',
                    borderColor: '#000',
                    order: 0,
                    pointRadius: 4,
                    animation: false,
                }
            ],
        },
        plugins: [
            {
                afterDraw: handleAfterDraw,
            }
        ],
        options: {
            plugins: {
                tooltip: {
                    enabled: false,
                },
                legend: {
                    display: false
                },
            },
            scales: {
                x: {
                    display: false,
                    ticks: {
                        stepSize: 1,
                    },
                    min: -560,
                    max: 1440,
                },
                y: {
                    display: false,
                    ticks: {
                        stepSize: 1,
                    },
                    min: -400,
                    max: 600,
                },
            },
        },
    });

    document.getElementById('car1-left-btn').addEventListener('click', moveCar1Left);
    document.getElementById('car1-right-btn').addEventListener('click', moveCar1Right);
    document.getElementById('car1-up-btn').addEventListener('click', moveCar1Up);
    document.getElementById('car1-down-btn').addEventListener('click', moveCar1Down);

    document.getElementById('car2-left-btn').addEventListener('click', moveCar2Left);
    document.getElementById('car2-right-btn').addEventListener('click', moveCar2Right);
    document.getElementById('car2-up-btn').addEventListener('click', moveCar2Up);
    document.getElementById('car2-down-btn').addEventListener('click', moveCar2Down);

    document.getElementById('car1-modify-btn').addEventListener('click', function () {
        fetch('/Home/ModifyCar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Car1Model)
        })
            .then(response => response.json())
            .then(data => {
                Car1Model = data;
                chart.data.datasets[0].data = Car1Model;
                chart.update();
            });
    });

    document.getElementById('car2-modify-btn').addEventListener('click', function () {
        fetch('/Home/ModifyCar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Car2Model)
        })
            .then(response => response.json())
            .then(data => {
                Car2Model = data;
                chart.data.datasets[1].data = Car2Model;
                chart.update();
            });
    });
    document.getElementById('car1-rotate-positive').addEventListener('click', function () {
        fetch('/Home/RotateCar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ model: Car1Model, value: 30 })
        })
            .then(response => response.json())
            .then(data => {
                Car1Model = data;
                chart.data.datasets[0].data = Car1Model;
                chart.update();
            });
    });

    document.getElementById('car1-rotate-negative').addEventListener('click', function () {
        fetch('/Home/RotateCar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ model: Car1Model, value: -30 })
        })
            .then(response => response.json())
            .then(data => {
                Car1Model = data;
                chart.data.datasets[0].data = Car1Model;
                chart.update();
            });
    });

    document.getElementById('car2-rotate-positive').addEventListener('click', function () {
        fetch('/Home/RotateCar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ model: Car2Model, value: 30 })
        })
            .then(response => response.json())
            .then(data => {
                Car2Model = data;
                chart.data.datasets[1].data = Car2Model;
                chart.update();
            });
    });

    document.getElementById('car2-rotate-negative').addEventListener('click', function () {
        fetch('/Home/RotateCar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ model: Car2Model, value: -30 })
        })
            .then(response => response.json())
            .then(data => {
                Car2Model = data;
                chart.data.datasets[1].data = Car2Model;
                chart.update();
            });
    });
});

</script>