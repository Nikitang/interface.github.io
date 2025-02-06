export const checkMove: CheckMoveType = (prevKeypoints, currKeypoints) => {
    let totalMovement = 0;
    for (let i = 0; i < prevKeypoints.length; i++) {
        const dx = prevKeypoints[i].x - currKeypoints[i].x;
        const dy = prevKeypoints[i].y - currKeypoints[i].y;
        totalMovement += Math.sqrt(dx * dx + dy * dy);
    }
    return totalMovement;
};

type CheckMoveType = (
    arg1: Array<{ x: number; y: number }>,
    arg2: Array<{ x: number; y: number }>
) => number;
