(function() {

  var c = document.getElementById('the-canvas').getContext('2d');


  var COUNT = 300;
  var WIDTH = 500;
  var HEIGHT = 500;
  var MIN_SIZE = 5;
  var MAX_SIZE = 15;

  var RADIUS = WIDTH * 1.2;

  var rotateSpeed = Math.PI / 500;
  var radiusFactorSpeed = 1 / 2000;

  var points = [];
  for(var i = 0; i < COUNT; i++) {
    points.push({
      size: MIN_SIZE + Math.random() * (MAX_SIZE - MIN_SIZE),
      color: randomColor(),
      theta: Math.random() * Math.PI * 2,
      radiusFactor: 0.2 + Math.random()
    })
  }

  var startTime = Date.now();

  animate();

  function animate() {
    var now = Date.now();
    var lasted = now - startTime;

    c.clearRect(0, 0, WIDTH, HEIGHT);

    points.forEach(function(p) {
      var theta = p.theta + lasted * rotateSpeed;
      var rf = Math.max(p.radiusFactor - lasted * radiusFactorSpeed, 0);
      var radius = RADIUS * rf;

      const x = Math.cos(theta) * radius;
      const y = Math.sin(theta) * radius;

      draw(x, y, p.size, p.color,
        Math.max(0, Math.min(5 * rf, 1))
      );
    });
    requestAnimationFrame(animate);

  }


  function draw(x, y, size, color, opacity) {
    c.beginPath();
    c.globalAlpha = opacity;
    c.fillStyle = color;
    c.arc(WIDTH / 2 + x, HEIGHT / 2 + y, size, 0, Math.PI * 2, false);
    c.fill();
  }

  function randomColor() {
    const values = _.values(FLATUI_COLORS);
    return values[Math.floor(Math.random() * values.length)]
  }

})();
