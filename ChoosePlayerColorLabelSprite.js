// ただREDとか出しとくだけなので あんまり複雑な処理がいらない
var ChoosePlayerColorLabelSprite = function(Image,x,y,width,height,color){
	//??? 親クラスへのメンバ変数の代入はできない?
	//BaseSprite.call = (this,Image,x,y,width,height);
	this.image = Image;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.color = color;
}

// inherits 
inherits(ChoosePlayerColorLabelSprite, BaseSprite);

//すでに同じ色の順番が登録されてないかチェック		
ChoosePlayerColorLabelSprite.prototype.checkUnique = function(){
	for (var i = 0; i < _init_build_orders.length; i++) {
		if (_init_build_orders[i] == this.color){
			return false;
		}
	}
	return true;
}

ChoosePlayerColorLabelSprite.prototype.draw = function(){
	if (this.checkUnique()) { 
		ctx.drawImage( this.image , this.x , this.y , this.width , this.height ); 
	}
}

ChoosePlayerColorLabelSprite.prototype.onClick = function(){
	if (this.checkUnique()){
		_init_build_orders.push(this.color);
	}
}