//グローバルにしまーす
var canvas;
var ctx;

// {}じゃなくて []だよ！
var _field_tile_sprites = [];

//test!
var _now_init_state = ENUM_INIT_STATE.PLAYER_COLOR;

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

var _players = [];
var _player_info_sprites = [];

// 初期建設の順番 要素にはcolorが入る(int)	
var _init_build_orders = [];

var _check_button_sprite;
var	_back_button_sprite;

var _intersection_sprites = [];
var _edge_sprites = [];

var _selected_tab = ENUM_CONTROLLER_TAB.DICE;

//controller tabの配列たち
var _tab_dice_sprites = [];
var _tab_action_sprites = [];
var _tab_build_sprites = [];
var _tab_domestic_sprites = [];
var _tab_maritime_sprites = [];

//サイコロを振るのタブ "サイコロ","アクション"	
var _tab_before_dice_rolls = [];

//サイコロを振ったあとのタブ "建設","貿易","交渉","アクション"
var _tab_after_dice_rolls = [];

var _show_controller = false;

//ターンに関する変数
var _is_before_dice_roll = true;
var _action_used = false; //そのターン中アクションを使っている

//現在の手番のID
var _turn_player_id;

var _able_build_places = [];

// マウスイベントを設定
var mouseEvent = function( e ) {
	// 動作を停止
	e.preventDefault() ;

	draw();

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
			for (var i = 0; i < _harbor_tiles.length; i++) {
				_harbor_tiles[i].checkClickedCircle(x,y);
			}

			for (var i = 0; i < _choose_harbor_panels.length; i++) {
				_choose_harbor_panels[i].checkClickedRect(x,y);
			}
			break;

		case ENUM_INIT_STATE.PLAYER_COLOR:
			for (var i = 0; i < _choose_ai_hum_panels.length; i++) {
				_choose_ai_hum_panels[i].checkClickedRect(x,y);
			}
			break;

		case ENUM_INIT_STATE.PLAYER_ORDER:
			for (var i = 0; i < _choose_player_color_labels.length; i++) {
				_choose_player_color_labels[i].checkClickedRect(x,y);
			}
			break;

		case ENUM_INIT_STATE.BUILD:
			//交差点
			for (var i = 0; i < _intersection_sprites.length; i++) {
				_intersection_sprites[i].checkClickedCircle(x,y,true,0.75);
				skip = true;
			}
			//道
			for (var i = 0; i < _edge_sprites.length; i++) {
				_edge_sprites[i].checkClickedCircle(x,y,true,0.75);
				//return;
			}
		break;
	}


	if (_show_controller) {
		switch(_selected_tab){
			case ENUM_CONTROLLER_TAB.DICE:
				for (var i = 0; i < _tab_dice_sprites.length; i++) {
					_tab_dice_sprites[i].checkClickedCircle(x,y);
				}
				break;
			case ENUM_CONTROLLER_TAB.ACTION:
				for (var i = 0; i < _tab_action_sprites.length; i++) {
					_tab_action_sprites[i].checkClickedRect(x,y);
				}
				break;
			case ENUM_CONTROLLER_TAB.BUILD:
				for (var i = 0; i < _tab_build_sprites.length; i++) {
					_tab_build_sprites[i].checkClickedRect(x,y);
				}
				break;
			case ENUM_CONTROLLER_TAB.DOMESTIC:
				for (var i = 0; i < _tab_domestic_sprites.length; i++) {
					_tab_domestic_sprites[i].checkClickedRect(x,y);
				}
				break;
			case ENUM_CONTROLLER_TAB.MARITIME:
				for (var i = 0; i < _tab_maritime_sprites.length; i++) {
					_tab_maritime_sprites[i].checkClickedRect(x,y);
				}
				break;
		}
		if (_is_before_dice_roll) {
			for (var i = 0; i < _tab_before_dice_rolls.length; i++) {
				_tab_before_dice_rolls[i].checkClickedRect(x,y);
			}
		} else {
			for (var i = 0; i < _tab_after_dice_rolls.length; i++) {
				_tab_after_dice_rolls[i].checkClickedRect(x,y);
			}
		}
	}


	_check_button_sprite.checkClickedRect(x,y);
	_back_button_sprite.checkClickedRect(x,y);

	//draw();
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

	for (var i = 0; i < _players.length; i++) {
		_players[i].info.draw();
	}

	if ( _show_controller ) {
		// 背景描写
		ctx.beginPath();
		ctx.fillStyle = "rgb(160, 160, 255)";
		ctx.fillRect(10, 545, 615, 170); //FIXME width,height変数にする

		//サイコロを振る前
		if ( _is_before_dice_roll ) {
			for (var i = 0; i < _tab_before_dice_rolls.length; i++) {
				_tab_before_dice_rolls[i].draw();
			}
		//サイコロを振った後
		} else {
			for (var i = 0; i < _tab_after_dice_rolls.length; i++) {
				_tab_after_dice_rolls[i].draw();
			}
		}

		switch( _selected_tab ){
			case ENUM_CONTROLLER_TAB.DICE:
				for (var i = 0; i < _tab_dice_sprites.length; i++) {
					_tab_dice_sprites[i].draw();
				}
				break;
			case ENUM_CONTROLLER_TAB.ACTION:
				for (var i = 0; i < _tab_action_sprites.length; i++) {
					_tab_action_sprites[i].draw();
				}
				break;
			case ENUM_CONTROLLER_TAB.BUILD:
				for (var i = 0; i < _tab_build_sprites.length; i++) {
					_tab_build_sprites[i].draw();
				}
				break;
			case ENUM_CONTROLLER_TAB.DOMESTIC:
				for (var i = 0; i < _tab_domestic_sprites.length; i++) {
					_tab_domestic_sprites[i].draw();
				}
				break;
			case ENUM_CONTROLLER_TAB.MARITIME:
				for (var i = 0; i < _tab_maritime_sprites.length; i++) {
					//TODO ターンのプレイヤーの色は表示しない	
					_tab_maritime_sprites[i].draw();
				}
				break;
		}
	}

	//test!!
	if ( _now_init_state > ENUM_INIT_STATE.PLAYER_COLOR ){
		for (var i = 0; i < _intersection_sprites.length; i++) {
			_intersection_sprites[i].draw();
		}
	}

	for (var i = 0; i < _able_build_places.length; i++) {
		_edge_sprites[_able_build_places[i]].draw(true);
	}

	for (var i = 0; i < _edge_sprites.length; i++) {
		_edge_sprites[i].draw();
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
				_choose_player_color_labels[i].draw();
			}

			// ai or hum
			for (var i = 0; i < _choose_ai_hum_panels.length; i++) {
				_choose_ai_hum_panels[i].draw();
			}
			break;

		case ENUM_INIT_STATE.PLAYER_ORDER:
			for (var i = 0; i < _choose_player_color_labels.length; i++) {
				_choose_player_color_labels[i].draw();
			}
			break;
	}

	//初期建設中は次へは非表示
	if ( _now_init_state != ENUM_INIT_STATE.BUILD ) {
		_check_button_sprite.draw();
	}
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
//交差点の初期化
	var init_x = 680;
	var init_y = 420 - height * 1.5;
	var id = 0;
	var x = init_x;
	var y = init_y;
	var x2,y2;
	var width = width - 5;
	var s_width = 40;
	var s_height = 40;
	var vertex = [3,4,5,5,4,3];
	for (var i = 0; i < vertex.length; i++) {
		if ( i < 3 ) {
			for (var j = 0; j < vertex[i]; j++) {
				x = init_x + width * i * 3/4;
				y = init_y + j * height - i * height/2;
				var tmp =  new IntersectionSprite(s_width,s_height,x-s_width/2,y-s_height/2,id++);
				_intersection_sprites.push(tmp);
			}
			for (var j = 0; j < vertex[i]+1; j++) {
				x2 = x + width * 1/4;
				y2 = y - ( 1/2 + vertex[i] - 1 ) * height + j * height;
				var tmp =  new IntersectionSprite(s_width,s_height,x2-s_width/2,y2-s_height/2,id++);
				_intersection_sprites.push(tmp);
			}
		} else {
			var init_x2 = x2 + 1/2 * width;
			var init_y2 = y2 - height * 5;
			for (var j = 0; j < vertex[i]+1; j++) {
				x3 = init_x2 + width * (i-3) * 3/4;
				y3 = init_y2 + j * height + (i-3) * height / 2;
				var tmp =  new IntersectionSprite(s_width,s_height,x3-s_width/2,y3-s_height/2,id++);
				_intersection_sprites.push(tmp);
			}
			for (var j = 0; j < vertex[i]; j++) {
				x = x3 + width * 1/4;
				y = - vertex[i] * height + (y3 + 1/2 * height) + j * height;
				var tmp =  new IntersectionSprite(s_width,s_height,x-s_width/2,y-s_height/2,id++);
				_intersection_sprites.push(tmp);
			}
		}
	}

