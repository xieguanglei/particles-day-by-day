(function() {

  var c = document.getElementById('the-canvas').getContext('2d');



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
