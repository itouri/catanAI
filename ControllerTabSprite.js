
var ControllerTabSprite = function(Image,x,y,width,height,id){
	//??? 親クラスへのメンバ変数の代入はできない?
	this.id = id;

	this.image = Image;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
}

// inherits 
inherits(ControllerTabSprite, BaseSprite);

ControllerTabSprite.prototype.draw = function(){
	ctx.drawImage( this.image , this.x , this.y , this.width , this.height );
}

//@override
// _now_choose_resource_panelに選んだ資源をセット
ControllerTabSprite.prototype.onClick = function(){
	_selected_tab = this.id;
}
