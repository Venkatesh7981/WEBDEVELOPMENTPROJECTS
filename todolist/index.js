update();
add = document.querySelector(".addbutton");
add.addEventListener('click', addandupdate);
// adding the details to the list
function addandupdate() {
  title = document.getElementById("title").value;
  description = document.getElementById("description").value;
  if (localStorage.getItem("itemjson") == null) {
    console.log("hi");
    jsonarray = [];
    if (title == '' || description == '') {
      alert("OOPS!! Fill The Details...");
    } else {

      jsonarray.push([title, description]);
      localStorage.setItem("itemjson", JSON.stringify(jsonarray));
    }

  } else {
    if (title == '' || description == '') {
      alert("OOPS!!  Fill The Details...");
    } else {


      jsonstr = localStorage.getItem("itemjson");
      jsonarray = JSON.parse(jsonstr);
      jsonarray.push([title, description]);
      localStorage.setItem("itemjson", JSON.stringify(jsonarray));
    }

  }

  update();
}
// updating the table
function update() {
  document.getElementById("title").value = '';
  document.getElementById("description").value = '';
  if (localStorage.getItem("itemjson") == null) {
    console.log("hi");
    jsonarray = [];
    localStorage.setItem("itemjson", JSON.stringify(jsonarray));

  } else {
    jsonstr = localStorage.getItem("itemjson");
    jsonarray = JSON.parse(jsonstr);

  }
  let tablebody = document.getElementById("tablebody");
  let str = "";
  jsonarray.forEach((element, index) => {
    str += `
    <tr>
      <td scope="row">${index+1}</td>
      <td>${element[0]}</td>
      <td>${element[1]}</td>
      <td><button type="button" class="btn btn-dark btn-sm" onclick="deleteitem(${index})">Delete</button></td>
    </tr>`;
  });
  tablebody.innerHTML = str;
}
// to delete the item and update the table
function deleteitem(item) {
  console.log("deleting");
  jsonstr = localStorage.getItem("itemjson");
  jsonarray = JSON.parse(jsonstr);
  jsonarray.splice(item, 1);
  localStorage.setItem("itemjson", JSON.stringify(jsonarray));
  update();

}
// to clear the local storage
function clearstorage() {
  if (confirm("Do you really want to clear the list?")) {
    localStorage.clear();
    update();
  }
}
