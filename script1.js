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
	"On the Home page Thomas will hide when you grab one of his siblings. Leave and come back.",
	"Billie is on the Home page, ",
	"Henrietta is on the Home page, ",
	"Will is on the Home page, ",
	"Chris is on the Home page, ",
	"Queen is on the Home page, ",
	"Ed is on the Home page, ",
	"Polly is on the Home page, ",
	"Amelia is on the Home page, ",
	"Lliam is on the Home page, ",
	"Precious is on the Home page, ",
	"Gordon is on the Home page, "
];
const pointsHints = [
	"On this page Elanor will hide when you grab one of her siblings. Leave and come back.",
	"Dave is on this page, resting on my back.",
	"Ann is on this page, roaming near the pen below.",
	"Rudy is on this page, exploring the pen below.",
	"Clyde is on this page, roaming nearby.",
	"Olive is on this page, hiding within the pen below. She's a troublemaker.",
	"Beatrice is on this page, right in front of me.",
	"Kevin is on this page, hiding in the corner.",
	"Zackiyah is on this page, leaning on my leg",
	"Xavier is on this page, exploring the pen below.",
	"Vincent is on this page, exploring the pen below.",
	"Trish is on this page, roaming near the pen below."
];
const rewardsHints = [
	"On the Rewards page Drake will hide when you grab one of his siblings. Leave and come back.",
	"Eve is on the Rewards page, running the store. If you click her, you can no longer purchase anything.",
	"Tony is on the Rewards page, ",
	"Crystal is on the Rewards page, ",
	"Dorris is on the Rewards page, ",
	"Ryan is on the Rewards page, ",
	"Thelma is on the Rewards page, ",
	"Val is on the Rewards page, ",
	"Owen is on the Rewards page, ",
	"Helga is on the Rewards page, ",
	"Prince is on the Rewards page, ",
	"Freddie is on the Rewards page, "
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
	const shopItems = document.querySelectorAll('.shopItem');
	shopItems.forEach(item =>{
		item.style.pointerEvents = 'auto';
		item.style.opacity = '1';
		item.style.display = 'block';
	});
	const speechBubble = document.getElementById('speechBubble');
	if(speechBubble){
		speechBubble.style.opacity = '1';
		speechBubble.style.display = 'block';
	}
	const shopDialogue = document.getElementById('shopDialogue');
	if(shopDialogue){
		shopDialogue.textContent = 'Come buy something, yo!';
	}
	localStorage.removeItem('shopDisabled');
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
		spider.style.display = 'none';
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

function unlockItem(itemId, pointsReq){
	const points = parseInt(localStorage.getItem('points'), 10);
	if(points >= pointsReq){
		localStorage.setItem(itemId, 'true');
		document.getElementById('unlockMessage').textContent = `${itemId} unlocked!`;
	}
	else{
		document.getElementById('unlockMessage').textContent = "Not enough points.";
	}
}

const unlockMinigames = document.getElementById('unlockMinigames');
if(unlockMinigames){
	unlockMinigames.addEventListener('click', () => unlockItem('linkUnlocked', 170));
}
const shopItems = document.querySelectorAll('.shopItem');
shopItems.forEach(item =>{
	item.addEventListener('click', () => unlockItem(item.id, 210));
});

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
function displayUnlockedItems(){
	const items = ['shopLock1, shopLock2, shopLock3, shopLock4, shopLock5'];
	items.forEach(item =>{
		if(localStorage.getItem(item) === 'true'){
			document.getElementById(item).style.display = 'none';
		}
	});
}

function disableShop(){
	const shopItems = document.querySelectorAll('.shop-item');
	shopItems.forEach(item =>{
		item.style.pointerEvents = 'none';
		item.style.opacity = '0';
		item.style.transition = 'opacity 0.5s';
	});
	const speechBubble = document.getElementById('speechBubble');
	if(speechBubble){
		speechBubble.style.opacity = '0';
		speechBubble.style.transition = 'opacity 0.5s';
	}
	localStorage.setItem('shopDisabled', 'true');
}

const spiderR1 = document.getElementById('spiderR1');
if(spiderR1){
	spiderR1.addEventListener('click', () => {
		document.getElementById('shopDialogue').textContent = 'eek!';
		disableShop();
		spiderR1.style.display = 'none';
	});
}

document.addEventListener('DOMContentLoaded', () =>{
	updatePointsDisplay();
	updateProgress();
	displayLink();
	displayUnlockedItems();
	const speechBubble = document.getElementById('speechBubble');
	if(localStorage.getItem('shopDisabled') === 'true'){
		disableShop();
	}
	else{
		speechBubble.style.display = 'block';
	}
	console.log('DOMContentLoaded event triggered');
});
if(window.location.pathname.endsWith('rewards.html')){
	updateProgress();
	console.log('Rewards page loaded');
}
