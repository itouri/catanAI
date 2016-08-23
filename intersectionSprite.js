var IntersectionSprite = function(width,height,x,y,id){

	var ENUM_BUILDING = {
		NONE : 0,
		SETTLEMENT : 1,
		CITY : 2
	};

	this.id = id;
	this.owner_id = -1;
	this.building = ENUM_BUILDING.NONE; //-1;なし 0:開拓地 1:都市

	this.domestic_trade = -1; //2:1 3:1ができるようになる？

	this.width = width;
	this.height = height;

	this.x = x;
	this.y = y;
}

// inherits 
inherits(IntersectionSprite, BaseSprite);

//@override
IntersectionSprite.prototype.onClick = function(){
	var result = buildSettlement(0,this.id,true);//test!!
}

IntersectionSprite.prototype.init = function(){
	this.owner_id = -1;
	this.building = ENUM_BUILDING.NONE;
}

IntersectionSprite.prototype.draw = function(){
	var image;
	if ( this.owner_id != -1 ) {
		if ( this.building == 1 ) {
			image = Asset.images["settlement_" + PLAYER_COLORS[_players[this.owner_id].color] ];
		} else {
			image = Asset.images["city_" + PLAYER_COLORS[_players[this.owner_id].color] ];
		}
		
		ctx.drawImage( image, this.x, this.y, this.width, this.height); 
	}
}
