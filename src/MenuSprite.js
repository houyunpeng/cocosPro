

var MenuSprite = cc.Sprite.extend({

    index : 0,
    scrollView:null,

    ctor:function (index) {
        this._super();
        this.index = index;
        this.loadSubSprites();

        return true;
    },

    loadSubSprites:function () {
        var itemWidth = cc.winSize.width/2;
        var itemHeight = cc.winSize.height*2 / HYP.config.length;
            // var node = new cc.Sprite();
            this.setTextureRect(cc.rect(0,0,itemWidth,itemHeight));


            var color = HYP.config[this.index].color;
            var labelColor = HYP.config[this.index].labelColor;

            this.setColor(color);

            this.setAnchorPoint(cc.p(0,0));
            this.setPosition(this.index%2 * itemWidth,Math.floor(this.index/2) * itemHeight);

            var obj = HYP.config[this.index];
            var text = new cc.LabelTTF(obj.name,"a",50);
            text.setColor(labelColor);

            text.setPosition(cc.p(itemWidth/2,itemHeight/2));
            this.addChild(text);


            cc.eventManager.addListener( {
                event : cc.EventListener.TOUCH_ONE_BY_ONE,
                target : this,
                swallowTouches:true,
                onTouchBegan:this.touchBegan,
                onTouchMoved:this.touchMoved,
                onTouchCancelled:this.touchCanceled,
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



        cc.log(target);
        target.loadSubitems();
        return  true;
    },
    touchEnded:function(touch,event){

    },
    touchMoved:function(touch,event){

    },
    touchCanceled:function(touch,event){

    },




    loadSubitems:function () {
        var size = this.getContentSize();
        var items = HYP.config[this.index].items;
        var itemHeight = HYP.subItemHeight;

        var scrollView = new ccui.ScrollView();
        this.addChild(scrollView, this.getLocalZOrder() + 100);
        scrollView.setColor(cc.color.GRAY);
        scrollView.setContentSize(this.getContentSize());
        scrollView.setDirection(ccui.ScrollView.DIR_VERTICAL);

        var interlHeight = HYP.subItemHeight * items.length;

        scrollView.setInnerContainerSize(cc.size(size.width, interlHeight));
        scrollView.setInertiaScrollEnabled(true);
        scrollView.setBounceEnabled(true);
        scrollView.setTouchEnabled(true);

        // scrollView.setPosition(size.width / 2, size.height / 2);
        scrollView.y = 0;
        var obj = HYP.config[this.index].items;
        for (var i = 0; i < obj.length; i++) {
            var itemSprite = new MenuItemSprite(obj,i);
            scrollView.addChild(itemSprite);
            itemSprite.setAnchorPoint(cc.p(0.5,0));
            itemSprite.setPosition(cc.p(size.width/2,i*itemHeight));

        }
        scrollView.scrollToBottom(0.24,true);
        this.scrollView = scrollView;
    }



})