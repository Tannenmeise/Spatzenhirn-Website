"use strict";
handleZeigeEinreichungenAdmin();
async function handleZeigeEinreichungenAdmin() {
    // remote
    let response = await fetch("https://spatzenhirn.herokuapp.com/zeigeEinreichungen");
    // local
    // let response: Response = await fetch("http://localhost:8100/zeigeEinreichungen");
    console.log(response);
    let einreichungen = await response.json();
    let output = document.getElementById("ausgabeE");
    output.innerHTML = "";
    for (let e of einreichungen) {
        output.appendChild(erstelleEinreichungBlock(e));
    }
}
function erstelleEinreichungBlock(_e) {
    let einreichungForm = document.createElement("form");
    einreichungForm.setAttribute("_id", _e._id);
    einreichungForm.classList.add("flexbox-einreichung-admin");
    let titelDiv = document.createElement("div");
    let titelInput = document.createElement("input");
    titelInput.setAttribute("name", "Titel");
    titelInput.setAttribute("type", "text");
    titelInput.setAttribute("value", _e.Titel);
    titelDiv.appendChild(titelInput);
    einreichungForm.appendChild(titelDiv);
    let textDiv = document.createElement("div");
    let textTextarea = document.createElement("textarea");
    textTextarea.setAttribute("name", "Text");
    textTextarea.innerText = _e.Text;
    textDiv.appendChild(textTextarea);
    einreichungForm.appendChild(textDiv);
    let includeButton = document.createElement("button");
    includeButton.id = "includeArticle";
    includeButton.type = "button";
    includeButton.innerText = "speichern und veröffentlichen";
    includeButton.addEventListener("click", handleInclude);
    einreichungForm.appendChild(includeButton);
    return einreichungForm;
}
// Speichern des bestätigten Artikels in die Datenbank
let formData2;
async function handleInclude(_e) {
    formData2 = new FormData(document.forms[0]);
    let clickedButton = _e.target;
    let parentDiv = clickedButton.parentElement;
    let idToRemove = parentDiv.getAttribute("_id");
    // remote
    let url = "https://spatzenhirn.herokuapp.com/includeArticle";
    // local
    // let url: string = "http://localhost:8100/includeArticle";
    let query = new URLSearchParams(formData2);
    url = url + "?" + query.toString();
    await fetch(url);
    handleDeleteOne(idToRemove);
}
// Artikel löschen
async function handleDeleteOne(_id) {
    // remote
    // await fetch("https://gis-sose-2020.herokuapp.com/removeOne?id=" + idToRemove);
    // local
    await fetch("http://localhost:8100/removeOne?id=" + _id);
}
//# sourceMappingURL=einreichungen_script.js.map