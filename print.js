var nbCanvas,
width = 1181, // 20cm 150dpi
height = 591, // 10cm 150dpi
nbCasesW = 20, // min 6
nbCasesH = 8, // min 4
caseW = width/nbCasesW,
caseH = height/nbCasesH;


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

function p_fold(c,xOrY,v) {
	c.setLineDash([10, 15]);
	p_line(c,xOrY,v);
	c.setLineDash([]);
}

function p_line(c,xOrY,v) {
	c.strokeRect((v)?p_gridX(xOrY):0, (v)?0:p_gridY(xOrY), (v)?0:width, (v)?height:0);
}

function p_clearLine (c,xOrY,v) {
	c.clearRect((v)?p_gridX(xOrY):0, (v)?0:p_gridY(xOrY), (v)?caseW:width, (v)?height:caseH);
}
