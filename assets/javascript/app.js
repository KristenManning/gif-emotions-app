
$(document).ready(function() {
  
  var emotions = ["happy", "sad", "angry", "frustrated", "joyful", "amused", "envious", "relaxed", "hopeful", "anxious"]
  
  function display_buttons(){
    $(".buttons_div").html("")
    for (e in emotions){
      $(".buttons_div").append('<button class="btn btn-success" data-emotion="'+emotions[e]+'">'+emotions[e]+'</button>')
    }
  }

  display_buttons()

  $(document).on("click", ".btn-success", function() {

      // create a queryURL that corresponds to the emotion that was clicked on and make an ajax request to giphy 

      var emotion = $(this).data("emotion");
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        emotion + "&api_key=dc6zaTOxFJmzC&limit=12";
      $.ajax({
          url: queryURL,
          method: "GET"
        })
        
        .done(function(response) {
          // Empty out the gifs sections of the page before adding new gifs 
          $(".gifs").html("<p>Click on any gif to start or stop its animation.</p>");
          
          // Then loop over the available gifs (limited to ten in queryURL)
          // add the still image and its rating to the page each time
          // store the animated image as data-src2

          var gif_array = response.data;
          for (var i = 0; i < gif_array.length; i++) {
            
            var item_div = $('<div class="col-md-4 item">');
            var item_rating = $("<p>").text(gif_array[i].rating);
            var item_img = $("<img>").attr("src", gif_array[i].images.fixed_height_still.url).attr("data-src2", gif_array[i].images.fixed_height.url);
            
            item_div.append(item_img).append(item_rating);
            $(".gifs").append(item_div);
          }
        });
    });

  // When a gif is clicked, swap the data-src2 value with the img source
  // src = still & src2 = animated --> src = animated & src2 = still, or vice versa 
  $(document).on("click", "img", function() {
    var new_src = $(this).data("src2")
    var new_src2 = $(this).attr("src")
    $(this).data("src2", new_src2)
    $(this).attr("src", new_src)

  });

  // When a new emotion is submitted, add it to the emotions array and run the display buttons function again to display it  
  $(".btn-default").on("click", function() {
    var new_emotion = $("#user_input").val();
    emotions.push(new_emotion)
    display_buttons()
    return false
  });
  
})       
