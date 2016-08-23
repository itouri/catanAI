//道，開拓地，都市，発展に関する処理

function buildRoad(player_id){

}

//                                 開拓したい場所    初期建設かどうか
function buildSettlement(player_id, intersection_id, initBuild = false){
	//すでに他の建築物が建ってるならスルー
	//test!!
	// if ( _intersection_sprites[intersection_id].owner_id != -1) {
	// 	return false;
	// }

	//test!!
	buildCity(player_id,intersection_id);

	//すでに開拓地を5つ建てたならスルー
	if ( _players[player_id].settlement_num == 5 ){
		return false;
	}
	
	//隣接した交差点に	建築物が建っててもスルー
	for (var i = 0; i < _adjacents[intersection_id].length; i++) {
		//                          //建てたい交差点に隣接している点たち	
		if ( _intersection_sprites[ _adjacents[ intersection_id ][i] ].owner_id != -1) {
			return false;
		}		  
	}

	//TODO 隣接した辺に自分の道があるなら建設 でも初期建設のときは無視
	if( initBuild ){
		_intersection_sprites[intersection_id].owner_id = player_id;
		//test!!
		if(_intersection_sprites[intersection_id].building != 2){
			_intersection_sprites[intersection_id].building = 1;
			_players[player_id].settlement_num++;
		}
		return true;
	} else {
		//隣接した辺に自分の道があるか確認
	}
}

function buildCity(player_id,intersection_id){
	// 建てたい交差点にあるのは自分の建築物 && それは開拓地 && 建ては都市は4つ未満
	if ( _intersection_sprites[intersection_id].owner_id == player_id && 
			_intersection_sprites[intersection_id].building == 1 &&
				_players[player_id].city_num < 4) {
		//都市数追加
		_players[player_id].city_num++;
		_players[player_id].settlement_num--;
		//都市追加
		_players[player_id].cities.push(intersection_id);
		var index = _players[player_id].settlements.indexOf(intersection_id);
		_players[player_id].settlements.splice(index); //TODO あってる？

		_intersection_sprites[intersection_id].building = 2;

		return true;
	}

	return false;
}

function development(player_id){
	//AIならなんのアクションを引いたかを入力
	if ( _players[player_id].isAi ) {

	//人なら未使用アクションを１枚追加
	} else {
		_players[player_id].unuse_action_num++;
	}
}