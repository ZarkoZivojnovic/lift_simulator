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
        event.target.parentNode.style.backgroundColor = "#FF4832";
        addPassenger(fromFloor);
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
            if (fromFloor !== res){
                buildingArr[fromFloor].push(parseInt(res));
            }
        });
    }
});

document.getElementById("lift").addEventListener("click", event => {
    if (event.target.textContent === "START"){
        const solutionLib = new SolutionLib(buildingArr, liftCapacity);
        if (solutionLib.calculateStops().length>1){
            document.getElementById("lift").style.backgroundColor = "gray";
            const animate = new Animate(buildingArr, solutionLib.calculateStops());
            animate.animate();
        }
    } else {
        location.reload();
    }
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

function addPassenger(floor) {
    const passenger = document.createElement("img");
    passenger.src = (Math.round(Math.random()*10))%2 === 0 ? "img/passenger_1.png" : "img/passenger_2.png";
    document.getElementById("passengers"+floor).appendChild(passenger);
}

