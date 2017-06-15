
var ChooseTokenPanelSprite = function(Image,x,y,width,height,token_id){
	//??? 親クラスへのメンバ変数の代入はできない?
	//BaseSprite.call = (this,Image,x,y,width,height);
	this.image = Image;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.token_id = token_id;
}

// inherits 
inherits(ChooseTokenPanelSprite, BaseSprite);

ChooseTokenPanelSprite.prototype.draw = function(){
	ctx.drawImage( this.image , this.x , this.y , this.width , this.height );

	ctx.fillStyle = "black";
	ctx.font = "80px 'ＭＳ Ｐゴシック'";
	ctx.fillText(_token_panel_remains[this.token_id],this.x+140,this.y + 85);
}

//@override
// _now_choose_resource_panelに選んだ資源をセット
ChooseTokenPanelSprite.prototype.onClick = function(){
	_now_choose_token_panel = this.token_id;
}