
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
      // Grabbing and storing the data-emotion property value from the button
      var emotion = $(this).data("emotion");
      // Constructing a queryURL using the emotion name
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        emotion + "&api_key=dc6zaTOxFJmzC&limit=10";
      // Performing an AJAX request with the queryURL
      $.ajax({
          url: queryURL,
          method: "GET"
        })
        // After data comes back from the request
        .done(function(response) {
          // Empty out the gifs sections of the page before adding new gifs 
          $(".gifs").html("");
          console.log(queryURL);
          console.log(response);
          
          // Loop over the ten gifs (limited to ten in queryURL)
          var gif_array = response.data;
          for (var i = 0; i < gif_array.length; i++) {
            
            var item_div = $('<div class="col-md-4 item">');
            var item_rating = $("<p>").text(gif_array[i].rating);
            var item_img = $("<img>").attr("src", gif_array[i].images.fixed_height_still.url).attr("data-src2", gif_array[i].images.fixed_height.url);
            // Appending the paragraph and image tag to the emotionDiv
            item_div.append(item_img).append(item_rating);
            // Prependng the emotionDiv to the HTML page in the "#gifs-appear-here" div
            $(".gifs").prepend(item_div);
          }
        });
    });

  $(document).on("click", "img", function() {
    var new_src = $(this).data("src2")
    var new_src2 = $(this).attr("src")
    $(this).data("src2", new_src2)
    $(this).attr("src", new_src)

  });

  $(".btn-default").on("click", function() {
    var new_emotion = $("#user_input").val();
    emotions.push(new_emotion)
    display_buttons()
    return false
  });
  
})       
