$(".petition1").append("<p> test</p>");

mrtk.watchForState(function() {
  if (mrtk.user.name) {
    document.getElementById("loginWithGoogle").style.display = "none";
    document.getElementById("logout").style.display = "block";
    document.getElementById("welcomeMessage").innerHTML = `Hello ${
      mrtk.user.name
    }`;
    document.getElementById("createPetition").style.display = "block";
  } else {
    document.getElementById("logout").style.display = "none";
    document.getElementById("loginWithGoogle").style.display = "block";
    document.getElementById("welcomeMessage").innerHTML = `Please Login`;
    document.getElementById("createPetition").style.display = "none";
  }
});

function signP() {}


async function getData() {
  var db = firebase.firestore();
  var signatureObject = {};
  var rawResponse = await db.collection("petition1").get();
  var response = rawResponse.docs.map(item => {
  return {
  id: item.id,
  ...item.data()
                                      
  };
  })                                
  for (var i = 0; i < response.length; i++) {
    var goal = parseInt(response[i].goal, 10);
    var currentSigns = 100;
    var barWidth = currentSigns / goal * 100;
    var barWidthp = barWidth + "%";
    var barNumberabc = "inBar" + i;
    signatureObject[response[i].id] = response[i].signatures;
    var currentSigns = signatureObject[response[i].id].length
    console.log(currentSigns);
    if (response[i].approved == true) {
    $("#container").append(`<div class='petition1'>
   <p class = "petitionHdr"> ${response[i].name}</p>
<p>${response[i].describe}</p><br>
<p>Our Goal is to reach: ${response[i].goal} signatures</p>
<p>We currently have ${currentSigns} signatures</p>
<p>Created By: ${response[i].creator}</p> <br>
<button class = "pButton" id = "${response[i].id}">Sign this petition!</button>
</div>`);
     // document.getElementById("barNumberab").style.width = 75px;
    }
  }

  $(".pButton").click(async function(event){
        const id = event.currentTarget.id;
        const name = mrtk.user.name;
    console.log("click")
     if (!signatureObject[id].includes(name)) {
            signatureObject[id].push(name);
     }
    
    const db = firebase.firestore();
    
    db.collection("petition1").doc(id).update({
          signatures:  signatureObject[id]
     })
    
});
}
getData();


//<div class = "outBar" id = "outBar">
 //  <div class = "inBar" id = "barNumberab">goal</div>
//</div>