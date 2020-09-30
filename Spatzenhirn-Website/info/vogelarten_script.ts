interface Vogelart {
    _id: string;
    Ordnung: string;
    Unterordnung: string;
    Familie: string;
    Art: string;
    Bild1: string;
    Bild2: string;
    Allgemein: string;
    Lebenserwartung: string;
    Stimme: string;
    Feinde: string;
}

handleZeigeVogelarten();

async function handleZeigeVogelarten(): Promise<void> {

    // remote
    // let response: Response = await fetch("https://spatzenhirn.herokuapp.com/zeigeVogelarten");
    // local
    let response: Response = await fetch("http://localhost:8100/zeigeVogelarten");
    console.log(response);
    let vogelarten: Vogelart[] = await response.json();
    let output: HTMLDivElement = <HTMLDivElement>document.getElementById("ausgabeV");
    output.innerHTML = "";

    for (let v of vogelarten) {
        output.appendChild(erstelleVogelartBlock(v));
    }
}


function erstelleVogelartBlock(_v: Vogelart): HTMLElement {

    let vogelartDiv: HTMLDivElement = document.createElement("div");
    vogelartDiv.setAttribute("_id", _v._id);
    vogelartDiv.classList.add("flexbox-vogelart");

    let nameH: HTMLHeadingElement = document.createElement("h2");
    nameH.innerText = _v.Art;
    vogelartDiv.appendChild(nameH);

    // SYSTEMATIK-BLOCK
    let systematikDiv: HTMLDivElement = document.createElement("div");
    systematikDiv.classList.add("systematik");

    let ordnungP: HTMLParagraphElement = document.createElement("p");
    ordnungP.innerText = "Ordnung: " + _v.Ordnung;
    systematikDiv.appendChild(ordnungP);

    let unterordnungP: HTMLParagraphElement = document.createElement("p");
    unterordnungP.innerText = "Unterordnung: " + _v.Unterordnung;
    systematikDiv.appendChild(unterordnungP);

    let familieP: HTMLParagraphElement = document.createElement("p");
    familieP.innerText = "Familie: " + _v.Familie;
    systematikDiv.appendChild(familieP);

    let artP: HTMLParagraphElement = document.createElement("p");
    artP.innerText = "Art: " + _v.Art;
    systematikDiv.appendChild(artP);

    vogelartDiv.appendChild(systematikDiv);
    // SYSTEMATIK-BLOCK ENDE

    // Vogel-Info Block
    let beschreibungDiv: HTMLDivElement = document.createElement("div");
    beschreibungDiv.classList.add("vogelInfo");

    let bild1Img: HTMLImageElement = document.createElement("img");
    bild1Img.src = _v.Bild1;
    beschreibungDiv.appendChild(bild1Img);

    let bild2Img: HTMLImageElement = document.createElement("img");
    bild2Img.src = _v.Bild2;
    beschreibungDiv.appendChild(bild2Img);

    let allgemeinP: HTMLParagraphElement = document.createElement("p");
    allgemeinP.innerText = "Allgemein: " + _v.Allgemein;
    beschreibungDiv.appendChild(allgemeinP);

    let lebenserwartungP: HTMLParagraphElement = document.createElement("p");
    lebenserwartungP.innerText = "Lebenserwartung: " + _v.Lebenserwartung;
    beschreibungDiv.appendChild(lebenserwartungP);

    let stimmeIFrame: HTMLIFrameElement = document.createElement("iframe");
    stimmeIFrame.src = _v.Stimme;
    beschreibungDiv.appendChild(stimmeIFrame);

    let feindeP: HTMLParagraphElement = document.createElement("p");
    feindeP.innerText = "Feinde: " + _v.Feinde;
    beschreibungDiv.appendChild(feindeP);

    vogelartDiv.appendChild(beschreibungDiv);
    // Vogel-Info Block Ende

    return vogelartDiv;
}