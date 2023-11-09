const canvas = document.querySelector("canvas");
const tools = document.querySelectorAll(".tool");
const fillColorCheckbox = document.querySelector("#fill-color");
const sizeSlider = document.querySelector("#size-slider");
const colorOptions = document.querySelectorAll(".colors .option");
const colorPickerInput = document.querySelector("#color-picker");
const clearCanvasButton = document.querySelector(".clear-canvas");
const saveImageButton = document.querySelector(".save-img");
const context = canvas.getContext("2d", { willReadFrequently: true });

let prevX, prevY, lastSnapshot;
let isDrawing = false;
let currentTool = "brush";
let brushSize = 5;
let selectedColor = "#000";

// canvas.width = canvas.offsetWidth;
// canvas.height = canvas.offsetHeight;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function setBackground() {
    context.fillStyle = "#fff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = selectedColor;
}

window.addEventListener("load", () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    setBackground();
});

function drawRectangle(e) {
    if (!fillColorCheckbox.checked) {
        context.strokeRect(e.offsetX, e.offsetY, prevX - e.offsetX, prevY - e.offsetY);
    }
    context.fillRect(e.offsetX, e.offsetY, prevX - e.offsetX, prevY - e.offsetY);
}

function drawCircle(e) {
    context.beginPath();
    let radius = Math.sqrt(Math.pow(prevX - e.offsetX, 2) + Math.pow(prevY - e.offsetY, 2));
    context.arc(prevX, prevY, radius, 0, 2 * Math.PI);
    fillColorCheckbox.checked ? context.fill() : context.stroke();
}

function drawTriangle(e) {
    context.beginPath();
    context.moveTo(prevX, prevY);
    context.lineTo(e.offsetX, e.offsetY);
    context.lineTo(prevX * 2 - e.offsetX, e.offsetY);
    context.closePath();
    fillColorCheckbox.checked ? context.fill() : context.stroke();
}

function startDrawing(e) {
    isDrawing = true;
    prevX = e.offsetX;
    prevY = e.offsetY;
    context.beginPath();
    context.lineWidth = brushSize;
    context.strokeStyle = selectedColor;
    context.fillStyle = selectedColor;
    lastSnapshot = context.getImageData(0, 0, canvas.width, canvas.height);
}

function drawing(e) {
    if (!isDrawing) return;
    context.putImageData(lastSnapshot, 0, 0);

    if (currentTool === "brush" || currentTool === "eraser") {
        context.strokeStyle = currentTool === "eraser" ? "#fff" : selectedColor;
        context.lineTo(e.offsetX, e.offsetY);
        context.stroke();
    } else if (currentTool === "rectangle") {
        drawRectangle(e);
    } else if (currentTool === "circle") {
        drawCircle(e);
    } else {
        drawTriangle(e);
    }
}

tools.forEach(tool => {
    tool.addEventListener("click", () => {
        document.querySelector(".tool.active").classList.remove("active");
        tool.classList.add("active");
        currentTool = tool.id;
    });
});

sizeSlider.addEventListener("change", () => brushSize = sizeSlider.value);

colorOptions.forEach(option => {
    option.addEventListener("click", () => {
        document.querySelector(".colors .option.selected").classList.remove("selected");
        option.classList.add("selected");
        selectedColor = window.getComputedStyle(option).backgroundColor;
    });
});

colorPickerInput.addEventListener("change", () => {
    colorPickerInput.parentElement.style.backgroundColor = colorPickerInput.value;
    colorPickerInput.parentElement.click();
});

clearCanvasButton.addEventListener("click", () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    setBackground();
});

saveImageButton.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = `${Date.now()}.jpg`;
    link.href = canvas.toDataURL();
    link.click();
});

function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

setCanvasSize();

// window.addEventListener("resize", setCanvasSize);

const isTouchDevice = 'ontouchstart' in document.documentElement;

canvas.addEventListener('touchstart', handleTouchStart);
canvas.addEventListener('touchmove', handleTouchMove);
canvas.addEventListener('touchend', handleTouchEnd);

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', drawing);
canvas.addEventListener('mouseup', () => isDrawing = false);

function handleTouchStart(e) {
    if (e.touches.length > 0) {
        const touch = e.touches[0];
        startDrawing(touch);
    }
}

function handleTouchMove(e) {
    if (e.touches.length > 0) {
        const touch = e.touches[0];
        drawing(touch);
    }
}

function handleTouchEnd() {
    isDrawing = false;
}

document.body.addEventListener('touchstart', (e) => {
    if (e.target == canvas) {
        e.preventDefault();
    }
});

document.body.addEventListener('touchend', (e) => {
    if (e.target == canvas) {
        e.preventDefault();
    }
});






document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.querySelector(".toggle-button");
    const toolBoard = document.querySelector(".tools-board");

    toggleButton.addEventListener("click", function () {
        if (toolBoard.style.display === "none") {
            toolBoard.style.display = "block";
        } else {
            toolBoard.style.display = "none";
        }
    });
});

