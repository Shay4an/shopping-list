const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');

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
  itemInput.value = '';
}

itemForm.addEventListener('submit', addItem);
