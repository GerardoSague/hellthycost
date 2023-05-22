// Variables globales
let products = [];
let currentProductName = '';

// Función para obtener los valores de los inputs
function getProductValues() {
  const productName = document.getElementById('product-name').value;
  const productType = document.getElementById('product-type').value;
  const productPrice = parseFloat(document.getElementById('product-price').value);
  const productQuantity = parseFloat(document.getElementById('product-quantity').value);

  // Validación de campos vacíos o incorrectos
  if (!productName || !productType || isNaN(productPrice) || isNaN(productQuantity)) {
    alert('Por favor llena todos los campos');
    return null;
  }

  // Si hay un nombre de producto actual, usarlo en lugar del nuevo
  const nameToUse = currentProductName || productName;

  // Crear objeto de producto y agregarlo al arreglo de productos
  const product = {
    name: nameToUse,
    type: productType,
    price: productPrice,
    quantity: productQuantity.toFixed(3),
  };
  products.push(product);

  // Guardar el nombre actual de producto
  currentProductName = nameToUse;

  // Limpiar los inputs
  document.getElementById('product-name').value = '';
  document.getElementById('product-type').value = '';
  document.getElementById('product-price').value = '';
  document.getElementById('product-quantity').value = '';

  // Actualizar la lista de productos
  updateProductList();
}

// Función para actualizar la lista de productos en el HTML
function updateProductList() {
  const productTableBody = document.getElementById('product-table-body');
  productTableBody.innerHTML = '';

  products.forEach((product, index) => {
    const newRow = `
      <tr>
        <td>${index + 1}</td>
        <td>${product.name}</td>
        <td>${product.type}</td>
        <td>$${product.price.toFixed(2)}</td>
        <td>${product.quantity} g</td>
        <td><button onclick="deleteProduct(${index})">Eliminar</button></td>
      </tr>
    `;
    productTableBody.innerHTML += newRow;
  });
}

// Función para eliminar un producto del arreglo de productos
function deleteProduct(index) {
  products.splice(index, 1);
  updateProductList();
}

// Función para calcular el costo total de los productos y mostrarlo en el HTML
function calculateCost() {
  let totalCost = 0;
  products.forEach((product) => {
    totalCost += (product.price * product.quantity);
  });

  // Mostrar el costo total en el HTML
  document.getElementById('costo-total').textContent = `El costo total del platillo es: $${totalCost.toFixed(2)}.`;

  // Calcular el precio sugerido y mostrarlo en el HTML
  const suggestedPrice = totalCost * 1.5;
  document.getElementById('precio-sugerido').textContent = `El precio sugerido para el platillo es: $${suggestedPrice.toFixed(2)}.`;
}

// Obtener el botón de agregar producto y agregar un evento onclick
const addProductButton = document.getElementById('agregar-producto');
addProductButton.addEventListener('click', getProductValues);

// Obtener el botón de calcular costo y agregar un evento onclick
const calculateCostButton = document.getElementById('calcular-costo');
calculateCostButton.addEventListener('click', calculateCost);
