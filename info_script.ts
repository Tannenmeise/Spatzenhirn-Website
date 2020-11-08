interface Einreichung {
    _id: string;
    Titel: string;
    Text: string;
}

handleZeigeEinreichungen();

async function handleZeigeEinreichungen(): Promise<void> {
    
    // remote
    let response: Response = await fetch("https://spatzenhirn.herokuapp.com/zeigeEinreichungen");
    // local
    // let response: Response = await fetch("http://localhost:8100/zeigeEinreichungen");
    console.log(response);
    let einreichungen: Einreichung[] = await response.json();
    let output: HTMLDivElement = <HTMLDivElement>document.getElementById("flexbox-wiki");
    output.innerHTML = "";

    for (let e of einreichungen) {
        output.appendChild(erstelleEinreichungInfo(e));
    }
}


function erstelleEinreichungInfo(_e: Einreichung): HTMLElement {

    let einreichungDiv: HTMLDivElement = document.createElement("div");
    einreichungDiv.setAttribute("_id", _e._id);
    einreichungDiv.classList.add("flexbox-einreichung");

    let titelH2: HTMLHeadingElement = document.createElement("h2");
    titelH2.innerHTML = _e.Titel;
    einreichungDiv.appendChild(titelH2);

    let textP: HTMLHeadingElement = document.createElement("p");
    textP.innerHTML = _e.Text;
    einreichungDiv.appendChild(textP);

    return einreichungDiv;
}