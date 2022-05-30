var jsonData = [];
fetch('../../story/database.json')
  .then(response => response.json())
  .then(data => {jsonData = data;createHTML();});

function createHTML() {
  for (i in jsonData) {
    $("body").append(
      $(`<details>
        <summary>${jsonData[i].id}</summary>
        <form>
          <label for="id">ID:</label> <input type="text" value="${jsonData[i].id}" name="id"><br />
          <label for="scene">Scene Name:</label> <input type="text" value="${jsonData[i].scene}" name="scene">
          <fieldset name="appearing_characters[]">
            <legend>Characters</legend>
            ${repeat(jsonData[i].appearing_characters.length, (bruh) => {
              return `<fieldset><legend>${jsonData[i].appearing_characters[bruh][1]}</legend><label for="id">ID:</label> <input type="text" class="idOfThing" value="${jsonData[i].appearing_characters[bruh][0]}" name="id"> <label for="id">Name:</label> <input type="text" class="nameOfThing" value="${jsonData[i].appearing_characters[bruh][1]}" name="name"></fieldset><br />`
            })}
          </fieldset>
        </form>
      </details>`)
    );
  }
  $(".nameOfThing").change((eo) => {
    console.log($(eo.currentTarget));
    $( eo.currentTarget ).parent().find("legend").text(eo.currentTarget.value);
  })
}

function repeat(n, f) {
  var returnVal = "";
  for (var i = 0; i < n; i++) {
    returnVal += f(i);
  }
  return returnVal;
}