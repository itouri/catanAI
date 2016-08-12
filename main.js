//グローバルにしまーす
var canvas;
var ctx;

// {}じゃなくて []だよ！
var _field_tile_sprites = [];

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