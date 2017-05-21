// jQuery Document
$(document).ready(function() {
    // Do some initial setup
    getName();
    buildMessages();

    // poll for new messages every 2.5 seconds
    var msgInterval = setInterval(buildMessages, 2500);
    var listofusers = [];

    $("#post-name").click(function() {
        postName();
    });

    // Set the user to empty string
    $("#logout").click(function() {
        logout();
    });

    // Stop polling for messages. You will have to reload the
    // page to start polling again.
    $("#pause").click(function() {
        var exit = confirm("Are you sure you want to end the session?");
        if (exit == true) {
            clearInterval(msgInterval);
        }
    });

    $("#submitmsg").click(function() {
        var username = $(".name")[0].innerHTML;
        var mesg = $("#usermsg")[0].value;
        var data = username + ": " + mesg;

	$.post("/addmsg", {'text': data}, function(resp){
          console.log(resp);
        });

        return false;
    });

    // Get the user name from the server by making an
    // ajax GET request to the url "/name"
    // The callback function on success will call updateUI
    // with the new value for name
    function getName() {
        $.ajax({
          url: "/name",
          type: "GET",
          success: function(response) {
              var name = response['name'];
              listofusers = response['list'];
              updateUI(name);
              updateUsers(listofusers);
          }
        });

    }

    // Send the user name to the server
    function postName() {
        var name = $("#user-name").val();

        // Clear the text field
        $("#user-name").val("");

        $.ajax({
            url: "/name",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify( { "name": name } ),
            success: function(response) {
                var name = response['name'];
                listofusers = response['list'];
                updateUI(name);
                updateUsers(listofusers);
            }
        });
    }

    // Set the user name to empty
    function logout() {
        $.get("/logout", function(data) {
            updateUI("");
            updateUsers("");
        });
    }

    // If the user has not entered a name show the name entry input
    // Otherwise display the name
    function updateUI(name) {
        $(".name").html(name);

        if (name !== '') {
            $("#name-form").hide();
        } else {
            $("#name-form").show();
        }
    }

    // Updates listofusers according to who is online
    function updateUsers(users) {
      if(users != undefined) {
        var list = "";
        for(let i = 0; i < users.length; i++) {
          console.log(users[i])
          if(users.length == 1) {
            list += users[0]
          }
          else {
              list = users[i] + ", " + list
          }

        }
      }

      $("#users").html(list)
    }

    // Get list of messages to display in the chat box
    function buildMessages() {
        $.get('messages', function(data) {
            let parent = $('#chatbox');
            parent.empty();

            let messages = JSON.parse(data);
            for (let i = 0; i < messages.length; i++) {
                let tmp = $('<p>').text(messages[i]);
                parent.append(tmp);
            }
        });
    }

});
