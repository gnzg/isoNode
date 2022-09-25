export default (a: { x: number; y: number }, b: { x: number; y: number }) => {
    return { x: a.x - b.x, y: a.y - b.y };
};
