var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var keys = [];
var keysup = [];
var wizard = new Image();
wizard.src = 'wizard.bmp';
var lightning = new Image();
lightning.src = 'lightning.bmp';
var started = false;
var mouseIsDown = false;
var mousePosition = [];
window.onmousedown = function(e){
    mouseIsDown = true;
    player1.shoot(ctx);
    player1.isShooting = true;

    console.log('mouse down');
}
window.onmouseup = function(e){
    mouseIsDown = false;
    player1.shoot(ctx);
    player1.isShooting = false;
    console.log('mouse up');
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
        console.log('mouse enter');
    }
});

canvas.addEventListener("mouseleave", function (e)
{
    started = false;
    console.log('mouse exit');
});
window.addEventListener('mousemove', function(e) {
        var mousePos = getMousePos(canvas, e);
        mousePosition = getMousePos(canvas, e);
        //console.log(e.clientX, e.clientY);
      }, false);


var lightningBolts = [];
var lightningBolt = function(direction)
{
  this.x = x;
  this.y = y;

  this.draw = function(ctx)
  {

  };
}


var player = function(x,y,hearts,isShooting)
{
  this.isShooting = isShooting;
  this.x = x;
  this.y = y;
  this.hearts = hearts;
  this.draw = function(ctx)
  {
    ctx.drawImage(wizard,this.x,this.y,40,40);

  };
  /*
  this.update = function(ctx)
  {


  };
  */
  this.shoot = function(ctx)
  {
      if (this.isShooting)
      {
        console.log('shooting');
        ctx.beginPath();
        ctx.moveTo(this.x+35, this.y+6);
        ctx.lineTo(mousePosition.x, mousePosition.y);
        //console.log(mousePosition.x, mousePosition.y)
        ctx.strokeStyle="yellow";
        ctx.lineWidth = 6;
        ctx.stroke();
      }

  }
};

player1 = new player(0,0,5,false);
/*
var drawMaps =
{
  drawLevelOne: function()
  {
    for(var i = 0; i < 10; i++)
    {
      grassTiles[i] = new grassSquare(0,0);
    }

  }


};
*/

function update(mod)
{
	if(keys[68])
  {
		player1.x += 3;
	}
	if(keys[65])
  {
		player1.x -= 3;
	}
  if(keys[87])
  {
		player1.y -= 3;
	}
  if(keys[83])
  {
    player1.y += 3;
	}






  /*
  if(keys[87])
  {
    player1.shoot('up');
	}

  if(keys[83])
  {
    player1.shoot('down');
	}

  if(keys[68])
  {
    player1.shoot('right');
  }

  if(keys[65])
  {
    player1.shoot('left');
  }
*/


}
render = function()
{

  ctx.fillRect(0,0,canvas.width,canvas.height);
  update(null);
  player1.draw(ctx);
  player1.shoot(ctx);
  requestAnimationFrame(render);
}
function main()
{
  render();
}
