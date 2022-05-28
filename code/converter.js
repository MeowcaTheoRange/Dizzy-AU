const fs = require("fs");
var path = process.argv[2]
console.log(path);

var json = JSON.parse(fs.readFileSync(path + "/story/database.json", { encoding: "utf8" }));
var fullMd = "";

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
  fullMd += mdTemp + "\n\n";
  fs.writeFileSync(`${path}/story/human-readable/${v.id}.md`, mdTemp, {encoding: "utf8"});
})
fs.writeFileSync(`${path}/story/human-readable.md`, fullMd, {encoding: "utf8"});
fs.writeFileSync(`${path}/story/index.md`, "# The full, unbroken story of the Dizzy AU.\n[See it on GitHub Pages.](https://meowcatheorange.github.io/Dizzy-AU/index)\n\n" + fullMd, {encoding: "utf8"});
