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
	// ダイス処理
		//資源の配分
		//騎士?
		//コントローラーの変更
}

TabActionSprite.prototype.draw = function(){
	ctx.drawImage( this.image , this.x , this.y , this.width , this.height ); 
}
