


var GameState = {};

GameState.Ready = 0;
GameState.Playing = 1;
GameState.Ended = 2;


var GamePlayerLayer = cc.Layer.extend({
    lines : 4,
    layer:null,

    rows: Number.MAX_SAFE_INTEGER,
    size :null,



    ctor:function (rows,lines) {
        this._super();

        this.rows = rows;
        this.lines = lines;
        this.loadConfig();

        this.loadSublayer();

        // this.loadGamesItems();
        this.loadBottomBeginItems();

        return true;
    },
    loadConfig:function(){
        this.size = cc.size(cc.winSize.width/this.lines,cc.winSize.height/6);
    },

    loadSublayer:function(){
        this.layer = new cc.Layer();
        this.addChild(this.layer);
        this.layer.setPosition(0,0);
        this.layer.setColor(cc.color.GRAY);
        this.layer.setAnchorPoint(0,0);
    },
    loadGamesItems:function () {

    },
    loadBottomBeginItems:function () {
        cc.log("lines =" + this.lines);

        var size = this.size;
        for (var row = 0; row<this.rows; row++){

            var rand = Math.floor(Math.random()*this.lines);

            for (var line = 0;line < this.lines;line ++){



                var node = new GameItem();

                node.setCallback(this.callBackFunc);
                node.setTextureRect(cc.rect(0,0,size.width,size.height));
                this.layer.addChild(node);

                node.setPosition(cc.winSize.width/this.lines*line + line,row*size.height+row);
                node.setAnchorPoint(0,0);





                cc.log("row="+row);
                if (row === 0){
                    node.setTouchState(TouchState.Static);
                    cc.log("touch static");
                } else {

                    if (rand === line){
                        node.setTouchState(TouchState.CanTouch);
                    } else {
                        node.setTouchState(TouchState.CannotTouch);
                    }


                    cc.log("rand = "+rand);

                }



            }
        }


    },

    callBackFunc:function () {
        cc.log(this);

        var self = this.parent.parent;
        var position = self.layer.getPosition();
        position.y -= self.size.height;
        position.y -= 1;
        self.layer.setPosition(position);

    }

})