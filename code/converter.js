const fs = require("fs");

var json = JSON.parse(fs.readFileSync("$GITHUB_WORKSPACE/story/database.json", { encoding: "utf8" }));

json.forEach((v, i) => {
  var mdTemp = `# ${v.scene}\n`;
  var chars = {
    "---": "---"
  };
  v.appearing_characters.forEach((vv, vi) => {
    chars[vv[0]] = vv[1];
    mdTemp += `- ${vv[1]}\n`;
  });
  v.content.forEach((vv, vi) => {
    switch (vv.type) {
      case "message":
        mdTemp += `\n### ${chars[vv.person]}\n`;
        vv.content.forEach((vvv, vvi) => {
          mdTemp += `\n> ${vvv}\n`;
        });
        break;
      case "break":
        mdTemp += `\n    -- ${vv.content} --\n`;
        break;
    }
  });
  fs.writeFileSync(`$GITHUB_WORKSPACE/story/human-readable/${v.id}.md`, mdTemp, {encoding: "utf8"});
})
