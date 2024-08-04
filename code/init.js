const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let mousedown = false
let mouseclick = false
document.onmousedown = function (event) {
    mouseclick = true
    mousedown = true
}
document.onmouseup = function (event) {
    mouseclick = false
    mousedown = false
}
let mouseX = 0
let mouseY = 0
document.onmousemove = function (event) {
    mouseX = event.x;
    mouseY = event.y;
}
const keysPressed = []
document.onkeydown = function (event) {
    if (!keysPressed.includes(event.key)) keysPressed.push(event.key);
}
document.onkeyup = function (event) {
    if (keysPressed.includes(event.key)) keysPressed = keysPressed.slice(0, keysPressed.indexOf(event.key)) + keysPressed.slice(keysPressed.indexOf(event.key) + 1);
}