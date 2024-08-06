

export const selectEditWaterAmount = (state) => state.editWater.items;
export const selectEditWaterLoading = (state) => state.editWater.loading;
export const selectEditWaterError = (state) => state.editWater.error;


const [{ waterAmount }] = selectEditWaterAmount;

export const increase = () => {
    
    if (waterAmount < 3000) {
        waterAmount + 50
    }
}

export const decrease = () => {
  if (waterAmount > 50) {
    waterAmount - 50;
  }
};

