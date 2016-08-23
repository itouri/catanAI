// AI or HUM 												   bool ENUM_PLAYER_COLORS
var ChooseAiOrHumPanelSprite = function(Image,x,y,width,height,isAi,color){
	//??? 親クラスへのメンバ変数の代入はできない?
	//BaseSprite.call = (this,Image,x,y,width,height);
	this.image = Image;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.isAi = isAi;	//bool
	this.color = color;	//ENUM_PLAYER_COLORS
}

// inherits 
inherits(ChooseAiOrHumPanelSprite, BaseSprite);

//すでに同じ色のプレイヤーが登録されてないかチェック		
ChooseAiOrHumPanelSprite.prototype.checkUnique = function(){
	for (var i = 0; i < _players.length; i++) {
		if (_players[i].color == this.color){
			return false;
		}
	}
	return true;
}

ChooseAiOrHumPanelSprite.prototype.draw = function(){
	//すでに登録された_playerの中に同じ色があった場合表示しない
	if (this.checkUnique()) { 
		ctx.drawImage( this.image , this.x , this.y , this.width , this.height ); 
	}
}

//@override
// playerパネルにAIかどうかも含めて画面にセット
ChooseAiOrHumPanelSprite.prototype.onClick = function(){
	if ( _players.length < 4 && this.checkUnique() ){
		var tmp = new Player(_players.length,this.isAi,this.color);
		_players.push(tmp);
	}
	this.draw();
}