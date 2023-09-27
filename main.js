// Constants
const DEBUG = false
const TEST = false
const DRAW_PLANETS = true
const UNIFORM_ORBITS = false

const IDS = ["mercury", "venus", "earth", "mars", "jupiter", "saturn", "uranus", "neptune", "pluto"]
const NUM_PLANETS = IDS.length
const PLANET_CLASS = document.getElementsByClassName("planet")

// Global Variables
var padding = 0
var max_svg_w = window.innerWidth - (padding*2)
var max_svg_h = window.innerHeight - (padding*2)

// Resource: https://public.nrao.edu/ask/which-planet-orbits-our-sun-the-fastest/
// "       " https://solarsystem.nasa.gov/resources/686/solar-system-sizes/
// "       " https://nssdc.gsfc.nasa.gov/planetary/factsheet/index.html
// ???       https://space-facts.com/planet-orbits/
// ???       https://www.qrg.northwestern.edu/projects/vss/docs/space-environment/3-orbital-lengths-distances.html

var planets = {
    mercury: {
        name: "mercury",
        radius: 2440,
        orbital_speed: 47.87,
        perihelion: 46.0, //million (10^6) km
        aphelion: 69.8,
        color: "#B7B8B9"
    }, 
    venus: {
        name: "venus",
        radius: 6052,
        orbital_speed: 35.02,
        perihelion: 107.5,
        aphelion: 108.9,
        color: "#a57c1b"
    }, 
    earth: {
        name: "earth",
        radius: 6371,
        orbital_speed: 29.78,
        perihelion: 147.1,
        aphelion: 152.1,
        color: "#4f4cb0"
    }, 
    mars: {
        name: "mars",
        radius: 3390,
        orbital_speed: 24.077,
        perihelion: 206.7,
        aphelion: 249.3,
        color: "#f0e7e7"
    }, 
    jupiter: {
        name: "jupiter",
        radius: 69911,
        orbital_speed: 13.07,
        perihelion: 740.6,
        aphelion: 816.4,
        color: "#ddbca6"
    }, 
    saturn: {
        name: "saturn",
        radius: 58232,
        orbital_speed: 9.69,
        perihelion: 1357.6,
        aphelion: 1506.5,
        color: "#ceb8b8"
    }, 
    uranus: {
        name: "uranus",
        radius: 25362,
        orbital_speed: 6.81,
        perihelion: 2732.7,
        aphelion: 3001.4,
        color: "#5b5ddf"
    }, 
    neptune: {
        name: "neptune",
        radius: 24622,
        orbital_speed: 5.43,
        perihelion: 4471.1,
        aphelion: 4558.9,
        color: "#ACE5EE"
    }, 
    pluto: {
        name: "pluto",
        radius: 1151,
        orbital_speed: 4.74,
        perihelion: 4436.8,
        aphelion: 7375.9,
        color: "#9ca6b7"
    }
} 	 	 	 	 	

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
    var path = document.createElementNS('http://www.w3.org/2000/svg','path');
    path.setAttribute('fill', 'none');
    // path.setAttribute('stroke', 'black');
    path.setAttribute('stroke', 'rgb(73, 73, 73)');
    path.setAttribute('id', id);
    path.setAttribute('d', d);
    return svg.appendChild(path);
}

function changePathD(path, d) {
    path.setAttribute('d', d);
}

function randFloatBetween(min, max) {
    return Math.random() * (max - min) + min;
}