//辺の初期化
	var init_x = 680 + width / 8;
	var init_y = 420 - height * 7/4;
	var id = 0;
	var width = width + 2;
	//var vertex = [3,4,5,6,5,4,3];
	var vertex = [3,4,5,5,4,3];


	for (var i = 0; i < vertex.length; i++) {
		if ( i < 3 ) {
			// angle 0:- 1:/ 2:\ 
			for (var j = 0; j < vertex[i]; j++) {
				x = init_x + 1/2 + width * i * 3/4;
				y = init_y + height * j - height * i * 1/2;
				var tmp =  new EdgeSprite(s_width,s_height,x-s_width/2,y-s_height/2,id++,1);
				_edge_sprites.push(tmp);
				y = y + height * 1/2;
				var tmp =  new EdgeSprite(s_width,s_height,x-s_width/2,y-s_height/2,id++,2);
				_edge_sprites.push(tmp);
			}
			for (var j = 0; j < vertex[i]+1; j++) {
				x2 = x + width * 1/3;
				y2 = y + height * ( j - vertex[i] + 1/4);
				var tmp =  new EdgeSprite(s_width,s_height,x2-s_width/2,y2-s_height/2,id++,0);
				_edge_sprites.push(tmp);
			}
		} else {
			for (var j = 0; j < vertex[i]; j++) {
				x = init_x + 1/2 + width * i * 3/4;
				y = init_y + height * j + height * (i%3-1) * 1/2 - height * 1/2;
				var tmp =  new EdgeSprite(s_width,s_height,x-s_width/2,y-s_height/2,id++,2);
				_edge_sprites.push(tmp);
				y = y + height * 1/2;
				var tmp =  new EdgeSprite(s_width,s_height,x-s_width/2,y-s_height/2,id++,1);
				_edge_sprites.push(tmp);
				y = y - height * 1/2
			}
			if(vertex[i] == 3) continue;
			for (var j = 0; j < vertex[i]; j++) {
				x2 = x + width * 1/3;
				y2 = y + height * ( j - vertex[i] + 1 + 1/4);
				var tmp =  new EdgeSprite(s_width,s_height,x2-s_width/2,y2-s_height/2,id++,0);
				_edge_sprites.push(tmp);
			}
		}
	}

