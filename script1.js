
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

document.addEventListener('DOMContentLoaded', () =>{
	document.getElementById('add10').addEventListener('click', () =>{
		addP(10);
		updateProgress();
	});
	document.getElementById('add50').addEventListener('click', () =>{
		addP(50);
		updateProgress();
	});
	document.getElementById('add5').addEventListener('click', () =>{
		addP(5);
		updateProgress();
	});
	document.getElementById('resetP').addEventListener('click', resetPoints);
	
	updatePointsDisplay();
	updateProgress();
	console.log('DOMContentLoaded event triggered');
});
if(window.location.pathname.endsWith('rewards.html')){
	updateProgress();
	console.log('Rewards page loaded');
}