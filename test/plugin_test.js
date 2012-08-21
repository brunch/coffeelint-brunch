describe('Plugin', function() {
  var plugin;

  beforeEach(function() {
    plugin = new Plugin({
      paths: {app: 'app'},
      coffeelint: {
        options: {no_trailing_semicolons: { level: "ignore"} },
        globals: {stuff: true}
      }
    });
  });

  it('should be an object', function() {
    expect(plugin).to.be.ok;
  });

  it('should has #lint method', function() {
    expect(plugin.lint).to.be.an.instanceof(Function);
  });

  it('should lint correctly', function(done) {
    var content = 'a = 228\nb = () ->\n  console.log a'

    plugin.lint(content, 'file.coffee', function(error) {
      expect(error).not.to.be.ok;
      done();
    });
  });

  it('should give correct errors', function(done) {
    var content = 'b = () ->\n\t\t   a=10'

    plugin.lint(content, 'file.coffee', function(error) {
      expect(error).to.equal('error: indentation at line 2.Expected 2 got 5\nerror: no_tabs at line 2.');
      done();
    });
  });

  it('should read configs global options list', function(done) {
    var content = 'alert("end of line");'

    plugin.lint(content, 'file.coffee', function(error) {
      expect(error).not.to.be.ok;
      done();
    });
  });
});
