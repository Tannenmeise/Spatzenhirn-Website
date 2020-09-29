"use strict";
// Speichern der Bestellung in die Datenbank
let formData;
document.getElementById("submit")?.addEventListener("click", handleSubmitDB);
async function handleSubmitDB() {
    formData = new FormData(document.forms[0]);
    let url = "https://spatzenhirn.herokuapp.com/submitArticle";
    let query = new URLSearchParams(formData);
    url = url + "?" + query.toString();
    await fetch(url);
}
//# sourceMappingURL=artikel_einreichen_script.js.map