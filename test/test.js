'use strict';
const unified = require('unified');
const parse = require('rehype-parse')
const vfile = require('to-vfile');

const chai = require('chai');
const expect = chai.expect;
const React = require('react');
const h = React.createElement;

const Renderer = require('../src/renderer');

describe('remark-react-renderer', function() {

    const renderer = new Renderer();

    const processor = unified()
        .use(parse);


    describe('#root()', function() {

        it('root element', function() {

            const hast = processor.parse('<div class="markdown-root"></div>');

            console.log(hast);


            const vdom = renderer.root(h, {
                type: 'root',
                position:{},
                props: {},
                children: []
            }, []);

            console.log(vdom);



        });

    });

});
