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

        // this.loadAssets();
        let total = this.assets.length; // アセットの合計数
        let loadCount = 0; // 読み込み完了したアセット数
    
        // すべてのアセットを読み込む
        this.assets.forEach(function(asset) {
            switch (asset.type) {
                  case 'image':
                    let image = new Image();
                      image.src = asset.src;
                      this.images[asset.id] = image;
                break;
            }	
        });
    }
}