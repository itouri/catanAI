//道，開拓地，都市，発展に関する処理

//全プレイヤーの道の長さを判定してロンゲストを決める
function checkLoadLength(){
	//全プレイヤーの道の長さを判定してroad_lengthに代入	
}

//buildRoadで深さ優先探索を行う 最長の距離を測るのにも使えるかも	
function searchRoad(player_id,settlement_id,checked_places=[]){
	//交差点に接してる辺を調べる
	if (checked_places.indexOf(settlement_id) == -1 ){
		checked_places.push(settlement_id);
		for (var i = 0; i < _adjacents_intersection[settlement_id].length; i++) {
			if ( _edge_sprites[_adjacents_intersection[settlement_id][i]].owner_id == player_id) {
				searchRoad(player_id,_adjacents[settlement_id][i],checked_places);
			} else if(_edge_sprites[_adjacents_intersection[settlement_id][i]].owner_id == -1){
				_able_build_places.push(_adjacents_intersection[settlement_id][i]);
			}
		}
	}
}

function buildRoad(player_id,road_id,initBuild = false){
	//建設可能な場所を探索して表示
	_able_build_places = [];
	//開拓地ごとに可能な配置場所を _able_build_places に追加
	for (var i = 0; i < _players[player_id].settlements.length; i++) {
		searchRoad(player_id,_players[player_id].settlements[i]);
	}

	//都市ごとに可能な配置場所を _able_build_places に追加
	for (var i = 0; i < _players[player_id].cities.length; i++) {
		searchRoad(player_id,_players[player_id].cities[i]);
	}

	//すでに道を15個建てたならスルー そもそもこの関数よぶなし
	if ( _players[player_id].road_num == MAX_ROAD ){
		return false;
	}

	//TODO 初期建設は 今さっき建てた開拓地の隣かつ道がまだないところ	
	if (initBuild) {
		//今さっき建てた道の隣 if (  ) {}
		//まだ道がない if( ) {} 
	}

	//クリックされた交差点が建設可能なら建設
	if ( _able_build_places.indexOf(road_id) >= 0 ) {
		_players[player_id].road_num++;
		_players[player_id].roads.push(road_id);
		_edge_sprites[road_id].owner_id = player_id;
		return true;
	} else {
		alert("そこには道をつくれないよ！");
		return false;
	}
}

//                                 開拓したい場所    初期建設かどうか
function buildSettlement(player_id, intersection_id, initBuild = false){
	//すでに他の建築物が建ってるならスルー
	if ( _intersection_sprites[intersection_id].owner_id != -1) {
		alert("すでに開拓地が建っているよ！");
		return false;
	}

	//test!!
	buildCity(player_id,intersection_id);

	//すでに開拓地を5つ建てたならスルー そもそもこの関数よぶなし
	if ( _players[player_id].settlement_num == MAX_SETTLEMENT ){
		return false;
	}


	//建設可能場所を探索
	//建設可能場所を表示　なかったらreturn
	//建設場所を選択
	
	//隣接した交差点に	建築物が建っててもスルー
	for (var i = 0; i < _adjacents[intersection_id].length; i++) {
		//                          //建てたい交差点に隣接している点たち	
		if ( _intersection_sprites[ _adjacents[ intersection_id ][i] ].owner_id != -1) {
			alert("そこには建てられないよ！");
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
			_players[player_id].settlements.push(intersection_id);
		}
		//2つ目の開拓地だった場合，隣接してるタイルの資源を獲得
		//TODO

		return true;
	} else {
		//隣接した辺に自分の道があるか確認
	}
}

function buildCity(player_id,intersection_id){
	// 建てたい交差点にあるのは自分の建築物 && それは開拓地 && 建ては都市は4つ未満
	if ( _intersection_sprites[intersection_id].owner_id == player_id && 
			_intersection_sprites[intersection_id].building == 1 &&
				_players[player_id].city_num < MAX_CITY) {
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