//harbor_tileの初期化（まじめんどくせえ）
	var orient = false;

	var margin_x = 7;
	var margin_y = 10;

	var rate = 0.25;
	var adjust = 3.2
	var width  = 537 * rate / 2 - adjust;
	var height = 465 * rate / 2 ;

	var init_x = 680 - width / 2 + adjust;
	var init_y = 420;

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
		var harbor_empty = (orient) ? Asset.images["harbor_empty"] : Asset.images["harbor_empty_r"] ;
		var tmp =  new HarborTileSprite(harbor_empty,x,y,width,height,id,orient)
		//_harbor_tile_sprites.push(tmp);
		_harbor_tiles.push(tmp);

		//trueとfalseを反転
		orient = !orient;
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
	var ai_image = Asset.images["player_color_ai"];
	var hum_image = Asset.images["player_color_hum"];

	for (var i = 0; i < PLAYER_COLORS.length; i++) {
		var image = Asset.images["player_color_"+PLAYER_COLORS[i]];

		var rate = 0.25;
		var width  = 812 * rate;
		var height = 312 * rate;

		var margin = 5;

		var init_x = 650;
		var init_y = 200;

		var x = init_x;
		var y = init_y + i * ( height + margin );

		var ai_hum_width  = width * 2/3;
		var ai_hum_height = height;

		var ai_x = x + width + width * 0.05;
		var hum_x = ai_x + ai_hum_width + width * 0.05;

		var tmp =  new ChoosePlayerColorLabelSprite(image,x,y,width,height,i);
		_choose_player_color_labels.push(tmp);

		var tmpAi  = new ChooseAiOrHumPanelSprite(ai_image , ai_x , y, ai_hum_width, ai_hum_height, true ,i);
		var tmpHum = new ChooseAiOrHumPanelSprite(hum_image, hum_x, y, ai_hum_width, ai_hum_height, false,i);
		_choose_ai_hum_panels.push(tmpAi);
		_choose_ai_hum_panels.push(tmpHum);

	}

//PLAYER_ORDERで使うパネルを初期化

//ネクストボタン,バックボタンの初期化
	var x = 1220;
	var y = 0;

	var rate = 0.1;
	var width = height = 567 * rate;

	var tmp = new CheckButtonSprite(Asset.images["check_button"],x,y,width,height);
	_check_button_sprite = tmp;

	var tmp = new BackButtonSprite(Asset.images["back_button"],x-width,y,width,height);
	_back_button_sprite = tmp;

// 交差点の初期化
	for (var i = 0; i < 54; i++) {
		var tmp = new IntersectionSprite(x,y,width,height,i);
		_intersection_sprites.push(tmp);
	}

