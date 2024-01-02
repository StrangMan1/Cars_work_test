
document.addEventListener('DOMContentLoaded', () => {

    const canvas = document.getElementById('canvas');
    const canvasCtx = canvas.getContext('2d');

    const car1SpeedInput = document.getElementById('car1-speed-input');
    const car2SpeedInput = document.getElementById('car2-speed-input');

    const DEFAULT_SPEED = 1;
    const VALID_SPEED_REGEX = /^[1-9]\d*$/;

    const getCarSpeed = (carSpeedInput) => {
        const isValidSpeed = VALID_SPEED_REGEX.test(carSpeedInput.value);

        return isValidSpeed ? +carSpeedInput.value : DEFAULT_SPEED;
    }

    const getCar1Speed = getCarSpeed.bind(null, car1SpeedInput);
    const getCar2Speed = getCarSpeed.bind(null, car2SpeedInput);

    const getIntersections = () => {
        const car1Coordinates = {};

        Car1Model.forEach(({ x, y }) => {
            car1Coordinates[`${x}:${y}`] = true;
        });
        
        return Car2Model.filter(
            ({ x, y }) => car1Coordinates[`${x}:${y}`]
        );
    };

    const drawPixelsByCoordinates = (
        coordinates,
        pixels,
        { r, g, b }
    ) => {
        for (let i = 0; i < coordinates.length; i++) {
            const x = coordinates[i].x;
            const y = canvas.height - coordinates[i].y;

            if (x < 0 || y < 0 || x > canvas.width || y > canvas.height) {
                continue;
            }

            const index = (y * canvas.width + x) * 4;

            pixels[index] = r;
            pixels[index + 1] = g;
            pixels[index + 2] = b;
            pixels[index + 3] = 255;
        }
    };

    const drawImage = () => {
        const imageData = canvasCtx.createImageData(
            canvas.width,
            canvas.height
        );
        const pixels = imageData.data;

        drawPixelsByCoordinates(Car1Model, pixels, { r: 49, g: 107, b: 182 });
        drawPixelsByCoordinates(Car2Model, pixels, { r: 96, g: 176, b: 119 });
        drawPixelsByCoordinates(getIntersections(), pixels, { r: 199, g: 48, b: 65 });

        canvasCtx.putImageData(imageData, 0, 0);
    };

    drawImage();


    document.getElementById('car1-left-btn').addEventListener('click', function () {
        const speed = getCar1Speed();
        fetch('/CarMove/Move', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: 'car1-left', speed })
        })
            .then(response => response.json())
            .then(data => {
                Car1Model = data;
                drawImage();
            });
    });

    document.getElementById('car1-right-btn').addEventListener('click', function () {
        fetch('/CarMove/Move', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: 'car1-right', speed: getCar1Speed() })
        })
            .then(response => response.json())
            .then(data => {
                Car1Model = data;
                drawImage();
            });
    });
    document.getElementById('car1-up-btn').addEventListener('click', function () {
        fetch('/CarMove/Move', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: 'car1-up', speed: getCar1Speed() })
        })
            .then(response => response.json())
            .then(data => {
                Car1Model = data;
                drawImage();
            });
    });
    document.getElementById('car1-down-btn').addEventListener('click', function () {
        fetch('/CarMove/Move', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: 'car1-down', speed: getCar1Speed() })
        })
            .then(response => response.json())
            .then(data => {
                Car1Model = data;
                drawImage();
            });
    });

    document.getElementById('car2-left-btn').addEventListener('click', function () {
        fetch('/CarMove/Move', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: 'car2-left', speed: getCar2Speed() })
        })
            .then(response => response.json())
            .then(data => {
                Car2Model = data;
                drawImage();
            });
    });
    document.getElementById('car2-right-btn').addEventListener('click', function () {
        fetch('/CarMove/Move', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: 'car2-right', speed: getCar2Speed() })
        })
            .then(response => response.json())
            .then(data => {
                Car2Model = data;
                drawImage();
            });
    });
    document.getElementById('car2-up-btn').addEventListener('click', function () {
        fetch('/CarMove/Move', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: 'car2-up', speed: getCar2Speed() })
        })
            .then(response => response.json())
            .then(data => {
                Car2Model = data;
                drawImage();
            });
    });
    document.getElementById('car2-down-btn').addEventListener('click', function () {
        fetch('/CarMove/Move', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: 'car2-down', speed: getCar2Speed() })
        })
            .then(response => response.json())
            .then(data => {
                Car2Model = data;
                drawImage();
            });
    });

    document.getElementById('car1-modify-btn').addEventListener('click', function () {
        fetch('/Reverse/ModifyCar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ number: 1 })
        })
            .then(response => response.json())
            .then(data => {
                Car1Model = data;
                drawImage();
            });
    });

    document.getElementById('car2-modify-btn').addEventListener('click', function () {
        fetch('/Reverse/ModifyCar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ number: 2 })
        })
            .then(response => response.json())
            .then(data => {
                Car2Model = data;
                drawImage();
            });
    });

    document.getElementById('car1-rotate-positive').addEventListener('click', function () {
        fetch('/Turn/RotateCar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ number: 1, value: 30 })
        })
            .then(response => response.json())
            .then(data => {
                Car1Model = data;
                drawImage();
            });
    });

    document.getElementById('car1-rotate-negative').addEventListener('click', function () {
        fetch('/Turn/RotateCar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ number: 1, value: -30 })
        })
            .then(response => response.json())
            .then(data => {
                Car1Model = data;
                drawImage();
            });
    });

    document.getElementById('car2-rotate-positive').addEventListener('click', function () {
        fetch('/Turn/RotateCar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ number: 2, value: 30 })
        })
            .then(response => response.json())
            .then(data => {
                Car2Model = data;
                drawImage();
            });
    });

    document.getElementById('car2-rotate-negative').addEventListener('click', function () {
        fetch('/Turn/RotateCar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ number: 2, value: -30 })
        })
            .then(response => response.json())
            .then(data => {
                Car2Model = data;
                drawImage();
            });
    });
});