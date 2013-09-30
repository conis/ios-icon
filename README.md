ios-icon
========

根据一张1024X1024的图片，自动生成iOS的需要的icon，并自动创建Contents.json，支持命令行调用。
这是一个自用项目，起因是我每次做icon都要保存为不同的规格，icon如果有调整又要生成全部生成。想到Photosho的动作或者脚本又没找到，node.js也有类似的库，但我没有发现支持Xcode5的。
所以，我希望有一个工具，能根据1024的icon，自动创建所有规格的icon，并规范命名，同时生成Contents.json文件。
既然没有，我就自己写一个吧，花了一个早上，弄了一个自动化工具，算是自用工具吧。代码有点乱码，属于赶工产品，希望这不是一个太重复的轮子。
目前只支持Xcode 5+，即Images.xcassets的方式，对于Xcode 5以下的版本，生成图标也是有用的，只不过，没有这么自动化，有兴趣的可以fork一下。

#Install
1. ios-icon使用了`imagemagick`，如果你还没有安装，在OSX中，你可以使用`brew install imagemagick`安装。
2. 你必需安装好node.js环境(废话)
3. `npm install -g ios-icon`，建议使用-g全局安装

PS. 最好从github安装，npm有可能不是最新的，尽量做到同步吧。

#Usage
1. 保存一个1024的icon，并cd到icon所在的目录，建议先将icon保存到`Images.xcassets/AppIcon.appiconset`目录
2. 使用`ios-icon`，即可生成`Contents.json`配置文件以及相应的icon
3. 也可以使用`-i`与'-o'来指定icon文件与输出目录。如：`ios-icon -i <icon path> -o <output path>`。

## Credits

  - [Conis Yi](http://github.com/conis)

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2012-2013 Conis Yi <[http://iove.net/](http://iove.net/)>

