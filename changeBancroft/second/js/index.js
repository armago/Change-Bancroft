function submit() {
  var name = document.change.name.value;
  var describe = document.change.describe.value;
  var goal = document.change.goal.value;
  var creator = document.change.creator.value;
  var approved = false;
  console.log(name);
  console.log(describe);
  console.log(goal);
  console.log(creator);
  
  mrtk.database.add("petition1", {
  name: name,
  describe: describe,
  goal: goal,
  creator: creator,
  approved: approved,
    signatures: []
});
  window.location.assign("https://changebancroft.surge.sh")
}