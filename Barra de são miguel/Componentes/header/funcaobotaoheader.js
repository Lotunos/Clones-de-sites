let zoom = 1;
async function zoomin(){
    zoom += 0.1;
        document.body.style.zoom = zoom;
}
async function zoomout(){
    zoom -= 0.1;
    document.body.style.zoom = zoom;
}
async function inversaodecores(){
    document.body.classList.toggle("inversao");
}
