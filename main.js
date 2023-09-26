// Constants
const DEBUG = false
const TEST = false

const PADDING = 50
const MAX_SVG_W = window.innerWidth - (PADDING*2)
const MAX_SVG_H = window.innerHeight - (PADDING*2)


// Functions
function log(txt1, txt2) {
    document.getElementById("log").innerHTML += txt1 
    if (txt2) {
        document.getElementById("log").innerHTML += txt2
    } 
    document.getElementById("log").innerHTML += "<br>" 
}

function build_ellipse(start, width, height, angle) {
    // TODO Move start to be top-left corner, not middle left end
    startX = start[0]
    startY = start[1]
    startStr = "M " + startX + "," + startY + " "
    a1 = "a " + (width/2) + "," + (height/2) + " " + angle + " 0,0 " + width + ",0 "
    a2 = "a " + (width/2) + "," + (height/2) + " " + angle + " 0,0 -" + width + ",0 "
    if (DEBUG) {
        console.log(`building ellipse at (${startX}, ${startY}): ${width}x${height}`)
        console.log(`${startStr + a1 + a2}`)
    }
    return startStr + a1 + a2
}

// function build_ellipse_scaled(start, width, height, angle, maxWidth, maxHeight) {
//     startX = start[0]
//     startY = start[1]
//     scaledWidth = width * maxWidth / 100
//     scaledHeight = height * maxHeight / 100
//     console.log(scaledWidth, scaledHeight)
//     startStr = "M " + startX + "," + startY + scaledHeight/2 + " "
//     a1 = "a " + (scaledWidth/2) + "," + (scaledHeight) + " " + angle + " 0,0 " + scaledWidth + ",0 "
//     a2 = "a " + (scaledWidth/2) + "," + (scaledHeight) + " " + angle + " 0,0 -" + scaledWidth + ",0 "
//     return startStr + a1 + a2
// }

function appendPathToSVG(svg, id, d) {
    // REF: https://blog.q-bit.me/how-to-create-svg-elements-with-javascript/
    const path = document.createElementNS('http://www.w3.org/2000/svg','path');
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', 'black');
    path.setAttribute('id', id);
    path.setAttribute('d', d);
    return svg.appendChild(path);
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

// Log statements
// log("Mercury: ", build_ellipse([50,50], 160, 50, 0))
// log(build_ellipse([50,50], 180, 54, 0))
// log(build_ellipse_scaled([0,0], 100, 100, 0, window.innerWidth, window.innerHeight))
// log("Mercury: ", "M 50,50 a 80,50 0 0,0 160,0 a 80,50 0 0,0 -160,0")


// Call functions
function main() {
    var planets = document.getElementsByClassName("planet")
    var ids = ["mercury", "venus", "earth", "mars", "jupiter", "saturn", "uranus", "neptune", "pluto"]
    num_orbits = ids.length
    for (var i = 0; i < num_orbits; i++) {
        scale = i+1
        offset = (MAX_SVG_W/2) * ((num_orbits-scale)/num_orbits)
        // Draw orbits
        appendPathToSVG(
            svg = document.getElementById("orbits"),
            id = ids[i] + "_orbit",
            d = build_ellipse([PADDING+offset,MAX_SVG_H/2+PADDING], MAX_SVG_W/num_orbits*scale, MAX_SVG_H/num_orbits*scale, 0)
        )
        // Give orbit paths to planets
        planet_node = planets[i]
        planet_node.style.top = `0px`
        // NOTE This made its top left corner be at the middle left focus
        // planet_node.style.left = `${PADDING+offset-15}px`
        // planet_node.style.top = `${(MAX_SVG_H/2+PADDING)-15}px`

        // planet_node.setAttribute('top', MAX_SVG_H/2+PADDING)
        // planet_node.style.offsetPath="path('M20,170 L100,20 L180,100 Z')" 
        // planet_node.style.offsetPath = "path(M 198,369.5 a 296,213 0 0,0 592,0 a 296,213 0 0,0 -592,0)"
        planet_node.style.offsetPath = `path('${build_ellipse([PADDING+offset,MAX_SVG_H/2+PADDING], MAX_SVG_W/num_orbits*scale, MAX_SVG_H/num_orbits*scale, 0)}')`
        planet_node.style.animationDuration = `${getRandomArbitrary(1000, 20000)}ms`
        // planet_node.setAttribute('offset-path', `path(${build_ellipse([PADDING+offset,MAX_SVG_H/2+PADDING], MAX_SVG_W/num_orbits*scale, MAX_SVG_H/num_orbits*scale, 0)})`)
        console.log(planet_node)
    }


    if (TEST) {
        appendPathToSVG(
            svg = document.getElementById("orbits"),
            id = "sub_fullscreen_orbit",
            d = build_ellipse([PADDING,MAX_SVG_H/2+PADDING], MAX_SVG_W, MAX_SVG_H, 0)
        )
    }
}




// TO-DO list
// TODO Resize SVG to actual viewing dimensions
// TODO Write function to resize svg and paths on window resize


main()