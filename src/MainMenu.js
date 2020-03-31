


var MainMenuLayer = cc.Layer.extend({
    configData : null,
   ctor:function () {
        this._super();

       cc.log(this);
        this.loadJsonData();
        this.setupChildren();
   },
    loadJsonData:function () {
       var jsonarray = [
           "res/data.json"
       ];
        cc.loader.load(jsonarray,function (err,result) {
           if (err){
               cc.log(err);
               return;
           } else {
               // cc.log(result[0]);
               var configDataOf = result[0];
               cc.log(configDataOf);
               var itemWidth = cc.winSize.width/2;
               var itemHeight = cc.winSize.height*2 / configDataOf.length;
               for (var i = 0 ;i < configDataOf.length;i++){
                   var node = new cc.Sprite();
                   node.setTextureRect(cc.rect(0,0,itemWidth,itemHeight));



                   // node.setContentSize(itemWidth,itemHeight);
                   node.setColor(Math.floor(i%2)?cc.color(255,255,255):cc.color(0,0,0));
                   cc.log(Math.floor(i%2));
                   cc.log(Math.floor(i/2));
                   this.addChild(node);
                   node.setAnchorPoint(cc.p(0,0));
                   node.setPosition(i%2 * itemWidth,Math.floor(i/2) * itemHeight);

                   var obj = configDataOf[i];
                   var text = new cc.LabelTTF(obj.name,"",32);
                   text.setColor(cc.color(255,255,255));

                   text.setPosition(cc.p(itemWidth/2,itemHeight/2));
                   node.addChild(text);
               }
           }

        }.bind(this));
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