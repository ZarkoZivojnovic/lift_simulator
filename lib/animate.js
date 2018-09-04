class Animate {
    constructor(startArr, stopsArr){
        this.buildingArr = startArr;
        this.stops = stopsArr;
    }

    animate(){
        let stop = 1;
        const interval = setInterval(() => {
            const floor = this.stops[stop];
            document.getElementById("lift").style.bottom = floor*100 + "px";
            if (stop === this.stops.length-1) {
                clearInterval(interval);
                setTimeout(() => {location.reload()},1000);
            }
            stop++;
        },3e3);
    }
}

export default Animate;