(function() {

  var width = 100;
  var height = 100;

  getImageData(function(data) {

    var canvas = document.getElementById('the-canvas');

    var padding = canvas.width / width;

    var ctx = canvas.getContext('2d');

    loop();

    function loop() {

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      var phase = (Date.now() % 2000) / 1000;

      for(var i = 0; i < data.length; i++) {

        var x = i % width;
        var y = Math.floor(i / width);
        var h = Math.floor(data[i]);

        var ny = y / width;
        var f = ny < phase ? clamp(1 - (phase - ny), 0, 1) : 0;

        ctx.beginPath();
        ctx.fillStyle = '#' + (h + h * 256 + h * 256 * 256).toString(16);
        ctx.globalAlpha = f;
        ctx.arc(x * padding, y * padding, padding * 0.4, 0, Math.PI * 2, false);
        ctx.fill();

      }

      requestAnimationFrame(loop);
    }

    function clamp(value, min, max) {
      return Math.max(min, Math.min(value, max));
    }


  });


  function getImageData(callback) {

    var canvas = document.createElement('canvas');

    canvas.width = width;
    canvas.height = height;
    canvas.style.width = '500px';
    canvas.style.height = '500px';

    var ctx = canvas.getContext('2d');

    var image = new Image();
    image.src = './lena.jpg';
    image.onload = function() {

      ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, width, height);

      var imageData = ctx.getImageData(0, 0, width, height);
      var arr = imageData.data;

      var data = [];
      for(var i = 0; i < arr.length; i += 4) {
        data.push((arr[i] + arr[i + 1] + arr[i + 2]) / 3);
      }

      callback(data);

    }
  }


})();