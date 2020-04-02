

var  MeunSprite = cc.Sprite.extend({

    index : -1,

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


            var color = HYP.config[i].color;
            var labelColor = HYP.config[i].labelColor;

            this.setColor(color);

            this.setAnchorPoint(cc.p(0,0));
            this.setPosition(i%2 * itemWidth,Math.floor(i/2) * itemHeight);

            var obj = HYP.config[this.index];
            var text = new cc.LabelTTF(obj.name,"",50);
            text.setColor(labelColor);

            text.setPosition(cc.p(itemWidth/2,itemHeight/2));
            this.addChild(text);


            cc.eventManager.addListener(this.touchListener(),this);



    },
    touchListener:function(){
        return cc.EventListener.create({
            event:cc.EventListener.TOUCH_ONE_BY_ONE,
            target:this,
            swallowTouches:true,
            onTouchBegan:function(touch,event) {

                var target = event.getCurrentTarget();
                cc.log(target);

                var size = target.getContentSize();

                var itemHeight = size.height / 4;

                var scrollView = new ccui.ScrollView();
                target.addChild(scrollView, target.getLocalZOrder() + 100);
                scrollView.setColor(cc.color(220, 220, 220));
                scrollView.setContentSize(target.getContentSize());
                scrollView.setDirection(ccui.ScrollView.DIR_VERTICAL);
                scrollView.setInnerContainerSize(cc.size(size.width, itemHeight * HYP.config[this.index].items.length));
                scrollView.setInertiaScrollEnabled(true);
                scrollView.setBounceEnabled(true);
                scrollView.setTouchEnabled(true);
                scrollView.setAnchorPoint(cc.p(0.5, 0.5));
                scrollView.setPosition(target.getContentSize().width / 2, target.getContentSize().height / 2);
                scrollView.y = size.height;
                var obj = HYP.config[i].items;
                for (var i = 0; i < obj.length; i++) {
                    var itemObj = obj[i];
                    var textItem = new ccui.Text(itemObj.name, "", 32);
                    scrollView.addChild(textItem);
                    textItem.setAnchorPoint(cc.p(0.5, 0));
                    textItem.setPosition(size.width / 2, itemHeight * i);


                }

                // var action = cc.moveBy(0.24,cc.p(0, -size.height));
                // scrollView.runAction(action.easing(cc.easeSineIn()));

            },
            onTouchEnded:function(touch , event) {

            }

        });
    },



})