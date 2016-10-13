// ゲームの管理を担当

//手札を半分にする
function handToHalf(){
	//何を捨てたのか選ぶ
}

//ダイスで7が出た時の処理
function dice7(){
	//手札を半分にする
	handToHalf();

	//アクションの騎士
	knight();
}

//初期建設
function initBuild(){
	//1,2,3,4
	for (var i = 0; i < _init_build_orders.length; i++) {
		buildSettlement(_init_build_orders[i], intersection_id, true);
	}
	//4,3,2,1
	for (var i = _init_build_orders.length - 1; i >= 0; i--) {
		buildSettlement(_init_build_orders[i], intersection_id, true);
	}
}

//次の人へ
function nextTurn(){
	//手番IDを1つ進める
	_turn_player_id++;
	_turn_player_id %= MAX_PLAYER;

	//コントロールタブをサイコロを振る前に戻す	
	_is_before_dice_roll = true;
	//アクションを未使用にする
	_action_used = false;
}