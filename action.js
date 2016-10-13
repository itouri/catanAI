//アクションのときに使う関数たち

//騎士
function knight(){
	//盗賊を移動
	//相手から1枚奪う
	_action_used = true;
}

//収穫
function plenty(){
	//2回すきな資源を獲得（ただし，資源が枯渇してない)
	_action_used = true;
}

//街道建設
function road(){
	//ただ buildRoadを2回行うだけ
	_action_used = true;
}

//独占
function monopoly(){
	//独占する資源を選択
	//手札に誤差があるプレイヤーは何枚渡したか入力する
		//判別してる資源の枚数＋手札誤差の範囲から選択	
	_action_used = true;
}