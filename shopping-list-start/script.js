const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clear = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const formBtn = itemForm.querySelector('button');
let isEditMode = false;

function displayItems() {
  const itemsFromStorage = getItemsfromStorage();
  itemsFromStorage.forEach((item) => addItemtoDOM(item));
  checkUI();
}

function createIcon(classes) {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
}

function addButton(classes) {
  const button = document.createElement('button');
  button.className = classes;
  const icon = createIcon('fa-solid fa-xmark');

  button.appendChild(icon);
  return button;
}

function addItem(e) 
  e.preventDefault();
  const newItem = itemInput.value;

  if (newItem === '') {
    alert('Please add an item');
    return;
  }

  if (isEditMode) {
    const itemToEdit = document.querySelector('.edit-mode');

    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.classList.remove('.edit-mode');
    itemToEdit.remove();
    isEditMode = false;
  } else {
    if (checkIfItemExist(newItem)) {
      alert('That item already exist!');
      return;
    }
  }

  addItemtoDOM(newItem);
  addItemtoStorage(newItem);
  checkUI();
  itemInput.value = '';
}

function addItemtoDOM(item) {
  const li = document.createElement('li');
  const input = document.createTextNode(item);
  const button = addButton('remove-item btn-link text-red');
  li.appendChild(input);
  li.appendChild(button);
  itemList.appendChild(li);
}

function addItemtoStorage(item) {
  const itemsFromStorage = getItemsfromStorage();

  itemsFromStorage.push(item);

  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function getItemsfromStorage() {
  let itemsFromStorage;

  if (localStorage.getItem('items') === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  }
  return itemsFromStorage;
}

function onClickItem(e) {
  if (e.target.tagName === 'I') {
    removeItem(e.target.parentElement.parentElement);
  } else {
    setItemToEdit(e.target);
  }
}

function checkIfItemExist(item) {
  const itemsFromStorage = getItemsfromStorage();
  return itemsFromStorage.includes(item);
}

function setItemToEdit(item) {
  isEditMode = true;

  itemList
    .querySelectorAll('li')
    .forEach((i) => i.classList.remove('edit-mode'));
  item.classList.add('edit-mode');
  formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';
  formBtn.style.backgroundColor = 'green';
  itemInput.value = item.innerText;
}

function removeItem(item) {
  if (confirm('Are you sure?')) {
    //remove item from DOM
    item.remove();

    //remove item from storage
    removeItemFromStorage(item.textContent);
  }
}

function removeItemFromStorage(item) {
  let itemsFromStorage = getItemsfromStorage();
  //filter items into array EXCEPT the selected one
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function clearItem(e) {
  itemList.innerHTML = '';
  localStorage.removeItem('items');
  checkUI();
}

function filterItem(e) {
  const items = itemList.querySelectorAll('li');
  const text = e.target.value.toLowerCase();

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();
    if (itemName.indexOf(text) == -1) {
      item.style.display = 'none';
    } else {
      item.style.display = 'flex';
    }
  });
}

function checkUI() {
  itemInput.value = '';
  const items = itemList.querySelectorAll('li');
  if (items.length === 0) {
    clear.style.display = 'none';
    itemFilter.style.display = 'none';
  } else {
    clear.style.display = 'block';
    itemFilter.style.display = 'block';
  }

  formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
  formBtn.style.backgroundColor = '#333';
  isEditMode = false;
}

//initialize app

function init() {
  itemForm.addEventListener('submit', addItem);
  itemList.addEventListener('click', onClickItem);
  clear.addEventListener('click', clearItem);
  itemFilter.addEventListener('input', filterItem);
  document.addEventListener('DOMContentLoaded', displayItems);

  checkUI();
}

init();
