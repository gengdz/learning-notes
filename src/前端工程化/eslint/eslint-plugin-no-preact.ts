// lib/rules/no-preact.js
module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: "disallow import from 'preact'",
      category: 'Possible Errors',
    },
    fixable: 'code',
    schema: [],
  },
  create: function (context) {
    return {
      ImportDeclaration(node) {
        if (node.source.value === 'preact') {
          context.report({
            node,
            message: "Import from 'preact' is not allowed",
            fix: function (fixer) {
              const sourceCode = context.getSourceCode();
              const importText = sourceCode.getText(node);
              const fixedText = importText.replace(/preact/g, 'react');
              return fixer.replaceText(node, fixedText);
            },
          });
        }
      },
    };
  },
};
