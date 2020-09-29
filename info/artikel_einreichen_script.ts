// Speichern der Bestellung in die Datenbank
let formData: FormData;
document.getElementById("submit")?.addEventListener("click", handleSubmitDB);

async function handleSubmitDB(): Promise<void> {

    formData = new FormData(document.forms[0]);
    let url: string = "https://spatzenhirn.herokuapp.com/submitArticle";
    let query: URLSearchParams = new URLSearchParams(<any>formData);
    url = url + "?" + query.toString();
    await fetch(url);
}