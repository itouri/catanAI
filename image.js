var Asset = {}

// アセットの定義
Asset.assets = [];

// 読み込んだ画像
Asset.images = {};

//アセットをimgタグからImageを作成
function initAssets(){
	//リソース選択パネル
	// for (var i = 0; i < RESOURCE_NAMES.length; i++) {
	// 	var name  = RESOURCE_NAMES[i];
	// 	var src   = "./img/" + RESOURCE_NAMES[i] + ".png";
	// 	Asset.assets.push( { type: 'image', name: name, src: src});
	// }

	//全てのimgタグを取ってきてAssetに格納
	assets = document.getElementsByTagName("img");
	for (var i = assets.length - 1; i >= 0; i--) {
		id = assets[i].getAttribute("id");
		src= assets[i].getAttribute("src");
		Asset.assets.push( { type: 'image', id: id, src: src});
	}

	loadAssets();
}

//Imageを生成してAsset.images{}にpush
function loadAssets(){
	var total = Asset.assets.length; // アセットの合計数
	var loadCount = 0; // 読み込み完了したアセット数

	function onLoad(asset,image){
		Asset.images[asset.id] = image;
	}

	// すべてのアセットを読み込む
  	Asset.assets.forEach(function(asset) {
    	switch (asset.type) {
      		case 'image':
        		var image = new Image();
  				image.src = asset.src;
  				image.onload = onLoad(asset,image);
        	break;
    	}	
  	});
}


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
		makeImg(RESOURCE_NAMES[i],IMG_PATH);
		makeImg(RESOURCE_NAMES[i]+"_tile",IMG_PATH);
	}

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


	makeImg("empty_tile",IMG_PATH);
	makeImg("check_button",IMG_PATH);
	makeImg("back_button",IMG_PATH);
}