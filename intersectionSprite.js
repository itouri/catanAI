var IntersectionSprite = function(x,y,width,height,id){

	var ENUM_BUILDING = {
		NONE : 0,
		STTLEMENT : 1,
		CITY : 2
	};

	this.id = id;
	this.owner_id = -1;
	this.building = ENUM_BUILDING.NONE; //-1;なし 0:開拓地 1:都市

	this.domestic_trade = -1; //2:1 3:1ができるようになる？

	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
}

// inherits 
inherits(IntersectionSprite, BaseSprite);

//@override
IntersectionSprite.prototype.onClick = function(){

}

IntersectionSprite.prototype.init = function(){
	this.owner_id = -1;
	this.building = ENUM_BUILDING.NONE;
}

IntersectionSprite.prototype.draw = function(){
	var image = Asset.images["token"+2];
	ctx.drawImage( image , this.x , this.y , this.width , this.height ); 
}
