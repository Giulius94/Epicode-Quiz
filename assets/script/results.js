//grep delle query strings
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
let domandeTotali = params.domandetotali
let risposteGiuste = params.giuste
let risposteSbagliate = params.sbagliate
let nonRisposte = params.nonrisposte
let CenterTextPlugin;
console.log(domandeTotali, risposteGiuste, risposteSbagliate, nonRisposte)

function calculateFontSize(chart) {
  const chartSize = Math.min(chart.chartArea.bottom - chart.chartArea.top, chart.chartArea.right - chart.chartArea.left);
  return Math.round(chartSize / 25) + 'px'; // Regola questo valore secondo necessità
}

function creazioneMessaggio() {
  if ((+risposteGiuste / +domandeTotali) * 100 >= 60) {
    CenterTextPlugin = {
      afterDraw: (chart) => {
        let ctx = chart.ctx;
        ctx.save();
    
        // Calcola la dimensione del font in modo dinamico
        const fontSize = calculateFontSize(chart);
        const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
        const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
    
        // Stili e testi per il caso di successo
        let newFontSize = fontSize.slice(0, 2)
        newFontSize = +newFontSize + 2
        let newPixel = Math.round(newFontSize) + 'px';
        console.log(newFontSize + 'ciao')
        ctx.font = 'bold ' + newPixel  + ' Inter';
        console.log('ecco il font size' + fontSize)
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = 'white';
        ctx.fillText('Congratulations!', centerX, centerY - 58);

        newFontSize = +newFontSize + 1
        newPixel = Math.round(newFontSize) + 'px'; 
        ctx.font = 'bold ' + newPixel  + ' Inter';
        ctx.fillStyle = '#00FFFF';
        ctx.fillText('You passed the exam.', centerX, centerY - 30);

        newFontSize = +newFontSize - 4
        newPixel = Math.round(newFontSize) + 'px'; 
        ctx.font = 'bold ' + newPixel  + ' Inter';
        ctx.fillStyle = 'white';
        ctx.fillText('We will send you the certificate', centerX, centerY + 4);
        ctx.fillText('in few minutes.', centerX, centerY + 30);
        ctx.fillText('Check your email!', centerX, centerY + 60);

        ctx.restore();
      }
    };
  } else {
    CenterTextPlugin = {
      afterDraw: (chart) => {
        let ctx = chart.ctx;
        ctx.save();
    
        // Calcola la dimensione del font in modo dinamico
        const fontSize = calculateFontSize(chart);
        const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
        const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
    
        // Stili e testi per il caso di fallimento
        let newFontSize = fontSize.slice(0, 2)
        newFontSize = +newFontSize + 2
        let newPixel = Math.round(newFontSize) + 'px';
        ctx.font = 'bold ' + newPixel + ' Inter';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = 'white';
        ctx.fillText('Failed!', centerX, centerY - 60);

        ctx.fillStyle = 'red';
        ctx.fillText("You didn't pass the exam", centerX, centerY - 30);

        newFontSize = +newFontSize - 3
        newPixel = Math.round(newFontSize) + 'px'; 
        ctx.font = '300 ' + newPixel + ' Inter';
        ctx.fillStyle = 'white';
        ctx.fillText('Umberto is waiting for you', centerX, centerY + 4);
        ctx.fillText('in his chat-room.', centerX, centerY + 30);
        ctx.fillText('Good Luck!', centerX, centerY + 60);

        ctx.restore();
      }
    };
  }
}


//result
let ctx = document.getElementById('donutChart').getContext('2d');
//ombra
const ShadowPlugin = {
  beforeDraw: (chart) => {
    const { ctx } = chart;
    ctx.shadowColor = "black";
    ctx.shadowBlur = 6;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 0;
  },
};

creazioneMessaggio()




  // variabili da prendere poi dalla question
  let totGiu = parseFloat((+risposteGiuste / +domandeTotali) * 100).toFixed(1);
  let totSba = parseFloat(((+risposteSbagliate + +nonRisposte) / +domandeTotali) * 100).toFixed(1);

  // passaggio variabili su html

  let percGiuste = document.getElementById("Correct%");
  percGiuste.innerText = parseFloat((+risposteGiuste / +domandeTotali) * 100).toFixed(1) + '%';

  let percSbagliate = document.getElementById("Wrong%");
  percSbagliate.innerText = parseFloat(((+risposteSbagliate + +nonRisposte) / +domandeTotali) * 100).toFixed(1) + '%';

  let nGiuste = document.getElementById("nCorrette");
  nGiuste.textContent = risposteGiuste +'/'+ domandeTotali + ' questions';
  let nSbagliate = document.getElementById("nSbagliate");
  nSbagliate.textContent = (+risposteSbagliate + +nonRisposte) +'/'+ domandeTotali + ' questions';

  // colori per le sezioni del grafico
  let colors = [ '#D20094','#00FFFF'];
  
  // Crea i dati per il grafico
  let data = {
    datasets: [{
    data: [totSba, totGiu],
    backgroundColor: colors,
    borderWidth:0
    }]
  };

  // Crea le opzioni del grafico
  let options = {
    cutout: '70%', // Spessore del grafico
    responsive: true,
    maintainAspectRatio: false
    
  };
  // Crea il grafico a ciambella con l'ausilio dello script chart.js
  let myDonutChart = new Chart(ctx, {
    type: 'doughnut',
    data: data,
    options: options,
    plugins: [ShadowPlugin, CenterTextPlugin]
  });



