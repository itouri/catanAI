import {BaseSprite} from './BaseSprite';

class EdgeSprite extends BaseSprite {
    private owner_id: number;
    private angle: number; // 0:- 1:/ 2:\ 

    constructor(x:number, y:number, width:number, height:number, id:number, owner_id:number, angle:number) {
        super(x,y,width,height,id);
        this.owner_id = owner_id;
        this.angle =angle;
    }

    // @override
    public onClick() {
        if (_now_init_state == ENUM_INIT_STATE.BUILD) {
            initBuild(this.id);
        }
    }

    // @override
    public draw2(candidate:boolean) {
        let image;
        if (candidate) {
            image = Asset.images["token7"];
            ctx.drawImage( image, this.x, this.y, this.width, this.height); 
        } else {
            if ( this.owner_id != -1 ) {
                image = Asset.images["token12"];
                ctx.drawImage( image, this.x, this.y, this.width, this.height); 
            }
        }
    }
}