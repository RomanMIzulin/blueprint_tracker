
interface ExerciseData {
    light: number;
    moderate: number;
    vigorous: number;
}

const totalTimeInput = document.getElementById('total-time') as HTMLInputElement;
const weekGraph = document.getElementById('week-graph');
const lightTime = document.getElementById('light') as HTMLInputElement;
;
const moderateTime = document.getElementById('moderate') as HTMLInputElement;
;
const vigorousTime = document.getElementById('vigorous') as HTMLInputElement;
;

const lS:Storage = localStorage;

const saveWeekBut = document.getElementById('save-week') as HTMLButtonElement;

// current week execise data
const exerciseData: ExerciseData = {
    light: 0,
    moderate: 0,
    vigorous: 0,
};

const updateUITimes = () => {
	if (lightTime && moderateTime && vigorousTime){
	lightTime.value = `${exerciseData.light}m out of ${totalTimeInput.value}h`;
	moderateTime.value= `${exerciseData.moderate}m out of ${totalTimeInput.value}h`;
	vigorousTime.value = `${exerciseData.vigorous}m out of ${totalTimeInput.value}h`;
	};
	if (totalTimeInput){
		totalTimeInput.value = localStorage.getItem('totalTime') || '7';
	};
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

const addExerciseTime = (type: keyof ExerciseData, time: number) => {
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
    const totalTime = document.getElementById('total-time') as HTMLInputElement;
    if (totalTime){
    	totalTime.addEventListener('change', function (event)  {
		updateTotalTime()
    });}else{
	    console.log('totalTime is not found');
    }

    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', (event) => {
            const target = event.target as HTMLElement;
            const parent = target.parentElement;
            if (parent) {
                const type = parent.querySelector('span')?.innerText.toLowerCase() as keyof ExerciseData;
                if (target.innerText === '+') {
                    addExerciseTime(type, 30);
                } else if (target.innerText === '>') {
                    startTracking(type);
                }
            }
        });
    });
});

const startTracking = (type: keyof ExerciseData) => {
    if (type === null){
	    console.log(`not type is selected`);
    }
    else{
	    console.log(`Started tracking ${type} exercise`);
    }
};

