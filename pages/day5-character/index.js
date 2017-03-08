(function() {

  var c = document.getElementById('the-canvas').getContext('2d');

  var WIDTH = 500;
  var HEIGHT = 500;

  // var points = getPointList('X');


  var words = '你好，世界'.split('');
  var wordsPoints = words.map(getPointList);

  var start = Date.now();

  loop();

  function loop() {

    var duration = 2000;

    var lasted = Date.now() - start;

    var ii = Math.floor(lasted % (duration * words.length) / duration);
    var points = wordsPoints[ii];
    var p = (lasted % duration) / duration;

    var opacity = p < 0.5 ? Math.min(1, 5 * p) : Math.min(1, Math.abs(5 - 5 * p));

    c.clearRect(0, 0, WIDTH, HEIGHT);

    for(var i = 1; i < points.length; i++) {
      var p = points[i];
      p.phase += 0.01;
      var phase = Math.abs(Math.sin(p.phase));
      draw(p.x * WIDTH, p.y * HEIGHT, p.size * phase, p.color, opacity);
    }
    requestAnimationFrame(loop);
  }

  function getPointList(char) {

    var c = document.createElement('canvas');
    c.width = 50;
    c.height = 50;
    var ctx = c.getContext('2d');

    ctx.font = '50px serif';
    ctx.fillStyle = '#999';
    ctx.fillText(char, 0, 40);

    var imageData = ctx.getImageData(0, 0, 50, 50);

    var count = 5000;
    var points = [];
    for(var i = 0; i < count; i++) {
      var x = Math.random();
      var y = Math.random();

      var xi = Math.floor(x * 50);
      var yi = Math.floor(y * 50);
      var a = (yi * 50 + xi) * 4 + 3;

      if (imageData.data[a]) {
        points.push({
          x: x,
          y: y,
          phase: Math.random() * Math.PI * 2,
          color: randomColor(),
          size: Math.random() * 10 + 4
        })
      }
    }

    return points;
  }

  function draw(x, y, size, color, opacity) {
    c.beginPath();
    c.globalAlpha = opacity;
    c.fillStyle = color;
    c.arc(x, y, size, 0, Math.PI * 2, false);
    c.fill();
  }

  function randomColor() {
    const values = _.values(FLATUI_COLORS);
    return values[Math.floor(Math.random() * values.length)]
  }

})();