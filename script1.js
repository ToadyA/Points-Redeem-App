const spidersHome = 10; //number of spiders total in each page
const spidersPoints = 10;
const spidersRewards = 10;


if(!localStorage.getItem('points')){
	localStorage.setItem('points', 0);
}
function addP(points){
	let totalP = parseInt(localStorage.getItem('points'), 10);
	totalP += points;
	localStorage.setItem('points', totalP);
	console.log(`Points added: ${points}. Total points:${totalP}.`);
	updatePointsDisplay();
}

function updatePointsDisplay(){
	const pointsDisplay = document.getElementById('pointsDisplay');
	if(pointsDisplay){
		pointsDisplay.textContent = `Current Points: ${localStorage.getItem('points')}`;
		console.log(`Points Display Updated: ${localStorage.getItem('points')}`);
	}
}

function updateProgress(){
	const progressDisplay = document.getElementById('progressDisplay');
	const progressBar = document.getElementById('progressBar');
	const leftNode = document.getElementById('leftNode');
	const rightNode = document.getElementById('rightNode');
	const points = parseInt(localStorage.getItem('points'), 10);
	const leftBound = Math.floor(points / 100) * 100;
	const rightBound = leftBound + 100;
	const progress = points % 100;
	
	if(progressDisplay){
		progressDisplay.textContent = `Total Points: ${points}`;
		console.log(`Progress Display Updated: ${localStorage.getItem('points')}`);
	}
	if(progressBar){
		progressBar.style.width = `${progress}%`;
		console.log(`Progress Bar Updated: ${progress}%`);
	}
	if(leftNode){
		leftNode.textContent = leftBound;
		console.log(`Left Node Updated: ${leftBound}`);
	}
	if(rightNode){
		rightNode.textContent = rightBound;
		console.log(`Right Node Updated: ${rightBound}`);
	}
}

function resetPoints(){
	if(confirm("Are you sure you want to reset your points?")){
		localStorage.setItem('points', 0);
		updatePointsDisplay();
		updateProgress();
		console.log("Points reset to 0.");
	}
}

const homeHints = [
	"home spider 0",
	"home spider 1",
	"home spider 2",
	"home spider 3",
	"home spider 4",
	"home spider 5",
	"home spider 6",
	"home spider 7",
	"home spider 8",
	"home spider 9"
];
const pointsHints = [
	"points spider 0",
	"points spider 1",
	"points spider 2",
	"points spider 3",
	"points spider 4",
	"points spider 5",
	"points spider 6",
	"points spider 7",
	"points spider 8",
	"points spider 9"
];
const rewardsHints = [
	"rewards spider 0",
	"rewards spider 1",
	"rewards spider 2",
	"rewards spider 3",
	"rewards spider 4",
	"rewards spider 5",
	"rewards spider 6",
	"rewards spider 7",
	"rewards spider 8",
	"rewards spider 9"
];
const thanks = [
	"They are all so precious, aren't they?.",
	"How can I ever thank you?",
	"High five me. Yeah, again. uh-huh, again. Yeah. Yeah. Yeah. Yeah. Aw Yeah.",
	"Do come visit sometimes!"
]

function showHint(){
	const hint = document.getElementById('hints');
	let randomHint = homeHints[0];
	if(spidersHome <= spidersRewards && spidersHome <= spidersPoints && spidersHome != 0){
		randomHint = homeHints[Math.floor(Math.random() * (homeHints.length - 1))];
	}
	else if(spidersRewards <= spidersPoints && spidersRewards <= spidersHome && spidersRewards != 0){
		randomHint = rewardsHints[Math.floor(Math.random() * (rewardsHints.length - 1))];
	}
	else if(spidersPoints <= spidersHome && spidersPoints <= spidersRewards && spidersPoints != 0){
		randomHint = homeHints[Math.floor(Math.random() * (homeHints.length - 1))];
	}
	else{
		randomHint = thanks[Math.floor(Math.random() * (thanks.length - 1))];
	}
	hint.textContent = randomHint;
}
const mamaSpider = document.getElementById('mamaSpider');
if (mamaSpider){
	mamaSpider.addEventListener('click', showHint);
}

const penDoor = document.getElementById('penDoor');
if(penDoor){
	penDoor.addEventListener('click', function(){
		if(confirm("Doing that will free all of the baby spiders. You will forfeit your accrued points as well. Are you sure?")){
			localStorage.setItem('points', 0);
			console.log('Spiders have been freed; Points reset to 0.');
			document.querySelectorAll('.spider').forEach(spider =>{
				spider.style.display = 'block';
			});
			updatePointsDisplay();
		}
	});
}

document.querySelectorAll('.spider').forEach(spider =>{
	spider.addEventListener('click', function(){
		if(this.style.display != 'none'){
			let points = parseInt(localStorage.getItem('points'), 10) || 0;
			points +=5;
			localStorage.setItem('points', points);
			console.log('Spider get!');
			this.style.display = 'none';
			updatePointsDisplay();
		}
	});
});

document.addEventListener('DOMContentLoaded', () =>{
	
	updatePointsDisplay();
	updateProgress();
	console.log('DOMContentLoaded event triggered');
});
if(window.location.pathname.endsWith('rewards.html')){
	updateProgress();
	console.log('Rewards page loaded');
}
