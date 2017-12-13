class Asset {
    // 読み込んだ画像
    public images: {key?: string;} = {}; // 連想配列の定義

    //アセットをimgタグからImageを作成
    private init() {
        //全てのimgタグを取ってきてAssetに格納
        let htmlImgElements = document.getElementsByTagName("img");
        let assets;
        htmlImgElements.forEach(img => {
            let id = img.getAttribute("id");
            let src= img.getAttribute("src");
            assets.push( { type: 'image', id: id, src: src});
        });

        // すべてのアセットを読み込む
        assets.forEach(asset => {
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