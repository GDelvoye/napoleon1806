let nbDiceFrance = 1;
let nbDicePrussia = 1;

const probaFranceDiceSuccess = parseFloat(1/2);
const probaPrussiaDiceSuccess = parseFloat(1/3);

function updateNumericResults(franceResult, equality, prussiaResult){
        document.getElementById('prussia-numeric-result').innerHTML = "";
        document.getElementById('prussia-numeric-result').innerHTML = prussiaResult+" %";
        document.getElementById('france-numeric-result').innerHTML = "";
        document.getElementById('france-numeric-result').innerHTML = franceResult+" %";
        document.getElementById('equality-numeric-result').innerHTML = "";
        document.getElementById('equality-numeric-result').innerHTML = equality+" %";
        
    }

function updateChart() {
    let results = expectedResult(nbDiceFrance, nbDicePrussia);
    myChart.data.datasets[0].data = results;
    myChart.update();

    myChartMobile.data.datasets[0].data = results;
    myChartMobile.update();
    updateNumericResults(results[2], results[1], results[0]);
}

function incrementFrance() {
    nbDiceFrance++;
    document.getElementById('number-dice-france').textContent = nbDiceFrance;
    updateChart();
}

function decrementFrance() {
    if (nbDiceFrance > 0) {
        nbDiceFrance--;
        document.getElementById('number-dice-france').textContent = nbDiceFrance;
        updateChart();
    }
}

function incrementPrussia() {
    nbDicePrussia++;
    document.getElementById('number-dice-prussia').textContent = nbDicePrussia;
    updateChart();
}

function decrementPrussia() {
    if (nbDicePrussia > 0) {
        nbDicePrussia--;
        document.getElementById('number-dice-prussia').textContent = nbDicePrussia;
        updateChart();
    }
}

let dataChart =  {
    labels: ['Prussia', 'Equality', 'France'],
    datasets: [{
        data: expectedResult(nbDiceFrance, nbDicePrussia),
        backgroundColor: ['#888888', '#FF6600', '#3399FF'],
        hoverBackgroundColor: ['#888888', '#FF6600','#3399FF'],
    }]
};

let optionsChart = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        tooltip: {
            callbacks: {
                label: function(tooltipItem) {
                    return tooltipItem.label + ': ' + tooltipItem.raw;
                }
            }
        }
    }
};

const ctx = document.getElementById('pieChart').getContext('2d');
const ctxMobile = document.getElementById('pieChartMobile').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'pie',
    data: dataChart,
    options: optionsChart,
});

const myChartMobile = new Chart(ctxMobile, {
    type: 'pie',
    data: dataChart,
    options: optionsChart,
});

///////////////////
// Maths tools
///////////////////

function factorial(n){
    let n_facto = 1;
    for (let i = 1; i < n+1; i++){
        n_facto = n_facto * i;
    }
    return n_facto
}

function binomialCoefficient(n, k){
    if (k>=n){
        return 1
    }
    else{
        return factorial(n)/(factorial(k)*factorial(n-k))
    }
}

function binomialProbability(n,p,k){
    return binomialCoefficient(n,k)*p**k*(1-p)**(n-k)
}

function probabilityResultFight(nbDiceFrance, nbDicePrussia, nbSuccessFrance, nbSuccessPrussia){
    let franceProbability = binomialProbability(
        nbDiceFrance, probaFranceDiceSuccess, nbSuccessFrance
    );
    let prussiaProbability = binomialProbability(
        nbDicePrussia, probaPrussiaDiceSuccess, nbSuccessPrussia
    );
    return franceProbability *prussiaProbability
}

function expectedResult(nbDiceFrance, nbDicePrussia) {
    let franceVictory = 0;
    let equality = 0;
    let prussiaVictory = 0;

    for (let nbSuccessFrance = 0; nbSuccessFrance < nbDiceFrance+1; nbSuccessFrance++){
        for (let nbSuccessPrussia = 0; nbSuccessPrussia< nbDicePrussia+1; nbSuccessPrussia++){
            let intermediaryResult = probabilityResultFight(
                nbDiceFrance, nbDicePrussia, nbSuccessFrance, nbSuccessPrussia
            );
            if (nbSuccessFrance > nbSuccessPrussia) {
                franceVictory = franceVictory + intermediaryResult;
            }
            else if (nbSuccessFrance < nbSuccessPrussia) {
                prussiaVictory = prussiaVictory + intermediaryResult;
            }
            else {
                equality = equality + intermediaryResult
            }
        }
    }
    return [
        parseFloat((100*prussiaVictory).toFixed(0)),
        parseFloat((100*equality).toFixed(0)),
        parseFloat((100*franceVictory).toFixed(0))
    ]

}  
