const finalScore = document.getElementById('finalScore');
const lastScore = localStorage.getItem('lastScore')

finalScore.innerText = lastScore;

