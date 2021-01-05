const chokidar = require("chokidar");
const generatorConfig = require("./config");
const iconGenerator = require("./generate");
const _ = require("lodash");

const Generate = _.debounce(() => {
  iconGenerator.generate();
  console.log(`----------------------------------
  icon re-generated and good-luck
----------------------------------`);
}, 50);

// watch assets change and re-generate
class IconGeneratePlugin {
  assetsWatcher;

  start() {
    this.assetsWatcher = chokidar.watch(generatorConfig.assetsPath, {
      ignored: /^\./,
      persistent: true,
    });
    this.assetsWatcher
      .on("add", Generate)
      .on("change", Generate)
      .on("unlink", Generate);
    console.log("icon generate plugin start works");
  }

  stop() {
    if (this.assetsWatcher) {
      this.assetsWatcher.close().then(() => {
        console.log("icon generate plugin stop works");
      });
    }
  }

  apply(compiler) {
    compiler.hooks.afterPlugins.tap("IconGeneratePlugin", (param) => {
      this.start();
    });
  }
}

module.exports = IconGeneratePlugin;
