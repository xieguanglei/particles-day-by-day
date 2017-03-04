(function() {

  var COUNT = 300;  // 粒子个数
  var ANI_DURATION = 2000;  // 动画持续事件
  var DURATION = 1000;  // 单个粒子时间
  var START = 500;  // 500ms 时开始爆炸
  var MIN_SIZE = 5;
  var MAX_SIZE = 15;

  var WIDTH = 500;
  var HEIGHT = 500;


  var RADIUS = Math.max(WIDTH, HEIGHT) * Math.sqrt(2) * 1.2;
  var SPEED = RADIUS / DURATION;
  var ATTENUATION = 1 / DURATION;


  var c = document.getElementById('the-canvas').getContext('2d');

  var points = [];
  for(var i = 0; i < COUNT; i++) {

    var theta = Math.random() * Math.PI * 2;
    var dx = Math.cos(theta);
    var dy = Math.sin(theta);

    var powerFactor = 0.8 + Math.random() * 0.4;

points.push({
  size: MIN_SIZE + Math.random() * (MAX_SIZE - MIN_SIZE),
  color: randomColor(),
  x: 0,
  y: 0,
  powerFactor: powerFactor,
  initialPowerFactor: powerFactor,
  dx: dx,
  dy: dy
})
  }

  var startTime = Date.now();
  var last = startTime;

  animate();

  function animate() {
    var now = Date.now();
    var step = now - last;
    var lasted = now - startTime;

    c.clearRect(0, 0, WIDTH, HEIGHT);

    if (now - startTime > START) {
      for(var i = 0; i < points.length; i++) {
        var p = points[i];
        if (p.powerFactor > 0) {
          p.x += p.dx * step * SPEED * p.powerFactor;
          p.y += p.dy * step * SPEED * p.powerFactor;
          p.powerFactor = p.initialPowerFactor - lasted * ATTENUATION;
        }
        draw(p.x, p.y, p.size, p.color,
          Math.max(0, Math.min(1, 3 * p.powerFactor / p.initialPowerFactor))
        );
      }
    }

    if (now > startTime + ANI_DURATION) {
      startTime = now;
      points.map(function(p) {
        p.x = 0;
        p.y = 0;
        p.powerFactor = p.initialPowerFactor;
      })
    }

    requestAnimationFrame(animate);

    last = now;
  }

  function draw(x, y, size, color, opacity) {
    c.beginPath();
    c.fillStyle = color;
    c.globalAlpha = opacity;
    c.arc(WIDTH / 2 + x, HEIGHT / 2 + y, size, 0, Math.PI * 2, false);
    c.fill();
  }

  function randomColor() {
    const values = _.values(FLATUI_COLORS);
    return values[Math.floor(Math.random() * values.length)]
  }

})();
