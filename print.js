var nbCanvas,
width = 1181, // 20cm 150dpi
//height = 591, // 10cm 150dpi
nbCasesW = 20, // min 6 and nbCases!h/2+1
nbCasesH = 9, // min 4, odd is better (cf Hide and Seek)
caseW = width/nbCasesW,
caseH = caseW,
height = nbCasesH*caseH; // more simple to make squares


function p_setTitle(t) {
	paper.innerHTML = "<p>"+t+"</p>";
	nbCanvas=0;
}

function p_addCanvas(fill,c,d) {
	nbCanvas++;
	c = document.createElement("canvas");
	d = document.createElement("div");
	d.className="c";
	c.id = "c"+nbCanvas;
	c.width = width;
	c.height = height;
	d.appendChild(c);
	paper.appendChild(d);

	c = c.getContext('2d');
	c.font = '50px Arial';
	c.textBaseline = "middle";
	c.textAlign = "center";
	c.lineWidth = 2;

	if(fill) p_fill(c);

	console.log(c);

	return c;
}

function p_gridX(v) {return v*caseW;}
function p_gridY(v) {return v*caseH;}

function p_fill(c) {
	for(i=0;i<nbCasesW;i++) {
		for(j=0;j<nbCasesH;j++) p_write(rand(),c,i,j);
	}
}

function p_write(char,c,x,y) {p_clearSquare(c,x,y);c.fillText(char, p_gridX(x)+caseW/2, p_gridY(y)+caseH/2);}

function p_square(c,x,y) {c.strokeRect(0.5+p_gridX(x), 0.5+p_gridY(y), caseW-1, caseH-1)}

function p_clearSquare(c,x,y) {c.clearRect(0.5+p_gridX(x), 0.5+p_gridY(y), caseW-1, caseH-1)}

function p_lineFold(c,xOrY,v) {
	p_fold(c,(v)?xOrY:0, (v)?0:xOrY, (v)?xOrY:nbCasesW, (v)?nbCasesH:xOrY);
}

function p_fold(c,x,y,x2,y2) {
	c.setLineDash([15, 15]);
	p_line(c,x,y,x2,y2);
	c.setLineDash([]);
}


function p_line(c,x,y,x2,y2) {
	c.beginPath();
	c.moveTo(p_gridX(x),p_gridY(y));
	// console.log("moveTo",p_gridX(x),p_gridY(y))
	c.lineTo(p_gridX(x2),p_gridY(y2));
	// console.log("lineTo",p_gridX(x2),p_gridY(y2));
	c.stroke();
}
function p_lineRect(c,xOrY,v) {
	// c.strokeRect((v)?p_gridX(xOrY):0, (v)?0:p_gridY(xOrY), (v)?0:width, (v)?height:0);
	p_line(c,(v)?xOrY:0, (v)?0:xOrY, (v)?xOrY:width, (v)?height:xOrY);
}

function p_clearLine (c,xOrY,v) {
	c.clearRect((v)?p_gridX(xOrY):0, (v)?0:p_gridY(xOrY), (v)?caseW:width, (v)?height:caseH);
}
