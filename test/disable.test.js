'use strict';

const path = require('path');
const assert = require('assert');
const Command = require('..');

describe('test/disable.test.js', () => {
  it('should create', function* () {
    const command = getCommand();
    yield command.run(path.join(__dirname, 'fixtures/empty'));
    command.expect('modules.xml', '<module filepath="$PROJECT_DIR$/.idea/empty.iml" fileurl="file://$PROJECT_DIR$/.idea/empty.iml"/>');
    command.expect('misc.xml', '<option name="languageLevel" value="ES6"/>');

    command.expect('jsLibraryMappings.xml', '<includedPredefinedLibrary name="ECMAScript 6"/>');
    command.expect('jsLibraryMappings.xml', '<includedPredefinedLibrary name="Node.js Core"/>');
    command.expect('jsLibraryMappings.xml', '<file url="PROJECT" libraries="{node-DefinitelyTyped,mocha-DefinitelyTyped}"/>');
    command.expect('jsLibraryMappings.xml', '<excludedPredefinedLibrary name="empty/node_modules"/>');

    command.expect('empty.iml', '<content url="file://$MODULE_DIR$/node_modules/egg"/>');
    command.expect('empty.iml', '<excludeFolder url="file://$MODULE_DIR$/node_modules"/>');
    command.expect('empty.iml', '<excludeFolder url="file://$MODULE_DIR$/node_modules/egg/node_modules"/>');
    command.expect('empty.iml', '<excludeFolder url="file://$MODULE_DIR$/node_modules"/>');
  });

  it('should append', function* () {
    const command = getCommand();
    yield command.run(path.join(__dirname, 'fixtures/pkg-config'));
    command.expect('modules.xml', '<module filepath="$PROJECT_DIR$/.idea/pkg-config.iml" fileurl="file://$PROJECT_DIR$/.idea/pkg-config.iml"/>');
    command.expect('misc.xml', '<option name="languageLevel" value="ES6"/>');

    command.expect('jsLibraryMappings.xml', '<includedPredefinedLibrary name="ECMAScript 6"/>');
    command.expect('jsLibraryMappings.xml', '<includedPredefinedLibrary name="Node.js Core"/>');
    command.expect('jsLibraryMappings.xml', '<file url="PROJECT" libraries="{test-DefinitelyTyped,node-DefinitelyTyped,mocha-DefinitelyTyped}"/>');
    command.expect('jsLibraryMappings.xml', '<excludedPredefinedLibrary name="pkg-config/node_modules"/>');

    command.expect('pkg-config.iml', '<content url="file://$MODULE_DIR$/node_modules/egg"/>');
    command.expect('pkg-config.iml', '<excludeFolder url="file://$MODULE_DIR$/node_modules"/>');
    command.expect('pkg-config.iml', '<excludeFolder url="file://$MODULE_DIR$/node_modules/egg/node_modules"/>');
    command.expect('pkg-config.iml', '<excludeFolder url="file://$MODULE_DIR$/node_modules"/>');
  });
});

function getCommand() {
  const command = new Command();

  command.cache = {};
  command.writeFile = function* (fileName, content) {
    command.cache[fileName] = content;
  };

  command.expect = (fileName, regex) => {
    const content = command.cache[fileName];
    if (regex instanceof RegExp) {
      assert(regex.test(content));
    } else {
      assert(content.indexOf(regex) !== -1);
    }
  };

  return command;
}
