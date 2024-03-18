type BuildingPoint = [number, number];
type MaxBuildingPoints = {
    point1: BuildingPoint | undefined,
    point2: BuildingPoint | undefined,
    currentValue: number | undefined
}

 /**
 * Calculate a rectangle from two points containing an x and a y.
 * 
 * @param {BuildingPoint} point1 Building at point 1.
 * @param {BuildingPoint} point2 Building at point 2.
 * @returns {number} Returns area.
 */
 const calculateRectangleArea = (point1: BuildingPoint, point2: BuildingPoint) => {
    const y = point1[0] < point2[0] ? point2[0] - point1[0] : point1[0] - point2[0];
    const x = point1[1] < point2[1] ? point1[1] : point2[1];
    return x * y;
}

/**
 * A method which returns the biggest rectangular area a tight roper can create between buildings in a district.
 * @param {number[]} buildings Array of building heights at specific points.
 * @returns {number} Max area from the points provided.
 */
export const tightRoper = (buildings: number[]) => {
    /** Get x and y value for each building. */
    const points: BuildingPoint[] = buildings.map((item, index) => [index + 1, item]);

    /** Create variable to hold the values the max value of the points. */
    let max: MaxBuildingPoints = {
        point1: undefined,
        point2: undefined, 
        currentValue: undefined
    }
    
    for (let i = 0; i < points.length; i++) {
        let nextBuilding = points[i];
        // On first run set the point1 to current value as empty.
        if (i === 0) {
            max.point1 = nextBuilding;
            continue;
        }
        // On second run set the point2 to current value as empty.
        if (i === 1) {
            max.point2 = nextBuilding;
            max.currentValue = calculateRectangleArea(max.point1!, max.point2);
            continue;
        }

        /** We need a way of exiting the function early when we've definitely. */
        const option1 = calculateRectangleArea(max.point1!, nextBuilding), option2 = calculateRectangleArea(max.point2!, nextBuilding);

        // Find the highest value option as this is the one we will keep if higher than current max. 
        const nextMax = option1 > option2 ? {point1: max.point1, point2: nextBuilding, currentValue: option1} : {point1: nextBuilding, point2: max.point2, currentValue: option2};

        /** If bigger than the current value then we need */
        if (nextMax.currentValue! > max.currentValue!) {
            max = nextMax;
        }
    }
    
    console.log(max);
    return max.currentValue;
}