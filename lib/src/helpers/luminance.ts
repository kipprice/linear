// https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-procedure
const LIGHT_THRESHOLD = 0.03928
const LIGHT_DIVISOR = 12.92;
const DARK_DIVISOR = 1.055;
const DARK_POW = 2.4;
const DARK_ADDEND = 0.055;

const LUM_ADDEND = 0.05;

const RED_MULT = 0.2126;
const GREEN_MULT = 0.7152;
const BLUE_MULT = 0.0722;

export const calculateContrast = (colorA: string, colorB: string) => {
    const lumA = calculateLuminance(colorA);
    const lumB = calculateLuminance(colorB);

    const brightest = Math.max(lumA, lumB);
    const dimmest = Math.max(lumA, lumB);

    return (brightest + LUM_ADDEND) / (dimmest + LUM_ADDEND);
}

export const getLightOrDark = (color: string): 'light' | 'dark' => {
    const lum = calculateLuminance(color);
    console.log(`color: ${color} lum: ${lum}`)
    return lum > 0.5 ? 'light' : 'dark';
}

const calculateLuminance = (color: string): number => {
    const colors = getColorsFromHex(color);    

    const adjustedColors = colors.map((c) => {
        const percentage = c / 255;
        return (
            percentage < LIGHT_THRESHOLD ?
            percentage / LIGHT_DIVISOR :
            Math.pow((percentage + DARK_ADDEND) / DARK_DIVISOR, DARK_POW)
        ); 
    })

    return (adjustedColors[0] * RED_MULT) + (adjustedColors[1] * GREEN_MULT) + (adjustedColors[2] * BLUE_MULT);
}

const getColorsFromHex = (color: string) => {

    const redHex = `${color[1]}${color[2]}`;
    const greenHex = `${color[3]}${color[4]}`;
    const blueHex = `${color[5]}${color[6]}`;

    const red = parseInt(redHex, 16);
    const green = parseInt(greenHex, 16);
    const blue = parseInt(blueHex, 16);

    return [red, green, blue];
}