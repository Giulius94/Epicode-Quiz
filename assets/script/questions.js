// Var per Questions dinamiche
let giuste = 0;
let sbagliate = 0;
let domandeNonRisposte = 0;
let domandeTotali = 0;
let counter = 0;
let timeoutId = null;
let divContainer = document.querySelector("#temporanee")
let divDomanda = document.querySelector('#domanda')
let divRisposte = document.querySelector('#risposte')
let divConteggio = document.getElementById("conteggio")
//FINE


//Richiamo funzioni
bottonePartenza()
//fine


// INIZIO FUNZIONI e variabili TIMER
const FULL_DASH_ARRAY = 283;
let timePassed = 0;
let timeLeft;
let timerInterval = null;
let duration;
let WARNING_THRESHOLD;
let ALERT_THRESHOLD;

const COLOR_CODES = {
  info: {
    color: "green"
  },
  warning: {
    color: "orange"
  },
  alert: {
    color: "red"
  }
};

document.getElementById("app").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="${FULL_DASH_ARRAY}"
        class="base-timer__path-remaining ${COLOR_CODES.info.color}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label"> <span id = "secondsInizio"> ${formatTime(
    0 
  )}</span></span>
</div>
`;

function onTimesUp() {
  clearInterval(timerInterval);
  // Riporta il colore a quello iniziale
  document.getElementById("base-timer-path-remaining").classList.remove(COLOR_CODES.warning.color, COLOR_CODES.alert.color);
  document.getElementById("base-timer-path-remaining").classList.add(COLOR_CODES.info.color);
}

function startTimer(tempo) {
  clearInterval(timerInterval);
  timePassed = 0;
  duration = tempo;
  timeLeft = tempo;
  WARNING_THRESHOLD = tempo / 2;
  ALERT_THRESHOLD = tempo / 3;

  timerInterval = setInterval(() => {
    timePassed++;
    timeLeft = duration - timePassed;
    document.getElementById("base-timer-label").innerHTML = "SECONDS" + '<span id = "seconds">' + formatTime(timeLeft) + '</span>' + "REMAINING";
    setCircleDasharray();
    setRemainingPathColor(timeLeft);

    if (timeLeft === 0) {
      onTimesUp();
    }
  }, 1000);
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${seconds}`;
}

