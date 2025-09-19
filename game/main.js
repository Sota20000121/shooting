document.getElementById("txt").innerText ="これはゲームです";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let x = 185;
let b = 480;

window.addEventListener("keydown", (e) => {
    if(e.key === "ArrowLeft") {
        x -=10;
    } else if(e.key === "ArrowRight") {
        x +=10;
    } else if(e.key === "space") {
        b = 0;
    }
});

function gameLoop() {
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#7700ff";
    ctx.fillRect(x, 480, 30, 30);

    ctx.fillStyle = "#ff00eaff";
    ctx.fillRect(185, b, 30, 30);
    b -= 10;

    requestAnimationFrame(gameLoop);
}

gameLoop();
