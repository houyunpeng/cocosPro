


var MainMenuLayer = cc.Layer.extend({
    configData : null,
   ctor:function () {
        this._super();

       cc.log(this);
       this.loadScrollTest();
        // this.loadJsonData();
        // this.setupChildren();
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

        var itemWidth = cc.winSize.width/2;
        var itemHeight = cc.winSize.height*2 / this.configData.length;
        for (var i = 0 ;i < this.configData.length;i++){
            var node = new cc.Sprite();
            node.setTextureRect(cc.rect(0,0,itemWidth,itemHeight));

            node.data = this.configData[i].items;
            var color = this.configData[i].color;
            var labelColor = this.configData[i].labelColor;

            // node.setContentSize(itemWidth,itemHeight);
            node.setColor(color);

            this.addChild(node);
            node.setAnchorPoint(cc.p(0,0));
            node.setPosition(i%2 * itemWidth,Math.floor(i/2) * itemHeight);

            var obj = this.configData[i];
            var text = new cc.LabelTTF(obj.name,"",50);
            text.setColor(labelColor);

            text.setPosition(cc.p(itemWidth/2,itemHeight/2));
            node.addChild(text);


            // cc.eventManager.addListener(this.touchListener(),node);


        }
    },

    touchListener:function(){
        return cc.EventListener.create({
            event:cc.EventListener.TOUCH_ONE_BY_ONE,
            target:this,
            swallowTouches:true,
            onTouchBegan:function(touch,event){

                var target = event.getCurrentTarget();
                cc.log(target);
                var size = target.getContentSize();
                var scrollView = new ccui.ScrollView();
                target.addChild(scrollView);
                scrollView.setColor(cc.color(220,220,220));
                scrollView.setContentSize(target.getContentSize());
                scrollView.setDirection(ccui.ScrollView.DIR_VERTICAL);
                scrollView.setInnerContainerSize(cc.size(size.width,size.height/3 * this.configData.items.length));
                scrollView.setInertiaScrollEnabled(true);
                scrollView.setBounceEnabled(true);
                scrollView.setTouchEnabled(true);
                scrollView.setAnchorPoint(cc.p(0.5,0.5));
                scrollView.setPosition(target.getContentSize().width/2,target.getContentSize().height/2);
                scrollView.y = size.height;
                var obj = target.data;
                for (var i = 0;i < obj.length;i ++){
                    var itemObj = obj[i];
                    var textItem = new cc.LabelTTF(itemObj.name,"",32);
                    scrollView.addChild(textItem);
                    textItem.setAnchorPoint(cc.p(0.5,0));
                    textItem.setPosition(size.width/2,40*i);


                }

                var action = cc.moveBy(0.24,cc.p(0, -size.height));
                scrollView.runAction(action.easing(cc.easeSineIn()));

            },
            onTouchEnded:function(touch , event) {

            }

        });
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