/**
 * Mock plugin for development and production.
 * https://github.com/anncwb/vite-plugin-mock
 */
import { viteMockServe } from 'vite-plugin-mock';

export function configMockPlugin(isBuild: boolean) {
  return viteMockServe({
    // 自动读取模拟.ts 文件时，请忽略指定格式的文件
    ignore: /^\_/,

    // 设置模拟.ts 文件的存储文件夹
    mockPath: 'mock',

    // 设置是否启用本地 xxx.ts 文件，不要在生产环境中打开它.设置为 false 将禁用 mock 功能
    localEnabled: !isBuild,

    // 设置打包是否启用 mock 功能
    prodEnabled: isBuild,

    /**
     * 如果生产环境开启了 mock 功能,即prodEnabled=true.则该代码会被注入到injectFile对应的文件的底部。默认为main.{ts,js}
     *
     * 这样做的好处是,可以动态控制生产环境是否开启 mock 且在没有开启的时候 mock.js 不会被打包。
     *
     * 如果代码直接写在main.ts内，则不管有没有开启,最终的打包都会包含mock.js
     */
    injectCode: `
      import { setupProdMockServer } from '../mock/_createProductionServer';

      setupProdMockServer();
      `,
  });
}
