# Lift simulator

#### You can see DEMO version [Here.](https://zarkozivojnovic.github.io/lift_simulator/)

---

This is the application that calculate the shortest lift path. In the beggining you can mark floors on which people are waiting and for every passenger on which floor wants to go.
Also, there is a simple lift animation. These two things are separeted in the code.
In lib.js file is located SolutionLib class that calculates the stops, and in animate.js is a logic for animation, also written in ES6 class.
Class SolutionLib accepts two arguments, the first one is buildingArr and looks like this:

```$xslt
const buildingArr = [
    [],
    [4],
    [6, 3, 6],
    [5],
    [],
    [6],
    [2]
]
```

---
And second one is liftCapacity. This class returns the array of objects with informations about stops, how many people got into the lift, how many went out, 
and how many left inside.
It looks like this sample:

```$xslt
return [
    {floor: 0},
    {floor: 1, out: 0, inLift: 1, in: 1},
    {floor: 2, out: 0, inLift: 2, in: 1},
    {floor: 3, out: 1, inLift: 2, in: 0},
    {floor: 6, out: 0, inLift: 1, in: 1},
    {floor: 5, out: 1, inLift: 1, in: 1},
    {floor: 4, out: 0, inLift: 2, in: 1},
    {floor: 3, out: 1, inLift: 1},
    {floor: 2, out: 0, inLift: 2, in: 1},
    {floor: 1, out: 1, inLift: 1},
    {floor: 0, out: 1, inLift: 0}
]
```

After that, function for animation will be invoked if length of returned array is greater then 0.