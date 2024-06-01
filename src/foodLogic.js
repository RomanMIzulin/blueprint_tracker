"use strict";
const userFoodNSleep = {
    wakeUpTime: "11:00",
    bedTime: "23:00",
    breakfastTime: "13:00",
    lunchTime: "17:00",
    dinnerTime: "19:00",
    waterTime: "10:00"
};
const wakeUpTime = document.getElementById("wakeuptime");
const breakfastTime = document.getElementById("breakfast");
const lunchTime = document.getElementById("lunch");
const dinnerTime = document.getElementById("dinner");
const waterTime = document.getElementById("waterTime");
const bedTime = document.getElementById("targetSleepTime");
const updateFoodNSleepUI = () => {
    if (wakeUpTime && breakfastTime && lunchTime && dinnerTime && waterTime && bedTime) {
        wakeUpTime.value = userFoodNSleep.wakeUpTime;
        breakfastTime.value = userFoodNSleep.breakfastTime;
        lunchTime.value = userFoodNSleep.lunchTime;
        dinnerTime.value = userFoodNSleep.dinnerTime;
        waterTime.value = userFoodNSleep.waterTime;
        bedTime.value = userFoodNSleep.bedTime;
    }
};
const loadFoodNSleepFromStorage = () => {
    const foodNSleep = localStorage.getItem("foodNSleep");
    if (foodNSleep) {
        Object.assign(userFoodNSleep, JSON.parse(foodNSleep));
        updateFoodNSleepUI();
    }
};
const updateFoodNSleepStorage = () => {
    localStorage.setItem("foodNSleep", JSON.stringify(userFoodNSleep));
};
