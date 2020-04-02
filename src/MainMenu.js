


var MainMenuLayer = cc.Layer.extend({
    configData : null,
   ctor:function () {
        this._super();

       cc.log(this);
       // this.loadScrollTest();
        this.loadJsonData();
        this.setupChildren();
        // this.loadDebug();
   },

    loadScrollTest:function(){

        var  size = cc.winSize;
        var scrollView = new ccui.ScrollView();
        this.addChild(scrollView);
        scrollView.setColor(cc.color(220,220,220));
        scrollView.setContentSize(size);
        scrollView.setDirection(ccui.ScrollView.DIR_VERTICAL);
        scrollView.setInnerContainerSize(cc.size(size.width,size.height/3 * 8));
        scrollView.setInertiaScrollEnabled(true);
        scrollView.setBounceEnabled(true);
        scrollView.setTouchEnabled(true);
        scrollView.setAnchorPoint(cc.p(0.5,0.5));
        scrollView.setPosition(size.width/2,size.height/2);

        for (var i = 0;i < 10;i ++){
            // var itemObj = obj[i];
            var textItem = new ccui.Text("testats","",50);
            scrollView.addChild(textItem);
            textItem.setColor(cc.color.WHITE);
            textItem.setAnchorPoint(cc.p(0.5,0.5));
            textItem.setPosition(size.width/2,80*i);
            // var imageView = new ccui.ImageView(res.HelloWorld_png);
            // scrollView.addChild(imageView);
            // imageView.setPosition(cc.p(size.width/2,size.height/2));

        }


    },


    loadDebug:function(){
        var node = new cc.PhysicsDebugNode(this.space);
        this.addChild(node,Number.MAX_VALUE);
    },
    loadJsonData:function () {

        this.configData = HYP.config;
        for(var i= 0 ; i < this.configData.length; i ++ ){
            var itemObj = this.configData[i];
            var sprite = new MenuSprite(i);
            this.addChild(sprite);
        }

    },



    setupChildren:function () {


    }

});


var MainMenuScene = cc.Scene.extend({
   ctor:function () {
        this._super();

   },
    onEnter:function () {
        this._super();
        this.addChild(new MainMenuLayer());
    }
});