function resizeModel() {
    var padding = 0
    var max_svg_w = window.innerWidth - (padding*2)
    var max_svg_h = window.innerHeight - (padding*2)
    for (var i = 0; i < NUM_PLANETS; i++) {
        planet_node = PLANET_CLASS[i]
        aph = planets[planet_node.id].aphelion
        peri = planets[planet_node.id].perihelion
        if (UNIFORM_ORBITS) {
            scale = i+1
            offset = (max_svg_w/2) * ((NUM_PLANETS-scale)/NUM_PLANETS)
            start = [padding+offset,max_svg_h/2+padding]
            width = max_svg_w/NUM_PLANETS*scale
            height = max_svg_h/NUM_PLANETS*scale
        } else {
            start = [padding+max_svg_w/2-aph/14,max_svg_h/2+padding]
            width = aph/14*2
            height = peri/14*2
        }
        // Re-set orbits
        changePathD(
            path = document.getElementById(`${IDS[i]}_orbit`),
            d = build_ellipse(start, width, height, 0)
        )
        // Re-set planets' orbit paths
        if (DRAW_PLANETS) {
            planet_node.style.offsetPath = `path('${build_ellipse(start, width, height, 0)}')`
        }
    }
}

// Log statements
// log("Mercury: ", build_ellipse([50,50], 160, 50, 0))
// log(build_ellipse([50,50], 180, 54, 0))
// log(build_ellipse_scaled([0,0], 100, 100, 0, window.innerWidth, window.innerHeight))
// log("Mercury: ", "M 50,50 a 80,50 0 0,0 160,0 a 80,50 0 0,0 -160,0")


// Call functions
function main() {
    for (var i = 0; i < NUM_PLANETS; i++) {
        planet_node = PLANET_CLASS[i]
        aph = planets[planet_node.id].aphelion
        peri = planets[planet_node.id].perihelion
        scale = i+1
        offset = (max_svg_w/2) * ((NUM_PLANETS-scale)/NUM_PLANETS)
        // Draw orbits
        if (UNIFORM_ORBITS) {
            scale = i+1
            offset = (max_svg_w/2) * ((NUM_PLANETS-scale)/NUM_PLANETS)
            start = [padding+offset,max_svg_h/2+padding]
            width = max_svg_w/NUM_PLANETS*scale
            height = max_svg_h/NUM_PLANETS*scale
        } else {
            start = [padding+max_svg_w/2-aph/14,max_svg_h/2+padding]
            width = aph/14*2
            height = peri/14*2
        }
        appendPathToSVG(
            svg = document.getElementById("orbits"),
            id = IDS[i] + "_orbit",
            d = build_ellipse(start, width, height, 0)
        )

        if (DRAW_PLANETS) {
            planet_node.style.top = `0px`
            planet_node.style.width = `${15 + (planets[planet_node.id].radius*2/2000)}px` // Base 15px + diameter(km) / 2000
            planet_node.style.height = `${15 + (planets[planet_node.id].radius*2/2000)}px`
            planet_node.style.backgroundColor = `${planets[planet_node.id].color}`
            // Give orbit paths to planets
            planet_node.style.offsetPath = `path('${build_ellipse(start, width, height, 0)}')`
            planet_node.style.animationDuration = `${200000 / planets[planet_node.id].orbital_speed}ms` // NOTE: orbital speed is stored in km/s, multiplied by 3s
        } else {
            planet_node.style.width = `0px`
            planet_node.style.height = `0px`
        }
    }

    var date = new Date()
    
    seconds = date.getHours()*60*60 + date.getMinutes()*60 + date.getSeconds()
    scaled = seconds / 86400 * 100
    // document.getElementById("sky").style.opacity = `${scaled}%`
    setInterval(() => {
        date = new Date()
        // TODO Adjust the max val in scaled to account for a min of daybreak and a max of sunset
        seconds = date.getHours()*60*60 + date.getMinutes()*60 + date.getSeconds()
        scaled = seconds / 86400 * 100
        // document.getElementById("sky").style.opacity = `${scaled}%`
    }, 1000);



    if (TEST) {
        appendPathToSVG(
            svg = document.getElementById("orbits"),
            id = "sub_fullscreen_orbit",
            d = build_ellipse([padding,max_svg_h/2+padding], max_svg_w, max_svg_h, 0)
        )
    }
}

addEventListener("resize", () => {
    resizeModel();
});




// TO-DO list
// TODO Resize SVG to actual viewing dimensions
// TODO Write function to resize svg and paths on window resize


main()