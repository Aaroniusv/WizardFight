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
    player1.isShooting = true;
    //player1.shoot(ctx);
    //console.log('mouse down');
}
window.onmouseup = function(e){
    mouseIsDown = false;
    player1.isShooting = false;

    //player1.shoot(ctx);
    //console.log('mouse up');
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
        //console.log('mouse enter');
    }
});
canvas.addEventListener("mouseleave", function (e)
{
    started = false;
    //console.log('mouse exit');
});
window.addEventListener('mousemove', function(e)
{
        var mousePos = getMousePos(canvas, e);
        mousePosition = getMousePos(canvas, e);
        //console.log(e.clientX, e.clientY);
}, false);


var bolts = [];
var lightningBolt = function(x,y,mx,my)
{
  this.x = x;
  this.y = y;
  this.mx = mx;
  this.my = my;
  this.update = function(ctx)
  {
    //console.log(this.mx,this.my);
    this.draw(ctx);
    this.x += 5;
    this.y += 5;

  };
  this.draw = function(ctx)
  {
    ctx.strokeStyle="yellow";
    ctx.rect(this.x,this.y,10,10);
    ctx.stroke();
    //console.log("trying to draw lightning...");
  };
}


var player = function(x,y,hearts,isShooting)
{
  this.x = x;
  this.y = y;
  this.hearts = hearts;
  this.isShooting = isShooting;
  this.draw = function(ctx)
  {
    ctx.drawImage(wizard,this.x,this.y,40,40);
  };

  this.shoot = function()
  {
    if(this.isShooting)
    {
      var i = 0;
      console.log("shooting");
      bolts[i] = new lightningBolt(this.x+30,this.y+5,mousePosition.x,mousePosition.y);

      i++;

    }
    else if(!this.isShooting)
    {
      console.log("not shooting");

    }
  }
};

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

}
render = function()
{
  ctx.fillStyle="black";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  //ctx.clearRect(0,0,canvas.x,canvas.y);
  bolts.forEach(function(i) { i.update(ctx);})


  update(null);
  player1.draw(ctx);
  player1.shoot(ctx);
  requestAnimationFrame(render);

}
function main()
{
  player1 = new player(0,0,5,false);
  render();
}
