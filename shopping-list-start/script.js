const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clear = document.getElementById('clear');
const itemFilter = document.getElementById('filter');

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

function addItem(e) {
  e.preventDefault();

  if (itemInput.value === '') {
    alert('Please add an item');
    return;
  }
  const li = document.createElement('li');
  const input = document.createTextNode(itemInput.value);
  const button = addButton('remove-item btn-link text-red');
  li.appendChild(input);
  li.appendChild(button);
  itemList.appendChild(li);
  checkUI();
  itemInput.value = '';
}

function removeItem(e) {
  const icon = document.querySelector('i');
  if (e.target.tagName === 'I') {
    if (confirm('Are you sure')) {
      e.target.parentElement.parentElement.remove();
    }
  }
  checkUI();
}

function clearItem(e) {
  itemList.innerHTML = '';
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
  const items = itemList.querySelectorAll('li');
  if (items.length === 0) {
    clear.style.display = 'none';
    itemFilter.style.display = 'none';
  } else {
    clear.style.display = 'block';
    itemFilter.style.display = 'block';
  }
}

itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clear.addEventListener('click', clearItem);
itemFilter.addEventListener('input', filterItem);

checkUI();
