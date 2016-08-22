//道，開拓地，都市，発展に関する処理

function buildRoad(player_id){

}

//                                 開拓したい場所    初期建設かどうか
function buildSttlement(player_id, intersection_id, initBuild = false){
	//すでに他の建築物が建ってるならスルー
	if ( _intersection_sprites[intersection_id].owner_id == -1 ) {
		return false;
	}
	
	//隣接した交差点に	建築物が建っててもスルー
	for (var i = 0; i < _adjacents[intersection_id].length; i++) {
		//                          //建てたい交差点に隣接している点たち	
		if ( _intersection_sprites[ _adjacents[ intersection_id ][i] ].owner_id != -1) {
			return false;
		}		  
	}

	//TODO 隣接した辺に自分の道があるなら建設

}

function buildCity(player_id,intersection_id){
	// 建てたい交差点にあるのは自分の建築物 && それは開拓地 && 建ては都市は4つ未満
	if ( _intersection_sprites[intersection_id].owner_id == player_id && 
			_intersection_sprites[intersection_id].building == 1 &&
				_player[player_id].city_num < 4) {
		//都市数追加
		_player[player_id].city_num++;
		_player[player_id].settlement_num--;
		//都市追加
		_player[player_id].cities.push(intersection_id);
		_player[player_id].settlements.remove(intersection_id); //TODO あってる？

		return true;
	}
	return false;
}

function development(player_id){
	//AIならなんのアクションを引いたかを入力
	if ( _player[player_id].isAi ) {

	//人なら未使用アクションを１枚追加
	} else {
		_player[player_id].unuse_action_num++;
	}
}