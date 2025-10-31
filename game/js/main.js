import { player,initPlayer,drawPlayer} from "./player.js";
import { spawnEnemy, enemies,updateEnemies,drawEnemies } from "./enemies.js";
import { handleCollisions } from "./collision.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

initPlayer(canvas);


export const bullets = [];
const BULLET_SPEED = -5;

function tryshoot() {
    bullets.push({
        x: player.x+13,
        y: player.y,
        width:5,
        height:10,
        vy: BULLET_SPEED,

    })
}

window.addEventListener("keydown", (e) => {
    if(e.key === "ArrowLeft") {
        if(player.x>10){
            player.x -=10;
        }
    } else if(e.key === "ArrowRight") {
        if(player.x<canvas.width - player.width -10){
            player.x +=10;
        }
    } else if(e.code === "Space") {
        tryshoot();
    }
});


function update() {
    for (let i = 0; i < bullets.length ; i++) {
        const bullet = bullets[i];
        bullet.y += bullet.vy;

        if(bullet.y<0){
            bullets.splice(i,1);
        }
    }
    spawnEnemy(canvas);
    updateEnemies(canvas);
    handleCollisions();
}

function draw(){
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawPlayer(ctx);

    ctx.fillStyle = "#7700ff";
    for (let i = 0; i < bullets.length ; i++) {
        const bullet = bullets[i];
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);

    }

    ctx.fillStyle = "#ff00f2ff";
    for (let i = 0; i < enemies.length; i++) {
        const enemy = enemies[i];
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);

    }
    drawEnemies(ctx);

}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
