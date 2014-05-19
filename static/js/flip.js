function initFlip() {
    $("#card").on("click", function(){
        console.log("hi");
        $("#card").toggleClass("flipped");
    });
}

