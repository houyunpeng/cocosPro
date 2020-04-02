var GamePlayerLayer = cc.Layer.extend({
    lines : 4,



    ctor:function () {
        this._super();

        this.loadGamesItems();
    },
    loadGamesItems:function () {
        this.loadBottomBeginItems();
    },
    loadBottomBeginItems:function () {
        for (var i = 0;i < this.lines;i ++){
            var layout = new ccui.Layout();
            layout.setBackGroundColor(cc.color.YELLOW);
            layout.setContentSize(cc.size(cc.winSize.width/this.lines),cc.winSize.height/8);
            this.addChild(layout);
        }


    },

})