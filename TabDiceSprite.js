var TabDiceSprite = function(image,x,y,width,height,token){

	this.token = token;

	this.image = image;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
}

// inherits 
inherits(TabDiceSprite, BaseSprite);

//@override
TabDiceSprite.prototype.onClick = function(){
	// ダイス処理
		//資源の配分
		//騎士?
		//コントローラーの変更
		_is_before_dice_roll = false;
		_selected_tab = ENUM_CONTROLLER_TAB.BUILD;
}

TabDiceSprite.prototype.draw = function(){
	ctx.drawImage( this.image , this.x , this.y , this.width , this.height ); 
}
