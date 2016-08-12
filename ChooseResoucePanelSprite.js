
var ChooseResoucePanelSprite = function(Image,x,y,width,height,resource_id){
	//??? 親クラスへのメンバ変数の代入はできない?
	//BaseSprite.call = (this,Image,x,y,width,height);
	this.image = Image;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.resource_id = resource_id;
}

// inherits 
inherits(ChooseResoucePanelSprite, BaseSprite);

ChooseResoucePanelSprite.prototype.draw = function(){
	ctx.drawImage( this.image , this.x , this.y , this.width , this.height );

	ctx.fillStyle = "black";
	ctx.font = "80px 'ＭＳ Ｐゴシック'";
	ctx.fillText(_resource_panel_remains[this.resource_id],205,this.y + 73 + this.x);
}

//@override
// _now_choose_resource_panelに選んだ資源をセット
ChooseResoucePanelSprite.prototype.onClick = function(){
	_now_choose_resouce_panel = this.resource_id;
}
