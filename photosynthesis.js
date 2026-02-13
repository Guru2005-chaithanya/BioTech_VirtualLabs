let step = 1;
let lightOK = false;
let waterOK = false;
let co2OK = false;

const lab = document.querySelector(".lab");
const sun = document.getElementById("sun");
const plant = document.getElementById("plant");
const water = document.getElementById("water");
const human = document.getElementById("human");
const oxygen = document.getElementById("oxygen");
const conclusion = document.getElementById("conclusion");

/* ---------- CORRECT DRAG FUNCTION (FIXED) ---------- */
function makeDraggable(element, onDropCheck) {
    element.addEventListener("mousedown", function (e) {
        e.preventDefault();

        const labRect = lab.getBoundingClientRect();
        const elemRect = element.getBoundingClientRect();

        const shiftX = e.clientX - elemRect.left;
        const shiftY = e.clientY - elemRect.top;

        function moveAt(clientX, clientY) {
            element.style.left = clientX - labRect.left - shiftX + "px";
            element.style.top = clientY - labRect.top - shiftY + "px";
        }

        function onMouseMove(e) {
            moveAt(e.clientX, e.clientY);
        }

        document.addEventListener("mousemove", onMouseMove);

        document.addEventListener("mouseup", function onMouseUp() {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
            onDropCheck();
        });
    });
}

/* ---------- STEP 1: SUN ---------- */
makeDraggable(sun, () => {
    if (step !== 1) return;

    const s = sun.getBoundingClientRect();
    const p = plant.getBoundingClientRect();

    if (s.bottom < p.top + 10) {
        lightOK = true;
        sun.classList.add("active");
        stepDone(1);
        step = 2;
    }
});

/* ---------- STEP 2: WATER ---------- */
makeDraggable(water, () => {
    if (step !== 2) return;

    const w = water.getBoundingClientRect();
    const p = plant.getBoundingClientRect();

    if (Math.abs(w.left - p.left) < 60) {
        waterOK = true;
        water.style.display = "none";
        stepDone(2);
        step = 3;
    }
});

/* ---------- STEP 3: HUMAN (CO₂) ---------- */
makeDraggable(human, () => {
    if (step !== 3) return;

    const h = human.getBoundingClientRect();
    const p = plant.getBoundingClientRect();

    if (Math.abs(h.left - p.left) < 80) {
        co2OK = true;
        stepDone(3);
        step = 4;
        startPhotosynthesis();
    }
});

/* ---------- FINAL RESULT ---------- */
function startPhotosynthesis() {
    if (lightOK && waterOK && co2OK) {
        plant.classList.add("healthy");
        oxygen.style.display = "block";
        stepDone(4);
        conclusion.style.display = "block";
    }
}

/* ---------- STEP UI ---------- */
function stepDone(n) {
    const el = document.getElementById("s" + n);
    el.innerHTML = "✔ " + el.innerText.replace("👉 ", "").replace("⬜ ", "");
    el.classList.remove("active");

    const next = document.getElementById("s" + (n + 1));
    if (next) next.classList.add("active");
}
