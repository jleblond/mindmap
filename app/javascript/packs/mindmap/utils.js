export const pointIsInEllipse = (x, y, h, k, rx, ry) => {
    // x, y denote the point
    // h, k denote the origin of the ellipse
    return Math.pow(x-h,2)/Math.pow(rx, 2) + Math.pow(y-k, 2)/Math.pow(ry, 2) <= 1
}