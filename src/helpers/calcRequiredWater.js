export const calcRequiredWater = (gender, weight, activeTime) => {
  if (gender === "Man") {
    const value = Number(weight) * 0.04 + Number(activeTime) * 0.6;
    return Math.round(value * 10) / 10;
  }
  const value = Number(weight) * 0.03 + Number(activeTime) * 0.4;
  return Math.round(value * 10) / 10;
};
