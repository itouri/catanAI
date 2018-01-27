export class BaseSprite {
    // private image: ???
    protected x: number;
    protected y: number;
    protected width: number;
    protected height: number;
    protected id: number;

    constructor(x:number, y:number, width:number, height:number, id:number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.id = id;
    }

    // TODO isって何？
    public checkClickCircle(cx:number, cy:number, is:boolean, rate:number) {
        let radius = (this.height / 2) * rate;
        let center_x = this.x + this.width  / 2;
        let center_y = this.y + this.height / 2;
    
        let dx = center_x - cx;
        let dy = center_y - cy;
    
        let distance = Math.sqrt(dx * dx + dy * dy);
    
        if ( is ) {
            ctx.beginPath();
            ctx.arc(center_x, center_y, radius, 0, Math.PI*2, false);
            ctx.stroke();
        }
    
        if ( distance < radius ) {
            this.onClick();
        }
    }

    public checkClickRect(cx:number, cy:number) {
        if ( this.x < cx && this.x < this.width ) {
            if ( this.y < cy && this.y < this.height ) {
                this.onClick();
            }

        }
    }

    public draw() {
        ctx.drawImage( this.image , this.x , this.y , this.width , this.height );
    }

    public onClick() {}
}