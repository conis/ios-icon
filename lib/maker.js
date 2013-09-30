#!/usr/bin/env node

/**
 * Module dependencies.
 */

var program = require('commander')
    , fs = require('fs')
    , ios_icon = require('./')
    , path = require('path');

program
    .version(JSON.parse(fs.readFileSync(__dirname + '/../package.json', 'utf8')).version)
    .usage('[debug] [options] [files]')
    .option('-i --icon', '1024X1024的icon文件，默认为当前文件夹下的icon.png')
    .option('-o --output', '要输出的目录，默认为当前文件夹')
    .parse(process.argv);

program.name = 'ios-icon';

//获取目录
var icon = program.icon;
var output = program.output;
//没有使用icon参数
icon = icon || path.resolve("icon.png");
//没有使用output参数，则使用当前目录作为输出目录
output = output || path.resolve();
//Contents.json文件
var contents = path.join(output, "Contents.json");

ios_icon.make({
    output: output,
    originIcon: icon
});