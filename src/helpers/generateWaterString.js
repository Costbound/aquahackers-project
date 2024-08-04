const generateWaterString = (waterAmount) => {
    const waterAmountConverted = waterAmount >= 1000 ? waterAmount / 1000 : waterAmount;
    const metricUnits = waterAmount >= 1000 ? 'L' : 'ml'

    return `${waterAmountConverted} ${metricUnits}`;
}

export default generateWaterString;