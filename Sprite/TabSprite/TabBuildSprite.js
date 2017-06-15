var TabBuildSprite = function(image,x,y,width,height,id){

	this.id = id;

	this.image = image;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
}

// inherits 
inherits(TabBuildSprite, BaseSprite);

//@override
TabBuildSprite.prototype.onClick = function(){
	switch(this.id){
		case ENUM_BUILD.ROAD:
			alert("OK");
			buildRoad(0);
			break;
		case ENUM_BUILD.SETTLEMENT:
			break;
		case ENUM_BUILD.CITY:
			break;
		case ENUM_BUILD.DEVELOPMENT:
			break;
	}
}

TabBuildSprite.prototype.draw = function(){
	ctx.drawImage( this.image , this.x , this.y , this.width , this.height ); 
}
