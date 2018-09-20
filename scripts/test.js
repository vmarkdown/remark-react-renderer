const unified = require('unified');
const parse = require('remark-parse');
const vfile = require('to-vfile');
const render = require('remark-render');
const renderer = require('../src/renderer');
const React = require('react');
const h = React.createElement;
const { renderToString } = require('react-dom/server');
const pretty = require('pretty');

const processor = unified()
    .use(parse) //md => MDAST
    .use(render,{ h:h, renderer:renderer }); //MDAST => Vdom

const file = vfile.readSync('scripts/example.md');

const vdom = processor.processSync(file).contents;
// console.log(vdom);

const html = renderToString(vdom);
console.log(pretty(html));
