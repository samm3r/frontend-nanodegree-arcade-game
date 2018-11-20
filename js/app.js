// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = 145;
    this.speed = 2;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
};

Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// HandleInputMethod
Player.prototype.handleInput = function(mov) {
    if (mov === 'right' && this.x >= 0 && this.x <= 300) {
        this.x += 100;
    }
    else if(mov === 'left' && this.x >= 100 && this.x <= 400){
        this.x -= 100;
    }
    else if (mov === 'down' && this.y >= -15 && this.y <= 317){
        this.y += 83;
    }
    else if (mov === 'up' && this.y >= 68 && this.y <= 400){
        this.y -= 83;
    }
    this.winGame();
};

Player.prototype.winGame = function() {
    const player = this;
    if (this.y <= 0) {
        setTimeout(function(){
            alert('You win! ;)');
            player.x = 200;
            player.y = 400;
        }, 200);
    }
};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var bug1 = new Enemy();

var player = new Player();

var allEnemies = [bug1]



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

