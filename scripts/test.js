var unified = require('unified');
var parse = require('remark-parse');
var vfile = require('to-vfile');



var processor = unified()
    .use(parse) //md => MDAST
    ; //MDAST => HAST

var file = vfile.readSync('scripts/example.md');
// var mdast = processor.processSync(file).contents;

var mdast = processor.parse(file);



const renderer = require('../src/renderer');

const React = require('react');
const h = React.createElement;

function parseNodes(nodes) {
    if(!nodes) return [];
    var vnodes = [];
    for(var i=0;i<nodes.length;i++){
        var node = nodes[i];
        if(!node.properties){
            node.properties = {};
        }
        node.properties.key = 0;

        var n = parseNode(node);
        n && vnodes.push(n);
    }
    return vnodes;
}

function parseNode(node) {
    var children = parseNodes(node.children);
    var args = [h, node];
    children && children.length>0 && args.push(children);
    return renderer[node.type].apply(null, args);
}

function parseRoot(root) {
    try {
        // root.type = 'element';
        root.tagName = 'main';
        if(!root.properties){
            root.properties = {};
        }
        root.properties.key = 0;

        return parseNode(root);
    }
    catch (e) {
        console.error(e);
    }
}

// console.log( JSON.stringify(hast, null, 2) );



console.log(mdast);



const vdom = parseRoot(mdast);

// console.log(vdom);
var { renderToString } = require('react-dom/server');
const html = renderToString(vdom);
console.log(html);




// var unified = require('unified');
// var parse = require('remark-parse');
// var vfile = require('to-vfile');
// var remark2hast = require('./remark-hast/index');
// var { renderToString } = require('react-dom/server');
//
//
//
// var processor = unified()
//     .use(parse) //md => MDAST
//     .use(remark2hast); //MDAST => HAST
//
// var file = vfile.readSync('scripts/example.md');
// var hast = processor.processSync(file).contents;
//
//
// const renderer = require('../src/renderer');
//
// const React = require('react');
// const h = React.createElement;
//
// function parseNodes(nodes) {
//     if(!nodes) return [];
//     var vnodes = [];
//     for(var i=0;i<nodes.length;i++){
//         var node = nodes[i];
//         if(!node.properties){
//             node.properties = {};
//         }
//         node.properties.key = 0;
//
//         vnodes.push(parseNode(node));
//     }
//     return vnodes;
// }
//
// function parseNode(node) {
//     var children = parseNodes(node.children);
//     var args = [h, node];
//     children && children.length>0 && args.push(children);
//     return renderer[node.type].apply(null, args);
// }
//
// function parseRoot(root) {
//     try {
//         root.type = 'element';
//         root.tagName = 'div';
//         if(!root.properties){
//             root.properties = {};
//         }
//         root.properties.key = 0;
//
//         return parseNode(root);
//     }
//     catch (e) {
//         console.error(e);
//     }
// }
//
// // console.log( JSON.stringify(hast, null, 2) );
// console.log(hast);
//
//
// const vdom = parseRoot(hast);
//
// // console.log(vdom);
//
// const html = renderToString(vdom);
// console.log(html);



// var hast = processor.processSync(file);
// console.log(hast);

// var hast = processor.runSync(file);
// console.log(hast);

// console.log('mdast========================');
// // console.log(mdast);
//
//
// var mdast = processor.parse(file);
//
//
// console.log('hast========================');
//
//
// var hast = toHAST(mdast);
//
// console.log(hast)




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