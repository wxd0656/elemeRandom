var encode=function(e,a){
	if(e instanceof Array&&null==a&&(a=e[1],e=e[0]),e*=1,a*=1,e!==e)
		throw new Error("Geohash.encode: lat must be a Number");
	if(a!==a)
		throw new Error("Geohash.encode: lng must be a Number");
	for(var i,s,c=e.toString().length-e.toFixed().length-2,l=a.toString().length-e.toFixed().length-2,u=n(10,-t(c,l,0))/2,d=new o,f=[],p=180,h=!0,m=0,g=4;p>=u;)
		if(h?(i=d.halfLng(),a>i?(m|=1<<g,d.minlng=i):d.maxlng=i):(i=d.halfLat(),e>i?(m|=1<<g,d.minlat=i):d.maxlat=i),h=!h,g)
			g--;
		else{
			if(s=p,p=t(d.maxlng-d.minlng,d.maxlat-d.minlat),s===p)
				break;
			f.push(r[m]),g=4,m=0
		}
	return f.join("")
}

function n(e){
	return e.replace(a,function(e,t,n,a){return a?n.toUpperCase():n}).replace(r,"Moz$1")
}

function t(e){
	a.getAll().length>0&&(requestAnimationFrame(t),a.update(e))
};

var res = encode(31.23037,121.473701)
console.log(res)