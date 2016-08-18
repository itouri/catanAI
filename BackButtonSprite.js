var BackButtonSprite = function(Image,x,y,width,height){
	//??? 親クラスへのメンバ変数の代入はできない?
	//BaseSprite.call = (this,Image,x,y,width,height);
	this.image = Image;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
}

// inherits 
inherits(BackButtonSprite, BaseSprite);

//@override
// _now_choose_resource_panelに選んだ資源をセット
BackButtonSprite.prototype.onClick = function(){

	if (_now_init_state == ENUM_INIT_STATE.PLAYER_COLOR) {
		_players = [];
	}

	if (_now_init_state == ENUM_INIT_STATE.PLAYER_ORDER) {
		_players = [];
		_init_build_orders = [];
	}


	if (_now_init_state != 0) {
		_now_init_state = _now_init_state - 1;
	}
}