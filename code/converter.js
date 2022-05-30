const fs = require("fs");
var path = process.argv[2]
console.log(path);

var json = JSON.parse(fs.readFileSync(path + "/story/database.json", { encoding: "utf8" }));
var artjson = JSON.parse(fs.readFileSync(path + "/art/data.json", { encoding: "utf8" }));
var fullMd = "";
var indexmd = "# Table Of Contents\n\n";
var artMd = "# Art Of The Dizzy AU\n\nSome art, either by MeowcaTheoRange or other people who like the Dizzy AU. Check it out below!\n\n";

json.forEach((v, i) => {
  var mdTemp = `# ${v.scene}\n`;
  var chlist = ``;
  var chars = {
    "---": "---"
  };
  v.appearing_characters.forEach((vv, vi) => {
    chars[vv[0]] = vv[1];
    mdTemp += `- ${vv[1]}\n`;
    chlist += `- ${vv[1]}\n\n`;
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
  fs.writeFileSync(`${path}/story/human-readable/${v.id}`, mdTemp, {encoding: "utf8"});
  indexmd += "### [" + v.id + "](https://meowcatheorange.github.io/Dizzy-AU/story/human-readable/" + v.id + ".md)\n\n" + chlist
})
artjson.forEach((v, i) => {
  artMd += `## ${v.title}\n${v.description}\n\n![](${v.image})\n\nCredit: \`${v.credit}\`${v.link != undefined ? ` \([${v.linkName}](${v.link})\)` : ""}\n\n`;
})
fs.writeFileSync(`${path}/story/toc.md`, indexmd, {encoding: "utf8"});
fs.writeFileSync(`${path}/story/human-readable.md`, fullMd, {encoding: "utf8"});
fs.writeFileSync(`${path}/art.md`, artMd, {encoding: "utf8"});
