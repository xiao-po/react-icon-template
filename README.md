## ReactIconPackageTemplate

该项目是简单的 `Icon package project`， 可以简单生成自己的 `react-icon-component`. 你可以 `fork` 并且修改之后发布自己的 `icon-component package`

注意: 当前项目发布后 `package` 并没有包括 `stylesheet`，仅有的 `stylesheet` 是用于 `preview` 的。

### Get Start

1. `fork` 项目.
2. 修改 `package.json` 的描述内容.

   - `name`
   - `version`
   - `description`
   - `author`
   - `license` (_optional_)

3. 在 `lib/assets` (default) 添加 `svg` 并且运行 `npm run preview`, 查看生成效果。
4. 配置 `publish-config.json`
5. 运行 `npm run build:publish` 发布 `package` 到 `registry`

### Example

```tsx
import Icon from "your-package-name";
import ReactDom from "react-dom";
import React from "react";

ReactDom.render(
  <div>
    <Icon.Loading />
  </div>,
  document.getElementById("root")
);
```

### Plugin config

当前项目的生成方式是采用 `build-tools/generate/plugin.js` 的 webpack plugin 生成的，可以进行简单的配置

```json5
{
  componentClassName: "icon",
  // default value is 'icon'
  assetsPath: "./lib/assets",
  // relative path
}
```

### Custom Component

如果你想定制自己的额外功能，请不要直接修改 `build-tools/generate.js` 下的 `template`，可以先修改 `lib/component/icon-component.tsx` 的代码去达到定制的目标。

如果一定要对 `code-gen` 的内容进行修改，那么可以尝试修改模板内容。

### CSS

本项目因为是 `base package`, 不推荐 `icon package` 输出 `css` 给项目。如果有需求建议修改 `webpack.prod.js` 并且在 `lib/index.tsx` 中引入相关 `css`。

但是你可以在 `example/src/icon.scss` 中调试 `css`.

### build-only branch

因为 master 分支有 example 相关的 dependencies ，会使 CI 运行缓慢，如果只需要构建功能请使用 build-only branch

### Github-Action

如果需要使用 `Github action` 请修改 `.github/workflows/build.yml` 中的 `on.push`.
