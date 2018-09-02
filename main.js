import SolutionLib from "./lib/lib.js";

const buildingArr = [
    [],
    [3],
    [4],
    [],
    [5, 6, 2, 6],
    [],
    []
],
    liftCapacity = 4;

const solutionLib = new SolutionLib(buildingArr, liftCapacity);
console.log(solutionLib.calculateStops());