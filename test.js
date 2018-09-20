var unified = require('unified')
var parse = require('remark-parse')
var vfile = require('to-vfile')
var toHAST = require('mdast-util-to-hast')

var mdast = unified()
    .use(parse)
    .parse(vfile.readSync('example.md'))

console.log('mdast========================');
console.log(mdast);

console.log('hast========================');
var hast = toHAST(mdast);

console.log(hast)




// var unified = require('unified')
// var parse = require('rehype-parse')
// var vfile = require('to-vfile')
// var toMDAST = require('hast-util-to-mdast')
//
// var file = vfile.readSync('example.html')
//
// var hast = unified()
//     .use(parse)
//     .parse(file);
//
// console.log('hast========================');
// console.log(hast);
//
// console.log('mdast========================');
// var mdast = toMDAST(hast);
//
// console.log(mdast);