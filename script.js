const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");
const itemFilter = document.getElementById("filter");

const onAddItemSubmit = (e) => {
  e.preventDefault();
  const newItem = itemInput.value;

  if (newItem === "") {
    alert("Please enter a valid item");
    return;
  }
  // create item DOM element
  addItemToDom(newItem);

  // add item to local storage
  addItemToStorage(newItem);

  checkUI();

  // clear input fields
  itemInput.value = "";
};

const addItemToDom = (item) => {
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(item));

  const button = createButton("remove-item btn-link text-red");
  //console.log(button);
  li.appendChild(button);
  //console.log(li);

  // connect to dom
  itemList.appendChild(li);
};

const addItemToStorage = (item) => {
  let itemsFromStorage;
  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }
  itemsFromStorage.push(item);
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
};

const createButton = (classes) => {
  const button = document.createElement("button");
  button.className = classes;
  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);
  return button;
};

createIcon = (classes) => {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
};

const removeItem = (e) => {
  // console.log(e.target.parentElement.classList);
  if (e.target.parentElement.classList.contains("remove-item")) {
    //console.log(e.target.parentElement.parentElement);
    //e.target.parentElement.remove();
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();
      checkUI();
    }
  }
};

const clearItems = () => {
  while (itemList.lastChild) {
    itemList.removeChild(itemList.lastChild);
    checkUI();
  }
};

filterItems = (e) => {
  const items = document.querySelectorAll("li");
  const text = e.target.value.toLowerCase();
  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();
    if (itemName.indexOf(text) != -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
};

const checkUI = () => {
  const items = document.querySelectorAll("li");
  if (items.length === 0) {
    clearBtn.style.display = "none";
    itemFilter.style.display = "none";
  } else {
    clearBtn.style.display = "block";
    itemFilter.style.display = "block";
  }
};

// Create event listeners
itemForm.addEventListener("submit", onAddItemSubmit);
itemList.addEventListener("click", removeItem);
clearBtn.addEventListener("click", clearItems);
itemFilter.addEventListener("input", filterItems);

checkUI();
