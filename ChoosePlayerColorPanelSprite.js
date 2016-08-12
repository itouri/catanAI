// ただREDとか出しとくだけなので あんまり複雑な処理がいらない
var ChoosePlayerColorPanelSprite = function(Image,x,y,width,height){
	//??? 親クラスへのメンバ変数の代入はできない?
	//BaseSprite.call = (this,Image,x,y,width,height);
	this.image = Image;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
}

// inherits 
inherits(ChoosePlayerColorPanelSprite, BaseSprite);

ChoosePlayerColorPanelSprite.prototype.draw = function(){
	ctx.drawImage( this.image , this.x , this.y , this.width , this.height );
}