/**
 * react Renderer
 *
 * extend mdast
{
    "type": "heading",
    "depth": 1 <= number <= 6,
    "tagName": "a",
    "properties": {
        "href": "http://alpha.com",
        "id": "bravo",
        "className": ["bravo"],
        "download": true
    },
    "children": []
}
 */

var extend = require('extend');

function props(node, defaultProps) {
    var dataProps = extend({}, node.properties);
    return extend({}, dataProps, defaultProps);
}

module.exports = {

    root: function(h, node, children) {
        return h(node.tagName||'div', props(node), children);
    },

    blockquote: function(h, node, children) {
        return h('blockquote', props(node), children);
    },

    heading: function(h, node, children) {
        return h('h'+node.depth, props(node), children);
    },

    thematicBreak : function(h, node) {
        return h('hr', props(node));
    },

    list : function(h, node, children) {
        return h(node.ordered?'ol':'ul', props(node), children);
    },

    listItem : function(h, node, children) {
        return h('li', props(node), children);
    },

    checkbox : function(h, node) {
        return h('input', props(node, {
            type: 'checkbox',
            checked: node.checked,
            readOnly: true
        }));
    },

    paragraph : function(h, node, children) {
        return h(node.tagName||'p', props(node), children);
    },

    table : function(h, node, children) {
        return h('table', props(node), h('tbody',{key:0}, children));
    },

    tableRow : function(h, node, children) {
        return h('tr', props(node), children);
    },

    tableCell : function(h, node, children) {
        return h('td', props(node, {align: node.align}), children);
    },

    strong : function(h, node, children) {
        return h('strong', props(node), children);
    },

    emphasis : function(h, node, children) {
        return h('em', props(node), children);
    },

    break : function(h, node) {
        return h('br', props(node));
    },

    delete : function(h, node, children) {
        return h('del', props(node), children);
    },

    link : function(h, node, children) {
        return h('a', props(node, {
            // target: '_blank',
            href: node.url,
            title: node.title
        }), children);
    },

    linkReference : function(h, node, children) {
        return h('a', props(node, {
            href: node.url,
            title: node.title
        }), children);
    },

    definition : function(h, node, children) {
        // return null;
        // return h('div', props(node, {
        //         style: {
        //             height: 0,
        //             visibility: 'hidden'
        //         }
        //     }),
        //     h('a', {
        //         key: 0,
        //         href: node.url,
        //         'data-identifier': node.identifier
        //     }, [
        //         '['+node.identifier+']: ',
        //         node.url
        //     ])
        // );
    },

    image : function(h, node) {
        return h('img', props(node, {
            src: node.url,
            alt: node.alt,
            title: node.title
        }));
    },

    text : function(h, node) {
        return h('span', props(node), node.value);
    },

    inlineCode : function(h, node, children) {
        return h('code', props(node), node.value);
    },

    code : function(h, node, children) {
        return h('pre', props(node), h('code', {
            className: node.lang?'language-'+node.lang:null
        }, node.value));
    },

    yaml : function(h, node, children) {
        return h('pre', props(node), h('code', {
            className: 'language-yaml'
        }, node.value));
    },

    math : function(h, node, children) {
        return h('p', props(node, {
            dangerouslySetInnerHTML: {
                __html: node.value
            }
        }));
    },

    inlineMath : function(h, node, children) {
        return h('span', props(node, {
            dangerouslySetInnerHTML: {
                __html: node.value
            }
        }));
    },

    html : function(h, node, children) {
        return h('div', props(node, {
            dangerouslySetInnerHTML: {
                __html: node.value
            }
        }));
    },

    footnote : function(h, node, children) {

    },

    footnoteReference : function(h, node, children) {

    }
};
