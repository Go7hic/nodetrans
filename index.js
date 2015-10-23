#! /usr/bin/env node
var request = require('request');
var colors = require('colors');
var param = process.argv[2];
var words = param ? param : '';
var prettify = function (data) {
    var i, temp, word = data.query;
      console.log('\n ' + word.bold);
      if (data.basic != null) {
        var us = typeof data.basic['us-phonetic'] === 'string' ? '美音: [' + data.basic['us-phonetic'] + ']' : '',
            uk = typeof data.basic['uk-phonetic'] === 'string' ? '英音: [' + data.basic['uk-phonetic'] + ']' : '';
        if (uk && us) {
          console.log('\n ' + us + '   ' + uk);
        } else if (typeof data.basic['phonetic'] == 'string') {
          console.log('\n ' + '拼音'.bold.underline + '：[' + data.basic['phonetic'] + ']');
        }
        console.log('\n ' + '翻译'.bold.underline + '：' + data.basic['explains'] + '\n');
      } else if (data.web != null) {
        console.log('\n ' + '网络释义:'.bold.underline);

        for (i = 0; i < data.web.length; i++) {
          temp = data.web[i];
          console.log('\n  ' + (i+1) + '. ' + temp.key);
          console.log('\n  ' + temp.value);
        }

      } else {
        console.log('\n ' + '暂无释义.'.underline);
      }
}

request('http://fanyi.youdao.com/openapi.do?keyfrom=Go7hic&key=2136922355&type=data&doctype=json&version=1.1&q='+words, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var result = prettify(JSON.parse(body));
    }
});

