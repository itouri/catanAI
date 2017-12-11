//spriteのベースクラス
//コンストラクタ なぜvarをつけてはいけない?
BaseSprite = function(){
	this.image = Image;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.id = id;
}

//クリック箇所が画像の中心からradius以内かどうか調べる
BaseSprite.prototype.checkClickedCircle = function(clicked_x,clicked_y, is=false, rate=1.0){
	radius = (this.height / 2) * rate;
	center_x = this.x + this.width  / 2;
	center_y = this.y + this.height / 2;

	dx = center_x - clicked_x;
	dy = center_y - clicked_y;

	distance = Math.sqrt(dx * dx + dy * dy);

	if ( is ) {
		ctx.beginPath();
		ctx.arc(center_x, center_y, radius, 0, Math.PI*2, false);
		ctx.stroke();
	}

	if ( distance < radius ) {
		this.onClick();
	}
}

BaseSprite.prototype.checkClickedRect = function(clicked_x,clicked_y){
	if (    this.x < clicked_x && clicked_x < this.x + this.width) {
		if (this.y < clicked_y && clicked_y < this.y + this.height) {
			this.onClick();
		}
	}
}

BaseSprite.prototype.draw = function(){
	ctx.drawImage( this.image , this.x , this.y , this.width , this.height );
}

//継承するために必要な関数らしい
var inherits = function(childCtor, parentCtor) {
  // 子クラスの prototype のプロトタイプとして 親クラスの
  // prototype を指定することで継承が実現される
  Object.setPrototypeOf(childCtor.prototype, parentCtor.prototype);
};