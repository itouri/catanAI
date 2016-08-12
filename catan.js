//グローバルにしまーす
var canvas;
var ctx;

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
BaseSprite.prototype.checkClickedCircle = function(clicked_x,clicked_y){
	radius = this.height / 2;
	center_x = this.x + this.width  / 2;
	center_y = this.y + this.height / 2;

	dx = center_x - clicked_x;
	dy = center_y - clicked_y;

	distance = Math.sqrt(dx * dx + dy * dy);

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

// {}じゃなくて []だよ！
var _field_tile_sprites = [];

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
}

// inherits 
inherits(FieldTileSprite, BaseSprite);

//@override
FieldTileSprite.prototype.onClick = function(){
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

var HarborTileSprite = function (Image,x,y,width,height,id,orient) {
	//??? 親クラスへのメンバ変数の代入はできない?
	//BaseSprite.call = (this,Image,x,y,width,height);
	this.image = Image;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;

	this.id = id;

	//画像を上下反転させるか true=反転
	this.orient = orient;

	this.harbor_id = -1;
}

// inherits 
inherits(HarborTileSprite, BaseSprite);

//@override
HarborTileSprite.prototype.onClick = function(){
	if (this.harbor_id != -1) {
		//入っていた資源を空にして残りを増やす
		this.image = Asset.images["harbor_empty"];
		_harbor_panel_remains[this.harbor_id]++;
		this.harbor_id = -1; 
	//クリックしたタイルが空タイル　かつ　選択中の資源タイルに残りがある
	} else if(_harbor_panel_remains[_now_choose_harbor_panel] > 0) {
		//空タイルに資源を入れて残りを減らす
		this.image = Asset.images["harbor_"+HARBOR_NAMES[_now_choose_harbor_panel]];
		this.harbor_id = _now_choose_harbor_panel;
		_harbor_panel_remains[_now_choose_harbor_panel]--;
	}
}

HarborTileSprite.prototype.draw = function(){
	//上下反転　これずっーと反転したままにならない?
	//if (this.orient) ctx.transform(1, 0, 0, -1, 0, this.height);
	ctx.drawImage( this.image , this.x , this.y , this.width , this.height );
}

//
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


//////////////////////////

var CheckButtonSprite = function(Image,x,y,width,height){
	//??? 親クラスへのメンバ変数の代入はできない?
	//BaseSprite.call = (this,Image,x,y,width,height);
	this.image = Image;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
}

// inherits 
inherits(CheckButtonSprite, BaseSprite);

//@override
// _now_choose_resource_panelに選んだ資源をセット
CheckButtonSprite.prototype.onClick = function(){

	if ( _now_init_state != ENUM_INIT_STATE.END - 1 ) {
		_now_init_state = _now_init_state + 1;
	}
}

//////////////////////////

var BackButtonSprite = function(Image,x,y,width,height){
	//??? 親クラスへのメンバ変数の代入はできない?
	//BaseSprite.call = (this,Image,x,y,width,height);
	this.image = Image;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
}

// inherits 
inherits(BackButtonSprite, BaseSprite);

//@override
// _now_choose_resource_panelに選んだ資源をセット
BackButtonSprite.prototype.onClick = function(){

	if (_now_init_state != 0) {
		_now_init_state = _now_init_state - 1;
	}
}

///////////////////////////////////////

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

/////////////////////////

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

//////////////////////////////

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

//////////////////////////////

// マウスイベントを設定
var mouseEvent = function( e ) {
	// 動作を停止
	e.preventDefault() ;

	// マウス位置を取得する
	var x = e.pageX ;	// X座標
	var y = e.pageY ;	// Y座標

	for (var i = 0; i < _field_tile_sprites.length; i++) {
		_field_tile_sprites[i].checkClickedCircle(x,y);
	}
	//ココにクリックされた時の処理を書く

	switch( _now_init_state ){
		case ENUM_INIT_STATE.TILE:
			for (var i = 0; i < _choose_resouce_panels.length; i++) {
				_choose_resouce_panels[i].checkClickedRect(x,y);
			}
			break;

		case ENUM_INIT_STATE.TOKEN:
			for (var i = 0; i < _choose_token_panels.length; i++) {
				_choose_token_panels[i].checkClickedRect(x,y);
			}
			break;

		case ENUM_INIT_STATE.HARBOR:
			//港タイルのクリック判定
			for (var i = 0; i < _field_tile_sprites.length; i++) {
				_harbor_tiles[i].checkClickedCircle(x,y);
			}

			for (var i = 0; i < _choose_harbor_panels.length; i++) {
				_choose_harbor_panels[i].checkClickedRect(x,y);
			}
			break;

		case ENUM_INIT_STATE.PLAYER_COLOR:

			break;

		case ENUM_INIT_STATE.PLAYER_ORDER:
			break;
	}


	_check_button_sprite.checkClickedRect(x,y);
	_back_button_sprite.checkClickedRect(x,y);

	draw();
} ;

var ENUM_INIT_STATE = {
	TILE 	: 0,
	TOKEN 	: 1,
	HARBOR 	: 2,
	PLAYER_COLOR 	: 3, //AIか人かと席順も決める
	PLAYER_ORDER 	: 4, //初期配置の順番を決める
	END : 5 //CheckButtonで使用
};

var IMG_PATH = "./img/"

var ENUM_RESOURCE			= { BRICK:0, LUNBER:1, WOOL:2, GRAIN:3, ORE:4, DESERT:5};
var RESOURCE_NAMES 		    = ["brick" ,"lumber" ,"wool" ,"grain", "ore" ,"desert"];
var _resource_panel_remains = [       3,        4,      4,      4,       3,      1];

var HARBOR_NAMES 		    = ["brick" ,"lumber" ,"wool" ,"grain", "ore" ,"3_1"];
var _harbor_panel_remains= [		  1,		1,		1,		1,		 1,	  5];

var ENUM_PLAYER_COLORS = { RED:0, BLUE:1, ORANGE:2, WHITE:3};
var PLAYER_COLORS 	   = ["red" ,"blue" ,"orange" ,"white" ];

						//   0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12
var _token_panel_remains = [-1,-1, 1, 2, 2, 2, 2,-1, 2, 2, 2, 2, 1];

//test!
var _now_init_state = ENUM_INIT_STATE.HARBOR;

var _now_choose_resouce_panel = ENUM_RESOURCE.BRICK;
var _now_choose_token_panel   = 2;
var _now_choose_harbor_panel  = ENUM_RESOURCE.BRICK;

var _choose_resouce_panels = [];
var _fied_tiles = {};

var _choose_token_panels = [];

// ChooseResoucePanelクラスにしようと思う
var _choose_harbor_panels = [];
var _harbor_tiles = [];

//ただの色の名前のラベル
var _choose_player_color_labels = [];
//AI or HUM 色情報も持っとく
var _choose_ai_hum_panels = [];

// 画面左に出てる情報	
var _player_information_panels = [];

var _check_button_sprite;
var	_back_button_sprite;


var Asset = {}

// アセットの定義
Asset.assets = [];

// 読み込んだ画像
Asset.images = {};

//アセットをimgタグからImageを作成
function initAssets(){
	//リソース選択パネル
	// for (var i = 0; i < RESOURCE_NAMES.length; i++) {
	// 	var name  = RESOURCE_NAMES[i];
	// 	var src   = "./img/" + RESOURCE_NAMES[i] + ".png";
	// 	Asset.assets.push( { type: 'image', name: name, src: src});
	// }

	//全てのimgタグを取ってきてAssetに格納
	assets = document.getElementsByTagName("img");
	for (var i = assets.length - 1; i >= 0; i--) {
		id = assets[i].getAttribute("id");
		src= assets[i].getAttribute("src");
		Asset.assets.push( { type: 'image', id: id, src: src});
	}

	loadAssets();
}

//Imageを生成してAsset.images{}にpush
function loadAssets(){
	var total = Asset.assets.length; // アセットの合計数
	var loadCount = 0; // 読み込み完了したアセット数

	function onLoad(asset,image){
		Asset.images[asset.id] = image;
	}

	// すべてのアセットを読み込む
  	Asset.assets.forEach(function(asset) {
    	switch (asset.type) {
      		case 'image':
        		var image = new Image();
  				image.src = asset.src;
  				image.onload = onLoad(asset,image);
        	break;
    	}	
  	});
}

//FIXME ctx渡さなアカンの?
function draw(){
	//背景描写
	ctx.beginPath();
	ctx.fillStyle = "rgb(200, 200, 255)";
	ctx.fillRect(0, 0, 1280, 720); //FIXME width,height変数にする

	//field_tileの描写
	for (var i = _field_tile_sprites.length - 1; i >= 0; i--) {
		_field_tile_sprites[i].draw();
	}

	//港の三角の枠線を表示
	if (_now_init_state != ENUM_INIT_STATE.HARBOR) {
		for (var i = _harbor_tiles.length - 1; i >= 0; i--) {
			//空っぽのタイルは表示しない
			if (_harbor_tiles[i].harbor_id != -1){
				_harbor_tiles[i].draw();
			}
		}
	}

	switch(_now_init_state){
		case ENUM_INIT_STATE.TILE:
			for (var i = 0; i < _choose_resouce_panels.length; i++) {
				_choose_resouce_panels[i].draw();
			}
		break;

		case ENUM_INIT_STATE.TOKEN:
			for (var i = 0; i < _choose_token_panels.length; i++) {
				if (_choose_token_panels[_token_panel_remains] == -1) continue;
				_choose_token_panels[i].draw();
			}
		break;

		case ENUM_INIT_STATE.HARBOR:
			for (var i = 0; i < _choose_harbor_panels.length; i++) {
				_choose_harbor_panels[i].draw();
			}

			//港の三角の枠線を表示
			for (var i = _harbor_tiles.length - 1; i >= 0; i--) {
				_harbor_tiles[i].draw();
			}
			break;

		case ENUM_INIT_STATE.PLAYER_COLOR:
			for (var i = 0; i < _choose_player_color_labels.length; i++) {
				_choose_player_color_labels.draw();
			}

			// ai or hum
			break;
	}

	_check_button_sprite.draw();
	_back_button_sprite.draw();
}

function initSprites(){
//フィールド配置 //FIXME いくらなんでも汚すぎる
	var rate = 0.25;

	var margin_x = 7;
	var margin_y = 10;


	var width  = 537 * rate;
	var height = 465 * rate;

	var init_x = 680;
	var init_y = 420;

	var empty_tile = Asset.images["empty_tile"];

	var id = 0;
	for (var i = 0; i < 5; i++) {
		var x,y;
		if (i == 0 || i == 4) {
			for (var j =  0 ; j < 3 ; j++) {
				x = init_x + i * (width - margin_x) * 0.75;
				y = init_y - height * j;
				var tmp =  new FieldTileSprite(empty_tile,x,y,width,height,id)
				_field_tile_sprites.push(tmp);
				id++;
			}
		} else if (i == 1 || i == 3) {
			for (var j =  0 ; j < 4 ; j++) {
				x = init_x + i * (width - margin_x) * 0.75;
				y = init_y - height * j + width / 2 - margin_y;
				var tmp =  new FieldTileSprite(empty_tile,x,y,width,height,id)
				_field_tile_sprites.push(tmp);
				id++;
			}
		} else {
			for (var j =  0 ; j < 5 ; j++) {
				x = init_x + i * (width - margin_x) * 0.75;
				y = init_y - height * j + width - margin_y * 2;
				var tmp =  new FieldTileSprite(empty_tile,x,y,width,height,id);
				_field_tile_sprites.push(tmp);
				id++;
			}
		}
	}

//harbor_tileの初期化（まじめんどくせえ）
	var orient = true;

	var margin_x = 7;
	var margin_y = 10;

	var rate = 0.25;
	var width  = 537 * rate / 2;
	var height = 465 * rate / 2;

	var init_x = 680 - width / 2;
	var init_y = 420;

	var harbor_empty = Asset.images["harbor_empty"];

	var x = init_x;
	var y = init_y + height;

	for (var i = 0; i < 30; i++) {
		if (0 <= i && i <= 4) {
			y -= height;
		} else if(5 <= i && i <= 9){
			//最初だけ特別扱い
			if (i % 2 == 0){
				x += width / 2;
			} else {
				x += width;
				y -= height;
			}
		} else if(10 <= i && i <= 14){
			//最初だけ特別扱い
			if (i % 2 == 1){
				x += width / 2;
			} else {
				x += width;
				y += height;
			}
		} else if(15 <= i && i <= 19){
				y += height;
		} else if(20 <= i && i <= 24){
			if (i % 2 == 1){
				x -= width / 2;
			} else {
				x -= width;
				y += height;
			}
		} else if(25 <= i && i <= 29){
			if (i % 2 == 0){
				x -= width / 2;
			} else {
				x -= width;
				y -= height;
			}
		}
		var tmp =  new HarborTileSprite(harbor_empty,x,y,width,height,id,orient)
		//_harbor_tile_sprites.push(tmp);
		_harbor_tiles.push(tmp);

		//trueとfalseを反転
		orient = ~orient;
	}

//資源選択タイルの配置
	//INIT_TILEのリソース選択パネル + 残り配置可能数
	for (var i = 0; i < RESOURCE_NAMES.length; i++) {
		var image = Asset.images[RESOURCE_NAMES[i]];

		var rate = 0.35;
		var width  = 812 * rate;
		var height = 312 * rate;

		var margin = 5;

		var init_xy = 10;
		var x = init_xy;
		var y = init_xy + i * ( height + margin );

		var tmp =  new ChooseResoucePanelSprite(image,x,y,width,height,i);
		_choose_resouce_panels.push(tmp);
	}

//tokenパネルの初期化
	for (var i = 0; i < _token_panel_remains.length; i++) {
		//iが0,1,7などのトークンが存在しないときはスキップ
		if (_token_panel_remains[i] == -1) continue;

		var image = Asset.images["token_panel"+i];

		var rate = 0.45;
		var width  = 502 * rate;
		var height = 260 * rate;

		var margin = 5;

		var init_xy = 10;
		var x = init_xy;
		var y = init_xy + (i - 2) * ( height + margin );
		if ( i > 7 ) {
			x = init_xy + margin + width;
			y = init_xy + (i - 8) * ( height + margin )
		}

		var tmp =  new ChooseTokenPanelSprite(image,x,y,width,height,i);
		_choose_token_panels.push(tmp);
	}

//harborパネルの初期化
	for (var i = 0; i < HARBOR_NAMES.length; i++) {
		var image = Asset.images["harbor_panel"+HARBOR_NAMES[i]];

		var rate = 0.35;
		var width  = 812 * rate;
		var height = 312 * rate;

		var margin = 5;

		var init_xy = 10;
		var x = init_xy;
		var y = init_xy + i * ( height + margin );

		var tmp =  new ChooseHarborPanelSprite(image,x,y,width,height,i);
		_choose_harbor_panels.push(tmp);
	}

//PLAYER_COLORで使うパネルを初期化
	for (var i = 0; i < PLAYER_COLORS.length; i++) {
		var image = Asset.images["player_color_"+PLAYER_COLORS[i]];

		var rate = 0.35;
		var width  = 812 * rate;
		var height = 312 * rate;

		var margin = 5;

		var init_xy = 10;
		var x = init_xy;
		var y = init_xy + i * ( height + margin );

		//var tmp =  new  (image,x,y,width,height,i);
		_choose_player_color_labels .push(tmp);	
	}

//PLAYER_ORDERで使うパネルを初期化

//ネクストボタンの初期化
//バックボタンの初期化
	var x = 1220;
	var y = 0;

	var rate = 0.1;
	var width = height = 567 * rate;

	var tmp = new CheckButtonSprite(Asset.images["check_button"],x,y,width,height);
	_check_button_sprite = tmp;

	var tmp = new BackButtonSprite(Asset.images["back_button"],x-width,y,width,height);
	_back_button_sprite = tmp;
}

function init(){
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');

	//imgタグからImageを作成しAsset.images{}にpush
	initAssets();

	initSprites();

	draw();

	// イベントの設定
	document.body.addEventListener( "click", mouseEvent ) ;
	//document.body.addEventListener( "mousemove", mouseEvent ) ;

	// while(true){
	// 	BaseSprite.checkClickedRect(200);
	// }

}


function makeImg(resouce_id,resouce_pass,resouce_name=undefined) {
	var img   = document.createElement("img");
	img.id 	  = (resouce_name == undefined) ? resouce_id : resouce_name;
	img.src   = resouce_pass + resouce_id + ".png";
	img.style = "display:none";
	body.appendChild(img);
}

//リソースの読み込み
function domImg(){
	var body = document.getElementById('body');
	//配列のforeachってないの？
	for (var i = 0; i < RESOURCE_NAMES.length; i++) {
		makeImg(RESOURCE_NAMES[i],IMG_PATH);
		makeImg(RESOURCE_NAMES[i]+"_tile",IMG_PATH);
	}

	//harbor読み込み
	for (var i = 0; i < HARBOR_NAMES.length; i++) {
		makeImg(HARBOR_NAMES[i],IMG_PATH+"harbor/","harbor_"+HARBOR_NAMES[i]);
		makeImg(HARBOR_NAMES[i],IMG_PATH+"harbor_panel/","harbor_panel"+HARBOR_NAMES[i]);
	}
	makeImg("empty_harbor"	 ,IMG_PATH+"harbor/","harbor_empty"	);

	//token系の読み込み
	for (var i = 0; i < _token_panel_remains.length; i++) {
		if (_token_panel_remains[i] == -1) continue;
		makeImg(""+i,IMG_PATH + "token/"		,"token"      + i);
		makeImg(""+i,IMG_PATH + "token_panel/"	,"token_panel"+ i);
	}

	//playerパネルの読み込み
	for (var i = 0; i < PLAYER_COLORS.length; i++) {
		makeImg(PLAYER_COLORS[i],IMG_PATH+"player_panel/","player_"+PLAYER_COLORS[i]);
		//ENUM_INIT_STATE.PLAYER_COLORで使う
		makeImg(PLAYER_COLORS[i],IMG_PATH+"player_color/","player_color_"+PLAYER_COLORS[i]);
	}
	//AI
	makeImg("ai",IMG_PATH+"player_color/","player_color_"+"ai");
	//HUM
	makeImg("hum",IMG_PATH+"player_color/","player_color_"+"hum");


	makeImg("empty_tile",IMG_PATH);
	makeImg("check_button",IMG_PATH);
	makeImg("back_button",IMG_PATH);
}