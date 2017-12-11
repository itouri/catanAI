// ゲームの管理を担当

//手札を半分にする
function handToHalf(){
	//何を捨てたのか選ぶ
}

//ダイスで7が出た時の処理
function dice7(){
	//手札を半分にする
	handToHalf();

	//騎士
	knight(false);
}

//出た目に応じて資源を配る
function dice(dice){
	//7なら配る資源はない
	if (dice == 7) {
		dice7();
		return;
	}

	//出た目と同じトークンを持つタイルを探す
	for (var i = 0; i < _field_tile_sprites.length; i++) {
		if ( _field_tile_sprites[i].token == dice ) {
			console.log("f:"+_field_tile_sprites[i].id);
			//見つけたら隣接してる交差点を見る
			for (var j = 0; j < _adjacents_tiles[i].length; j++) {
				console.log(_intersection_sprites[_adjacents_tiles[i][j]].id);
				if (_intersection_sprites[_adjacents_tiles[i][j]].owner_id != -1) {
					intersection = _intersection_sprites[_adjacents_tiles[i][j]];
					//開拓地
					if ( intersection.building == 1 ) {
						//開拓地の所有者の         タイルの資源と同じ資源をプラス1	
						_players[intersection.owner_id].resources[_field_tile_sprites[i].resouce]++;
						alert("owner_id: "+intersection.owner_id+"\nresource: "+_field_tile_sprites[i].resouce);
					//都市
					} else {
						_players[intersection.owner_id].resources[_field_tile_sprites[i].resouce] += 2;
					}
				}
			}
		}
	}

}

//初期建設で使う
var _now_init_build_turn = 0;
var _now_init_build_type = ENUM_BUILD.SETTLEMENT;

//初期建設
function initBuild(clicked_id){
	//0,1,2,3,3,2,1,0
	now = (_now_init_build_turn < MAX_PLAYER) ?  _now_init_build_turn : 7 - _now_init_build_turn 

	for (var i = 0; i < _init_build_orders.length; i++) {
		//XXX　わけわからん　なぜ this.colorなんて使ってるんだ?
		if ( _players[i].color == _init_build_orders[now]){

			switch( _now_init_build_type ){
				case ENUM_BUILD.SETTLEMENT:
					if ( buildSettlement(_players[i].id, clicked_id, true) ) {
						_now_init_build_type = ENUM_BUILD.ROAD;
						searchRoad( _players[i].color, clicked_id);
						return;
					}	
				break;

				case ENUM_BUILD.ROAD:
					if ( buildRoad(_players[i].id, clicked_id) ) {
						_now_init_build_type = ENUM_BUILD.SETTLEMENT;
						_now_init_build_turn++;
					}
				break;
			}
		}
	}

	if ( _now_init_build_turn == MAX_PLAYER * 2 ) {
		_now_init_state++;
	}
}

//次の人へ
function nextTurn(){
	//手番IDを1つ進める
	_turn_player_id++;
	_turn_player_id %= MAX_PLAYER;

	// ターンが変わったらサイコロ画面にする
	_selected_tab = ENUM_CONTROLLER_TAB.DICE;

	alert(_init_build_orders[0]);
	alert(_turn_player_id);

	//コントロールタブをサイコロを振る前に戻す	
	_is_before_dice_roll = true;
	//アクションを未使用にする
	_action_used = false;
}