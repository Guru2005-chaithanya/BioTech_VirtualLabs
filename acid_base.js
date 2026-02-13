const instruction = document.getElementById("instruction");
const tubes = document.querySelectorAll(".tube");
const beaker = document.querySelector(".beaker");

let step = 1; // 1 = acid, 2 = base
let draggedTube = null;
let originalPos = null;

// Enable dragging
tubes.forEach(tube => {
    tube.draggable = true;

    tube.addEventListener("dragstart", () => {
        draggedTube = tube;

        const rect = tube.getBoundingClientRect();
        originalPos = {
            left: rect.left,
            top: rect.top
        };

        tube.classList.add("dragging");
    });

    tube.addEventListener("dragend", () => {
        tube.classList.remove("dragging");
    });
});

// Allow drop on beaker
beaker.addEventListener("dragover", e => {
    e.preventDefault();
});

beaker.addEventListener("drop", () => {
    if (!draggedTube) return;

    const type = draggedTube.dataset.type;

    // STEP 1: Acid
    if (step === 1 && type === "acid") {
        pour(draggedTube);
        instruction.innerHTML =
            "🎯 Step 2: Drag the <b>BASE</b> test tube into the beaker";

        completeStep(1);
        activateStep(2);

        step = 2;
        lockTube("acid");
    }
    // STEP 2: Base
    else if (step === 2 && type === "base") {
        pour(draggedTube);
        instruction.innerHTML =
            "✅ <b>Reaction completed successfully!</b>";

        completeStep(2);
        completeStep(3);

        reaction();
        lockTube("base");

        document.getElementById("conclusionBox").style.display = "block";
    }
    // WRONG STEP
    else {
        instruction.innerHTML = "❌ <b>Wrong step!</b> Follow the instructions.";
        instruction.classList.add("warning");
        draggedTube.classList.add("shake");

        setTimeout(() => {
            draggedTube.classList.remove("shake");
            instruction.classList.remove("warning");
            updateInstruction();
        }, 600);
    }

    draggedTube = null;
});

function updateInstruction() {
    if (step === 1) {
        instruction.innerHTML =
            "🎯 Step 1: Drag the <b>ACID</b> test tube into the beaker";
    } else if (step === 2) {
        instruction.innerHTML =
            "🎯 Step 2: Drag the <b>BASE</b> test tube into the beaker";
    }
}

// POUR animation
function pour(tube) {
    const liquid = tube.querySelector(".liquid");
    const stream = tube.querySelector(".pour-stream");

    const beakerRect = beaker.getBoundingClientRect();

    tube.style.position = "absolute";
    tube.style.left = (beakerRect.left - 60) + "px";
    tube.style.top = (beakerRect.top - 40) + "px";

    setTimeout(() => {
        tube.classList.add("pouring");
        stream.style.height = "80px";
        liquid.style.height = "0%";
        beaker.classList.add("filled");
    }, 200);

    setTimeout(() => {
        stream.style.height = "0px";
        tube.classList.remove("pouring");
    }, 1200);

    setTimeout(() => {
        tube.style.left = originalPos.left + "px";
        tube.style.top = originalPos.top + "px";
        tube.style.position = "relative";
    }, 1600);
}

// Lock tube
function lockTube(type) {
    document.querySelector(`.tube.${type}`).classList.add("locked");
}

// Reaction effect
function reaction() {
    beaker.classList.add("reaction");
}

// Step helpers
function completeStep(stepNum) {
    const stepEl = document.getElementById(`step${stepNum}`);
    stepEl.classList.remove("active");
    stepEl.classList.add("done");
    stepEl.innerHTML = "✔ " + stepEl.innerText.replace("👉 ", "").replace("⬜ ", "");
}

function activateStep(stepNum) {
    const stepEl = document.getElementById(`step${stepNum}`);
    stepEl.classList.add("active");
    stepEl.innerHTML = "👉 " + stepEl.innerText.replace("⬜ ", "");
}
