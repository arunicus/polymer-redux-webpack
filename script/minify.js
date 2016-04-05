var minify = require('html-minifier');
var fs = require('fs');

var html = fs.readFileSync('build/cafienne-ui.vulcan.html').toString();

var minifiedHtml = minify.minify(html, {
  customAttrAssign: [/\$=/],
  removeComments: true,
  removeCommentsFromCDATA: true,
  removeCDATASectionsFromCDATA: true,
  collapseWhitespace: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  minifyJS: true,
});

fs.writeFileSync('build/cafienne-ui.html', minifiedHtml);
