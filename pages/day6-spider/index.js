(function() {

  var cvs = document.getElementById('the-canvas');
  var cvsLeft = cvs.offsetLeft;
  var cvsTop = cvs.offsetTop;
  var c = cvs.getContext('2d');

  var COUNT = 400;
  var WIDTH = 500;
  var HEIGHT = 500;

  var cx = null;
  var cy = null;

  var points = [];

  for(var i = 0; i < COUNT; i++) {
    var theta = Math.random() * Math.PI * 2;
    points.push({
      x: Math.random() * WIDTH,
      y: Math.random() * HEIGHT,
      dx: Math.cos(theta),
      dy: Math.sin(theta),
      speed: (Math.random() + 3) * 0.5
    })
  }


  cvs.addEventListener('mousemove', function(e) {
    cx = e.pageX - cvsLeft;
    cy = e.pageY - cvsTop;
  });


  loop();


  function loop() {
    c.clearRect(0, 0, WIDTH, HEIGHT);
    for(var i = 0; i < points.length; i++) {
      var p = points[i];
      p.x += p.dx * p.speed;
      p.y += p.dy * p.speed;

      p.x = (p.x + WIDTH) % WIDTH;
      p.y = (p.y + HEIGHT) % HEIGHT;

      drawPoint(p.x, p.y, 2, '#2c3e50', 1)
    }
    var np = getNeighbors(cx, cy);
    for(var j = 0; j < np.length; j++) {
      var n = np[j];
      drawLine(cx, cy, n.x, n.y, '#2c3e50', 1);
    }


    requestAnimationFrame(loop);
  }


  function getNeighbors(x, y) {
    var list = [];
    for(var i = 0; i < points.length; i++) {
      var p = points[i];
      var dx = Math.abs(x - p.x);
      var dy = Math.abs(y - p.y);
      if (dx * dx + dy * dy < 70 * 70) {
        list.push({
          index: i,
          x: p.x,
          y: p.y,
          d: Math.sqrt(dx * dx + dy * dy)
        });
      }
    }
    return list;
  }


  function drawPoint(x, y, size, color, opacity) {
    c.beginPath();
    c.globalAlpha = opacity;
    c.fillStyle = color;
    c.arc(x, y, size, 0, Math.PI * 2, false);
    c.fill();
  }

  function drawLine(x1, y1, x2, y2, color, opacity) {
    c.beginPath();
    c.moveTo(x1, y1);
    c.lineTo(x2, y2);
    c.fillStyle = color;
    c.globalAlpha = opacity;
    c.stroke();
  }


})();
