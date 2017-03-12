(function() {

  var c = document.getElementById('the-canvas').getContext('2d');
  var WIDTH = 500;
  var HEIGHT = 500;
  var COUNT = 50;
  var PADDING = 2;
  var SPEED = 2;

  var points = [];
  for(var i = 0; i < COUNT; i++) {
    var theta = Math.random() * Math.PI * 2 - Math.PI;
    points.push({
      x: Math.random() * WIDTH,
      y: Math.random() * HEIGHT,
      dx: Math.cos(theta),
      dy: Math.sin(theta)
    })
  }

  loop();

  function loop() {
    c.clearRect(0, 0, WIDTH, HEIGHT);
    points.forEach(step);
    points.forEach(draw);
    requestAnimationFrame(loop);
  }


  function wrap(n, min, max) {
    var d = max - min;
    if (n > max) {
      d *= -1;
    }
    while (n <= min || n > max) {
      n += d;
    }
    return n;
  }


  function getNeighbors(p) {

    var closestNeighbor = null;
    var closestDist2 = Infinity;

    var nei = points.filter(function(q) {
      if (p === q) {
        return false;
      }
      var dx = p.x - q.x;
      var dy = p.y - q.y;


      var dist2 = dx * dx + dy * dy;

      if (dist2 < 20 * 20) {
        if (dist2 < closestDist2) {
          closestDist2 = dist2;
          closestNeighbor = q;
        }
        return true;
      } else {
        return false;
      }
    });
    var tooCloseNeighbor = closestDist2 < PADDING * PADDING ? closestNeighbor : null;

    var mean = nei.reduce(function(sum, q) {

      sum.x += q.x;
      sum.y += q.y;
      sum.dx += q.dx;
      sum.dy += q.dy;

      return sum;

    }, {x: 0, y: 0, dx: 0, dy: 0});


    mean.x /= nei.length;
    mean.y /= nei.length;

    var l = Math.sqrt(mean.dx * mean.dx + mean.dy * mean.dy);

    mean.dx /= l;
    mean.dy /= l;

    return {
      neighbors: nei,
      tooCloseNeighbor: tooCloseNeighbor,
      mean: mean
    }
  }


  function step(p) {

    var res = getNeighbors(p);
    if (res.neighbors.length) {

      if (res.tooCloseNeighbor) {
        var mean = res.mean;
        p.dx = mean.x - p.x;
        p.dy = mean.y - p.y;
        var l = Math.sqrt(p.dx * p.dx + p.dy * p.dy);
        p.dx /= -l;
        p.dy /= -l;
      } else {
        var mean = res.mean;
        var ddx = mean.dx - p.dx;
        var ddy = mean.dy - p.dy;

        p.dx += ddx * 0.2;
        p.dy += ddy * 0.2;

        var l = Math.sqrt(p.dx * p.dx + p.dy * p.dy);
        p.dx /= l;
        p.dy /= l;
      }

    }

    p.x += p.dx * SPEED;
    p.y += p.dy * SPEED;

    if (p.x > WIDTH && p.dx > 0) {
      p.x = WIDTH;
      p.dx *= -1;
    } else if (p.x < 0 && p.dx < 0) {
      p.x = 0;
      p.dx *= -1;
    }

    if (p.y > HEIGHT && p.dy > 0) {
      p.y = HEIGHT;
      p.dy *= -1;
    } else if (p.y < 0 && p.dy < 0) {
      p.y = 0;
      p.dy *= -1;
    }

  }

  function draw(p) {
    c.beginPath();
    c.fillStyle = '#7f8c8d';
    c.arc(p.x, p.y, 5, 0, Math.PI * 2, false);
    c.fill();
  }

})();
