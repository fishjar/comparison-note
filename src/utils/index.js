/**
 * 递归查找某个路径的菜单
 * @param {*} asPath
 * @param {*} navs
 */
export const findNav = (asPath = "", navs = []) => {
  let nav = null;
  navs.forEach(item => {
    if (
      // 开发时，访问某个页面是js定义的路由
      // 静态html导出后的访问，会定向到一个目录，多出一个”/“的区别
      // 可能判断有些冗余，有时间再优化
      item.fullPath === asPath ||
      item.fullPath + "/" === asPath ||
      item.asPath === asPath ||
      item.asPath + "/" === asPath
    ) {
      nav = item;
    } else {
      nav = findNav(asPath, item.nodes) || nav;
    }
  });
  return nav;
};
