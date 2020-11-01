interface Einreichung {
    _id: string;
    Titel: string;
    Text: string;
}

handleZeigeEinreichungenAdmin();

async function handleZeigeEinreichungenAdmin(): Promise<void> {

    // remote
    let response: Response = await fetch("https://spatzenhirn.herokuapp.com/zeigeEinreichungen");
    // local
    // let response: Response = await fetch("http://localhost:8100/zeigeEinreichungen");
    console.log(response);
    let einreichungen: Einreichung[] = await response.json();
    let output: HTMLDivElement = <HTMLDivElement>document.getElementById("ausgabeE");
    output.innerHTML = "";

    for (let e of einreichungen) {
        output.appendChild(erstelleEinreichungBlock(e));
    }
}


function erstelleEinreichungBlock(_e: Einreichung): HTMLElement {

    let einreichungForm: HTMLFormElement = document.createElement("form");
    einreichungForm.setAttribute("_id", _e._id);
    einreichungForm.classList.add("flexbox-einreichung-admin");

    let titelDiv: HTMLDivElement = document.createElement("div");
    let titelInput: HTMLInputElement = document.createElement("input");
    titelInput.setAttribute("name", "Titel");
    titelInput.setAttribute("type", "text");
    titelInput.setAttribute("value", _e.Titel);
    titelDiv.appendChild(titelInput);
    einreichungForm.appendChild(titelDiv);

    let textDiv: HTMLDivElement = document.createElement("div");
    let textTextarea: HTMLTextAreaElement = document.createElement("textarea");
    textTextarea.setAttribute("name", "Text");
    textTextarea.innerText = _e.Text;
    textDiv.appendChild(textTextarea);
    einreichungForm.appendChild(textDiv);

    let includeButton: HTMLButtonElement = document.createElement("button");
    includeButton.id = "includeArticle";
    includeButton.type = "button";
    includeButton.innerText = "speichern und veröffentlichen";
    includeButton.addEventListener("click", handleInclude);
    einreichungForm.appendChild(includeButton);

    return einreichungForm;
}

// Speichern des bestätigten Artikels in die Datenbank
let formData2: FormData;


async function handleInclude(_e: Event): Promise<void> {

    formData2 = new FormData(document.forms[0]);
    let clickedButton: HTMLElement = <HTMLElement>_e.target;
    let parentDiv: HTMLElement = <HTMLElement>clickedButton.parentElement;
    let idToRemove: string = parentDiv.getAttribute("_id")!;
    // remote
    let url: string = "https://spatzenhirn.herokuapp.com/includeArticle";
    // local
    // let url: string = "http://localhost:8100/includeArticle";
    let query: URLSearchParams = new URLSearchParams(<any>formData2);
    url = url + "?" + query.toString();
    await fetch(url);

    handleDeleteOne(idToRemove);
}


   // Artikel löschen
async function handleDeleteOne(_id: String): Promise<void> {

    // remote
    // await fetch("https://gis-sose-2020.herokuapp.com/removeOne?id=" + idToRemove);
    // local
    await fetch("http://localhost:8100/removeOne?id=" + _id);
}