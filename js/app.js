class Character {
    constructor(sprite, x, y){
        // this.sprite = 'images/enemy-bug.png';
        this.sprite = sprite;
        this.x = x;
        this.y = y;
        // this.speed = speed;
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
    }
}

// Your player
class Player extends Character {
    constructor(sprite, x = 200, y = 400){
        super(sprite, x, y);
        this.score = 0;
    }

    // HandleInputMethod
    handleInput(mov){
        if (mov === 'right' && this.x <= 300) {
            this.x += 100;
        }
        else if(mov === 'left' && this.x >= 100){
            this.x -= 100;
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
        const player = this;
        if (this.y <= 0) {
            setTimeout(function(){
                alert('You win! ;)');
                player.resetGame();
            }, 50);
        }
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

var bug1 = new Enemy('images/enemy-bug.png', -101, 145, 270);
var bug2 = new Enemy('images/enemy-bug.png', -101, 228, 180);

var player = new Player('images/char-boy.png');

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

