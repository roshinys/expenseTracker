var form = document.querySelector("#form");
var items = document.getElementById("items");
// console.log(form);
window.addEventListener("DOMContentLoaded", () => {
  var h1 = document.getElementById("total");
  var total = 0;
  var e;
  Object.keys(localStorage).forEach((item) => {
    if (item !== "total") {
      e = JSON.parse(localStorage.getItem(item));
      total += parseInt(e.expense);
    }
  });
  localStorage.setItem("total", total);
  var text = document.createTextNode(total);
  h1.appendChild(text);
  showUser();
});

var addForm = (e) => {
  e.preventDefault();
  //   console.log("form submitted");
  let x = Math.random();
  var expense = e.target.expense.value;
  var description = e.target.description.value;
  var category = e.target.category.value;
  //   console.log(expense, description, category);
  var money = {
    expense: expense,
    description: description,
    category: category,
    x: x,
  };
  money_serialised = JSON.stringify(money);
  if (localStorage.getItem(x !== null)) {
    x = Math.random();
  }
  total = localStorage.getItem("total");
  total = parseInt(total) + parseInt(expense);
  localStorage.setItem("total", total);
  localStorage.setItem(x, money_serialised);
  items.innerHTML = "";
  showUser();
};
form.addEventListener("submit", addForm);

// var addForm = form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   //   console.log("form submitted");
//   let x = Math.random();
//   var expense = e.target.expense.value;
//   var description = e.target.description.value;
//   var category = e.target.category.value;
//   //   console.log(expense, description, category);
//   var money = {
//     expense: expense,
//     description: description,
//     category: category,
//     x: x,
//   };
//   money_serialised = JSON.stringify(money);
//   if (localStorage.getItem(x !== null)) {
//     x = Math.random();
//   }
//   localStorage.setItem(x, money_serialised);
//   items.innerHTML = "";
//   showUser();
// });

var showUser = () => {
  var h1 = document.getElementById("total");
  var t = JSON.parse(localStorage.getItem("total"));
  h1.innerHTML = `Total Expense = ${t}`;
  Object.keys(localStorage).forEach((item) => {
    if (item !== "total") {
      money = JSON.parse(localStorage.getItem(item));
      showUserInFront(money);
    }
  });
};

var showUserInFront = (money) => {
  //   if (Object.keys(localStorage).length > 0) {
  //     items.style.display = "block";
  //   }
  if (money !== 0) {
    let child = document.createElement("li");
    child.innerHTML = `${money.expense}-${money.description}-${money.category}`;
    let btn = document.createElement("button");
    let editbtn = document.createElement("button");
    btn.value = `${money.x}`;
    editbtn.value = `${money.x}`;
    btn.innerText = "Delete";
    editbtn.innerText = "edit";
    btn.className = "delete";
    editbtn.className = "edit";
    child.append(editbtn);
    child.appendChild(btn);
    items.appendChild(child);
  }
};
items.addEventListener("click", (e) => {
  total = localStorage.getItem("total");
  if (e.target.classList.contains("delete")) {
    let exp = JSON.parse(localStorage.getItem(e.target.value));
    total = parseInt(total) - parseInt(exp.expense);
    localStorage.removeItem(e.target.value);
  }
  if (e.target.classList.contains("edit")) {
    // console.log("am editing this ", e.target.value);
    var expense = document.getElementById("expense").value;
    var description = document.getElementById("description").value;
    var category = document.querySelector(".category").value;
    if (
      expense.length === 0 ||
      description.length === 0 ||
      category.length === 0
    ) {
      alert("input required");
    } else {
      let exp = JSON.parse(localStorage.getItem(e.target.value));
      total = parseInt(total) - parseInt(exp.expense) + parseInt(expense);
      localStorage.removeItem(e.target.value);
      var money = {
        expense: expense,
        description: description,
        category: category,
        x: e.target.value,
      };
      money_serialised = JSON.stringify(money);
      localStorage.setItem(e.target.value, money_serialised);
    }
  }
  localStorage.setItem("total", total);
  items.innerHTML = "";
  showUser();
});
