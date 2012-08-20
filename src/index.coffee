jshint = require('jshint').JSHINT

formatError = (error) ->
  evidence = (if error.evidence then "\n\n#{error.evidence}\n" else '\n')
  "#{error.reason} #{error.id or ''} at line #{error.line}, column #{error.character}"

module.exports = class JSHintLinter
  brunchPlugin: yes
  type: 'javascript'
  extension: 'js'

  constructor: (@config) ->
    cfg = @config?.jshint ? {}
    @options = cfg.options
    @globals = cfg.globals
    @pattern = cfg.pattern ? ///^#{@config.paths.app}.*\.js$///

  lint: (data, path, callback) ->
    success = jshint data, @options, @globals
    if success
      callback()
    else
      error = jshint.errors
        .filter((error) -> error?)
        .map(formatError)
        .join('\n')
      callback error
