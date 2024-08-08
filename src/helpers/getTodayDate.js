const getTodayDate = () => {
    const todayFull = new Date(Date.now()).toISOString();
    const today = todayFull.slice(0, todayFull.indexOf("T"));
    return today
}

export default getTodayDate