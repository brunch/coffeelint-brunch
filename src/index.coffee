linter  = require('coffeelint')
util    = require 'util'
fs      = require 'fs'

formatError = (error) ->
  evidence = (if error.rule then "\n\n#{error.rule}\n" else "\n")
  msg = "
#{error.level}: #{error.rule} at line #{error.lineNumber}.
#{error.context or ''}"

module.exports = class CoffeeLinter
  brunchPlugin: yes
  type: 'javascript'
  extension: 'coffee'

  constructor: (@config) ->
    cfg = @config?.plugins?.coffeelint ? @config?.coffeelint ? {}

    if @config?.coffeelint
      console.warn "Warning: config.coffeelint is deprecated, move it to config.plugins.coffeelint"

    @useCoffeelintJson = cfg.useCoffeelintJson
    @pattern = cfg.pattern ? ///(#{@config.paths?.watched?.join("|") or "app"}).*\.coffee$///

    if @useCoffeelintJson
      try
        coffeelintJson = JSON.parse fs.readFileSync('coffeelint.json')
        @options = coffeelintJson
      catch error
        throw new Error 'useCoffeelintJson is true but coffeelint.json does not exist'
    else
      @options = cfg.options

  lint: (data, path, callback) ->
    error = try
      (linter.lint data, @options)
        .filter((error) -> error?)
        .map(formatError)
        .join('\n')
    catch err
      err
    if error then callback error else callback()
