const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let size = document.getElementById("size").textContent;
let isPressed = false;
let color = document.getElementById("color");
const increaseSize = document.getElementById("increase");
const decreaseSize = document.getElementById("decrease");
const clearBtn = document.getElementById("clear");

let x;
let y;

// Track the strokes of the mouse
canvas.addEventListener("mousedown", (e) => {
	isPressed = true;

	x = e.offsetX;
	y = e.offsetY;
});

// Track when the mouse is pressed
canvas.addEventListener("mouseup", (e) => {
	isPressed = false;

	x = undefined;
	y = undefined;
});

// Draws the stroke of the mouse
canvas.addEventListener("mousemove", (e) => {
	if (isPressed) {
		const x2 = e.offsetX;
		const y2 = e.offsetY;

		drawCircle(x2, y2);
		drawLine(x, y, x2, y2);
		startUp();

		x = x2;
		y = y2;
	}
});

// CLears the canvas
clearBtn.addEventListener("click", (e) => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Increases the pixels
increaseSize.addEventListener("click", () => {
	// let size = (document.getElementById("size").innerHTML = `${size++}`);
	size++;
	document.getElementById("size").innerHTML = `${size}`;
	console.log(size);
});

// Decreases the pixels
decreaseSize.addEventListener("click", () => {
	size--;
	document.getElementById("size").innerHTML = `${size}`;
	console.log(size);
});

// Change the color of the strokes
const startUp = () => {
	let color = document.getElementById("color");
	color.addEventListener("input", updateFirst, false);
	color.addEventListener("change", updateAll, false);
	color.select();
};
window.addEventListener("load", startUp, false);

const updateFirst = (event) => {
	ctx.fillStyle = event.target.value;
	ctx.fill();
	ctx.strokeStyle = event.target.value;
};

const updateAll = (event) => {
	ctx.strokeStyle = event.target.value;
};

function drawCircle(x, y) {
	ctx.beginPath();
	ctx.arc(x, y, size, 0, Math.PI * 2); // Outer circle
	ctx.fillStyle = color;
	ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.strokeStyle = color;
	ctx.lineWidth = size;
	ctx.stroke();
}
