var Player = function(id,isAi,color){
	//??? 親クラスへのメンバ変数の代入はできない?
	this.id = id;
	this.isAi = isAi;	//bool
	this.color = color;	//ENUM_PLAYER_COLORS

	this.info = new PlayerInfoSprite(id,isAi,color);

	this.init();
}

Player.prototype.init = function(){

	this.resources = [0,0,0,0,0]; //レンガ,丸太,羊,麦,鉄の枚数
	this.hand = 0; //手札
	this.hand_diff = 0; //盗賊で取ったり取られたりして本来の手札数との差

	this.unuse_action_num = 0; //未発動のアクション枚数
	this.used_actions = [0,0,0,0]; //使用済みのアクション
	this.unuse_actions = [0,0,0,0,0]; // 未使用アクション //AIのみ使用

	this.settlement_num = 0; //開拓地の数
	this.settlements = []; //開拓地

	this.city_num = 0; //都市の数
	this.cities = [];

	this.road_num = 0; //道の数
	this.road_length = 0; //道の長さ
	this.roads = [];

	this.largest_army = false; //最大騎士力
	this.longest_load = false; //ロンゲスト

	this.victory_point = 0; //確定勝利点
}