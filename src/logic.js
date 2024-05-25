"use strict";
const totalTimeInput = document.getElementById("total-time");
const weekGraph = document.getElementById("week-graph");
const lightTime = document.getElementById("light");
const moderateTime = document.getElementById("moderate");
const vigorousTime = document.getElementById("vigorous");
const lightWeekTime = document.getElementById("light-week-val");
const moderateWeekTime = document.getElementById("moderate-week-val");
const vigorousWeekTime = document.getElementById("vigorous-week-val");
const userWeekTotal = document.getElementById("user-week-total");
const resetButton = document.getElementById("reset-week");
const lS = localStorage;
const saveWeekBut = document.getElementById("save-week");
// current week execise data
const exerciseData = {
    light: 0,
    moderate: 0,
    vigorous: 0,
};
const updateUITimes = () => {
    if (lightTime && moderateTime && vigorousTime) {
        lightTime.value = `${exerciseData.light}`;
        lightWeekTime.textContent = `${(parseFloat(totalTimeInput.value) * 0.1).toFixed(1)}h`;
        moderateTime.value = `${exerciseData.moderate}`;
        moderateWeekTime.textContent = `${(parseFloat(totalTimeInput.value) * 0.7).toFixed(1)}h`;
        vigorousTime.value = `${exerciseData.vigorous}`;
        vigorousWeekTime.textContent = `${(parseFloat(totalTimeInput.value) * 0.2).toFixed(1)}h`;
    }
    let totalUserTime = exerciseData.light + exerciseData.moderate + exerciseData.vigorous;
    let totalUseHours = Math.floor(totalUserTime / 60);
    let totalUserMinutes = totalUserTime % 60;
    userWeekTotal.textContent = `${totalUseHours}h ${totalUserMinutes}m`;
    if (totalTimeInput) {
        totalTimeInput.value = localStorage.getItem("totalTime") || "7";
    }
};
const updateTotalTime = () => {
    localStorage.setItem("totalTime", totalTimeInput.value);
};
const updateLocalStorage = () => {
    localStorage.setItem("currentWeek", JSON.stringify(exerciseData));
    calculateWeeklyStats();
};
const loadFromLocalStorage = () => {
    const storedData = localStorage.getItem("currentWeek");
    if (storedData) {
        Object.assign(exerciseData, JSON.parse(storedData));
        calculateWeeklyStats();
    }
};
const addExerciseTime = (type, time) => {
    exerciseData[type] += time;
    updateLocalStorage();
    updateUITimes();
};
const calculateWeeklyStats = () => {
    renderGraph();
};
const renderGraph = () => {
    if (weekGraph) {
        weekGraph.innerHTML = `
            <div class="h-full flex items-end justify-between">
                <div class="w-1/4 h-${exerciseData.light * 4} bg-blue-400"></div>
                <div class="w-1/4 h-${exerciseData.moderate * 4} bg-yellow-400"></div>
                <div class="w-1/4 h-${exerciseData.vigorous * 4} bg-red-400"></div>
            </div>
        `;
    }
};
document.addEventListener("DOMContentLoaded", () => {
    loadFromLocalStorage();
    updateUITimes();
    const totalTime = document.getElementById("total-time");
    if (totalTime) {
        totalTime.addEventListener("change", function (event) {
            updateTotalTime();
            updateUITimes();
        });
    }
    else {
        console.log("totalTime is not found");
    }
    document.querySelectorAll("button").forEach((button) => {
        button.addEventListener("click", (event) => {
            var _a;
            const target = event.target;
            const parent = target.parentElement;
            if (parent) {
                const type = (_a = parent
                    .querySelector("span")) === null || _a === void 0 ? void 0 : _a.innerText.toLowerCase();
                if (target.innerText === "+") {
                    addExerciseTime(type, 30);
                }
                else if (target.innerText === ">") {
                    startTracking(type);
                }
            }
        });
    });
    resetButton.addEventListener("click", () => {
        exerciseData.light = 0;
        exerciseData.moderate = 0;
        exerciseData.vigorous = 0;
        updateLocalStorage();
        updateUITimes();
    });
    if ("serviceWorker" in navigator) {
        window.addEventListener("load", function () {
            navigator.serviceWorker
                .register("http://localhost:8800/serviceWorker.js")
                .then(res => console.log("service worker registered"))
                .catch(err => console.log("service worker not registered", err));
        });
    }
});
const startTracking = (type) => {
    if (type === null) {
        console.log(`not type is selected`);
    }
    else {
        console.log(`Started tracking ${type} exercise`);
    }
};
