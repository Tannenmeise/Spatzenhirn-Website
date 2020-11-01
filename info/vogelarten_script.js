"use strict";
handleZeigeVogelarten();
async function handleZeigeVogelarten() {
    // remote
    let response = await fetch("https://spatzenhirn.herokuapp.com/zeigeVogelarten");
    // local
    // let response: Response = await fetch("http://localhost:8100/zeigeVogelarten");
    console.log(response);
    let vogelarten = await response.json();
    let output = document.getElementById("ausgabeV");
    output.innerHTML = "";
    for (let v of vogelarten) {
        output.appendChild(erstelleVogelartBlock(v));
    }
}
function erstelleVogelartBlock(_v) {
    let vogelartDiv = document.createElement("div");
    vogelartDiv.setAttribute("_id", _v._id);
    vogelartDiv.classList.add("flexbox-vogelart");
    let nameH = document.createElement("h2");
    nameH.innerText = _v.Art;
    vogelartDiv.appendChild(nameH);
    // SYSTEMATIK-BLOCK
    let systematikDiv = document.createElement("div");
    systematikDiv.classList.add("systematik");
    let ordnungP = document.createElement("p");
    ordnungP.innerText = "Ordnung: " + _v.Ordnung;
    systematikDiv.appendChild(ordnungP);
    let unterordnungP = document.createElement("p");
    unterordnungP.innerText = "Unterordnung: " + _v.Unterordnung;
    systematikDiv.appendChild(unterordnungP);
    let familieP = document.createElement("p");
    familieP.innerText = "Familie: " + _v.Familie;
    systematikDiv.appendChild(familieP);
    let artP = document.createElement("p");
    artP.innerText = "Art: " + _v.Art;
    systematikDiv.appendChild(artP);
    vogelartDiv.appendChild(systematikDiv);
    // SYSTEMATIK-BLOCK ENDE
    // Vogel-Info Block
    let beschreibungDiv = document.createElement("div");
    beschreibungDiv.classList.add("vogelInfo");
    let bild1Img = document.createElement("img");
    bild1Img.src = _v.Bild1;
    beschreibungDiv.appendChild(bild1Img);
    let bild2Img = document.createElement("img");
    bild2Img.src = _v.Bild2;
    beschreibungDiv.appendChild(bild2Img);
    let allgemeinP = document.createElement("p");
    allgemeinP.innerText = "Allgemein: " + _v.Allgemein;
    beschreibungDiv.appendChild(allgemeinP);
    let lebenserwartungP = document.createElement("p");
    lebenserwartungP.innerText = "Lebenserwartung: " + _v.Lebenserwartung;
    beschreibungDiv.appendChild(lebenserwartungP);
    let stimmeIFrame = document.createElement("iframe");
    stimmeIFrame.src = _v.Stimme;
    beschreibungDiv.appendChild(stimmeIFrame);
    let feindeP = document.createElement("p");
    feindeP.innerText = "Feinde: " + _v.Feinde;
    beschreibungDiv.appendChild(feindeP);
    vogelartDiv.appendChild(beschreibungDiv);
    // Vogel-Info Block Ende
    return vogelartDiv;
}
//# sourceMappingURL=vogelarten_script.js.map