var im = require('gm')
    , path = require('path')
    , fs = require('fs')
    , async = require('async')
    , strformat = require('strformat')
    , config = require("./config");


var maker = function(options){
    this.options = options;
    if(!fs.existsSync(this.options.originIcon)){
        throw new Error(strformat('找不到原始icon[{0}]', this.options.originIcon));
        return;
    };

    //预读取，不用每次都读io
    this.srcData = fs.readFileSync(this.options.originIcon, 'binary');
    this.run();
}

maker.prototype.run = function(){
    var list = [];
    var self = this;
    config.images.forEach(function(item){
        list.push(function(done){
            self.resize(item, done);
        });
    });

    //console.log(list);
    //完成后的处理
    async.series(list, function(){
        //保存Contents.json文件
        var content = JSON.stringify(config, null, 4);
        var jsonFile = path.join(self.options.output, 'Contents.json');
        fs.writeFile(jsonFile, content, function(err) {
            if(err) {
                console.log(err);
            } else {
                console.log("创建Content.json");
                console.log("Done!");
            }
        });
    });
}

//重置大小
maker.prototype.resize = function(item, done){
    var dstPath = path.join(this.options.output, item.filename);
    var size = item.size.replace(/(\d+).+/, "$1");
    if(item.scale == '2x') size = size * 2;


    im(this.options.originIcon)
	.resize(size, size)
	.quality(1)
	.setFormat('png')
	.write(dstPath, function(err) {
            console.log(strformat('{0}创建完成', item.filename));
	    console.log(err);
            if (err) throw err;
            done();
	});
};

exports.make = function(options){
    new maker(options);
}
