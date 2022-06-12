const pexeso = document.getElementById("pexeso")

const cas = document.getElementById("cas")
let [milliseconds,seconds, minutes] = [0,0,0];
function timer() {
    milliseconds += 1;
    if (milliseconds == 100) {
        milliseconds = 0;
        seconds++;
        if (seconds == 60) {
            seconds = 0;
            minutes++;
            if (minutes == 60) {
                return "bruh";
            }
        }
    }
    if(milliseconds < 10){
        cas.innerHTML = minutes + " : " + seconds + " : " + "0" + milliseconds
    }
	
    else{
        cas.innerHTML = minutes + " : " + seconds + " : " + milliseconds
    }
    
}

let hra = null;
function restartGame(){
	hra = new Pexeso(pexeso);
	cards = document.querySelectorAll('.t')
	cards.forEach((item) => {
		item.classList.remove('revealed')
		item.classList.remove('hidden')
	})
	interval = null;
	pexeso.style.opacity = 1;
	win.style.animationName = "";
	reset.style.animationName = "";
	winText.innerHTML = ""
	btn.removeEventListener("click", (e) => {
		restartGame();
	})
	milliseconds = 0
	seconds = 0
	minutes = 0
	cas.innerHTML = minutes + " : " + seconds + " : " + "0" + milliseconds
	counter = 0;
	bar.style.width = 0 + "%";
    cislo.innerHTML = "0%";
}



const classes = [
	'tskala',
	'tveverka',
	'theart',
	'tfire',
	'tplane',
	'thome',
	'tstrom',
	'tkey'
];

const origami = `
<div class="t">
  <svg viewbox="-50 -50 200 200" >
    <use class="bt-1" href="#origami1" transform="translate(0,0)"/>
    <use class="bt-2" href="#origami1" transform="translate(0,0) scale(-1,1) rotate(90 0 0)"/>
    <use class="st-1" href="#origami1" transform="translate(25,75) scale(.5,.5) rotate(-90 0 0)"/>
    <use class="mt" href="#origami1" transform="translate(100,49.5) scale(.7142,.7142) rotate(45 0 0)"/>
    <use class="st-2" href="#origami1" transform="translate(100,50) scale(.5,.5) rotate(-180 0 0)"/>
    <use class="sq" href="#origami2"/>
    <use class="ob" href="#origami3"/>
  </svg>
</div>
`

const bar = document.getElementById("bar")
const cislo = document.getElementById("cislo")
const win = document.getElementById("win")
const winText = document.getElementById("win-text")
const reset = document.getElementById("reset")
const btn = document.getElementById("reset-text")
let counter = 0;
let interval = null;

class Pexeso {
	constructor (selector) {
		this.selector = selector
		this.init()
	}
	init () {
		this.randomize()
		this.buildGrid()
		this.revealed = []	    
	}
	randomize () {
		this.classes = this.shuffle(classes.concat(classes))
	}
	shuffle (array) {		
		array.sort( function(a, b) {return 0.5 - Math.random()} );
		return array;
	}
	buildGrid () {
		let html = "";
		for (let i = 0; i < this.classes.length; i++ ) {
			html += origami;
		}
		this.selector.innerHTML = html;
		this.cards = this.selector.querySelectorAll('.t')
		this.classes.forEach ((el, i = 0) => {
            console.log(i)
            console.log(el)
			const card = this.cards[i]
			card.classList.add(el)
			card.setAttribute("data-class", el)
			this.addCardListeners(card)
		})

	}
	checkMatch () {
		return this.revealed.length === 2 && this.revealed[0].getAttribute("data-class") === this.revealed[1].getAttribute('data-class')
	}
    
	addCardListeners (el) {
		el.addEventListener("mouseover", (e) => {
			if (el.classList.contains('revealed')){
				return
			}
			
			if ( this.revealed.length < 2 ) {
				return
			}

			this.revealed.forEach(item => {
				item.classList.remove('revealed')
			})
			this.revealed = []
		})
        
		el.addEventListener("click", (e) => {
			if (el.classList.contains('revealed')) {
				return
			}
			if(interval == null){
                interval = setInterval(timer, 10);
            }

			el.classList.add('revealed');
			this.revealed.push(el)
            let numero = 0;
			if (this.checkMatch()) {
                counter++;
				console.log(counter)
                numero = (counter/8)*100;
                bar.style.width = numero + "%";
                cislo.innerHTML = numero + "%";
				this.revealed.forEach((item) => {
				  item.classList.add('hidden')
			  })
              this.revealed = []
			}
            if(numero == 100){
                clearInterval(interval);
                this.cards.forEach((item) => {
                    item.classList.add('revealed')
                })
                pexeso.style.opacity = 0.5;
                win.style.animationName = "win";
                reset.style.animationName = "win";
                winText.innerHTML = "Skvělá práce! <br> Tvůj čas: " + minutes + "minut " + seconds + "sekund a " + milliseconds + "ms"
				btn.addEventListener("click", (e) => {
					restartGame();
				})
				
			}

		});

	}
}


restartGame()
