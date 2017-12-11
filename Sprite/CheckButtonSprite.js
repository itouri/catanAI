
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

	switch( _now_init_state ){
		// 港の初期化が終わったら交差点に貿易情報をセット	
		case ENUM_INIT_STATE.HARBOR:
			// 空じゃない港タイルを探索
			for (var i = 0; i < _harbor_tiles.length; i++) {
				if ( _harbor_tiles[i].harbor_id != -1 ) {
					// 港タイルに接してる交差点に貿易情報をセットする
					for (var j = 0; j < _adjacents_harbar[i].length; j++) {
						//                     港iにj番目に隣接してる交差点	
						_intersection_sprites[ _adjacents_harbar[i][j] ].domestic_trade = _harbor_tiles[i].harbor_id;
					}
				}
			}
		break;

		case ENUM_INIT_STATE.PLAYER_COLOR:
			// nextTurnで最初に1追加からゲームスタートなので最初から1引いておく
			_turn_player_id = _players[0].id - 1;
			_show_controller = true;
		break;

		// TODO BUILDの間は CheckButtonSpriteは消されてしまうので、このcaseが呼ばれない
		case ENUM_INIT_STATE.BUILD:
			alert("?");
		break;


		// 初期化のあとなら次のターンへ
		case ENUM_INIT_STATE.END:
			nextTurn();
		break;
	}

	if ( _now_init_state != ENUM_INIT_STATE.END ) {
		_now_init_state = _now_init_state + 1;
	}
}
