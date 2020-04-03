var MenuItemSprite = cc.Sprite.extend({
    index : null,
    itemObjs : null,
    touchBeginPoint:0,
    ctor:function (configObj,index) {
        this._super();
        this.itemObjs = configObj;
        this.index = index;

        this.loadItems();
        this.addListenerEvent();
    },

    addListenerEvent:function(){
      cc.eventManager.addListener({
          event:cc.EventListener.TOUCH_ONE_BY_ONE,
          target:this,
          swallowTouches:true,
          onTouchBegan:this.touchBegan,
          onTouchEnded:this.touchEnded
      },this);
    },

    touchBegan:function(touch,event){
        var target = event.getCurrentTarget();

        var point = target.convertToNodeSpace(touch.getLocation());
        var rect = cc.rect(0,0,target.getContentSize().width,target.getContentSize().height);

        if (!cc.rectContainsPoint(rect,point)){
            cc.log("点击了外面");
            return false;
        }
        cc.log("touched item sprite");
        this.touchBeginPoint = point;
        return true;
    },
    touchEnded:function(touch,event){
        var target = event.getCurrentTarget();

        var point = target.convertToNodeSpace(touch.getLocation());
        cc.log("touched ended item sprite");

        if (Math.abs(point.y - this.touchBeginPoint.y) > HYP.subItemHeight/2 ){
            return true;
        }


        var scene = new cc.Scene();
        var gameLayer = new GamePlayerLayer();
        var num = Math.floor(Math.random() % 4);
        var finalScene = null;
        switch (num) {
            case 0:
                finalScene = new cc.TransitionSlideInL(0.5,scene);
                break;

            case 1:
                finalScene = new cc.TransitionSlideInR(0.5,scene);
                break;
            case 2:
                finalScene = new cc.TransitionSlideInB(0.5,scene);
                break;
            case 3:
                finalScene = new cc.TransitionSlideInT(0.5,scene);
                break;
        };

        cc.director.runScene(finalScene);

    },

    loadConfig:function(){

    },

    loadItems:function () {
        // this.setTextureRect(cc.rect(0,0,size.width,size.height/4/this.itemObjs.length));

        this.setContentSize(cc.rect(0,0,HYP.itemWidth,HYP.subItemHeight));
        var itemObj = this.itemObjs[this.index];
        var textItem = new ccui.Text(itemObj, "", 32);
        // scrollView.addChild(textItem,scrollView.getLocalZOrder()+200);
        textItem.setColor(cc.color.RED);

        textItem.setAnchorPoint(cc.p(0.5, 0.5));
        textItem.setPosition(HYP.itemWidth/2,HYP.subItemHeight/2);

        var layout = new ccui.Layout();
        layout.setContentSize(HYP.itemWidth,HYP.subItemHeight);
        layout.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        layout.setBackGroundColor(this.index % 2 == 0 ?cc.color.BLACK:cc.color.WHITE);
        layout.addChild(textItem);
        layout.setAnchorPoint(cc.p(0.5,0.5));
        layout.setPosition(HYP.itemWidth/2,HYP.subItemHeight/2 );
        this.addChild(layout);
    }

})