//コントローラーの初期化
	var init_x = 10;
	var init_y = 510;

	var rate = 1 / 3;
	var width = 270 * rate;
	var height = 90 * rate;

	var margin = 5;

	// サイコロを振る前のタブ
	var dice = new ControllerTabSprite(Asset.images["dice"],init_x,init_y,width,height,ENUM_CONTROLLER_TAB.DICE);
	var action = new ControllerTabSprite(Asset.images["action"],init_x+width+margin,init_y,width,height,ENUM_CONTROLLER_TAB.ACTION);
	_tab_before_dice_rolls.push(dice);
	_tab_before_dice_rolls.push(action);

	// サイコロを振った前のタブ
	var build    = new ControllerTabSprite(Asset.images["build"]		 ,init_x 				 ,init_y,width,height,ENUM_CONTROLLER_TAB.BUILD);
	var domestic = new ControllerTabSprite(Asset.images["domestic_trade"],init_x+(width+margin)  ,init_y,width,height,ENUM_CONTROLLER_TAB.DOMESTIC);
	var maritime = new ControllerTabSprite(Asset.images["maritime_trade"],init_x+(width+margin)*2,init_y,width,height,ENUM_CONTROLLER_TAB.MARITIME);
	var action2  = new ControllerTabSprite(Asset.images["action"]		 ,init_x+(width+margin)*3,init_y,width,height,ENUM_CONTROLLER_TAB.ACTION);
	_tab_after_dice_rolls.push(build);
	_tab_after_dice_rolls.push(domestic);
	_tab_after_dice_rolls.push(maritime);
	_tab_after_dice_rolls.push(action2);

//tab の内容の初期化
	var init_x = 10;
	var init_y = 545;

	var init_margin_xy = 20;

	// dice
	var margin = 10;
	var width = 60;
	var height = 60;
	for (var i = 2; i <= 12; i++) {
		var image = Asset.images["token"+i];
		var x = init_x + init_margin_xy + (width + margin) * ( (i - 2) % 6);
		var y = init_y + init_margin_xy;
		if (i > 7) y = y + height + margin;

		if (i == 7) {
			var x = init_x + init_margin_xy + (width + margin) * (7 - 2 + 0.5);
			var y = init_y + init_margin_xy + (height + margin) / 2;
		}

		var tmp = new TabDiceSprite(image,x,y,width,height,i);
		_tab_dice_sprites.push(tmp);
	}

	// action & build & maritime レイアウト同じだから一度にやってしまおう
	var margin = 30;
	var width = 80;
	var height = 120;
	//                                      point
	for (var i = 0; i < ACTION_NAMES.length - 1; i++) {

		var image  = Asset.images["tab_action_"+ACTION_NAMES[i]];
		var image2 = Asset.images["tab_build_"+BUILD_NAMES[i]];
		var image3 = Asset.images["color_panel_"+PLAYER_COLORS[i]];

		var x = init_x + init_margin_xy + (width + margin) * i;
		var y = init_y + init_margin_xy;

		var tmp  = new TabActionSprite(image,x,y,width,height,i);
		var tmp2 = new TabBuildSprite(image2,x,y,width,height,i);
		var tmp3 = new TabMaritimeSprite(image3,x,y,width,height,i);

		_tab_action_sprites.push(tmp);
		_tab_build_sprites.push(tmp2);
		_tab_maritime_sprites.push(tmp3);
	}

	// domestic
	var x,y;
	var margin = 10;
	var rate = 8 / 30;
	var width = 300 * rate;
	var height = 240 * rate;
	for (var i = 1; i < 6 ; i++) {
		var image  = Asset.images["tab_domestic_"+HARBOR_NAMES[i-1]];
		x = init_x + init_margin_xy + (width + margin) * (i % 3);
		y = init_y + init_margin_xy;
		if (i > 2) y = y + (height + margin);

		var tmp = new TabDomesticSprite(image,x,y,width,height,i-1);
		_tab_domestic_sprites.push(tmp);
	}
	y = init_y + init_margin_xy;
	width = 300 * (height * 2 + margin) / 420;
	height = height * 2 + margin;
	var image  = Asset.images["tab_domestic_3_1"];
	var image2 = Asset.images["tab_domestic_4_1"];
	var tmp = new TabDomesticSprite(image  ,x+margin+width     ,y,width,height,5);
	var tmp2 = new TabDomesticSprite(image2,x+(margin*2+width)*2 ,y,width,height,6);
	_tab_domestic_sprites.push(tmp);
	_tab_domestic_sprites.push(tmp2);

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