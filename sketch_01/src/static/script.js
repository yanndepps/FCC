// ——————————————————————————————————————————————————
// expand form inputs
// ——————————————————————————————————————————————————
function expand(lbl) {
	const elemId = lbl.getAttribute("for");
	document.getElementById(elemId).style.height = "45px";
	document.getElementById(elemId).classList.add("my-style");
	lbl.style.transform = "translateY(-45px)";
}

// ——————————————————————————————————————————————————
// text scramble
// ——————————————————————————————————————————————————

class TextScramble {
	constructor(el) {
		this.el = el;
		// this.chars = '!<>-_\\/[]{}—=+*^?#________'
		this.chars = '▀▄▚▐─═0123.+?';
		this.update = this.update.bind(this);
	}
	setText(newText) {
		const oldText = this.el.innerText;
		const length = Math.max(oldText.length, newText.length);
		const promise = new Promise((resolve) => this.resolve = resolve);
		this.queue = [];
		for (let i = 0; i < length; i++) {
			const from = oldText[i] || '';
			const to = newText[i] || '';
			const start = Math.floor(Math.random() * 160);
			const end = start + Math.floor(Math.random() * 160);
			this.queue.push({ from, to, start, end });
		}
		cancelAnimationFrame(this.frameRequest);
		this.frame = 0;
		this.update();
		return promise;
	}

	update() {
		let output = '';
		let complete = 0;
		for (let i = 0, n = this.queue.length; i < n; i++) {
			let { from, to, start, end, char } = this.queue[i];
			if (this.frame >= end) {
				complete++;
				output += to;
			} else if (this.frame >= start) {
				if (!char || Math.random() < 0.28) {
					char = this.randomChar();
					this.queue[i].char = char;
				}
				output += `<span class="dud">${char}</span>`;
			} else {
				output += from;
			}
		}
		this.el.innerHTML = output;
		if (complete === this.queue.length) {
			this.resolve();
		} else {
			this.frameRequest = requestAnimationFrame(this.update);
			this.frame++;
		}
	}
	randomChar() {
		return this.chars[Math.floor(Math.random() * this.chars.length)];
	}
}

// ——————————————————————————————————————————————————
// scramble -> register page
// ——————————————————————————————————————————————————
const regEl = document.getElementById("reg-title");

if (regEl) {
	const phrases = [
		'Register',
	];

	const fx = new TextScramble(regEl);
	let counter = 0;
	const next = () => {
		fx.setText(phrases[counter]).then(() => {
			setTimeout(next, 3000)
		});
		counter = (counter + 1) % phrases.length;
	}

	next();
}

// ——————————————————————————————————————————————————
// scramble -> login page
// ——————————————————————————————————————————————————
const logEl = document.getElementById("log-title");

if (logEl) {
	const phrases = [
		'Login',
	];

	const fx = new TextScramble(logEl);
	let counter = 0;
	const next = () => {
		fx.setText(phrases[counter]).then(() => {
			setTimeout(next, 3000)
		});
		counter = (counter + 1) % phrases.length;
	}

	next();
}

// ——————————————————————————————————————————————————
// scramble -> home page
// ——————————————————————————————————————————————————
const homEl = document.getElementById("home-title");

if (homEl) {
	const phrases = [
		'Welcome !',
		'Please log in,',
		'or register !',
	];

	const fx = new TextScramble(homEl);
	let counter = 0;
	const next = () => {
		fx.setText(phrases[counter]).then(() => {
			setTimeout(next, 1500)
		});
		counter = (counter + 1) % phrases.length;
	}

	next();
}

// ——————————————————————————————————————————————————
// scramble -> notes page
// ——————————————————————————————————————————————————
const notEl = document.getElementById("notes-title");

if (notEl) {
	const phrases = [
		'Notes',
	];

	const fx = new TextScramble(notEl);
	let counter = 0;
	const next = () => {
		fx.setText(phrases[counter]).then(() => {
			setTimeout(next, 3000)
		});
		counter = (counter + 1) % phrases.length;
	}

	next();
}
