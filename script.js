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
  const itemsFromStorage = getItemFromStorage(item);
  // add item to array
  itemsFromStorage.push(item);
  //conver to JSON string and set to local storage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
};

const getItemFromStorage = (item) => {
  let itemsFromStorage;
  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }

  return itemsFromStorage;
};

const displayItems = (item) => {
  const itemsFromStorage = getItemFromStorage(item);
  itemsFromStorage.forEach((item) => addItemToDom(item));
  checkUI();
};

const createButton = (classes) => {
  const button = document.createElement("button");
  button.className = classes;
  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);
  return button;
};

const createIcon = (classes) => {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
};

const onClickItem = (e) => {
  if (e.target.parentElement.classList.contains("remove-item")) {
    removeItem(e.target.parentElement.parentElement);
  }
};

const removeItemFromStorage = (item) => {
  let itemsFromStorage = getItemFromStorage(item);
  // filter out item to be removed
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);
  // re-set to local storage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
};

const removeItem = (item) => {
  console.log(item);
  if (confirm("Are you sure?")) {
    // remove from DOM
    item.remove();

    // remove from storage
    removeItemFromStorage(item.textContent);
  }
  // // console.log(e.target.parentElement.classList);
  // if (e.target.parentElement.classList.contains("remove-item")) {
  //   //console.log(e.target.parentElement.parentElement);
  //   //e.target.parentElement.remove();
  //   if (confirm("Are you sure?")) {
  //     e.target.parentElement.parentElement.remove();
  //     checkUI();
  //   }
  // }
};

const clearItems = () => {
  while (itemList.lastChild) {
    itemList.removeChild(itemList.lastChild);
    localStorage.removeItem("items");
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

// Initialize app
const init = () => {
  // Create event listeners
  itemForm.addEventListener("submit", onAddItemSubmit);
  itemList.addEventListener("click", onClickItem);
  clearBtn.addEventListener("click", clearItems);
  itemFilter.addEventListener("input", filterItems);
  //get items from local storage
  document.addEventListener("DOMContentLoaded", displayItems);

  checkUI();
};

init();
