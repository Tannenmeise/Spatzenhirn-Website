"use strict";
document.getElementById("arrow")?.addEventListener("click", handleArrowClick);
document.getElementById("arrowUp")?.addEventListener("click", handleArrowClick);
function handleArrowClick(_event) {
    console.log("Called Event Listener");
    let arrow = _event.target;
    if (arrow.id == "arrow") {
        document.getElementById("collapseable").setAttribute("style", "visibility: visible");
        document.getElementById("arrow").setAttribute("src", "/Spatzenhirn-Website/graphics/buttons/arrowUp.png");
        document.getElementById("arrow").setAttribute("id", "arrowUp");
    }
    else {
        console.log("Called else statement");
        document.getElementById("collapseable").setAttribute("style", "visibility: hidden");
        document.getElementById("arrowUp").setAttribute("src", "/Spatzenhirn-Website/graphics/buttons/arrow.png");
        document.getElementById("arrowUp").setAttribute("id", "arrow");
    }
}
//# sourceMappingURL=script.js.map