(function () {
  function setupCanvas(canvas) {
    const ctx = canvas.getContext("2d");
    const clearButton = document.querySelector("[data-clear-canvas]");
    let drawing = false;

    function resizeCanvas() {
      const rect = canvas.getBoundingClientRect();
      const ratio = window.devicePixelRatio || 1;

      canvas.width = rect.width * ratio;
      canvas.height = rect.height * ratio;

      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = "#1f4e79";
    }

    function getPosition(event) {
      const rect = canvas.getBoundingClientRect();
      const point = event.touches ? event.touches[0] : event;

      return {
        x: point.clientX - rect.left,
        y: point.clientY - rect.top
      };
    }

    function startDrawing(event) {
      event.preventDefault();
      drawing = true;

      const pos = getPosition(event);
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
    }

    function draw(event) {
      if (!drawing) return;

      event.preventDefault();
      const pos = getPosition(event);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    }

    function stopDrawing() {
      drawing = false;
    }

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    window.addEventListener("mouseup", stopDrawing);

    canvas.addEventListener("touchstart", startDrawing, { passive: false });
    canvas.addEventListener("touchmove", draw, { passive: false });
    window.addEventListener("touchend", stopDrawing);

    if (clearButton) {
      clearButton.addEventListener("click", function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      });
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.querySelector("[data-draw-canvas]");
    if (canvas) {
      setupCanvas(canvas);
    }
  });
})();
