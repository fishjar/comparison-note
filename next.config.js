const isProd = process.env.NODE_ENV === "production"; // 判断是否生产环境
const ASSET_PREFIX = "/comparison-note"; // 部署时的子目录

module.exports = {
  webpack: config => {
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });
    return config;
  },
  assetPrefix: isProd ? ASSET_PREFIX : "",
  env: {
    ASSET_PREFIX: isProd ? ASSET_PREFIX : "",
  },
  exportTrailingSlash: true,
  exportPathMap: async function() {
    const paths = {
      "/": { page: "/" },
    };

    // 导入菜单数据
    try {
      const navs = require("./src/utils/navs.json");
      (function walkNavs(navs) {
        navs.forEach(item => {
          // paths[item.asPath] = {
          //   page: "/[...param]",
          //   query: { param: item.asPath },
          // };
          paths[item.fullPath] = {
            page: "/[...param]",
            query: { param: item.fullPath },
          };
          if (item.nodes.length > 0) {
            walkNavs(item.nodes);
          }
        });
      })(navs);
    } catch (err) {
      console.log("导入菜单数据失败!");
    }

    return paths;
  },
};
