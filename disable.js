'use strict';

const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

let root;

if (__dirname.indexOf('.npminstall') >= 0) {
  // ${appName}/node_modules/.npminstall/webstorm-disable-index/1.0.7/webstorm-disable-index
  root = path.join(__dirname, '../../../../../');
} else if (/\/\.\d+(\.\d+)+@/.test(__dirname)) {
  // ${appName}/node_modules/.1.0.7@webstorm-disable-index
  root = path.join(__dirname, '../../');
} else {
  // ${appName}/node_modules/webstorm-disable-index
  root = path.join(__dirname, '../');
}

console.log('[webstorm-disable-index] write files at %s', root);

const settingRoot = '.idea';
const appName = path.basename(root);
const settingPath = path.join(root, settingRoot);

if (!fs.existsSync(settingPath)) {
  mkdirp.sync(settingPath);
}

const config = `<?xml version="1.0" encoding="UTF-8"?>
<module type="WEB_MODULE" version="4">
  <component name="NewModuleRootManager">
    <content url="file://$MODULE_DIR$">
      <excludeFolder url="file://$MODULE_DIR$/.idea" />
      <excludeFolder url="file://$MODULE_DIR$/app/proxy-enums" />
      <excludeFolder url="file://$MODULE_DIR$/coverage" />
      <excludeFolder url="file://$MODULE_DIR$/logs" />
      <excludeFolder url="file://$MODULE_DIR$/mocks_result" />
      <excludeFolder url="file://$MODULE_DIR$/node_modules" />
      <excludeFolder url="file://$MODULE_DIR$/uiweb" />
    </content>
    <orderEntry type="inheritedJdk" />
    <orderEntry type="sourceFolder" forTests="false" />
  </component>
</module>`;

const modules = `<?xml version="1.0" encoding="UTF-8"?>
<project version="4">
  <component name="ProjectModuleManager">
    <modules>
      <module fileurl="file://$PROJECT_DIR$/.idea/${appName}.iml" filepath="$PROJECT_DIR$/.idea/${appName}.iml" />
    </modules>
  </component>
</project>`;

const misc = `<?xml version="1.0" encoding="UTF-8"?>
<project version="4">
  <component name="JavaScriptSettings">
    <option name="languageLevel" value="ES6" />
  </component>
</project>
`;

const es6 = `<?xml version="1.0" encoding="UTF-8"?>
<project version="4">
  <component name="JavaScriptLibraryMappings">
    <includedPredefinedLibrary name="ECMAScript 6" />
  </component>
</project>
`;

fs.writeFileSync(path.join(root, '.idea', 'jsLibraryMappings.xml'), es6);
fs.writeFileSync(path.join(root, '.idea', 'misc.xml'), misc);
fs.writeFileSync(path.join(root, '.idea', `${appName}.iml`), config);
fs.writeFileSync(path.join(root, '.idea', 'modules.xml'), modules);

const gitignorePath = path.join(root, '.gitignore');
if (!fs.existsSync(gitignorePath)) {
  fs.writeFileSync(gitignorePath, '.idea/');
} else {
  let gitignore = fs.readFileSync(gitignorePath, 'utf8');
  if (!/\.idea\/*/g.test(gitignore)) {
    gitignore += '\n.idea/\n';
    fs.writeFileSync(gitignorePath, gitignore);
  }
}
