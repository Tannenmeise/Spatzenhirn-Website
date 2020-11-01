// Speichern des Artikels in die Datenbank
let formData: FormData;
document.getElementById("submit")?.addEventListener("click", handleSubmitDB);

async function handleSubmitDB(): Promise<void> {

    formData = new FormData(document.forms[0]);
    // remote
    let url: string = "https://spatzenhirn.herokuapp.com/submitArticle";
    // local
    // let url: string = "http://localhost:8100/submitArticle";
    let query: URLSearchParams = new URLSearchParams(<any>formData);
    url = url + "?" + query.toString();
    await fetch(url);
}