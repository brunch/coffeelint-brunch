## coffeelint-brunch
Adds coffeelint support to
[brunch](http://brunch.io).

This project has just started: don't use it.


## Usage
Add `"coffeelint-brunch": "x.y.z"` to `package.json` of your brunch app.

Pick a plugin version that corresponds to your minor (y) brunch version.

If you want to use git version of plugin, add
`"jshint-brunch": "git+ssh://git@github.com:brunch/jshint-brunch.git"`.

By default, only files in your `config.paths.app` are linted.

You can customize jshint config by changing brunch config:

```coffeescript
config =
  jshint:
    pattern: /^app\/.*\.js$/
    options:
      bitwise: true
      curly: true
    globals:
      jQuery: true
```

Every sub-option (`pattern`, `options`, `globals`) is optional.
