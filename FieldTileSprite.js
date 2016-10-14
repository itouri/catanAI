//フィールドタイルのスプライト //子クラスにはvarが必要らしい
var FieldTileSprite = function (Image,x,y,width,height,id) {
	//??? 親クラスへのメンバ変数の代入はできない?
	//BaseSprite.call = (this,Image,x,y,width,height);
	this.image = Image;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.id = id;

	this.resouce = -1;
	this.token = -1;

	//このタイルに接している交差点
	this.contain_intersections = _adjacents_tiles[id];
}

// inherits 
inherits(FieldTileSprite, BaseSprite);

//@override
FieldTileSprite.prototype.onClick = function(){
	console.log(this.id);
	switch (_now_init_state){
		case ENUM_INIT_STATE.TILE:
			//クリックしたタイルに資源が入っていたら空タイルにする
			if (this.resouce != -1) {
				//入っていた資源を空にして残りを増やす
				this.image = Asset.images["empty_tile"];
				_resource_panel_remains[this.resouce]++;
				this.resouce = -1; 
			//クリックしたタイルが空タイル　かつ　選択中の資源タイルに残りがある
			} else if(_resource_panel_remains[_now_choose_resouce_panel] > 0) {
				//空タイルに資源を入れて残りを減らす
				this.image = Asset.images[RESOURCE_NAMES[_now_choose_resouce_panel] + "_tile"];
				this.resouce = _now_choose_resouce_panel;
				_resource_panel_remains[_now_choose_resouce_panel]--;
			}
		break;
		//tokenでも同じことをやる
		case ENUM_INIT_STATE.TOKEN:
			if (this.token != -1){
				_token_panel_remains[this.token]++;
				this.token = -1;
			} else if(_token_panel_remains[_now_choose_token_panel] > 0 && this.resouce != ENUM_RESOURCE.DESERT){
				this.token = _now_choose_token_panel;
				_token_panel_remains[_now_choose_token_panel]--;
			}
		break;
		default:
			//イベントハンドラのほうで弾いて
		break;	
	}
}

FieldTileSprite.prototype.draw = function(){
	//資源タイル
	ctx.drawImage( this.image , this.x , this.y , this.width , this.height );

	//token
	if (this.token != -1) {
		var rate = 0.3
		var width  = 270 * rate; //token画像のサイズ
		var height = 270 * rate;
		var image = Asset.images["token"+this.token];
		var x = this.x + (this.width - width) / 2;
		var y = this.y + (this.height - height) / 2;
		ctx.drawImage( image , x , y , width , height );
	}
}
