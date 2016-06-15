'use strict';

const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

let root;
if (__dirname.indexOf('.npminstall') >= 0) {
  root = path.join(__dirname, '../../../../../');
} else {
  root = path.join(__dirname, '../');
}

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


fs.writeFileSync(path.join(root, '.idea', `${appName}.iml`), config);
fs.writeFileSync(path.join(root, '.idea', 'modules.iml'), modules);


const gitignorePath = path.join(root, '.gitignore');
if (!fs.existsSync(gitignorePath)) {
  fs.writeFileSync(gitignorePath, '.idea/');
} else {
  let gitignore = fs.readFileSync(gitignorePath, 'utf8');
  if (!/\.idea\/*/g.test(gitignore)) {
    gitignore += '\n.idea/\n';
  }
  fs.writeFileSync(gitignorePath, gitignore);
}
