const generateWaterString = (waterAmount) => {
    const waterAmountConverted = waterAmount >= 1000 ? waterAmount / 1000 : waterAmount;
    const metricUnits = waterAmount >= 1000 ? 'L' : 'ml'

    return `${waterAmountConverted} ${metricUnits}`;
}
console.log(generateWaterString(1000))
console.log(generateWaterString(1500))
console.log(generateWaterString(1750))
console.log(generateWaterString(700))
console.log(generateWaterString(999))
export default generateWaterString;