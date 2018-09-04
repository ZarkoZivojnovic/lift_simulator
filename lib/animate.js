class Animate {
    constructor(startArr, stopsArr){
        this.buildingArr = startArr;
        this.stops = stopsArr;
    }

    animate(){
        let stop = 0;
        const interval = setInterval(() => {
            const floor = this.stops[stop];
            for (let i = 0; i<this.buildingArr[floor].length; i++){
                let parentElem = document.getElementById("passengers"+floor);
                parentElem.removeChild(parentElem.childNodes[0]);
            }
            document.getElementById("lift").style.bottom = floor*100 + "px";
            if (stop === this.stops.length-1) clearInterval(interval);
            stop++;
        },3e3);
    }
}

export default Animate;