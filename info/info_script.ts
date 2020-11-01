document.getElementById("arrow")?.addEventListener("click", handleArrowClick2);
document.getElementById("arrowUp")?.addEventListener("click", handleArrowClick2);

function handleArrowClick2(_event: Event): void {
    console.log("Called Event Listener");
    let arrow: HTMLSelectElement = <HTMLSelectElement>_event.target;
    

    if (arrow.id == "arrow") {
        document.getElementById("collapseable")!.setAttribute("style", "visibility: visible");
        document.getElementById("arrow")!.setAttribute( "src", "../graphics/buttons/arrowUp.png" );
        document.getElementById("arrow")!.setAttribute( "id", "arrowUp" );
    } else {
        document.getElementById("collapseable")!.setAttribute("style", "visibility: hidden");
        document.getElementById("arrowUp")!.setAttribute( "src", "../graphics/buttons/arrow.png" );
        document.getElementById("arrowUp")!.setAttribute( "id", "arrow" );
    }
}