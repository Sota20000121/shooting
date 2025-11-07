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

function updateScore() {
    const scoreBoard = document.getElementById("scoreBoard");
    scoreBoard.innerText = `Score: ${player.score}`;
    const lifeBoard = document.getElementById("lifeBoard");
    lifeBoard.innerText = `Life: ${player.life}`;
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
    updateScore();
}

function draw(){
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawPlayer(ctx);

    for (let i = 0; i < bullets.length ; i++) {
        const bullet = bullets[i];

        // 発光（ぼかし）レイヤー
        ctx.save();
        ctx.fillStyle = "#7700ff";         
        ctx.shadowBlur = 10;            
        ctx.shadowColor = "#7700ff";
        ctx.fillRect(bullet.x - 2, bullet.y - 2, bullet.width + 4, bullet.height + 4);
        ctx.restore();

        // 弾本体（コア）
        ctx.fillStyle = "#fff";
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
