var gId = document.getElementById.bind(document),
to = setTimeout,
lS = localStorage,
titre=gId("t"),
machine = gId("m"),
paper = gId("p"),
audio = [gId("a"),gId("b")],
iDiv = gId("i"),
corpus = "ARST",
solution = "START",
els =[],
loaded=0,
id,
canPlay=true,
winTxt,
i=-1,
level=0,
j,
iTo;

while (++i <10) {
	// (i<5)? machine.innerHTML += `<div class="n" id="${i}"></div>` : gId(i-5).addEventListener("click",clickEl);
	(i<5)? machine.innerHTML += '<div class="n" id="'+i+'">.</div>' : gId(i-5).addEventListener("click",clickEl);
}

function load () {
	if(loaded>2) {
		audio[0].removeEventListener("canplaythrough",load);
		return launch();
	}
	console.log("load");
	audio[0].src = "data/s"+loaded+".mp3";
	loaded++;
	audio[0].load();
}
audio[0].addEventListener("canplaythrough",load);

function play(id) {
	audio[0].src = "data/s"+id+".mp3";
	audio[0].play();
	audio.push(audio.shift());
}

function launch() {
	console.log("launch");
	titre.textContent = "Offscreen puzzles";

	if(lS.getItem("level") ) {
		corpus += "E";
		info("START to continue ; RESET to delete save",3000);
	}
	setMachine();
}

console.log("test");

function nextPuzzle(p,s) {
	if(!p && solution=="START") p = parseInt(lS.getItem("level"));
	level= (p || ( s=JSON.parse(lS.getItem("save")) ) )? p : level+1;
	console.log("p",p);
	p = (p)? puzzles.splice(0,p).pop() : puzzles.shift();
	if(p) {
		corpus= (p.c)? p.c : "0123456789";
		p.t = "Puzzle "+level+" : "+p.t;
		titre.textContent = p.t;
		p_setTitle(p.t);
		solution = p.f();
		if(s) {
			solution = s.s;
			p_setTitle(p.t);
			s.c.forEach(function(data) {
				var c = p_addCanvas(),
				i = document.createElement("img");
				i.src = data;
				i.addEventListener("load",function(){
					c.drawImage(i,0,0);
				})
			});

		} else save();
		to(window.print,500);
	} else {
		titre.textContent = "Thank you for playing!";
		corpus = "BRAVO";
	}

	setMachine();
	canPlay=true;
	if(!p) {
		for(i=0;i<5;i++) {
			for(j=0;j<i;j++) els[i].push(els[i].shift());
		}
		display();
	}

}

function display(e) {
	for(i=0;i<5;i++) {
		e=gId(i);
		e.textContent = els[i][0];
		e.className = "n";
	}
}

function setMachine() {
	i=-1;
	while (++i <5) {
		els[i] = corpus.split('');
	}
	display();
}

function clickEl(e) {
	if(!canPlay) return;
	id = parseInt(e.target.id);
	( e.pageY - gId(id).offsetTop < gId(id).clientHeight/2 )? els[id].push(els[id].shift()) : els[id].unshift(els[id].pop());
	play(0);
	display();
	testSolve();
}

function testSolve() {
	canPlay=false;
	for(i=0;i<5;i++) {
		if(els[i][0] != solution[i]) canPlay=true;
	}
	console.log("testSolvet", !canPlay);

	if (canPlay && solution=="START") {
		solution = "RESET";
		if(!testSolve()) solution = "START";
		else {
			lS.removeItem("level");
			return true;
		}
	}

	if(!canPlay) {
		winTxt = "GOOD!".split('');
		displayWin();
		return true;
	}
}

function displayWin(e) {
	if(!winTxt.length) return nextPuzzle();
	e = gId(5-winTxt.length);
	e.textContent = winTxt.shift();
	e.className = "n h";
	(winTxt.length)? play(1) : play(2);
	to(displayWin,400);
}

function rand(nb) {
	if(nb===0)return 0;
	return Math.random()*(nb||10)|0;
}

function sort(tab) {
	tab.sort(function(a, b) {
	  return a - b;
	});
}

function save(s,cs) {
	lS.setItem("level",level);

	s = {c:[],s:solution};
	cs = paper.getElementsByTagName("canvas")
	for(i=0;i<cs.length;i++) {
		s.c.push(cs[i].toDataURL());
	};
	lS.setItem("save",JSON.stringify(s));

	info("progression saved");
}

function info(txt,time) {
	if(iDiv.className!="hide") clearTimeout(iTo);
	iDiv.textContent = txt;
	iDiv.className = "";
	iTo = to(infoHide, time||2000);
}

function infoHide() {
	iDiv.className = "hide";
}

load();