function setRemainingPathColor(timeLeft) {
  const { alert, warning, info } = COLOR_CODES;
  const remainingPath = document.getElementById("base-timer-path-remaining");
  
  if (timeLeft <= ALERT_THRESHOLD) {
    remainingPath.classList.remove(warning.color);
    remainingPath.classList.add(alert.color);
  } else if (timeLeft <= WARNING_THRESHOLD) {
    remainingPath.classList.remove(info.color);
    remainingPath.classList.add(warning.color);
  } else {
    remainingPath.classList.remove(alert.color, warning.color);
    remainingPath.classList.add(info.color);
  }
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / duration;
  return rawTimeFraction - (1 / duration) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} ${FULL_DASH_ARRAY}`;
  document.getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}
//FINE CODICE JAVASCRIPT TIMER



//Array domande
let domande = [];
let domandeDifficili = [
  {
      id: 1,
      type: 'booleano',
      title: 'Il linguaggio Python è stato creato da Guido van Rossum?',
      correctAnswers: 'SI',
      other1: 'NO'
  },
  {
      id: 2,
      type: 'booleano',
      title: 'Il primo programma di computer è stato scritto da Ada Lovelace?',
      correctAnswers: 'SI',
      other1: 'NO'
  },
  {
      id: 3,
      type: 'booleano',
      title: 'HTML è principalmente usato per la programmazione di sistemi operativi?',
      correctAnswers: 'NO',
      other1: 'SI'
  },
  {
      id: 4,
      type: 'booleano',
      title: 'Un terabyte è più grande di un gigabyte?',
      correctAnswers: 'SI',
      other1: 'NO'
  },
  {
      id: 5,
      type: 'booleano',
      title: 'Linux è un sistema operativo basato su Unix?',
      correctAnswers: 'SI',
      other1: 'NO'
  },
  {
      id: 6,
      type: 'crocetta',
      title: 'Quale di questi non è un linguaggio di programmazione?',
      correctAnswers: 'HTML',
      other1: 'Java',
      other2: 'Python',
      other3: 'C++'
  },
  {
      id: 7,
      type: 'crocetta',
      title: 'Quale azienda ha sviluppato il sistema operativo Windows?',
      correctAnswers: 'Microsoft',
      other1: 'Apple',
      other2: 'IBM',
      other3: 'Google'
  },
  {
      id: 8,
      type: 'crocetta',
      title: 'In quale anno è stato lanciato il World Wide Web?',
      correctAnswers: '1989',
      other1: '1975',
      other2: '1991',
      other3: '1980'
  },
  {
      id: 9,
      type: 'crocetta',
      title: 'Quale linguaggio di programmazione è conosciuto per il suo utilizzo in sviluppo web frontend?',
      correctAnswers: 'JavaScript',
      other1: 'C#',
      other2: 'Python',
      other3: 'Ruby'
  },
  {
      id: 10,
      type: 'crocetta',
      title: 'Chi è considerato il padre della computer science moderna?',
      correctAnswers: 'Alan Turing',
      other1: 'Bill Gates',
      other2: 'Steve Jobs',
      other3: 'Tim Berners-Lee'
  }
];

let domandeFacili = [
    {
        id: 1,
        type: 'crocetta',
        title: 'Quanti anni ci vogliono per imparare il CSS?',
        correctAnswers: 'Nessuna delle precedenti',
        other1: 'millemila anni',
        other2: 'pochi mesi',
        other3: 'svariati anni',
    },
    {
        id: 2,
        type: 'booleano',
        title: 'Epicode è la migliore Accademia Europea?',
        correctAnswers: 'SI',
        other1: 'NO',
    },
    {
        id: 3,
        type: 'crocetta',
        title: 'Quanti elementi posso assegnare ad una Classe CSS?',
        correctAnswers: 'infiniti',
        other1: '5',
        other2: '1',
        other3: '33',
    },
    {
        id: 4,
        type: 'booleano',
        title: 'HTML è un linguaggio di programmazione?',
        correctAnswers: 'NO',
        other1: 'SI',
    },
    {
        id: 5,
        type: 'crocetta',
        title: 'Per imparare a programmare, principalmente occorre:',
        correctAnswers: 'ChatGPT+',
        other1: 'Studio matto e disperatissimo',
        other2: 'Saper usare Google',
        other3: 'Libri comprati a caro prezzo',
    }
]
console.log('domande totali: ' + domandeTotali)



// Funzioni domande dinamiche
function bottonePartenza () {
    let bottone = document.createElement('button')
    bottone.innerText = 'Clicca per Iniziare'
    bottone.id = 'bottonePartenza'
    divContainer.appendChild(bottone)
    bottone.addEventListener('click', () => {
        divContainer.removeChild(bottone)
        scegliDiff()
    })
}

function scegliDiff() {
  let bottoneFacile = document.createElement('button');
  bottoneFacile.innerText = 'Facile';
  bottoneFacile.id = 'bottoneFacile';
  divContainer.appendChild(bottoneFacile);

  let bottoneDifficile = document.createElement('button');
  bottoneDifficile.innerText = 'Difficile';
  bottoneDifficile.id = 'bottoneDifficile';
  divContainer.appendChild(bottoneDifficile);

  bottoneFacile.addEventListener('click', () => {
      domande = domandeFacili; 
      divContainer.removeChild(bottoneFacile);
      divContainer.removeChild(bottoneDifficile);
      domandeTotali = domande.length;
      prontiPartenza()
  });

  bottoneDifficile.addEventListener('click', () => {
      domande = domandeDifficili;
      divContainer.removeChild(bottoneFacile);
      divContainer.removeChild(bottoneDifficile);
      domandeTotali = domande.length;
      prontiPartenza()
  });
  
}


function prontiPartenza () {
    let titoloIniziale = document.createElement('h1')
    titoloIniziale.classList = 'titoliDomande'
    titoloIniziale.innerText = 'Attendi...'
    let titoloIniziale2 = document.createElement('h1')
    titoloIniziale2.classList = 'titoliDomande'
    titoloIniziale2.innerText = ' Le domande stanno per iniziare...'
    divContainer.appendChild(titoloIniziale)
    setTimeout(() => {
        divContainer.removeChild(titoloIniziale);
    }, 2000);
    setTimeout(function() { 
        divContainer.appendChild(titoloIniziale2)
    }, 2300);
    setTimeout(() => {
        divContainer.removeChild(titoloIniziale2);
        divContainer.remove()
        selettoreDomande()
    }, 4500);

}


function selettoreDomande() {
    clearTimeout(timeoutId);
    divConteggio.innerHTML ='QUESTION ' + (1 + +counter) + '<span id = "questViola">' + ' / ' + domande.length + '</span>';
    console.log('Counter all\'inizio di selettoreDomande: ' + counter);
    if (counter < domande.length) {
        let tempoDisposizione = domande[counter].type == 'crocetta' ? 30000 : 15000;
        startTimer(tempoDisposizione / 1000)
        chiamaDomanda(counter, tempoDisposizione);

        timeoutId = setTimeout(() => {
          pulisciDomande();
          counter++;
          domandeNonRisposte++;
          selettoreDomande();
      }, tempoDisposizione + 1000);
    } else {
        console.log('Quiz completato. Risposte corrette: ' + giuste + ', Risposte sbagliate: ' + sbagliate + ', Domande non Risposte: ' + domandeNonRisposte);
        redirectToResults()
    }
}

function chiamaDomanda(index, tempo) {
    let titoloDomanda = document.createElement('h1');
    titoloDomanda.innerText = domande[index].title;
    divDomanda.appendChild(titoloDomanda);

    if (domande[index].type == 'crocetta') {
        for (let i = 0; i < 4; i++) {
            let risposta = document.createElement('button');
            risposta.classList = 'risposta';
            risposta.innerText = i === 0 ? domande[index].correctAnswers : domande[index]['other' + i];
            divRisposte.appendChild(risposta);
        }
    } else if (domande[index].type == 'booleano') {
        for (let i = 0; i < 2; i++) {
            let risposta = document.createElement('button');
            risposta.classList = 'risposta';
            risposta.innerText = i === 0 ? domande[index].correctAnswers : domande[index].other1;
            divRisposte.appendChild(risposta);
        }
    }
}

function pulisciDomande() {
    if (divDomanda.firstChild) {
        divDomanda.removeChild(divDomanda.firstChild);
    }
    while (divRisposte.firstChild) {
        divRisposte.removeChild(divRisposte.firstChild);
    }
    onTimesUp()
}

// Event Listener per i bottoni delle risposte
divRisposte.addEventListener('click', function(event) {
    if (event.target.classList.contains('risposta')) {
        clearTimeout(timeoutId);
        let testoRisposta = event.target.innerText;
        if (testoRisposta === domande[counter].correctAnswers) {
            // console.log("Risposta corretta!");
            event.target.style.boxShadow = '10px 20px 20px green'
            giuste++;
            feedbackRispostaGiusta()
        } else {
            // console.log("Risposta sbagliata.");
            event.target.style.boxShadow = '10px 20px 20px red'
            sbagliate++;
            feedbackRispostaSbagliata()
        }
        setTimeout(() => {
          pulisciDomande()
          if (counter < domande.length - 1) {
            counter++;
            selettoreDomande();
        } else {
            console.log('Quiz completato. Risposte corrette: ' + giuste + ', Risposte sbagliate: ' + sbagliate + ', Domande non Risposte: ' + domandeNonRisposte);
            redirectToResults()
        }
        },1500)
    }
});



function generaArrayCasuale4num() {
    let numeri = [];
    let risposte = [];
    while (numeri.length < 4) {
        let numeroCasuale = Math.floor(Math.random() * 4) + 1;
        if (!numeri.includes(numeroCasuale)) {
            numeri.push(numeroCasuale);
            risposte.push('risposta'+numeroCasuale)
        }
    }
    return risposte;
}

function redirectToResults() {
  const baseUrl = "results.html"; 
  const queryString = `?giuste=${encodeURIComponent(giuste)}&sbagliate=${encodeURIComponent(sbagliate)}&nonrisposte=${encodeURIComponent(domandeNonRisposte)}&domandetotali=${encodeURIComponent(domandeTotali)}`;

  // Esegui il redirect
  window.location.href = baseUrl + queryString;
}
//FINE FUNZIONI DOMANDE DINAMICHE

//Function feedback Risposte

function feedbackRispostaGiusta() {
  let audioGood = document.getElementById('feedbackGood');
  audioGood.play()
}

function feedbackRispostaSbagliata() {
  let audioBad = document.getElementById('feedbackBad');
  audioBad.play()
}
