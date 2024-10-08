export default function getRandom(min, max) {
    if (min > max) {
        [min, max] = [max, min];
    } else if (min === max) {
        return max;
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function isObject(obj) {
    return (typeof obj === "object" && !Array.isArray(obj) && obj !== null)
}

