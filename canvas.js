var canvas = document.querySelector('canvas');
// we need this to load the font
var myFont = new FontFace('myFont', 'url(assets/fonts/myFont/myFont.ttf)');

myFont.load().then(function(font){

  // with canvas, if this is ommited won't work
  document.fonts.add(font);

  console.log('Font loaded');

   // set width and height as screen w and h
  //canvas.width = window.innerWidth;
	//canvas.height = window.innerHeight;

	console.log(canvas);

  // get canvas context
	var ctx = canvas.getContext("2d");
	ctx.font = "50px myFont"; // set font
	ctx.textAlign = "center"; // center text
	//ctx.fillText("Hello, World!", canvas.width/2, canvas.height/2); // draw centered text
});	