class SolutionLib {
    constructor(buildingArr, liftCapacity){
        this.buildingArr = buildingArr;
        this.liftCapacity = liftCapacity;
        this.peopleInLift = [];
        this.stops = [0];
        this.liftDirection = "";
        this.arrForAnimation = [{floor:0}];
    }

    makeATrueCopy(arr){
        return JSON.parse(JSON.stringify(arr));
    };

    stopLift(floor) {
        this.stops.push(floor);
        if (this.arrForAnimation[this.arrForAnimation.length-1].floor !== floor){
            this.arrForAnimation.push({floor});
        }
    };

    doesAnyoneWaiting() {
        for (let floor of this.buildingArr) {
            if (floor.length > 0) return true;
        }
        return false;
    };

    doesAnyoneGoToRightDirection(passengers, currentFloor) {
        for (let floor in passengers) {
            const toFloor = passengers[floor],
                direction = currentFloor < toFloor ? "up" : "down";
            if (this.liftDirection === direction) {
                return true;
            }
        }
        return false;
    };

    removeUndefinedElements() {
        this.buildingArr = this.buildingArr.map(currentFloor => currentFloor.filter(toFloor => toFloor !== undefined));
    };

    comeIn(passengers, currentFloor) {
        let count = 0;
        for (let index = 0; index < passengers.length; index++) {
            const toFloor = passengers[index],
                direction = currentFloor < toFloor ? "up" : "down";
            if (this.liftDirection === direction && this.peopleInLift.length < this.liftCapacity) {
                this.peopleInLift.push(toFloor);
                passengers[index] = undefined;
                count++;
            }
            this.arrForAnimation[this.arrForAnimation.length-1]["in"] = count;
            this.arrForAnimation[this.arrForAnimation.length-1]["inLift"] = this.peopleInLift.length;
        }
    };

    stopAndGetOut(passengers, currentFloor) {
        if ((passengers.length > 0 && this.doesAnyoneGoToRightDirection(passengers, currentFloor)) || this.peopleInLift.indexOf(currentFloor) !== -1) {
            let count = 0;
            this.stopLift(currentFloor);
            while (this.peopleInLift.indexOf(currentFloor) !== -1) {
                this.peopleInLift.splice(this.peopleInLift.indexOf(currentFloor), 1);
                count++;
            }
            this.arrForAnimation[this.arrForAnimation.length-1]["out"] = count;
            this.arrForAnimation[this.arrForAnimation.length-1]["inLift"] = this.peopleInLift.length;
        }
    };

    goUp() {
        for (let currentFloor = 0; currentFloor < this.buildingArr.length; currentFloor++) {
            const passengers = this.buildingArr[currentFloor];
            this.stopAndGetOut(passengers, currentFloor);
            this.comeIn(passengers, currentFloor);
        }
    };

    goDown() {
        for (let currentFloor = this.buildingArr.length - 1; currentFloor >= 0; currentFloor--) {
            const passengers = this.buildingArr[currentFloor];
            this.stopAndGetOut(passengers, currentFloor);
            this.comeIn(passengers, currentFloor);
        }
    };

    calculateStops() {
        this.buildingArr = this.makeATrueCopy(this.buildingArr);
        let liftCall = this.doesAnyoneWaiting();
        while(liftCall) {
            if (this.liftDirection !== "up"){
                this.liftDirection = "up";
                this.goUp();
            } else {
                this.liftDirection = "down";
                this.goDown();
            }
            this.removeUndefinedElements();
            liftCall = this.doesAnyoneWaiting();
        }
        if (this.stops[this.stops.length - 1] !== 0) this.stopLift(0);
        return this.arrForAnimation;
    };
}

export default SolutionLib;