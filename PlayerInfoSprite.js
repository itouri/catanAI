//
var PlayerInfoSprite = function(id,isAi,color){
	//BaseSprite.call = (this,Image,x,y,width,height);
	this.isAi = isAi;
	this.color = color;
	this.id = id;

	//drawの座標設定
	this.image = Asset.images["player_" + PLAYER_COLORS[color]];
	this.ai_image = Asset.images["player_info_ai"];
}

// inherits 
inherits(PlayerInfoSprite, BaseSprite);

PlayerInfoSprite.prototype.draw = function(){
	var rate = 0.38;
	width = 816 * rate;
	height = 312 * rate;

	var margin = 10 * rate;
	x = 10;
	y = 10 + this.id * (height + margin);

	ctx.drawImage( this.image , x , y , width , height );
	if(this.isAi){
		var ai_rate = 0.15;
		ai_width = 312 * ai_rate;
		ai_height = 312 * ai_rate;

		ai_x = x - ai_width * 0.09;
		ai_y = y + (height - ai_height) / 2;
		ctx.drawImage( this.ai_image , ai_x , ai_y , ai_width , ai_height );
	}

	//自分の初期建設の順番を表示
	if (_now_init_state == ENUM_INIT_STATE.PLAYER_ORDER) {
		var order = -1;
		for (var i = 0; i < _init_build_orders.length; i++) {
			if (_init_build_orders[i] == this.color){
				order = i;
			}
		}

		//TODO 固定値が多いので改善すべし
		ctx.fillStyle = "black";
		ctx.font = "60px 'ＭＳ Ｐゴシック'";
		if(order != -1) ctx.fillText(order+1,width + x -45,height + y - 5);
	}

	//プレイヤーの情報を表示
	ctx.fillStyle = "white";
	ctx.font = "25px 'ＭＳ Ｐゴシック'";

	var high_y = y + height * 0.45; //上段のy座標
	var low_y  = y + height * 0.89; //下段のy座標

	var player = _players[this.id];

	if( player.road_length != 0) 	  ctx.fillText( player.road_length,x + width * (0.203),high_y); //橋のながさ
	if( player.unuse_action_num != 0) ctx.fillText( player.unuse_action_num, x + width * (0.204 + 0.1),high_y); //未使用チャンス枚数

	//使用済みアクション
	for (var i = 0; i < player.used_actions.length; i++) {
		if (player.used_actions[i] != 0) {
			ctx.fillText( player.used_actions[i], x + width * (0.44 + i * 0.1), high_y ); 
		}
	}

	//資源
	for (var i = 0; i < player.resources.length; i++) {
		if(player.resources[i] != 0){
			//２ケタになると枠からはみ出るので，16進数表示（16枚以上になったらはみ出すけどないよね．．．）	
			ctx.fillText( player.resources[i].toString(16), x + width * (0.21 + i * 0.106),low_y); 
		}
	}

	if( player.hand_diff != 0) ctx.fillText( player.hand_diff, x + width * 0.718,low_y-width*0.026);  //手札誤差

	//ctx.fillText( player.longest_load, width + x -45,height + y - 5); //ロンゲスト
	//ctx.fillText( player.largest_army, width + x -45,height + y - 5); //ラージスト

	ctx.fillStyle = "black";
	ctx.font = "60px 'ＭＳ Ｐゴシック'";
	if( player.victory_point != 0) ctx.fillText( player.victory_point ,width + x -45,height + y - 5); //勝利点
}

//@override
PlayerInfoSprite.prototype.onClick = function(){
	//clickしても多分何も起こらない
}