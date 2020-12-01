export const roundToPlace = (numberToRound: number, place: number) => {
    return Math.round(numberToRound * place) / place;
}