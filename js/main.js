
        $(document).on('ready', function(){
            //hide add images button on page load with ID hide
            $('#hide').hide();
            // 1.   Accept a string value called `tags` as an argument.
            var searchImages = function(tags) {
           // 2. Define the location of the Flickr API
                var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
                console.log(tags);
                $('#images').innerHTML = '<li class="search-throbber">Searching...</li>';
                // 3.   Construct a `$.getJSON()` call where you send a request object
                //      including the tags the user submitted,
                $.getJSON( flickerAPI, {
                    tags: tags,
                    tagmode: "all",
                    format: "json"
                })
                //      done() handler that displays and refreshes the content appropriately.
                .done(function( data ) {
                    $("#images").empty();
                    $('h1.search-title').first()[0].innerHTML = "Searching for: " + tags;
                    $.each( data.items, function( i, item ) {
                        // 4.   Update the display to add the images to the list with the id
                        //      `#images`.
                        var newListItem = $('<li>');
                        $( "<img>").attr("src", item.media.m).appendTo(newListItem);
                        $("<br><br>").appendTo(newListItem);

                  var newButton = $("<button class='btn btn-sm btn-primary'>enlarge</button>").attr({
                            'data-title': item.title,
                            'data-toggle': "modal",
                            'data-target': "#infoModal",
                            'data-imgsrc': item.media.m,
                            'data-description': item.description,
                            'type': "button"
                        }).appendTo(newListItem);

                        newListItem.appendTo( "#images" );

                        //add CSS to page when search results appear
                        $("#images").css("column-count", "4");
                        $("ul#images li").css("background-color", "#00245D");
                        $("ul#images li").css("box-shadow", "2px 2px 4px 0 #ccc");
                        //number of items to search for
                        if ( i === 15 ) {
                            return false;
                        }
                       //hide li elements after search
                        $(function(){
                            $('li').hide()
                            })
                        });
                    });
            };
            $("button.search").on("click", function(event) {
                //show add images button with ID hidden
                $('#hide').show();
                // 1.   Prevent the default event execution so the browser doesn't
                //      Example: `event.preventDefault();`
                event.preventDefault();
                // 2.   Get the value of the 'input[name="searchText"]' and use that
                //      as the `tags` value you send to `searchImages()`.
                var searchTextInput = $(event.target.parentElement).find('input[name="searchText"]')[0];
                // 3.   Execute the `searchImages()` function to fetch images for the
                //      user.
                console.log(searchTextInput);
                searchImages(searchTextInput.value);
            });

                // Modal popup section
            $('#infoModal').on('show.bs.modal', function (event) {
                var button = $(event.relatedTarget); // Button that triggered the modal
                var title = button.data('title'); // Extract info from data-* attributes
                var imgSrc = button.data('imgsrc');
                var imageDescription = button.data('description');

                // Update the modal's content. We'll use jQuery here.
                var modal = $(this);
                modal.find('.modal-title').html(title);
                var modalBody = modal.find('.modal-body');
                modalBody.empty();
                var modalDescription = $("<p class='image-description'>").html(imageDescription).appendTo(modalBody);
            });
                //add new image function
                $('.container').each(function() {

            //find first().siblings() and hide()
                $(this).find('li').first().siblings().hide();

                //when add button is pressed find li:first child of container
                $(this).find('.add').click(function () {
                    $('#li').next().hide();
                    $(this)
                        .parent('.container')
                        .find('li:first-child')
                        .fadeOut(function () {  //get first-child of parent and append to li
                        $(this)
                            .parent()
                            .find('li:first-child')
                            .fadeIn()
                            $(this)
                                .appendTo($(this).parent())
                            });
                      });
                ///previous/remove function -- not implemented yet
                $(this).find('.prev').click(function () {
                    $(this)
                        .parent('.container')
                        .find('li:first-child')
                        .fadeOut(function () {
                        $(this)
                            .parent()
                            .find('li:last-child')
                            .fadeIn()
                            .prependTo($(this).parent())
                      });
                });
            });
      });
