import SolutionLib from "./lib/lib.js";
import Animate from "./lib/animate.js";

const modal = document.getElementById("modal"),
    liftKeyboard = document.getElementById("keyboard"),
    buildingArr = [
        [],
        [],
        [],
        [],
        [],
        [],
        []
    ],
    liftCapacity = 4;

document.getElementById("floorsSpace").addEventListener("click", event => {
    if (event.target.className.includes("btn")) {
        const element = event.target.id,
            fromFloor = element.split("_")[2];
        console.log(element.split("_")[0]);
        event.target.parentNode.style.backgroundColor = "#FF4832";
        keyboard("show");
        let toFloor = new Promise((resolve) => {
            liftKeyboard.addEventListener("click", function selectFloor(ev) {
                if (ev.target !== ev.currentTarget) {
                    keyboard("hide");
                    removeEventListener("click", selectFloor);
                    resolve(ev.target.id.split("_")[1]);
                }
            })
        });
        toFloor.then(res => {
            buildingArr[fromFloor].push(parseInt(res));
        });
    }
});

document.getElementById("lift").addEventListener("click", event => {
    document.getElementById("lift").style.backgroundColor = "gray";
    const solutionLib = new SolutionLib(buildingArr, liftCapacity);
    const animate = new Animate(buildingArr, solutionLib.calculateStops());
    animate.animate();
});

function keyboard(showOrHide) {
    if (showOrHide === "show") {
        modal.style.display = "block";
        setTimeout(() => {
            liftKeyboard.style.top = "100px";
        }, 200);
    } else {
        liftKeyboard.style.top = "-100vh";
        setTimeout(() => {modal.style.display = "none";}, 200);
    }
}
