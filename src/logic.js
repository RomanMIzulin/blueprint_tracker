"use strict";
const totalTimeInput = document.getElementById('total-time');
const weekGraph = document.getElementById('week-graph');
const lightTime = document.getElementById('light');
;
const moderateTime = document.getElementById('moderate');
;
const vigorousTime = document.getElementById('vigorous');
;
const lS = localStorage;
// current week execise data
const exerciseData = {
    light: 0,
    moderate: 0,
    vigorous: 0,
};
const updateUITimes = () => {
    if (lightTime && moderateTime && vigorousTime) {
        lightTime.value = `${exerciseData.light}m out of ${totalTimeInput.value}`;
        moderateTime.value = `${exerciseData.moderate}m out of ${totalTimeInput.value}`;
        vigorousTime.value = `${exerciseData.vigorous}m out of ${totalTimeInput.value}`;
    }
    ;
    if (totalTimeInput) {
        totalTimeInput.value = localStorage.getItem('totalTime') || '7';
    }
    ;
};
const updateTotalTime = () => {
    localStorage.setItem('totalTime', totalTimeInput.value);
};
const updateLocalStorage = () => {
    localStorage.setItem('currentWeek', JSON.stringify(exerciseData));
    calculateWeeklyStats();
};
const loadFromLocalStorage = () => {
    const storedData = localStorage.getItem('currentWeek');
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
document.addEventListener('DOMContentLoaded', () => {
    loadFromLocalStorage();
    updateUITimes();
    const totalTime = document.getElementById('total-time');
    if (totalTime) {
        totalTime.addEventListener('change', function (event) {
            updateTotalTime();
        });
    }
    else {
        console.log('totalTime is not found');
    }
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', (event) => {
            var _a;
            const target = event.target;
            const parent = target.parentElement;
            if (parent) {
                const type = (_a = parent.querySelector('span')) === null || _a === void 0 ? void 0 : _a.innerText.toLowerCase();
                if (target.innerText === '+') {
                    addExerciseTime(type, 30);
                }
                else if (target.innerText === '>') {
                    startTracking(type);
                }
            }
        });
    });
});
const startTracking = (type) => {
    if (type === null) {
        console.log(`not type is selected`);
    }
    else {
        console.log(`Started tracking ${type} exercise`);
    }
};