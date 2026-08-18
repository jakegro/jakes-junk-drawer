(function () {
  function createEquationLayer() {
    if (document.querySelector(".background-equations")) return;

    const equations = [
      "Σ wᵢ = 0",
      "rₜ₊₁ = α + βrₘ + ε",
      "Sharpe ≈ μ / σ",
      "signal → ranks → weights",
      "costs matter",
      "test before trusting"
    ];

    const layer = document.createElement("div");
    layer.className = "background-equations";

    equations.forEach(function (text, index) {
      const span = document.createElement("span");
      span.className = "bg-equation eq-" + (index + 1);
      span.textContent = text;
      layer.appendChild(span);
    });

    document.body.prepend(layer);
  }

  function createDrawingCanvas() {
    if (document.querySelector(".notebook-draw-canvas")) return;

    const canvas = document.createElement("canvas");
    canvas.className = "notebook-draw-canvas";
    canvas.setAttribute("aria-label", "Interactive notebook background drawing canvas");

    const toolbar = document.createElement("div");
    toolbar.className = "draw-toolbar";
    toolbar.innerHTML = `
      <button class="draw-toggle" type="button">Draw</button>
      <button class="draw-clear" type="button">Clear</button>
      <span class="draw-status">background sketch</span>
    `;

    document.body.prepend(canvas);
    document.body.appendChild(toolbar);

    const ctx = canvas.getContext("2d");
    const toggleButton = toolbar.querySelector(".draw-toggle");
    const clearButton = toolbar.querySelector(".draw-clear");

    let drawing = false;
    let enabled = false;

    function resizeCanvas() {
      const ratio = window.devicePixelRatio || 1;
      const oldImage = document.createElement("canvas");
      const oldCtx = oldImage.getContext("2d");

      oldImage.width = canvas.width;
      oldImage.height = canvas.height;
      oldCtx.drawImage(canvas, 0, 0);

      canvas.width = window.innerWidth * ratio;
      canvas.height = window.innerHeight * ratio;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";

      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = "#1f4e79";
      ctx.globalAlpha = 0.72;

      if (oldImage.width > 0 && oldImage.height > 0) {
        ctx.drawImage(
          oldImage,
          0,
          0,
          oldImage.width / ratio,
          oldImage.height / ratio
        );
      }
    }

    function getPosition(event) {
      return {
        x: event.clientX,
        y: event.clientY
      };
    }

    function startDrawing(event) {
      if (!enabled) return;

      event.preventDefault();
      drawing = true;

      const pos = getPosition(event);
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
    }

    function draw(event) {
      if (!enabled || !drawing) return;

      event.preventDefault();

      const pos = getPosition(event);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    }

    function stopDrawing() {
      drawing = false;
    }

    toggleButton.addEventListener("click", function () {
      enabled = !enabled;
      document.body.classList.toggle("draw-mode", enabled);
      toggleButton.textContent = enabled ? "Drawing on" : "Draw";
    });

    clearButton.addEventListener("click", function () {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    canvas.addEventListener("pointerdown", startDrawing);
    canvas.addEventListener("pointermove", draw);
    window.addEventListener("pointerup", stopDrawing);
    window.addEventListener("resize", resizeCanvas);

    resizeCanvas();
  }

  document.addEventListener("DOMContentLoaded", function () {
    createEquationLayer();
    createDrawingCanvas();
  });
})();
