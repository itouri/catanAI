function makeImg(resouce_id,resouce_pass,resouce_name=undefined) {
	var img   = document.createElement("img");
	img.id 	  = (resouce_name == undefined) ? resouce_id : resouce_name;
	img.src   = resouce_pass + resouce_id + ".png";
	img.style = "display:none";
	body.appendChild(img);
}

//リソースの読み込み
function domImg(){
	var body = document.getElementById('body');
	//配列のforeachってないの？
	for (var i = 0; i < RESOURCE_NAMES.length; i++) {
		makeImg(RESOURCE_NAMES[i],IMG_PATH+"choose_tile/");
		makeImg(RESOURCE_NAMES[i]+"_tile",IMG_PATH+"tile/");
	}
	makeImg("empty_tile",IMG_PATH+"tile/");


	//harbor読み込み
	for (var i = 0; i < HARBOR_NAMES.length; i++) {
		makeImg(HARBOR_NAMES[i],IMG_PATH+"harbor/","harbor_"+HARBOR_NAMES[i]);
		makeImg(HARBOR_NAMES[i]+"_r",IMG_PATH+"harbor/","harbor_"+HARBOR_NAMES[i]+"_r");
		makeImg(HARBOR_NAMES[i],IMG_PATH+"harbor_panel/","harbor_panel"+HARBOR_NAMES[i]);
	}
	makeImg("empty_harbor"	 ,IMG_PATH+"harbor/","harbor_empty"	);
	makeImg("empty_harbor_r"	 ,IMG_PATH+"harbor/","harbor_empty_r"	);

	//token系の読み込み
	for (var i = 0; i < _token_panel_remains.length; i++) {
		if (_token_panel_remains[i] == -1) continue;
		makeImg(""+i,IMG_PATH + "token/"		,"token"      + i);
		makeImg(""+i,IMG_PATH + "token_panel/"	,"token_panel"+ i);
	}
	makeImg(""+7,IMG_PATH + "token/"	,"token"+ 7);

	//playerパネルの読み込み
	for (var i = 0; i < PLAYER_COLORS.length; i++) {
		makeImg(PLAYER_COLORS[i],IMG_PATH+"player_info/","player_"+PLAYER_COLORS[i]);
		//ENUM_INIT_STATE.PLAYER_COLORで使う
		makeImg(PLAYER_COLORS[i],IMG_PATH+"player_color/","player_color_"+PLAYER_COLORS[i]);
	}
	makeImg("ai",IMG_PATH+"player_info/","player_info_ai");
	//AI
	makeImg("ai",IMG_PATH+"player_color/","player_color_"+"ai");
	//HUM
	makeImg("hum",IMG_PATH+"player_color/","player_color_"+"hum");

	//controllerTabSprite
	for (var i = 0; i < CONTROLLER_TAB_NAMES.length; i++) {
		makeImg(CONTROLLER_TAB_NAMES[i],IMG_PATH+"controller_tab/");
	}

	//tabの中身に使う画像の読み込み
	//dice はtokenを使う
	//action
	//                                      - 1 はポイントの分
	for (var i = 0; i < ACTION_NAMES.length - 1; i++) {
		makeImg(ACTION_NAMES[i],IMG_PATH+"action/","tab_action_"+ACTION_NAMES[i]);
	}

	//build
	for (var i = 0; i < BUILD_NAMES.length; i++) {
		makeImg(BUILD_NAMES[i],IMG_PATH+"build/","tab_build_"+BUILD_NAMES[i]);
	}

	//domestic
	for (var i = 0; i < HARBOR_NAMES.length; i++) {
		makeImg(HARBOR_NAMES[i],IMG_PATH+"domestic_trade/","tab_domestic_"+HARBOR_NAMES[i]);
	}
	makeImg("4_1",IMG_PATH+"domestic_trade/","tab_domestic_"+"4_1");

	//maritime
	for (var i = 0; i < PLAYER_COLORS.length; i++) {
		makeImg(PLAYER_COLORS[i],IMG_PATH+"color_panel/","color_panel_"+PLAYER_COLORS[i]);
	}

	//開拓地
	for (var i = 0; i < PLAYER_COLORS.length; i++) {
		makeImg(PLAYER_COLORS[i],IMG_PATH+"settlement/","settlement_"+PLAYER_COLORS[i]);
	}

	//都市
	for (var i = 0; i < PLAYER_COLORS.length; i++) {
		makeImg(PLAYER_COLORS[i],IMG_PATH+"city/","city_"+PLAYER_COLORS[i]);
	}

	makeImg("check_button",IMG_PATH);
	makeImg("back_button",IMG_PATH);
}