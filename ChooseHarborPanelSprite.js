
//
var ChooseHarborPanelSprite = function(Image,x,y,width,height,harbor_id){
	//??? 親クラスへのメンバ変数の代入はできない?
	//BaseSprite.call = (this,Image,x,y,width,height);
	this.image = Image;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.harbor_id = harbor_id;
}

// inherits 
inherits(ChooseHarborPanelSprite, BaseSprite);

ChooseHarborPanelSprite.prototype.draw = function(){
	ctx.drawImage( this.image , this.x , this.y , this.width , this.height );

	ctx.fillStyle = "black";
	ctx.font = "80px 'ＭＳ Ｐゴシック'";
	ctx.fillText(_harbor_panel_remains[this.harbor_id],205,this.y + 73 + this.x);
}

//@override
// _now_choose_resource_panelに選んだ資源をセット
ChooseHarborPanelSprite.prototype.onClick = function(){
	_now_choose_harbor_panel = this.harbor_id;
}

