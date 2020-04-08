
var TouchState = {};

TouchState.CanTouch = 0;
TouchState.Disable = 2;
TouchState.CannotTouch = 1;
TouchState.Static = 3;



var GameItem = cc.Sprite.extend({

    touchState:null,
    callBack:null,

    ctor:function () {
        this._super();

        this.addListener();

    },

    setCallback:function (callback) {
        this.callBack = callback;
    },

    setTouchState:function (state) {
        this.touchState = state;

        cc.log(this.touchState);
        switch (state) {
            case TouchState.CanTouch:

                this.setColor(cc.color.BLACK);

                cc.log("print 1")

                break;
            case TouchState.Disable:

                this.setColor(cc.color.GRAY);
                cc.log("print 2")
                break;

            case TouchState.CannotTouch:
                this.setColor(cc.color.WHITE);

                cc.log("print 3")
                break;
            case TouchState.Static:
                this.setColor(cc.color.YELLOW);
                cc.log("print 4")
                break;

            default :
                this.setColor(cc.color.YELLOW);
                cc.log("print 5")
                break;
        }

    },

    addListener:function () {
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

        if (target.callBack && typeof(target.callBack) === "function"){
            target.callBack();
        }




        return true;
    },
    touchEnded:function(touch,event){
        var target = event.getCurrentTarget();



    },



    
})