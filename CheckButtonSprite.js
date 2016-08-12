
var CheckButtonSprite = function(Image,x,y,width,height){
	//??? 親クラスへのメンバ変数の代入はできない?
	//BaseSprite.call = (this,Image,x,y,width,height);
	this.image = Image;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
}

// inherits 
inherits(CheckButtonSprite, BaseSprite);

//@override
// _now_choose_resource_panelに選んだ資源をセット
CheckButtonSprite.prototype.onClick = function(){

	if ( _now_init_state != ENUM_INIT_STATE.END - 1 ) {
		_now_init_state = _now_init_state + 1;
	}
}
