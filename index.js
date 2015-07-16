var Metalsmith = require('metalsmith')
  , markdown = require('metalsmith-markdown')
  , layouts = require('metalsmith-layouts')
  , inplace = require('metalsmith-in-place')
  , permalinks = require('metalsmith-permalinks')
  , nunjucks = require('nunjucks')


nunjucks
  .configure({watch: false})
  .addFilter('stretch', function(str) {
    return str.split('').map(function(char) {
      var stretched = '', i = 0
      for (i; i < 5; i++) { stretched += char }
      return stretched
    }).join('').toLowerCase()
  })

Metalsmith(__dirname)
  .source('_posts')
  .use(markdown())
  .use(permalinks({pattern: 'blog/:author/:date/:title'}))
  .use(layouts({engine: 'nunjucks', directory: '_layouts'}))
  .use(inplace({engine: 'nunjucks'}))
  .build(function errorHandler(err) {
    if (!err) return
    console.error(err.message)
    process.exit(1)
  })

