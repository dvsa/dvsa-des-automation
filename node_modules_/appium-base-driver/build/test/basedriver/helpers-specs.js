"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("source-map-support/register");

var _appiumSupport = require("appium-support");

var _helpers = require("../../lib/basedriver/helpers");

var _chai = _interopRequireDefault(require("chai"));

var _chaiAsPromised = _interopRequireDefault(require("chai-as-promised"));

var _sinon = _interopRequireDefault(require("sinon"));

_chai.default.use(_chaiAsPromised.default);

const should = _chai.default.should();

describe('helpers', function () {
  describe('#isPackageOrBundle', function () {
    it('should accept packages and bundles', function () {
      (0, _helpers.isPackageOrBundle)('io.appium.testapp').should.be.true;
    });
    it('should not accept non-packages or non-bundles', function () {
      (0, _helpers.isPackageOrBundle)('foo').should.be.false;
      (0, _helpers.isPackageOrBundle)('/path/to/an.app').should.be.false;
      (0, _helpers.isPackageOrBundle)('/path/to/an.apk').should.be.false;
    });
  });
  describe('#duplicateKeys', function () {
    it('should translate key in an object', function () {
      (0, _helpers.duplicateKeys)({
        'foo': 'hello world'
      }, 'foo', 'bar').should.eql({
        'foo': 'hello world',
        'bar': 'hello world'
      });
    });
    it('should translate key in an object within an object', function () {
      (0, _helpers.duplicateKeys)({
        'key': {
          'foo': 'hello world'
        }
      }, 'foo', 'bar').should.eql({
        'key': {
          'foo': 'hello world',
          'bar': 'hello world'
        }
      });
    });
    it('should translate key in an object with an array', function () {
      (0, _helpers.duplicateKeys)([{
        'key': {
          'foo': 'hello world'
        }
      }, {
        'foo': 'HELLO WORLD'
      }], 'foo', 'bar').should.eql([{
        'key': {
          'foo': 'hello world',
          'bar': 'hello world'
        }
      }, {
        'foo': 'HELLO WORLD',
        'bar': 'HELLO WORLD'
      }]);
    });
    it('should duplicate both keys', function () {
      (0, _helpers.duplicateKeys)({
        'keyOne': {
          'foo': 'hello world'
        },
        'keyTwo': {
          'bar': 'HELLO WORLD'
        }
      }, 'foo', 'bar').should.eql({
        'keyOne': {
          'foo': 'hello world',
          'bar': 'hello world'
        },
        'keyTwo': {
          'bar': 'HELLO WORLD',
          'foo': 'HELLO WORLD'
        }
      });
    });
    it('should not do anything to primitives', function () {
      [0, 1, -1, true, false, null, undefined, '', 'Hello World'].forEach(item => {
        should.equal((0, _helpers.duplicateKeys)(item), item);
      });
    });
    it('should rename keys on big complex objects', function () {
      const input = [{
        'foo': 'bar'
      }, {
        hello: {
          world: {
            'foo': 'BAR'
          }
        },
        foo: 'bahr'
      }, 'foo', null, 0];
      const expectedOutput = [{
        'foo': 'bar',
        'FOO': 'bar'
      }, {
        hello: {
          world: {
            'foo': 'BAR',
            'FOO': 'BAR'
          }
        },
        foo: 'bahr',
        FOO: 'bahr'
      }, 'foo', null, 0];
      (0, _helpers.duplicateKeys)(input, 'foo', 'FOO').should.deep.equal(expectedOutput);
    });
  });
  describe('#configureApp', function () {
    let sandbox;
    beforeEach(function () {
      sandbox = _sinon.default.createSandbox();
      sandbox.stub(_appiumSupport.zip, 'extractAllTo').resolves();
      sandbox.stub(_appiumSupport.zip, 'assertValidZip').resolves();
      sandbox.stub(_appiumSupport.fs, 'mv').resolves();
      sandbox.stub(_appiumSupport.fs, 'exists').resolves(true);
      sandbox.stub(_appiumSupport.fs, 'hash').resolves('0xDEADBEEF');
      sandbox.stub(_appiumSupport.fs, 'glob').resolves(['/path/to/an.apk']);
      sandbox.stub(_appiumSupport.fs, 'rimraf').resolves();
      sandbox.stub(_appiumSupport.fs, 'stat').resolves({
        isDirectory: () => false
      });
      sandbox.stub(_appiumSupport.tempDir, 'openDir').resolves('/some/dir');
    });
    afterEach(function () {
      sandbox.restore();
    });
    it('should pass "useSystemUnzip" flag through to appium-support', async function () {
      await (0, _helpers.configureApp)('/path/to/an.apk.zip', '.apk');
      _appiumSupport.zip.extractAllTo.getCall(0).lastArg.useSystemUnzip.should.be.true;
    });
  });
});
describe('parseCapsArray', function () {
  it('should parse string into array', function () {
    (0, _helpers.parseCapsArray)('/tmp/my/app.zip').should.eql(['/tmp/my/app.zip']);
  });
  it('should parse array as string into array', function () {
    (0, _helpers.parseCapsArray)('["/tmp/my/app.zip"]').should.eql(['/tmp/my/app.zip']);
    (0, _helpers.parseCapsArray)('["/tmp/my/app.zip","/tmp/my/app2.zip"]').should.eql(['/tmp/my/app.zip', '/tmp/my/app2.zip']);
  });
  it('should return an array without change', function () {
    (0, _helpers.parseCapsArray)(['a', 'b']).should.eql(['a', 'b']);
  });
});require('source-map-support').install();


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvYmFzZWRyaXZlci9oZWxwZXJzLXNwZWNzLmpzIl0sIm5hbWVzIjpbImNoYWkiLCJ1c2UiLCJjaGFpQXNQcm9taXNlZCIsInNob3VsZCIsImRlc2NyaWJlIiwiaXQiLCJiZSIsInRydWUiLCJmYWxzZSIsImVxbCIsInVuZGVmaW5lZCIsImZvckVhY2giLCJpdGVtIiwiZXF1YWwiLCJpbnB1dCIsImhlbGxvIiwid29ybGQiLCJmb28iLCJleHBlY3RlZE91dHB1dCIsIkZPTyIsImRlZXAiLCJzYW5kYm94IiwiYmVmb3JlRWFjaCIsInNpbm9uIiwiY3JlYXRlU2FuZGJveCIsInN0dWIiLCJ6aXAiLCJyZXNvbHZlcyIsImZzIiwiaXNEaXJlY3RvcnkiLCJ0ZW1wRGlyIiwiYWZ0ZXJFYWNoIiwicmVzdG9yZSIsImV4dHJhY3RBbGxUbyIsImdldENhbGwiLCJsYXN0QXJnIiwidXNlU3lzdGVtVW56aXAiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUVBQSxjQUFLQyxHQUFMLENBQVNDLHVCQUFUOztBQUNBLE1BQU1DLE1BQU0sR0FBR0gsY0FBS0csTUFBTCxFQUFmOztBQUVBQyxRQUFRLENBQUMsU0FBRCxFQUFZLFlBQVk7QUFDOUJBLEVBQUFBLFFBQVEsQ0FBQyxvQkFBRCxFQUF1QixZQUFZO0FBQ3pDQyxJQUFBQSxFQUFFLENBQUMsb0NBQUQsRUFBdUMsWUFBWTtBQUNuRCxzQ0FBa0IsbUJBQWxCLEVBQXVDRixNQUF2QyxDQUE4Q0csRUFBOUMsQ0FBaURDLElBQWpEO0FBQ0QsS0FGQyxDQUFGO0FBR0FGLElBQUFBLEVBQUUsQ0FBQywrQ0FBRCxFQUFrRCxZQUFZO0FBQzlELHNDQUFrQixLQUFsQixFQUF5QkYsTUFBekIsQ0FBZ0NHLEVBQWhDLENBQW1DRSxLQUFuQztBQUNBLHNDQUFrQixpQkFBbEIsRUFBcUNMLE1BQXJDLENBQTRDRyxFQUE1QyxDQUErQ0UsS0FBL0M7QUFDQSxzQ0FBa0IsaUJBQWxCLEVB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LEdBQU4sQ0FBdEM7QUFDRCxHQUZDLENBQUY7QUFHRCxDQWRPLENBQVIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB6aXAsIGZzLCB0ZW1wRGlyIH0gZnJvbSAnYXBwaXVtLXN1cHBvcnQnO1xuaW1wb3J0IHsgY29uZmlndXJlQXBwLCBpc1BhY2thZ2VPckJ1bmRsZSwgZHVwbGljYXRlS2V5cywgcGFyc2VDYXBzQXJyYXkgfSBmcm9tICcuLi8uLi9saWIvYmFzZWRyaXZlci9oZWxwZXJzJztcbmltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xuaW1wb3J0IHNpbm9uIGZyb20gJ3Npbm9uJztcblxuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xuY29uc3Qgc2hvdWxkID0gY2hhaS5zaG91bGQoKTtcblxuZGVzY3JpYmUoJ2hlbHBlcnMnLCBmdW5jdGlvbiAoKSB7XG4gIGRlc2NyaWJlKCcjaXNQYWNrYWdlT3JCdW5kbGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgaXQoJ3Nob3VsZCBhY2NlcHQgcGFja2FnZXMgYW5kIGJ1bmRsZXMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBpc1BhY2thZ2VPckJ1bmRsZSgnaW8uYXBwaXVtLnRlc3RhcHAnKS5zaG91bGQuYmUudHJ1ZTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIG5vdCBhY2NlcHQgbm9uLXBhY2thZ2VzIG9yIG5vbi1idW5kbGVzJywgZnVuY3Rpb24gKCkge1xuICAgICAgaXNQYWNrYWdlT3JCdW5kbGUoJ2ZvbycpLnNob3VsZC5iZS5mYWxzZTtcbiAgICAgIGlzUGFja2FnZU9yQnVuZGxlKCcvcGF0aC90by9hbi5hcHAnKS5zaG91bGQuYmUuZmFsc2U7XG4gICAgICBpc1BhY2thZ2VPckJ1bmRsZSgnL3BhdGgvdG8vYW4uYXBrJykuc2hvdWxkLmJlLmZhbHNlO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnI2R1cGxpY2F0ZUtleXMnLCBmdW5jdGlvbiAoKSB7XG4gICAgaXQoJ3Nob3VsZCB0cmFuc2xhdGUga2V5IGluIGFuIG9iamVjdCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGR1cGxpY2F0ZUtleXMoeydmb28nOiAnaGVsbG8gd29ybGQnfSwgJ2ZvbycsICdiYXInKS5zaG91bGQuZXFsKHsnZm9vJzogJ2hlbGxvIHdvcmxkJywgJ2Jhcic6ICdoZWxsbyB3b3JsZCd9KTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIHRyYW5zbGF0ZSBrZXkgaW4gYW4gb2JqZWN0IHdpdGhpbiBhbiBvYmplY3QnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBkdXBsaWNhdGVLZXlzKHsna2V5Jzogeydmb28nOiAnaGVsbG8gd29ybGQnfX0sICdmb28nLCAnYmFyJykuc2hvdWxkLmVxbCh7J2tleSc6IHsnZm9vJzogJ2hlbGxvIHdvcmxkJywgJ2Jhcic6ICdoZWxsbyB3b3JsZCd9fSk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCB0cmFuc2xhdGUga2V5IGluIGFuIG9iamVjdCB3aXRoIGFuIGFycmF5JywgZnVuY3Rpb24gKCkge1xuICAgICAgZHVwbGljYXRlS2V5cyhbXG4gICAgICAgIHsna2V5Jzogeydmb28nOiAnaGVsbG8gd29ybGQnfX0sXG4gICAgICAgIHsnZm9vJzogJ0hFTExPIFdPUkxEJ31cbiAgICAgIF0sICdmb28nLCAnYmFyJykuc2hvdWxkLmVxbChbXG4gICAgICAgIHsna2V5Jzogeydmb28nOiAnaGVsbG8gd29ybGQnLCAnYmFyJzogJ2hlbGxvIHdvcmxkJ319LFxuICAgICAgICB7J2Zvbyc6ICdIRUxMTyBXT1JMRCcsICdiYXInOiAnSEVMTE8gV09STEQnfVxuICAgICAgXSk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBkdXBsaWNhdGUgYm90aCBrZXlzJywgZnVuY3Rpb24gKCkge1xuICAgICAgZHVwbGljYXRlS2V5cyh7XG4gICAgICAgICdrZXlPbmUnOiB7XG4gICAgICAgICAgJ2Zvbyc6ICdoZWxsbyB3b3JsZCcsXG4gICAgICAgIH0sXG4gICAgICAgICdrZXlUd28nOiB7XG4gICAgICAgICAgJ2Jhcic6ICdIRUxMTyBXT1JMRCcsXG4gICAgICAgIH0sXG4gICAgICB9LCAnZm9vJywgJ2JhcicpLnNob3VsZC5lcWwoe1xuICAgICAgICAna2V5T25lJzoge1xuICAgICAgICAgICdmb28nOiAnaGVsbG8gd29ybGQnLFxuICAgICAgICAgICdiYXInOiAnaGVsbG8gd29ybGQnLFxuICAgICAgICB9LFxuICAgICAgICAna2V5VHdvJzoge1xuICAgICAgICAgICdiYXInOiAnSEVMTE8gV09STEQnLFxuICAgICAgICAgICdmb28nOiAnSEVMTE8gV09STEQnLFxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIG5vdCBkbyBhbnl0aGluZyB0byBwcmltaXRpdmVzJywgZnVuY3Rpb24gKCkge1xuICAgICAgWzAsIDEsIC0xLCB0cnVlLCBmYWxzZSwgbnVsbCwgdW5kZWZpbmVkLCAnJywgJ0hlbGxvIFdvcmxkJ10uZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICBzaG91bGQuZXF1YWwoZHVwbGljYXRlS2V5cyhpdGVtKSwgaXRlbSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIHJlbmFtZSBrZXlzIG9uIGJpZyBjb21wbGV4IG9iamVjdHMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBpbnB1dCA9IFtcbiAgICAgICAgeydmb28nOiAnYmFyJ30sXG4gICAgICAgIHtcbiAgICAgICAgICBoZWxsbzoge1xuICAgICAgICAgICAgd29ybGQ6IHtcbiAgICAgICAgICAgICAgJ2Zvbyc6ICdCQVInLFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZm9vOiAnYmFocidcbiAgICAgICAgfSxcbiAgICAgICAgJ2ZvbycsXG4gICAgICAgIG51bGwsXG4gICAgICAgIDBcbiAgICAgIF07XG4gICAgICBjb25zdCBleHBlY3RlZE91dHB1dCA9IFtcbiAgICAgICAgeydmb28nOiAnYmFyJywgJ0ZPTyc6ICdiYXInfSxcbiAgICAgICAge1xuICAgICAgICAgIGhlbGxvOiB7XG4gICAgICAgICAgICB3b3JsZDoge1xuICAgICAgICAgICAgICAnZm9vJzogJ0JBUicsXG4gICAgICAgICAgICAgICdGT08nOiAnQkFSJyxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGZvbzogJ2JhaHInLFxuICAgICAgICAgIEZPTzogJ2JhaHInXG4gICAgICAgIH0sXG4gICAgICAgICdmb28nLFxuICAgICAgICBudWxsLFxuICAgICAgICAwXG4gICAgICBdO1xuICAgICAgZHVwbGljYXRlS2V5cyhpbnB1dCwgJ2ZvbycsICdGT08nKS5zaG91bGQuZGVlcC5lcXVhbChleHBlY3RlZE91dHB1dCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCcjY29uZmlndXJlQXBwJywgZnVuY3Rpb24gKCkge1xuICAgIGxldCBzYW5kYm94O1xuXG4gICAgYmVmb3JlRWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICBzYW5kYm94ID0gc2lub24uY3JlYXRlU2FuZGJveCgpO1xuICAgICAgc2FuZGJveC5zdHViKHppcCwgJ2V4dHJhY3RBbGxUbycpLnJlc29sdmVzKCk7XG4gICAgICBzYW5kYm94LnN0dWIoemlwLCAnYXNzZXJ0VmFsaWRaaXAnKS5yZXNvbHZlcygpO1xuICAgICAgc2FuZGJveC5zdHViKGZzLCAnbXYnKS5yZXNvbHZlcygpO1xuICAgICAgc2FuZGJveC5zdHViKGZzLCAnZXhpc3RzJykucmVzb2x2ZXModHJ1ZSk7XG4gICAgICBzYW5kYm94LnN0dWIoZnMsICdoYXNoJykucmVzb2x2ZXMoJzB4REVBREJFRUYnKTtcbiAgICAgIHNhbmRib3guc3R1YihmcywgJ2dsb2InKS5yZXNvbHZlcyhbJy9wYXRoL3RvL2FuLmFwayddKTtcbiAgICAgIHNhbmRib3guc3R1YihmcywgJ3JpbXJhZicpLnJlc29sdmVzKCk7XG4gICAgICBzYW5kYm94LnN0dWIoZnMsICdzdGF0JykucmVzb2x2ZXMoe1xuICAgICAgICBpc0RpcmVjdG9yeTogKCkgPT4gZmFsc2UsXG4gICAgICB9KTtcbiAgICAgIHNhbmRib3guc3R1Yih0ZW1wRGlyLCAnb3BlbkRpcicpLnJlc29sdmVzKCcvc29tZS9kaXInKTtcbiAgICB9KTtcblxuICAgIGFmdGVyRWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICBzYW5kYm94LnJlc3RvcmUoKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgcGFzcyBcInVzZVN5c3RlbVVuemlwXCIgZmxhZyB0aHJvdWdoIHRvIGFwcGl1bS1zdXBwb3J0JywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgYXdhaXQgY29uZmlndXJlQXBwKCcvcGF0aC90by9hbi5hcGsuemlwJywgJy5hcGsnKTtcbiAgICAgIHppcC5leHRyYWN0QWxsVG8uZ2V0Q2FsbCgwKS5sYXN0QXJnLnVzZVN5c3RlbVVuemlwLnNob3VsZC5iZS50cnVlO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuXG5kZXNjcmliZSgncGFyc2VDYXBzQXJyYXknLCBmdW5jdGlvbiAoKSB7XG4gIGl0KCdzaG91bGQgcGFyc2Ugc3RyaW5nIGludG8gYXJyYXknLCBmdW5jdGlvbiAoKSB7XG4gICAgcGFyc2VDYXBzQXJyYXkoJy90bXAvbXkvYXBwLnppcCcpLnNob3VsZC5lcWwoWycvdG1wL215L2FwcC56aXAnXSk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIHBhcnNlIGFycmF5IGFzIHN0cmluZyBpbnRvIGFycmF5JywgZnVuY3Rpb24gKCkge1xuICAgIHBhcnNlQ2Fwc0FycmF5KCdbXCIvdG1wL215L2FwcC56aXBcIl0nKS5zaG91bGQuZXFsKFsnL3RtcC9teS9hcHAuemlwJ10pO1xuICAgIHBhcnNlQ2Fwc0FycmF5KCdbXCIvdG1wL215L2FwcC56aXBcIixcIi90bXAvbXkvYXBwMi56aXBcIl0nKS5zaG91bGQuZXFsKFtcbiAgICAgICcvdG1wL215L2FwcC56aXAnLFxuICAgICAgJy90bXAvbXkvYXBwMi56aXAnXG4gICAgXSk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIHJldHVybiBhbiBhcnJheSB3aXRob3V0IGNoYW5nZScsIGZ1bmN0aW9uICgpIHtcbiAgICBwYXJzZUNhcHNBcnJheShbJ2EnLCAnYiddKS5zaG91bGQuZXFsKFsnYScsICdiJ10pO1xuICB9KTtcbn0pO1xuIl0sImZpbGUiOiJ0ZXN0L2Jhc2Vkcml2ZXIvaGVscGVycy1zcGVjcy5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLiJ9
