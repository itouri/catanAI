class Asset {
    // アセットの定義
    public assets;
    // 読み込んだ画像
    public images;

    constructor(){
        // 現状なし
    }

    public init() {

    }

    //アセットをimgタグからImageを作成
    private initAssets() {
        //全てのimgタグを取ってきてAssetに格納
        let assets = document.getElementsByTagName("img");
        for (let i = assets.length - 1; i >= 0; i--) {
            let id = assets[i].getAttribute("id");
            let src= assets[i].getAttribute("src");
            this.assets.push( { type: 'image', id: id, src: src});
        }

        loadAssets();
    }

    private loadAssets() {
        let total = this.assets.length; // アセットの合計数
        let loadCount = 0; // 読み込み完了したアセット数
    
        function onLoad(asset,image){
            this.images[asset.id] = image;
        }
    
        // すべてのアセットを読み込む
        this.assets.forEach(function(asset) {
            switch (asset.type) {
                  case 'image':
                    let image = new Image();
                      image.src = asset.src;
                      image.onload = onLoad(asset,image);
                break;
            }	
        });
    }

    private makeImg(res_id:number, res_path:string, res_name:string=undefined) {
        let img   = document.createElement("img");
        img.id 	  = (res_name == undefined) ? res_id : res_name;
        img.src   = res_path + res_id + ".png";
        img.style = "display:none";

        let body = document.getElementById('body');
        body.appendChild(img);
    }

    //リソースの読み込み
    private domImg() {
        array.forEach(element => {
            
        });
    }
}