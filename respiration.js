let step = 1;

const lab = document.querySelector(".lab");
const lungs = document.getElementById("lungs");
const blood = document.getElementById("blood");
const o2 = document.getElementById("o2");
const co2 = document.getElementById("co2");
const cloud = document.getElementById("cloud");
const breathText = document.getElementById("breathText");
const conclusion = document.getElementById("conclusion");

/* DRAG SYSTEM */
function makeDraggable(el) {
    el.onmousedown = e => {
        const labRect = lab.getBoundingClientRect();
        const elRect = el.getBoundingClientRect();
        const dx = e.clientX - elRect.left;
        const dy = e.clientY - elRect.top;

        function move(e) {
            el.style.left = e.clientX - labRect.left - dx + "px";
            el.style.top = e.clientY - labRect.top - dy + "px";
        }

        document.addEventListener("mousemove", move);
        document.onmouseup = () => {
            document.removeEventListener("mousemove", move);
            document.onmouseup = null;
            checkStep(el);
        };
    };
}

function near(a, b) {
    const r1 = a.getBoundingClientRect();
    const r2 = b.getBoundingClientRect();
    return Math.abs(r1.left - r2.left) < 70 &&
           Math.abs(r1.top - r2.top) < 70;
}

/* STEP LOGIC */
function checkStep(el) {
    if (step === 1 && el === o2 && near(o2, lungs)) {
        lungs.style.color = "#5dade2";
        breathText.style.display = "block";
        breathText.innerText = "Inhale";
        done(1);
        step = 2;
    }

    else if (step === 2 && el === o2 && near(o2, blood)) {
        blood.style.color = "#3498db";
        o2.style.display = "none";
        co2.style.display = "block";
        done(2);
        step = 3;
    }

    else if (step === 3 && el === co2 && near(co2, lungs)) {
        lungs.style.color = "#e74c3c";
        breathText.innerText = "Exhale";
        breathText.classList.add("exhale");
        done(3);
        step = 4;
    }

    else if (step === 4 && el === co2) {
        co2.style.display = "none";
        cloud.style.display = "block";
        done(4);
        conclusion.style.display = "block";
    }
}

function done(n) {
    const el = document.getElementById("s" + n);
    el.innerHTML = "✔ " + el.innerText.replace("👉 ", "").replace("⬜ ", "");
    el.classList.remove("active");
    const next = document.getElementById("s" + (n + 1));
    if (next) next.classList.add("active");
}

/* INIT */
makeDraggable(o2);
makeDraggable(co2);
