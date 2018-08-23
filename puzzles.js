var puzzles = [
	{
		t:"Simple case",
		f:function(){
			var c = p_addCanvas(1),
			c2 = p_addCanvas(),
			r="",
			XY,x,y;

			XY = randCoor();

			for(i=0;i<5;i++) {
				x = XY.X[i];
				y = XY.Y[i];
				r += rand();
				p_square(c2,x,y);
				p_write(r[i],c,x,y);
			}
				
			return r;
		}
	},
	{
		t:"Dashes ?",
		f:function(){
			var c = p_addCanvas(1),
			r="",
			Y,y,x;

			Y = randCoor(0,1);
			x = 1+rand((nbCasesW)/2|0);

			p_lineFold(c,x,1);
			p_lineFold(c,1,1);
			
			for(i=0;i<5;i++) {
				y=Y[i];
				r += rand();
				p_write("▷",c,0,y);
				p_write(r[i],c,x*2-1,y);
			}
				
			return r;
		}
	},
	{
		t:"Arithmetic",
		f:function(c,r,w,s,n,ni){
			var c = p_addCanvas(1),
			w=5-nbCasesW%2,
			r,s,n,ni;

			console.log("w",w);

			p_clearLine(c,nbCasesH-1);

			p_lineFold(c,nbCasesW-w,1);
			p_lineFold(c,(nbCasesW-w+1)/2,1);
			p_lineRect(c,nbCasesH-1);

			do {		
				r=0;
				for(i=0;i<nbCasesH-1;i++) {
					s=(i==0)?1:rand(2);
					n = ""
					for(j=0;j<w;j++) {
						n+= rand();
						p_write(n[j],c,nbCasesW-w+j,i);
					}

					ni = parseInt(n);

					(s)? r += ni: r -= ni;
					(i==0)? p_clearSquare(c,0,0) : p_write((s)? "+" : "-",c,0,i);
				}
				// console.log("r",r);
			} while(r<10000 || r>99999);
				
			return r+"";
		}
	},
	{
		t:"More dashes",
		f:function(){
			var c = p_addCanvas(1),
			r="",
			Y,y,x,x2,x3,x4,cx;

			Y = randCoor(0,1);
			cx = 3+rand(nbCasesW-6);

			x2 = cx-(1+rand((cx/2|0)-2));
			x = x2*2-cx;
			x3 = cx+1+rand((nbCasesW-cx-2)/2|0);
			x4 = cx+(x3-cx)*2;
			console.log("cx",cx,"x2",x2,"x",x,"x3",x3,"x4",x4);

			[x,x2,x3,x4].forEach(function(e){p_lineFold(c,e,1)})
			
			for(i=0;i<5;i++) {
				y=Y[i];
				r += rand();
				p_write("▷",c,x-1,y);
				p_write(r[i],c,x4,y);
			}
				
			return r;
		}
	},
	{
		t:"Hide and seek",
		f:function(){
			var c = p_addCanvas(1),
			r="",
			h2 = Math.ceil(nbCasesH/2),
			y,x,y2,y3,w;

			x = h2+rand(nbCasesW-nbCasesH-6);
			y = 2+rand((nbCasesH-3)/2|0)*2;
			y2 = y/2;
			y3 = y+(nbCasesH-y+1)/2;

			p_lineFold(c,y2);
			p_lineFold(c,y3);
			p_fold(c,x,y3,x-h2,y2);
			p_fold(c,x+5,y3,x+h2+5,y2);
			
			for(i=0;i<5;i++) {
				r += rand();
				p_write(r[i],c,x+i,y);
			}
				
			return r;
		}
	},
	{
		t:"Two again",
		f:function(){
			var c = p_addCanvas(1),
			c2 = p_addCanvas(),
			r="",
			XY,n,n2;

			XY = randCoor();
			console.log("XY",XY);

			for(i=0;i<nbCasesW;i++) {
				for(j=0;j<nbCasesH;j++) {
					n = rand();
					if(i==XY.X[0] && j==XY.Y[0]) {
						XY.X.shift();
						XY.Y.shift();
						r += n;
						p_write(r[r.length-1],c,i,j);
						p_write(r[r.length-1],c2,i,j);
					} else {
						do {n2=rand();} while(n == n2);
						p_write(n,c,i,j);
						p_write(n2,c2,i,j);
					}
				}
			}
				
			return r;
		}
	},
	{
		t:"On board!",
		f:function(){
			var c = p_addCanvas(1),
			c2 = p_addCanvas(),
			r="",
			yc = nbCasesH/2|0 + nbCasesH%2,
			y = 1+rand(nbCasesH-yc-2), // y from the middle point
			X,n;

			console.log("yc",yc);
			p_lineFold(c,yc);
			p_lineFold(c2,yc);
			p_lineFold(c2,yc+y);
			p_lineFold(c2,yc-y);
			p_write("◉",c2,0,yc+y);
			p_write("◉",c,0,yc-y-1);

			X = randCoor(1);

			for(i=1;i<5;i+=2) {
				n = rand();
				r+= n;
				p_write("△",c2,X[i],yc+y);
				p_write(n,c,X[i],yc-y-1);
			}

			
			c.scale(-1, -1);
			// c2.scale(-1, -1);
			X = randCoor(1);

			for(i=0;i<nbCasesW;i++) {
				for(j=nbCasesH/2|0;j<nbCasesH;j++) p_write(rand(),c,-i-1,-j-1);
			}

			for(i=0;i<5;i+=2) {
				n = rand();
				r+= n;
				p_write("▽",c2,nbCasesW-X[i]-1,yc-y-1);
				p_write(n,c,-nbCasesW + X[i],-yc-y-1);
			}
				
			return r;
		}
	},
	{
		t:"Arrow",
		f:function(){
			var c = p_addCanvas(1),
			c2 = p_addCanvas(1),
			r="",
			h2=nbCasesH/2,
			X,y;

			y = (6 + rand(nbCasesW-nbCasesH-6))/2|0;

			p_fold(c2,0,0,y*2,nbCasesH);
			p_fold(c2,0,nbCasesH,y*2,0);
			p_lineFold(c2,y,1);
			p_lineFold(c2,y*2,1);
			p_write("◉",c2,y*2+nbCasesH,nbCasesH-1);

			do{X = randCoor(1)} while(X[0]<h2);

			for(i=0;i<5;i++) {
				n = rand();
				r+= n;
				p_write("◉",c,X[i]-(h2|0),nbCasesH-1);
				p_write(r[i],c,X[i], y);
			}
				
			return r;
		}
	}
];

function randCoor(xOnly,yOnly,t) {
	// pick 5 ordered random coordinates where put code values
	do {
		t={X:[],Y:[]};
		for(i=0;i<5;i++) {
			t.X.push(rand(nbCasesW));
			t.Y.push(rand(nbCasesH));
		}
		sort(t.X);
		sort(t.Y);
		if(xOnly) t.Y=null;
		if(yOnly) t.X=null;
	} while (testSame(t.X,t.Y));
	return (xOnly)? t.X : (yOnly)? t.Y: t ;
}

function testSame(X,Y){
	// test all the code solutions x,y positions, two number do not have same position
	Y=(Y)? Y: [0,0,0,0,0];
	X=(X)? X: [0,0,0,0,0];
	for(i=0;i<4;i++) {
		if(X[i] == X[i+1] && Y[i] == Y[i+1]) return true;
	}

	return false;
}

console.log("NB PUZZLES",puzzles.length);
nextPuzzle(puzzles.length);
