#!/usr/bin/env node

/**
 * 递归目录并生成菜单
 */

const fs = require("fs-extra");
const path = require("path");
const matter = require("gray-matter");

((notesDir = "notes") => {
  function dirWalk(
    notesPath,
    parent = {},
    cards = [],
    nodes = [],
    readme = {}
  ) {
    const filesList = fs.readdirSync(notesPath);
    // 文件和文件夹循环
    filesList.forEach(fileName => {
      if (fileName === "images") {
        return;
      }

      const filePath = path.join(notesPath, fileName);
      const fullPath = `${parent.fullPath || ""}/${fileName}`;
      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        //如果是文件夹
        console.log(fullPath);
        const fileObj = {
          name: fileName,
          fullPath,
          asPath: encodeURI(fullPath),
          id: encodeURIComponent(fullPath),
          parent,
          readme: {},
          cards: [],
          nodes: [],
        };
        // 添加到节点列表
        nodes.push(fileObj);

        //递归调用
        dirWalk(
          filePath,
          {
            name: fileName,
            fullPath,
            asPath: encodeURI(fullPath),
            id: encodeURIComponent(fullPath),
            readme: fileObj.readme,
          },
          fileObj.cards,
          fileObj.nodes,
          fileObj.readme
        );
      } else {
        // 如果是普通文件
        console.log("  ", fullPath);
        const extName = path.extname(fileName);
        const baseName = path.basename(fileName, extName);
        if (extName.toLowerCase() === ".md") {
          // 如果是md文件
          if (baseName.toUpperCase() === "README") {
            // README.md文件
            const readmeFileStr = fs.readFileSync(filePath);
            const readmeFileObj = matter(readmeFileStr);
            Object.assign(readme, readmeFileObj.data, { fullPath });
          } else {
            // 其他md笔记文件
            cards.push({
              name: fileName,
              baseName,
              extName,
              fullPath,
            });
          }
        }
      }
    });
    return nodes;
  }

  console.log("---------------");
  // 笔记文件夹
  const notesPath = path.resolve(__dirname, "..", notesDir);
  // 递归读取文件夹信息，组装nav
  const navs = dirWalk(notesPath);
  // nav文件路径
  const jsonFile = path.resolve(__dirname, "../src/utils/navs.json");
  // 写入nav
  fs.outputJsonSync(jsonFile, navs, { spaces: 2 });
  console.log("--------------------");
  console.log("\n\n写入成功：", jsonFile);
})();
