"use strict";
// Speichern des Artikels in die Datenbank
let formData;
document.getElementById("submit")?.addEventListener("click", handleSubmitDB);
async function handleSubmitDB() {
    formData = new FormData(document.forms[0]);
    // remote
    let url = "https://spatzenhirn.herokuapp.com/submitArticle";
    // local
    // let url: string = "http://localhost:8100/submitArticle";
    let query = new URLSearchParams(formData);
    url = url + "?" + query.toString();
    await fetch(url);
}
//# sourceMappingURL=artikel_einreichen_script.js.map