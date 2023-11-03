const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");

const addItem = (e) => {
  e.preventDefault();
  const newItem = itemInput.value;

  if (newItem === "") {
    alert("Please enter a valid item");
    return;
  }

  const li = document.createElement("li");
  li.appendChild(document.createTextNode(newItem));

  const button = createButton("remove-item btn-link text-red");
  //console.log(button);
  li.appendChild(button);
  //console.log(li);

  // connect to dom
  itemList.appendChild(li);

  // clear input fields
  itemInput.value = "";
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
    e.target.parentElement.parentElement.remove();
  }
};

const clearItems = () => {
  while (itemList.lastChild) {
    itemList.removeChild(itemList.lastChild);
  }
};

// Create event listeners
itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
clearBtn.addEventListener("click", clearItems);
