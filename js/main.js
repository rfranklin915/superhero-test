
var angle = 0;

// target elements with the "draggable" class
interact('.mask-container')
  .draggable({
      // enable inertial throwing
      inertia: true,
      // keep the element within the area of it's parent
      restrict: {
          restriction: "none",
          endOnly: true,
          elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
      },
      // enable autoScroll
      autoScroll: true,

      // call this function on every dragmove event
      onmove: dragMoveListener,
      // call this function on every dragend event
      onend: function (event) {
          var textEl = event.target.querySelector('p');

          textEl && (textEl.textContent =
            'moved a distance of '
            + (Math.sqrt(event.dx * event.dx +
                         event.dy * event.dy) | 0) + 'px');
      }
  })
  .resizable({
      preserveAspectRatio: true,
      edges: { left: true, right: true, bottom: true, top: true }
  })
  .on('resizemove', function (event) {
      var target = event.target,
          x = (parseFloat(target.getAttribute('data-x')) || 0),
          y = (parseFloat(target.getAttribute('data-y')) || 0);

      // update the element's style
      target.style.width  = event.rect.width + 'px';
      target.style.height = event.rect.height + 'px';

      // translate when resizing from top or left edges
      x += event.deltaRect.left;
      y += event.deltaRect.top;

      target.style.webkitTransform = target.style.transform =
          'translate(' + x + 'px,' + y + 'px)';

      target.setAttribute('data-x', x);
      target.setAttribute('data-y', y);
  });

  //  .gesturable({
  //    onmove: function (event) {
  //        var arrow = document.getElementById('mask');

  //        angle += event.da;

  //        arrow.style.webkitTransform =
  //        arrow.style.transform =
  //          'rotate(' + angle + 'deg)';

  //    }
  //});

function dragMoveListener(event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
}

// this is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener;





$(window).load(function () {
    $('.copy-img').click(function () {
        $('.mask-container').removeClass('directions-visible');
        $('canvas').detach();
        html2canvas($('.face-wrapper'), {
            onrendered: function (canvas) {
                $('.centered-result img').detach();
                var myImage = canvas.toDataURL("image/png");
                $('.centered-result').append('<img class="generated-image" src="' + myImage + '"/>');
                $('.mask-container').addClass('directions-visible');

                //scroll down to image
                $('html, body').animate({
                    scrollTop: $('img.generated-image').offset().top
                }, 1000);

            }
        });
        return false;
    });
});