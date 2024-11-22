let spidersHome = 12; //number of spiders total in each page
let spidersPoints = 12;
let spidersRewards = 12;


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
	"home spider 0: hides if you capture one of its siblings; leave and come back.",
	"home spider 1: on the Home page somewhere..",
	"home spider 2: on the Home page somewhere..",
	"home spider 3: on the Home page somewhere..",
	"home spider 4: on the Home page somewhere..",
	"home spider 5: on the Home page somewhere..",
	"home spider 6: on the Home page somewhere..",
	"home spider 7: on the Home page somewhere..",
	"home spider 8: on the Home page somewhere..",
	"home spider 9: on the Home page somewhere..",
	"home spider 10: on the Home page somewhere..",
	"home spider 11: on the Home page somewhere.."
];
const pointsHints = [
	"points spider 0: hides if you capture one of its siblings; leave and come back.",
	"points spider 1: on the Points page somewhere..",
	"points spider 2: on the Points page somewhere..",
	"points spider 3: on the Points page somewhere..",
	"points spider 4: on the Points page somewhere..",
	"points spider 5: on the Points page somewhere..",
	"points spider 6: on the Points page somewhere..",
	"points spider 7: on the Points page somewhere..",
	"points spider 8: on the Points page somewhere..",
	"points spider 9: on the Points page somewhere..",
	"points spider 10: on the Points page somewhere..",
	"points spider 11: on the Points page somewhere.."
];
const rewardsHints = [
	"rewards spider 0: hides if you capture one of its siblings; leave and come back.",
	"rewards spider 1: on the Rewards page somewhere..",
	"rewards spider 2: on the Rewards page somewhere..",
	"rewards spider 3: on the Rewards page somewhere..",
	"rewards spider 4: on the Rewards page somewhere..",
	"rewards spider 5: on the Rewards page somewhere..",
	"rewards spider 6: on the Rewards page somewhere..",
	"rewards spider 7: on the Rewards page somewhere..",
	"rewards spider 8: on the Rewards page somewhere..",
	"rewards spider 9: on the Rewards page somewhere..",
	"rewards spider 10: on the Rewards page somewhere...",
	"rewards spider 11: on the Rewards page somewhere..."
];
const thanks = [
	"They are all so precious, aren't they?.",
	"How can I ever thank you?",
	"High five me. Yeah, again. uh-huh, again. Yeah. Yeah. Yeah. Yeah. Aw Yeah.",
	"Do come visit sometimes!"
];

let lastHint = null;
function getAvailableHints(hints, spiderPrefix){
	return hints.filter((h, index) => !localStorage.getItem(`${spiderPrefix}${index}`));
}
function showHint(){
	const hint = document.getElementById('hints');
	let availableHints = [];
	availableHints = availableHints.concat(getAvailableHints(homeHints, 'spiderH')); 
	availableHints = availableHints.concat(getAvailableHints(pointsHints, 'spiderP'));
	availableHints = availableHints.concat(getAvailableHints(rewardsHints, 'spiderR'));
	
	if(availableHints.length === 0){
		availableHints = thanks;
	}
	let randomHint;
	do{
		randomHint = availableHints[Math.floor(Math.random() * availableHints.length)];
	} while(randomHint === lastHint && availableHints.length > 1);
	lastHint = randomHint;
	hint.textContent = randomHint;
}
const mamaSpider = document.getElementById('mamaSpider');
if (mamaSpider){
	mamaSpider.addEventListener('click', showHint);
}

function spiderReset(){
	spidersHome = 12;
	spidersPoints = 12;
	spidersRewards = 12;
	
	for(let i = 0; i <= 12; i ++){
		localStorage.removeItem(`spiderH${i}`);
	}
	for(let i = 0; i <= 12; i ++){
		localStorage.removeItem(`spiderP${i}`);
	}
	for(let i = 0; i <= 12; i ++){
		localStorage.removeItem(`spiderR${i}`);
	}
	document.querySelectorAll('.spider').forEach(spider =>{
		spider.style.display = 'block';
	});
	console.log('All of the spiders are out again, everywhere!');
}

function hideShy(spiderPrefix, spiderCount){
	if(spiderCount === 11){
		const shySpider = document.getElementById(`${spiderPrefix}0`);
		if(shySpider){
			shySpider.style.display = 'none';
			console.log(`${spiderPrefix}0 has hidden away, or has been captured.`);
		}
	}
}

const penDoor = document.getElementById('penDoor');
if(penDoor){
	penDoor.addEventListener('click', function(){
		if(confirm("Doing that will free all of the baby spiders. You will forfeit your accrued points as well. Are you sure?")){
			localStorage.setItem('points', 0);
			spiderReset();
			console.log('Spiders have been freed; Points reset to 0.');
			updatePointsDisplay();
		}
	});
}

document.querySelectorAll('.spider').forEach(spider =>{
	const spiderStatus = localStorage.getItem(spider.id);
	if(spiderStatus === "clicked"){
		spider.style.display = "none";
	}
	spider.addEventListener('click', function(){
		if(this.style.display != 'none'){
			let points = parseInt(localStorage.getItem('points'), 10) || 0;
			points +=5;
			localStorage.setItem('points', points);
			console.log('Spider get!');
			this.style.display = 'none';
			localStorage.setItem(this.id, "clicked");
			updatePointsDisplay();
			
			if(this.id.startsWith('spiderH')){
				spidersHome -= 1;
				hideShy('spiderH', spidersHome);
			}
			if(this.id.startsWith('spiderP')){
				spidersPoints -= 1;
				hideShy('spiderP', spidersPoints);
			}
			if(this.id.startsWith('spiderR')){
				spidersRewards -= 1;
				hideShy('spiderR', spidersRewards);
			}
			
		}
	});
});

function unlockLink(){
	const points = parseInt(localStorage.getItem('points'), 10);
	if(points >= 170){
		localStorage.setItem('points', points - 170);
		localStorage.setItem('linkUnlocked', 'true');
		updatePointsDisplay();
		document.getElementById('unlockMessage').textContent = "Link to Minigames unlocked!";
	}
	else{
		document.getElementById('unlockMessage').textContent = "Not enough points.";
	}
}
const unlockMinigames = document.getElementById('unlockMinigames');
if(unlockMinigames){
	unlockMinigames.addEventListener('click', unlockLink);
}

function displayLink(){
	const linkUnlocked = localStorage.getItem('linkUnlocked');
	const nav = document.querySelector('nav');
	if(linkUnlocked === 'true' && nav){
		const minigamesLink = document.createElement('a');
		minigamesLink.href = "minigames.html";
		minigamesLink.textContent = "Minigames";
		nav.appendChild(minigamesLink);
	}
}

document.addEventListener('DOMContentLoaded', () =>{
	updatePointsDisplay();
	updateProgress();
	displayLink();
	console.log('DOMContentLoaded event triggered');
});
if(window.location.pathname.endsWith('rewards.html')){
	updateProgress();
	console.log('Rewards page loaded');
}
