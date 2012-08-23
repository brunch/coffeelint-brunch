[![build status](https://secure.travis-ci.org/ilkosta/coffeelint-brunch.png)](http://travis-ci.org/ilkosta/coffeelint-brunch)
## coffeelint-brunch
Adds [coffeelint](http://www.coffeelint.org) support to
[brunch](http://brunch.io).

## Usage <a name="usage" href="#usage" title="Link to this section">⚑</a>
Add `"coffeelint-brunch": "x.y.z"` to `package.json` of your brunch app.

Pick a plugin version that corresponds to your minor (y) brunch version.

If you want to use git version of plugin, add
`"coffeelint-brunch": "git+ssh://git@github.com:ilkosta/coffeelint-brunch.git"`.

By default, only files in your `config.paths.app` are linted.

You can customize jshint config by changing brunch config using the native [coffeelint options](http://www.coffeelint.org/#options):

```coffeescript
config =
  coffeelint:
    pattern: /^app\/.*\.coffee$/
    options:
      no_trailing_semicolons:
        level: "ignore"
```

Every sub-option (`pattern`, `options`, `globals`) is optional.

## License <a name="license" href="#license" title="Link to this section">⚑</a>
Copyright (c) 2012 "ilkosta" Costantino Giuliodori.

Licensed under the [MIT license](coffeelint-brunch/blob/master/LICENSE-MIT).
