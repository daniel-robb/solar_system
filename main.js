function log(txt1, txt2) {
    document.getElementById("log").innerHTML += txt1 
    if (txt2) {
        document.getElementById("log").innerHTML += txt2
    } 
    document.getElementById("log").innerHTML += "<br>" 
}
function build_ellipse(start, width, height, angle) {
    startX = start[0]
    startY = start[1]
    startStr = "M " + startX + "," + startY + " "
    a1 = "a " + (width/2) + "," + (height) + " " + angle + " 0,0 " + width + ",0 "
    a2 = "a " + (width/2) + "," + (height) + " " + angle + " 0,0 -" + width + ",0 "
    return startStr + a1 + a2
}

log("Mercury: ", build_ellipse([50,50], 160, 50, 0))
log("Mercury: ", "M 50,50 a 80,50 0 0,0 160,0 a 80,50 0 0,0 -160,0")

var newPath = document.createElement("path");
newPath.fill = "none";
newPath.stroke = "black";
newPath.id = "newPath";
newPath.d = build_ellipse([50,50], 160, 50, 0);
newPath.position = "relative"
console.log(newPath)
document.getElementById("orbits").appendChild(newPath);