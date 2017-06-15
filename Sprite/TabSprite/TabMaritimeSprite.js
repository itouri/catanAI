var TabMaritimeSprite = function(image,x,y,width,height,id){

	this.id = id;

	this.image = image;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
}

// inherits 
inherits(TabMaritimeSprite, BaseSprite);

//@override
TabMaritimeSprite.prototype.onClick = function(){
	// ダイス処理
		//資源の配分
		//騎士?
		//コントローラーの変更

		alert(this.id); //test!!
}

TabMaritimeSprite.prototype.draw = function(){
	ctx.drawImage( this.image , this.x , this.y , this.width , this.height ); 
}
