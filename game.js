var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var keys = [];
var keysup = [];
var wizard = new Image();
wizard.src = 'Wizard.bmp';
var lightning = new Image();
lightning.src = 'lightning.bmp';
var blackback = new Image();
blackback.src = 'blackback.bmp';
var started = false;
var mouseIsDown = false;
var mousePosition = [];
var Game = {};
  Game.projectiles = [];
window.onmousedown = function(e){
    mouseIsDown = true;
}
window.onmouseup = function(e){
    mouseIsDown = false;
}
window.addEventListener("keydown", function(e) {
    keys[e.keyCode] = true;
});

window.addEventListener("keyup", function(e) {
    keys[e.keyCode] = false;
});
function getMousePos(canvas, e) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        };
      }
window.addEventListener("mouseenter", function (e)
{
    if(!started){
        started = true;
    }
});
canvas.addEventListener("mouseleave", function (e)
{
    started = false;
});
window.addEventListener('mousemove', function(e)
{
        var mousePos = getMousePos(canvas, e);
        mousePosition = getMousePos(canvas, e);
}, false);



var blocks = [];
var Block = function(x,y)
{
    this.x = x;
    this.y = y;
    this.drawblock = function(ctx)
    {
      ctx.fillStyle = 'grey';
      ctx.fillRect(x,y,40,40);
    };
    this.collisionUpdate = function()
    {
        if((player1.x < this.x) && this.x - player1.x <= 40 && this.y - player1.y <= 40 && player1.y - this.y <=40 )
        {
          player1.x -= 3;
        }
        if((player1.x > this.x) && player1.x - this.x <= 40 && this.y - player1.y <= 40 && player1.y - this.y <=40 )
        {
          player1.x += 3;
        }
        if((player1.y > this.y) && player1.y - this.y <= 40 && this.x - player1.x <= 40 && player1.x - this.x <=40 )
        {
          player1.y += 3;
        }
        if((player1.y < this.y) && this.y - player1.y <= 40 && this.x - player1.x <= 40 && player1.x - this.x <=40 )
        {
          player1.y -= 3;
        }
    };

};

var lightningBolt = function(x, y, mx, my, age, speed)
{
  this.x = x;
  this.y = y;
  this.mx = mx;
  this.my = my;
  this.age = age;
  this.alive = true;
  this.speed = speed
  this.CollisionUpdate = function()
  {



  };
  this.update = function(ctx)
  {
    this.age -= 1
    this.alive = (this.age > 0) ? true : false
    if (canvas.width - this.x < 3)
    {
      this.mx *= -1;
    }
    if (this.x - 1 < 3)
    {
      this.mx *= -1;
    }
    if (canvas.height - this.y < 3)
    {
      this.my *= -1;
    }
    if (this.y - 1 < 3)
    {
      this.my *= -1;
    }


    
    var norm = Math.sqrt(mx*mx + my*my) // for direction
    this.x -= this.speed * this.mx / (norm);
    this.y -= this.speed * this.my / (norm);
    this.draw(ctx);


  };
  this.draw = function(ctx)
  {
    var size = 10
    ctx.save();
    ctx.translate(this.x + size/2, this.y + size/2)
    ctx.rotate(Math.random()*Math.PI*2)
    ctx.beginPath();
    ctx.strokeStyle="yellow";
    ctx.rect(-size/4, -size/4, size, size);
    ctx.stroke();
    ctx.closePath();
    ctx.restore()
  };
}


var player = function(x,y,hearts,mana,leftcol,rightcol,upcol,downcol)
{
  this.x = x;
  this.y = y;
  this.hearts = hearts;
  this.mana = mana;
  this.leftcol = leftcol;
  this.rightcol = rightcol;
  this.upcol = upcol;
  this.downcol = downcol;
  this.draw = function(ctx)
  {
    ctx.drawImage(wizard,this.x,this.y,40,40);
  };
  this.DrawManaMeter = function(ctx)
  {
    ctx.fillStyle = 'blue';
    ctx.fillRect(0,5,this.mana,10);

  }
  this.shoot = function()
  {
      Game.projectiles.push(new lightningBolt(this.x+30, this.y+5,
          this.x - mousePosition.x, this.y - mousePosition.y, 70, 10));
  };
};

function update()
{
	if(keys[68])
  {
    if (!player1.rightcol)
      player1.x += 3;
	}
	if(keys[65])
  {
    if(!player1.leftcol)
		player1.x -= 3;
	}
  if(keys[87])
  {
    if(!player1.upcol)
		player1.y -= 3;
	}
  if(keys[83])
  {
    if(!player1.downcol)
    player1.y += 3;
	}
  if(mouseIsDown)
  {
    if (player1.mana >= 5)
    {
      player1.shoot();
      player1.mana -= 2;
    }
  }
  if(!mouseIsDown)
  {
    if (player1.mana < 100)
    {
      player1.mana += 1;
    }
  }
}
render = function()
{
  ctx.clearRect(0,0,canvas.width,canvas.height);
  update();

  ctx.fillStyle = "#000"
  ctx.fillRect(0,0,canvas.width, canvas.height);
  //this should just keep the alive Game.projectiles
  Game.projectiles = Game.projectiles.filter(function(i) {return i.alive})
  Game.projectiles.forEach(function(i) { i.update(ctx);})
  blocks.forEach(function(i) { i.drawblock(ctx);})

  player1.DrawManaMeter(ctx);
  player1.draw(ctx);
  blocks.forEach(function(i) {i.collisionUpdate();})
  requestAnimationFrame(render);
}
function main()
{
  player1 = new player(400,400,5,100,false,false,false,false);
  var randomBlockNum = Math.floor(Math.random() * 10) + 1;
  for (var i = 0; i < randomBlockNum; i++)
  {
    blocks.push(new Block(canvas.width/(Math.floor(Math.random() * 10) + 1),canvas.height/ (Math.floor(Math.random() * 10) + 1 )) );

  }
  render();
}
