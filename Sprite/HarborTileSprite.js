var HarborTileSprite = function (Image,x,y,width,height,id,orient) {
	//??? 親クラスへのメンバ変数の代入はできない?
	//BaseSprite.call = (this,Image,x,y,width,height);
	this.image = Image;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;

	this.id = id;

	//画像を上下反転させるか true=反転
	this.orient = orient;

	this.harbor_id = -1;
}

// inherits 
inherits(HarborTileSprite, BaseSprite);

//@override
HarborTileSprite.prototype.onClick = function(){
	if (this.harbor_id != -1) {
		//入っていた資源を空にして残りを増やす
		this.image = (this.orient) ? Asset.images["harbor_empty"] : Asset.images["harbor_empty_r"];
		_harbor_panel_remains[this.harbor_id]++;
		this.harbor_id = -1; 
	//クリックしたタイルが空タイル　かつ　選択中の資源タイルに残りがある
	} else if(_harbor_panel_remains[_now_choose_harbor_panel] > 0) {
		//空タイルに資源を入れて残りを減らす
		var image_name = (this.orient) ? "harbor_"+HARBOR_NAMES[_now_choose_harbor_panel] : "harbor_"+HARBOR_NAMES[_now_choose_harbor_panel]+"_r";
		this.image = Asset.images[image_name];
		this.harbor_id = _now_choose_harbor_panel;
		_harbor_panel_remains[_now_choose_harbor_panel]--;
	}
}

HarborTileSprite.prototype.draw = function(){
	//上下反転　これずっーと反転したままにならない?
	//if (this.orient) ctx.transform(1, 0, 0, -1, 0, this.height);
	ctx.drawImage( this.image , this.x , this.y , this.width , this.height );
}
