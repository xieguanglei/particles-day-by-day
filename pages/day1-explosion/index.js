(function() {

  var COUNT = 300;  // 粒子个数
  var ANI_DURATION = 2000;  // 动画持续事件
  var DURATION = 1000;  // 单个粒子时间
  var START = 500;  // 500ms 时开始爆炸
  var END = 1000;   // 2000ms 时结束爆炸
  var MIN_SIZE = 5;
  var MAX_SIZE = 15;
  var WIDTH = 500;
  var HEIGHT = 500;

  var RADIUS = Math.max(WIDTH, HEIGHT) * Math.sqrt(2) * 1.2;
  var SPEED = RADIUS / DURATION;

  var c = document.getElementById('the-canvas').getContext('2d');

  var startTime = Date.now();
  var points = [];
  for(var i = 0; i < COUNT; i++) {

    var theta = Math.random() * Math.PI * 2;
    var dx = Math.cos(theta);
    var dy = Math.sin(theta);

    points.push({
      start: startTime + START + Math.random() * (END - START),
      size: MIN_SIZE + Math.random() * (MAX_SIZE - MIN_SIZE),
      color: randomColor(),
      dx: dx,
      dy: dy
    })
  }


  animate();

  function animate() {
    var now = Date.now();

    c.clearRect(0, 0, WIDTH, HEIGHT);

    for(var i = 0; i < points.length; i++) {
      var p = points[i];

      if (now > p.start && now < p.start + DURATION) {

        var lasted = now - p.start;
        var x = p.dx * lasted * SPEED;
        var y = p.dy * lasted * SPEED;
        draw(x, y, p.size, p.color)
      }
    }
    requestAnimationFrame(animate);

    if (now > startTime + ANI_DURATION) {
      startTime = now;
      points.map(function(p) {
        p.start = now + START + Math.random() * (END - START);
      })
    }
  }

  function draw(x, y, size, color) {
    c.beginPath();
    c.fillStyle = color;
    c.arc(WIDTH / 2 + x, HEIGHT / 2 + y, size, 0, Math.PI * 2, false);
    c.fill();
  }

  function randomColor() {
    const values = _.values(FLATUI_COLORS);
    return values[Math.floor(Math.random() * values.length)]
  }

})();
