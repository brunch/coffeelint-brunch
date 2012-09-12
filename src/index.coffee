linter  = require('coffeelint')
util    = require 'util'

formatError = (error) ->
  evidence = (if error.rule then "\n\n#{error.rule}\n" else "\n")
  msg ="
#{error.level}: #{error.rule} at line #{error.lineNumber}.
#{error.context or ''}"

module.exports = class CoffeeLinter
  brunchPlugin: yes
  type: 'javascript'
  extension: 'coffee'

  constructor: (@config) ->
    cfg = @config?.coffeelint ? {}
    @options = cfg.options
    @globals = cfg.globals
    @pattern = cfg.pattern ? ///^#{@config.paths.app}.*\.coffee$///

  lint: (data, path, callback) ->
    error = try
      (linter.lint data, @options, @globals)
        .filter((error) -> error?)
        .map(formatError)
        .join('\n')
    catch err
      err
    if error then callback error else callback()
