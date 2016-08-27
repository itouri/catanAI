var TabActionSprite = function(image,x,y,width,height,id){

	this.id = id;

	this.image = image;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
}

// inherits 
inherits(TabActionSprite, BaseSprite);

//@override
TabActionSprite.prototype.onClick = function(){
		switch(this.id){
			case ENUM_ACTIONS.KNIGHT:
				break;
			case ENUM_ACTIONS.PLENTY:
				break;
			case ENUM_ACTIONS.ROAD:
				break;
			case ENUM_ACTIONS.MONOPOLY:
				break;
		}
}

TabActionSprite.prototype.draw = function(){
	ctx.drawImage( this.image , this.x , this.y , this.width , this.height ); 
}
