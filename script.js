  
  var proverbs = [
    "Absence makes the heart grow fonder",
    "Actions speak louder than words",
    "A journey of a thousand miles begins with a single step",
    "Be a Roman in Rome",
    "All good things must come to an end",
    "A picture is worth a thousand words",
    "A watched pot never boils",
    "Time is money",
    "When the going gets tough, the tough get going",
    "The squeaky wheel gets the grease",
    "One man's trash is another man's treasure",
    "Don't judge a book by its cover",
    "The grass is always greener on the other side of the hill",
    "If you want something done right, you have to do it yourself",
    "A gem cannot be polished without friction, nor a man perfected without trials",
    "Do not confine your children to your own learning, for they were born in another time",
    "Honesty is the best policy",
    "An apple a day keeps the doctor away",
    "The early bird catches the worm",
    "Don’t count your chickens before they hatch"
  ];

  var proverb, limit, quit, guessCount = 0,
    chancesLeft = 2,
    clicksLeft, ratingcolor = "green";

  window.onload = function() {
    createPuzzle();
  }

  function createPuzzle() {
    proverb = proverbs[Math.floor((Math.random() * 20))];
    limit = proverb.length;
    quit = false;
    guessCount = 0;
    chancesLeft = 2;
    clicksLeft = Math.ceil(limit / 2) - guessCount;

    $("#clickCountsDisplay").hide();
    $("#Actions").show();
     for (var td = 1; td < 101; td++) {
        var curTd = document.getElementById(td);
      curTd.innerHTML = "";
      curTd.style.backgroundColor = "#ffffff"
     }

    document.getElementById("note").innerHTML = "<h4>Can you guess the proverb?</h4>";

    document.getElementById("Actions").innerHTML = "<button type=\"button\" class=\"btn btn-default\" onClick=\"guess()\">Make your guess NOW</button>";

    $("#note").show();
    for (var td = 1; td < 101; td++) {
      var curTd = document.getElementById(td);
      var char = proverb.charAt(td - 1);
      
      if (char.length === 0 || char == ' ') {
        curTd.style.backgroundColor = "#00000";
        if (char == ' ')
          limit--;
      } else {
        if (char == "\'" || char == "\," || char == "\.") {
          curTd.style.backgroundColor = "#00000"
          curTd.innerHTML = '\'';
          limit--;
        } else {
          var p = "<p>" + ' ' + "<p>";
          curTd.innerHTML = p;
          curTd.style.backgroundColor = "#c9f2d1";
        }
      }
    }

    document.getElementById("PlayAgain").innerHTML = "";
    document.getElementById("Result").innerHTML = "";
  }


  function flip(tdId) {
    if (quit === false) {
      $("#instructions").hide();
      $("#note").hide();
      $("#revealNote").show();
      $("#clickCountsDisplay").show();
      if (guessCount >= Math.ceil(limit / 2) && quit === false) {
        var doc = document.getElementById("modaltext");
        doc.innerHTML = "";
        doc.appendChild(document.createTextNode("You have no more letters to flip, please make your guess NOW!"));
        $('#myModal').modal('show');
        guess();
      } else {
        document.getElementById(tdId).innerHTML = proverb.charAt(tdId - 1);
        guessCount++;

        clicksLeft = Math.ceil(limit / 2) - guessCount;
        if (clicksLeft >= Math.ceil(limit / 4)) {
          ratingcolor = "green";
          document.getElementById("clickCounts").style.color = "#12a81c";
        } else if ((clicksLeft < Math.ceil(limit / 4)) && (clicksLeft >= Math.ceil(limit / 10))) {
          ratingcolor = "yellow";
          document.getElementById("clickCounts").style.color = "#cecc3d";
        } else {
          ratingcolor = "red";
          document.getElementById("clickCounts").style.color = "red";
        }
        document.getElementById("revealNote").innerHTML = "<br/> You can reveal upto  " + Math.ceil(limit / 2) + " characters<br/>";
        document.getElementById("clickCounts").innerHTML = "" + (Math.ceil(limit / 2) - guessCount);
      }
    } else
      document.getElementById("revealNote").innerHTML = '';
  }



  function guess() {
    document.getElementById("Actions").innerHTML = "Your Guess :  <textarea class=\"form-control\" rows=\"3\" id=\"userGuess\"></textarea></br></br><button type=\"button\" class=\"btn btn-success\" onClick=\"validateProverb()\">Submit</button>";
  }

  function validateProverb() {
    var rating = 3; // = Math.ceil(limit / 2) - guessCount;
    final = document.getElementById("userGuess").value;
    if (proverb.toLowerCase() == final.toLowerCase()) {
      $("#instructions").hide();
      $("#note").hide();
      $("#clickCountsDisplay").hide();
      $("#revealNote").hide();
      $("#Actions").hide();
      showAnswer();
      if (ratingcolor == "green") {
        rating = 3;
      } else if (ratingcolor == "yellow") {
        rating = 2;
      } else if (ratingcolor == "red") {
        rating = 1;
      }
      createRating(rating);

    } else {
      if (chancesLeft == 2) {
        var doc = document.getElementById("modaltext");
        doc.innerHTML = "";
        doc.appendChild(document.createTextNode("Sorry! That is incorrect, you have " + chancesLeft + " more guesses"));
        $('#myModal').modal('show');
        document.getElementById("Actions").innerHTML += "<span class=\"tab\"></span>";
        document.getElementById("Actions").innerHTML += "<button type=\"button\" class=\"btn btn-danger\" onClick=\"giveUpAndRevealAns()\">give up</button>";
        chancesLeft--;
      } else if (chancesLeft == 1) {
        var doc = document.getElementById("modaltext");
        doc.innerHTML = "";
        doc.appendChild(document.createTextNode("Sorry! That is incorrect, you have " + chancesLeft + " more guesses"));
        $('#myModal').modal('show');
        chancesLeft--;
      } else {
        giveUp();
      }
    }

  }

  function giveUp() {
    $("#note").show();
    $("#clickCountsDisplay").hide();
    $("#revealNote").hide();
    document.getElementById("note").innerHTML = "<h4>Click Show Answer to reveal the proverb</h4>";
    document.getElementById("Actions").innerHTML = "<button type=\"button\" class=\"btn btn-default\" onClick=\"showAnswer()\">Show Answer</button>";

  }
  
    function giveUpAndRevealAns() {
    quit = true;
    showAnswer();
  }

  function showAnswer() {
   
    $("#revealNote").hide();
    $("#instructions").hide();
    $("#Actions").hide();
    if(quit==true){
      document.getElementById("note").innerHTML = "<h4>You Gave Up. Here is your proverb </h4>";
    }
    else{
    document.getElementById("note").innerHTML = "<h4>Here is your proverb </h4>";
    }
    for (var td = 1; td < 101; td++) {
      var curTd = document.getElementById(td);
      var char = proverb.charAt(td - 1);

      if (char.length === 0 || char == ' ') {
        curTd.style.backgroundColor = "#00000";
        if (char == ' ')
          limit--;
      } else {
        if (char == "\'" || char == "\,") {
          curTd.style.backgroundColor = "#00000"
          curTd.innerHTML = '\'';
          limit--;
        } else {
          curTd.innerHTML = char;
          curTd.style.backgroundColor = "#c9f2d1";
        }
      }
    }
    document.getElementById("PlayAgain").className = "playAgaintext";
    document.getElementById("PlayAgain").innerHTML = "Wanna Play Again ?? <button type=\"button\" class=\"btn btn-info\" onClick=\"createPuzzle()\">Yes</button>";

  }

  function createRating(r) {
    var div = document.createElement("div");
    var msg = document.createElement("p");
    msg.appendChild(document.createTextNode("Congratulations"));
    msg.className = "successmessage";

    var p1 = document.createElement("p").appendChild(document.createTextNode("(You are a " + r + " star guesser!)"));
    var p2 = document.createElement("p").appendChild(document.createTextNode("Your Score:"));
    div.appendChild(msg);
    div.appendChild(p1);
    div.appendChild(document.createElement("br"));
    div.appendChild(document.createElement("br"));
    div.appendChild(p2);
    div.appendChild(document.createElement("br"));
    div.appendChild(document.createElement("br"));
    var result = document.getElementById("Result")

    for (var i = 1; i <= 3; i++) {

      if (i <= r) {
        var span = document.createElement("span");
        span.className = "fa fa-star checked";
        div.appendChild(span);
        div.appendChild(document.createTextNode(" "));

      } else {
        div.appendChild(document.createTextNode(" "));
        var span = document.createElement("span");
        span.className = "fa fa-star";
        div.appendChild(span);
      }
      result.appendChild(div);
    }
  }