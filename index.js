var Metalsmith = require('metalsmith')
  , markdown = require('metalsmith-markdown')
  , layouts = require('metalsmith-layouts')
  , inplace = require('metalsmith-in-place')
  , permalinks = require('metalsmith-permalinks')

Metalsmith(__dirname)
  .source('_posts')
  .use(markdown())
  .use(permalinks({pattern: 'blog/:author/:date/:title'}))
  .use(layouts({engine: 'handlebars', directory: '_layouts'}))
  .use(inplace({engine: 'handlebars'}))
  .build(function errorHandler(err) {
    if (!err) return
    console.error(err.message)
    process.exit(1)
  })


