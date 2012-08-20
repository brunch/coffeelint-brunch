describe('Plugin', function() {
  var plugin;

  beforeEach(function() {
    plugin = new Plugin({
      paths: {app: 'app'},
      jshint: {
        options: {eqnull: true},
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
    var content = 'var a = 228;'

    plugin.lint(content, 'file.js', function(error) {
      expect(error).not.to.be.ok;
      done();
    });
  });

  it('should give correct errors', function(done) {
    var content = 'var a = 228;;'

    plugin.lint(content, 'file.js', function(error) {
      expect(error).to.equal('Unnecessary semicolon. (error) at line 1, column 13');
      done();
    });
  });

  it('should read configs global options list', function(done) {
    var content = 'function a() {return stuff == null;}'

    plugin.lint(content, 'file.js', function(error) {
      expect(error).not.to.be.ok;
      done();
    });
  });
});
