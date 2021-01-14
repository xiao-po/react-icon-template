const chokidar = require("chokidar");
const defaultConfig = require("./config");
const iconGenerator = require("./generate");
const _ = require("lodash");

// watch assets change and re-generate
class IconGeneratePlugin {
  assetsWatcher;

  config;

  constructor(config) {
    this.config = Object.assign({}, defaultConfig, config ?? {});
  }

  generate = _.debounce(
    () => {
      iconGenerator.generate(this.config);
      console.log(`
----------------------------------
 icon re-generated and good-luck
----------------------------------
`);
    },
    300,
    {
      leading: true,
    }
  );

  start() {
    console.log("icon generate plugin start works");
    this.assetsWatcher = chokidar.watch(this.config.assetsPath, {
      ignored: /^\./,
      persistent: true,
    });
    this.assetsWatcher
      .on("add", this.generate)
      .on("change", this.generate)
      .on("unlink", this.generate);

    this.generate();
  }

  stop() {
    if (this.assetsWatcher) {
      this.assetsWatcher.close();
      this.assetsWatcher = null;
    }
  }

  apply(compiler) {
    compiler.hooks.afterPlugins.tap("IconGeneratePlugin", () => {
      this.start();
    });
    compiler.hooks.done.tap("IconGeneratePlugin", () => {
      if (compiler.options.mode !== "development") this.stop();
    });
  }
}

module.exports = IconGeneratePlugin;
