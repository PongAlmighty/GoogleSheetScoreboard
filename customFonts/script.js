// setup
var c = document.createElement('canvas');
var ctx = c.getContext('2d');
var W, H;
document.body.appendChild(c);

// wow, very responsive, such resize
function resize(){
  // dim
  W = c.width = window.innerWidth;
  H = c.height = window.innerHeight

  // bg
  ctx.fillStyle = '#222';
  ctx.fillRect(0, 0, W, H)
}
resize();

// display the fucking text
function displayText(){
  // boring
  ctx.fillStyle = '#fff';
  ctx.textBaseline = 'top';
  
  ctx.font = "72px 'Press Start 2P'";
  ctx.fillText('Hello', W/2 - 180, H/2 - 140); // txt, offsetX, offsetY
  
  ctx.font = "bold 72px 'Press Start 2P'";
  ctx.fillText('World', W/2 - 50, H/2);
}

// async font loading
// https://github.com/typekit/webfontloader
WebFont.load({
  google: {
    families: ['Press Start 2P', 'Press+Start+2P:bold']
  },
  active: function() {
    displayText();
  }
});

// resize handler
window.addEventListener('resize', function(){ 
  resize();
  displayText();
}, false)