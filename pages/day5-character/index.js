(function() {

  var c = document.getElementById('the-canvas').getContext('2d');

  var WIDTH = 500;
  var HEIGHT = 500;


  var points = getPointList();
  console.log(points);

  for(var i = 1; i < points.length; i++) {
    var p = points[i];
    draw(p.x * WIDTH, p.y * HEIGHT, 5, '#999', 1);
  }


  function getPointList() {

    var c = document.createElement('canvas');
    document.body.appendChild(c);
    c.width = 50;
    c.height = 50;
    var ctx = c.getContext('2d');

    ctx.font = '50px serif';
    ctx.fillStyle = '#999';
    ctx.fillText('E', 8, 45);

    var imageData = ctx.getImageData(0, 0, 50, 50);

    var count = 10000;
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
          y: y
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


})();