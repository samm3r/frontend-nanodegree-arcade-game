class Character {
    constructor(sprite, x, y){
        this.sprite = sprite;
        this.x = x;
        this.y = y;
    }

    // Draw all characters on the screen, required method for game
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

}

// Enemies our player must avoid
class Enemy extends Character {
    constructor(sprite, x , y, speed){
        super(sprite, x, y);
        this.speed = speed;
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt){
        this.x = (this.x <= 606) ? this.x + this.speed * dt : -101;
        this.checkCollision(player);
        
    }

    checkCollision(player){
        const playerX = player.x;
        const playerY = player.y + 107; // Get the y center of the player
        const blockW = 101;


        if ( ((this.y + 77 < playerY) && (this.y + 145 > playerY))
            && (((this.x + blockW/2 + 30 > playerX + 27) && (this.x < playerX + 27)) || ((this.x < playerX + 74) && (this.x + blockW/2 + 30 > playerX + 74))) ) {

            setTimeout(() => {
                window.alert('You lose! :(');
                player.resetGame();
                player.score = 0;
                this.resetEnemy();
            }, 5);
        }
        
    }

    resetEnemy(){
        this.x = -101;
    }


}

// Your player
class Player extends Character {
    constructor(sprite, spriteL, x = 200, y = 400){
        super(sprite, x, y);
        this.spriteR = sprite;
        this.spriteL = spriteL;
        this.score = 0;
    }

    // HandleInputMethod
    handleInput(mov){
        if (mov === 'right' && this.x <= 300) {
            this.x += 100;
            this.sprite = this.spriteR;
        }
        else if(mov === 'left' && this.x >= 100){
            this.x -= 100;
            this.sprite = this.spriteL;
        }
        else if (mov === 'down' && this.y <= 317){
            this.y += 83;
        }
        else if (mov === 'up' && this.y >= 68){
            this.y -= 83;
        }
        this.winGame();
    }

    // Update the player's position, required method for game
    update(dt){

    }

    // Detect when the player wins the game
    // and show a message on the screen
    winGame(){
        if (this.y <= 0) {
            setTimeout(() => {
                alert('You win! ;)');
                this.resetGame();
            }, 50);

            this.score += 100;
        }
        
        console.log(this.score);
    }

    // Send the player back to
    // the initial position
    resetGame(){
        player.x = 200;
        player.y = 400;
    }
}



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var bug1 = new Enemy('images/enemy-kodo.png', -101, 145, 270);
var bug2 = new Enemy('images/enemy-blob.png', 0, 228, 340);

var player = new Player('images/char-bender-right.png', 'images/char-bender-left.png');

var allEnemies = [bug1, bug2]



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
