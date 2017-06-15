var EdgeSprite = function(width,height,x,y,id,angle){

	this.id = id;
	this.owner_id = -1;

	this.width = width;
	this.height = height;

	this.x = x;
	this.y = y;

	this.angle = angle; // 0:- 1:/ 2:\ 
}

// inherits 
inherits(EdgeSprite, BaseSprite);

//@override
EdgeSprite.prototype.onClick = function(){
	if (_now_init_state == ENUM_INIT_STATE.BUILD) {
		initBuild(this.id);
	}
}

EdgeSprite.prototype.init = function(){
	this.owner_id = -1;
}

EdgeSprite.prototype.draw = function(candidate=false){
	var image;
	if (candidate) {
		image = Asset.images["token7"];
		ctx.drawImage( image, this.x, this.y, this.width, this.height); 
	} else {
		if ( this.owner_id != -1 ) {
			image = Asset.images["token12"];
			ctx.drawImage( image, this.x, this.y, this.width, this.height); 
		}
	}
}
