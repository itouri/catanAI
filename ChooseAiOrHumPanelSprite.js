// AI or HUM 												   bool String
var ChooseAiOrHumPanelSprite = function(Image,x,y,width,height,isAi,color){
	//??? 親クラスへのメンバ変数の代入はできない?
	//BaseSprite.call = (this,Image,x,y,width,height);
	this.image = Image;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.isAi = isAi;	//bool
	this.color = color;	//string
}

// inherits 
inherits(ChooseAiOrHumPanelSprite, BaseSprite);

ChooseAiOrHumPanelSprite.prototype.draw = function(){
	ctx.drawImage( this.image , this.x , this.y , this.width , this.height );
}

//@override
// playerパネルにAIかどうかも含めて画面にセット
ChooseAiOrHumPanelSprite.prototype.onClick = function(){
	//_player_information_panels.push();

}