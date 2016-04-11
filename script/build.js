var minify = require('html-minifier');
var fs = require('fs');

var html = fs.readFileSync('build/wc-bundle.html').toString();

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

fs.writeFileSync('build/wc.html', minifiedHtml);
fs.createReadStream('./app/index.html').pipe(fs.createWriteStream('build/index.html'));
fs.unlink('build/wc-bundle.html');
