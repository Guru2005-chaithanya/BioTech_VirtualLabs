/* ELEMENTS */
const waterTube = document.getElementById("waterTube");
const eggTube = document.getElementById("eggTube");
const saltTube = document.getElementById("saltTube");

const beaker = document.getElementById("beaker");
const beakerLiquid = document.querySelector(".beaker-liquid");
const eggInBeaker = document.getElementById("eggInBeaker");

/* RESET INITIAL STATE */
beakerLiquid.style.height = "0%";
beakerLiquid.className = "beaker-liquid";
eggInBeaker.style.display = "none";

let step = 1;
let draggedItem = null;

/* ENABLE DRAGGING */
[waterTube, eggTube, saltTube].forEach(item => {
    item.draggable = true;

    item.addEventListener("dragstart", () => {
        draggedItem = item;
    });
});

/* BEAKER DROP ZONE */
beaker.addEventListener("dragover", e => {
    e.preventDefault();
});

/* DROP HANDLER */
beaker.addEventListener("drop", () => {

    /* STEP 1: WATER */
    if (draggedItem === waterTube && step === 1) {

        waterTube.classList.add("pouring");

        setTimeout(() => {
            waterTube.querySelector(".liquid").style.height = "0%";

            beakerLiquid.style.height = "60%";
            beakerLiquid.className = "beaker-liquid water";

            completeStep(1);
            activateStep(2);
            step = 2;

            waterTube.classList.remove("pouring");
        }, 700);
    }

    /* STEP 2: EGG */
    else if (draggedItem === eggTube && step === 2) {

        eggInBeaker.style.display = "block";
        eggInBeaker.style.bottom = "10px";

        completeStep(2);
        activateStep(3);
        step = 3;
    }

    /* STEP 3: SALT */
    else if (draggedItem === saltTube && step === 3) {

        const stream = saltTube.querySelector(".salt-stream");
        stream.style.height = "60px";

        setTimeout(() => {
            stream.style.height = "0";

            beakerLiquid.className = "beaker-liquid saltwater";

            eggInBeaker.style.bottom = "90px";

            completeStep(3);
            completeStep(4);
            step = 4;

            document.getElementById("conclusionBox").style.display = "block";
        }, 800);
    }

    draggedItem = null;
});

/* STEP UI FUNCTIONS */
function completeStep(n) {
    const el = document.getElementById(`step${n}`);
    el.classList.remove("active");
    el.classList.add("done");
    el.innerHTML = "✔ " + el.innerText.replace("👉 ", "").replace("⬜ ", "");
}

function activateStep(n) {
    const el = document.getElementById(`step${n}`);
    el.classList.add("active");
    el.innerHTML = "👉 " + el.innerText.replace("⬜ ", "");
}
