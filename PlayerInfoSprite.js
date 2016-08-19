//
var PlayerInfoSprite = function(id,isAi,color){
	//BaseSprite.call = (this,Image,x,y,width,height);
	this.isAi = isAi;
	this.color = color;
	this.id = id;

	//drawの座標設定
	this.image = Asset.images["player_" + color];
	this.ai_image = Asset.images["player_info_ai"];
}

// inherits 
inherits(PlayerInfoSprite, BaseSprite);

PlayerInfoSprite.prototype.draw = function(){
	var rate = 0.38;
	width = 816 * rate;
	height = 312 * rate;

	var margin = 10 * rate;
	x = 10;
	y = 10 + this.id * (height + margin);

	ctx.drawImage( this.image , x , y , width , height );
	if(this.isAi){
		var ai_rate = 0.15;
		ai_width = 312 * ai_rate;
		ai_height = 312 * ai_rate;

		ai_x = x - ai_width * 0.09;
		ai_y = y + (height - ai_height) / 2;
		ctx.drawImage( this.ai_image , ai_x , ai_y , ai_width , ai_height );
	}

	//自分の初期建設の順番を表示
	if (_now_init_state == ENUM_INIT_STATE.PLAYER_ORDER) {
		var order = -1;
		for (var i = 0; i < _init_build_orders.length; i++) {
			if (PLAYER_COLORS[ _init_build_orders[i] ] == this.color){
				order = i;
			}
		}

		//TODO 固定値が多いので改善すべし
		ctx.fillStyle = "black";
		ctx.font = "60px 'ＭＳ Ｐゴシック'";
		if(order != -1) ctx.fillText(order+1,width + x -45,height + y - 5);
	}
}

//@override
PlayerInfoSprite.prototype.onClick = function(){
	//clickしても多分何も起こらない
}