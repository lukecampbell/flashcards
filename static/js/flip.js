function initFlip() {
    $("#card").on("click", flipCard);
}

function initKeyHandlers() {
    $(document).keydown(function(e) {
      switch(e.which) {
        case 37:
          console.log("Left");
          break;
        case 38:
          console.log("Up");
          break;
        case 39:
          console.log("Right");
          location.reload();
        case 40:
          console.log("Down");
          break;
        case 13:
          flipCard();
          break;
        default: console.log(e.keyCode);
      }
    });
}


function flipCard() {
    $("#card").toggleClass("flipped");
}


