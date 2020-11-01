"use strict";
handleZeigeEinreichungen();
async function handleZeigeEinreichungen() {
    // remote
    // let response: Response = await fetch("https://spatzenhirn.herokuapp.com/zeigeEinreichungen");
    // local
    let response = await fetch("http://localhost:8100/zeigeEinreichungen");
    console.log(response);
    let einreichungen = await response.json();
    let output = document.getElementById("flexbox-wiki");
    output.innerHTML = "";
    for (let e of einreichungen) {
        output.appendChild(erstelleEinreichungInfo(e));
    }
}
function erstelleEinreichungInfo(_e) {
    let einreichungDiv = document.createElement("div");
    einreichungDiv.setAttribute("_id", _e._id);
    einreichungDiv.classList.add("flexbox-einreichung");
    let titelH2 = document.createElement("h2");
    titelH2.innerHTML = _e.Titel;
    einreichungDiv.appendChild(titelH2);
    let textP = document.createElement("p");
    textP.innerHTML = _e.Titel;
    einreichungDiv.appendChild(textP);
    return einreichungDiv;
}
//# sourceMappingURL=info_script.js.map