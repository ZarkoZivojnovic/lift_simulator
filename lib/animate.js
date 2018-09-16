class Animate {
    constructor(startArr, stopsArr){
        this.buildingArr = startArr;
        this.stops = stopsArr;
    }

    removePassengers(fromFloor, count) {
        setTimeout(() => {
            for (let i = 0; i < count; i++){
                const floor = document.getElementById("passengers"+fromFloor);
                floor.removeChild(floor.firstChild);
            }
        },1000);
    };

    peopleInLiftAndCurrentFloor(lift,stop){
        setTimeout(() => {
            lift.innerHTML = `people: ${this.stops[stop].inLift === undefined ? 0 : this.stops[stop].inLift} floor: ${this.stops[stop].floor}`;
        }, 1000)
    }

    animate(){
        let stop = 1;
        if (this.stops.length > 1){
            const interval = setInterval(() => {
                const floor = this.stops[stop].floor,
                    lift = document.getElementById("lift");
                lift.style.bottom = floor*100 + "px";
                this.peopleInLiftAndCurrentFloor(lift,stop);
                this.removePassengers(floor, this.stops[stop].in);
                if (stop === this.stops.length-1) {
                    clearInterval(interval);
                    setTimeout(() => {
                        lift.innerHTML = `RESET`
                    },1000);
                }
                stop++;
            },3e3);
        }
    }
}

export default Animate;