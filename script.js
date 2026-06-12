let taskCount = 0;
function saveProfile() {
let name = document.getElementById("username").value;
let role = document.getElementById("role").value;
localStorage.setItem("name", name);
localStorage.setItem("role", role);
document.querySelector(".hero h3").innerText="Welcome, " + name + "!";
alert("Profile Saved Successfully!");
}

function saveMood() {
let mood =
document.getElementById("mood").value;
document.getElementById("currentMood")
.innerText = mood;
document.getElementById("summaryMood")
.innerText = mood;
alert("Mood Saved: " + mood);
updateWellnessScore();
}

const stress =
document.getElementById("stress");
const stressValue =
document.getElementById("stressValue");
stress.oninput = function(){
stressValue.innerText = this.value;
if(this.value <= 3){
    document.getElementById("summaryStress").innerText = "Low";
}
else if(this.value <= 7){
    document.getElementById("summaryStress").innerText = "Moderate";
}
else{
    document.getElementById("summaryStress").innerText = "High";
}
updateWellnessScore();
};

function addTask(){
let taskInput =
document.getElementById("taskInput");
if(taskInput.value === ""){
    alert("Please enter a task");
    return;
}
let li =
document.createElement("li");
li.innerHTML =
`${taskInput.value}
<button onclick="removeTask(this)">❌</button>`;
document.getElementById("taskList")
.appendChild(li);
taskCount++;
document.getElementById("taskCount")
.innerText = taskCount;
document.getElementById("summaryTasks")
.innerText = taskCount;
taskInput.value = "";
updateWellnessScore();
}

function removeTask(btn){
btn.parentElement.remove();
taskCount--;
if(taskCount < 0){
    taskCount = 0;
}
document.getElementById("taskCount")
.innerText = taskCount;
document.getElementById("summaryTasks")
.innerText = taskCount;
updateWellnessScore();
}

function addGoal(){
let goalInput =
document.getElementById("goalInput");
if(goalInput.value === ""){
    return;
}
let li =
document.createElement("li");
li.innerText =
goalInput.value;
document.getElementById("goalList")
.appendChild(li);
goalInput.value = "";
}

function calculateHabit(){
let habits =
document.querySelectorAll(".habit");
let completed = 0;
habits.forEach(habit => {
    if(habit.checked){
        completed++;
    }
});
let percent =
(completed / habits.length) * 100;
document.getElementById("habitResult")
.innerText =
"Completion: " + percent.toFixed(0) + "%";
document.getElementById("summaryHabit")
.innerText =
percent.toFixed(0) + "%";
updateWellnessScore();
}

const quotes = [
"Believe in yourself.",
"Small progress is still progress.",
"Stay focused and never give up.",
"Success comes from consistency.",
"Every day is a new opportunity.",
"Take breaks, not excuses.",
"You are stronger than you think."
];

function showQuote(){
let random =
Math.floor(Math.random() * quotes.length);
document.getElementById("quote")
.innerText =
quotes[random];
}

function saveJournal(){
let journal =
document.getElementById("journal").value;
localStorage.setItem("journal", journal);
alert("Journal Saved!");
}

function updateWellnessScore(){
let score = 0;
let mood =
document.getElementById("mood").value;
if(mood === "Happy") score += 25;
else if(mood === "Excited") score += 25;
else if(mood === "Neutral") score += 15;
else if(mood === "Sad") score += 5;

let stressLevel =
parseInt(document.getElementById("stress").value);
score += (11 - stressLevel) * 3;
score += Math.min(taskCount * 5, 25);
let habits =
document.querySelectorAll(".habit");
let completed = 0;
habits.forEach(habit => {
    if(habit.checked){
        completed++;
    }
});

score += completed * 5;
if(score > 100){
    score = 100;
}
document.getElementById("wellnessScore")
.innerText = score + "%";

document.getElementById("scoreDisplay")
.innerText = score + "%";

document.querySelector(".circle").style.background =
`conic-gradient(
    #00f5ff ${score}%,
    #222 ${score}%
)`;

let ai =
document.getElementById("aiInsight");

if(score >= 80){
    ai.innerText =
    "Excellent wellness status. Keep maintaining your healthy routine.";
}
else if(score >= 60){
    ai.innerText =
    "Good progress. Complete your habits and stay hydrated.";
}
else{
    ai.innerText =
    "You seem stressed today. Take a short break and focus on self-care.";
}

}

let timeLeft = 1500;
let timerInterval;

function startTimer(){

clearInterval(timerInterval);

timerInterval = setInterval(() => {

    let minutes =
    Math.floor(timeLeft / 60);

    let seconds =
    timeLeft % 60;

    document.getElementById("timer")
    .innerText =
    `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

    timeLeft--;

    if(timeLeft < 0){

        clearInterval(timerInterval);

        alert("Focus Session Completed!");

        timeLeft = 1500;
    }

},1000);

}

function resetTimer(){
clearInterval(timerInterval);
timeLeft = 1500;
document.getElementById("timer")
.innerText = "25:00";

}

const ctx = document.getElementById("moodChart");

new Chart(ctx, {
    type: "bar",
    data: {
        labels: [
            "Happy",
            "Neutral",
            "Sad",
            "Stressed",
            "Excited"
        ],
        datasets: [{
            label: "Mood Analytics",
            data: [5, 3, 2, 1, 4],
            backgroundColor: "#00f5ff"
        }]
    },
    options: {
        scales: {
            x: {
                ticks: {
                    color: "white"   
                },
                grid: {
                    color: "rgba(255,255,255,0.1)"
                }
            },
            y: {
                ticks: {
                    color: "white"   
                },
                grid: {
                    color: "rgba(255,255,255,0.1)"
                }
            }
        },
        plugins: {
            legend: {
                labels: {
                    color: "white"   
                }
            }
        }
    }
});

document.getElementById("wellnessScore")
.innerText = "0%";
document.getElementById("scoreDisplay")
.innerText = "0%";
document.getElementById("currentMood")
.innerText = "--";