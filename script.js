const canvas = document.querySelector("canvas");
    const toolBtns = document.querySelectorAll(".tool");
    const fillColor = document.querySelector("#fill-color");
    const sizeSlider = document.querySelector("#size-slider");
    const colorBtns = document.querySelectorAll(".colors .option");
    const colorPicker = document.querySelector("#color-picker");
    const clearCanvas = document.querySelector(".clear-canvas");
    const saveImg = document.querySelector(".save-img");
    const ctx = canvas.getContext("2d",{ willReadFrequently: true });

    let prevMouseX, prevMouseY, snapshot;
    let isDrawing = false;
    let selectedTool = "brush";
    let brushWidth = 5;
    let selectedColor = "#000";

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    function setCanvasBackground() {
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = selectedColor;
    }

    window.addEventListener("load", () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      setCanvasBackground();
    });

    function drawRect(e) {
      if (!fillColor.checked) {
        ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
      }
      ctx.fillRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
    }

    function drawCircle(e) {
      ctx.beginPath();
      let radius = Math.sqrt(Math.pow(prevMouseX - e.offsetX, 2) + Math.pow(prevMouseY - e.offsetY, 2));
      ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI);
      fillColor.checked ? ctx.fill() : ctx.stroke();
    }

    function drawTriangle(e) {
      ctx.beginPath();
      ctx.moveTo(prevMouseX, prevMouseY);
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY);
      ctx.closePath();
      fillColor.checked ? ctx.fill() : ctx.stroke();
    }

    function startDraw(e) {
      isDrawing = true;
      prevMouseX = e.offsetX;
      prevMouseY = e.offsetY;
      ctx.beginPath();
      ctx.lineWidth = brushWidth;
      ctx.strokeStyle = selectedColor;
      ctx.fillStyle = selectedColor;
      snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
    }

    function drawing(e) {
      if (!isDrawing) return;
      ctx.putImageData(snapshot, 0, 0);

      if (selectedTool === "brush" || selectedTool === "eraser") {
        ctx.strokeStyle = selectedTool === "eraser" ? "#fff" : selectedColor;
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
      } else if (selectedTool === "rectangle") {
        drawRect(e);
      } else if (selectedTool === "circle") {
        drawCircle(e);
      } else {
        drawTriangle(e);
      }
    }

    toolBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelector(".tool.active").classList.remove("active");
        btn.classList.add("active");
        selectedTool = btn.id;
      });
    });

    sizeSlider.addEventListener("input", () => brushWidth = sizeSlider.value);

    colorBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelector(".colors .option.selected").classList.remove("selected");
        btn.classList.add("selected");
        selectedColor = window.getComputedStyle(btn).backgroundColor;
      });
    });

    colorPicker.addEventListener("input", () => {
      colorPicker.parentElement.style.backgroundColor = colorPicker.value;
      colorPicker.parentElement.click();
    });

    clearCanvas.addEventListener("click", () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setCanvasBackground();
    });

    saveImg.addEventListener("click", () => {
      const link = document.createElement("a");
      link.download = `${Date.now()}.jpg`;
      link.href = canvas.toDataURL();
      link.click();
    });

    const isTouchDevice = 'ontouchstart' in document.documentElement;

  
      canvas.addEventListener("touchstart", handleTouchStart);
      canvas.addEventListener("touchmove", handleTouchMove);
      canvas.addEventListener("touchend", handleTouchEnd);
    
      canvas.addEventListener("mousedown", startDraw);
      canvas.addEventListener("mousemove", drawing);
      canvas.addEventListener("mouseup", () => isDrawing = false);
    

      function handleTouchStart(e) {
        const touch = e.touches[0];
        startDraw(touch);
        e.preventDefault();
      }
      
      function handleTouchMove(e) {
        const touch = e.touches[0];
        drawing(touch);
        e.preventDefault();
      }
      
      function handleTouchEnd(e) {
        isDrawing = false;
        e.preventDefault();
      }
      
      document.body.addEventListener("touchstart", (e) => {
        if (e.target == canvas) {
          e.preventDefault();
        }
      }, {passive: false});
      
      document.body.addEventListener("touchend", (e) => {
        if (e.target == canvas) {
          e.preventDefault();
        }
      }, {passive: false});
      






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

