// Initialize cart in localStorage if it doesn't exist
if (!localStorage.getItem('carts')) {
  localStorage.setItem('carts', JSON.stringify({}));
}

// Retrieve username from localStorage
var loggedInUser = localStorage.getItem('loggedInUser');
if (loggedInUser) {
  document.getElementById('usernameDisplay').innerText = loggedInUser;
}

let nextProductId = 1;

$(document).ready(function () {
  getProducts();
  showCart();

  $("#btnCreate").click(function () {
    clearCart();
    showCart(); // Update the cart display after clearing
  });
});

function getProducts() {
  $("#tbodyProducts").html("");

  let products = localStorage.getItem("product");

  if (!products) products = [];
  else products = JSON.parse(products);

  products.forEach((p, i) => {
    if (!p.isDeleted) {
      if (!p.id) {
        p.id = nextProductId++;
      }

      let imageHtml = p.imageUrl ? `<img src="${p.imageUrl}" class="img-thumbnail" />` : '';
      $("#tbodyProducts").append(
        `<div class="col-md-3 mb-3">
          <div class="card h-100" style="border-radius: 30px;">
            <img src="${p.imageUrl}" class="card-img-top" alt="${p.name}" style="max-width:100%; max-height:400px; display: block; margin: auto; border-radius: 30px;">
            <div class="card-body d-flex flex-column">
              <div class="mt-auto">
                <h5 class="card-title">${p.name}</h5>
                <p class="card-text" style="font-weight:bold">₱${p.price}</p>
                <button class="btn btn-success add-to-cart-btn" data-index="${i}">
                  <img src="cart2.png" style="max-width:20px; max-height:20px;" /> Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>`
      );
    }
  });

  // Add event listener to "Add to Cart" buttons
  $(".add-to-cart-btn").click(function () {
    let index = $(this).data("index");
    addToCart(index);
  });

  // Update the products in localStorage
  localStorage.setItem("product", JSON.stringify(products));
}

function clearCart() {
  let carts = JSON.parse(localStorage.getItem('carts'));
  if (!carts[loggedInUser]) {
    carts[loggedInUser] = [];
  } else {
    carts[loggedInUser] = []; // Set the cart array to an empty array
  }

  // Update the carts in localStorage
  localStorage.setItem('carts', JSON.stringify(carts));

  // Clear the modal content
  $("#modalCartItems").html("");
}

function addToCart(index) {
  let products = JSON.parse(localStorage.getItem("product"));
  let selectedProduct = products[index];

  // Create a temporary image element to load the image
  let tempImg = new Image();
  tempImg.src = selectedProduct.imageUrl;

  // Wait for the image to load
  tempImg.onload = function() {
    // Create a canvas element
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');

    // Resize the canvas to the desired dimensions
    canvas.width = 100; // Set the width to your desired size
    canvas.height = 100; // Set the height to your desired size

    // Draw the image onto the canvas with the desired dimensions
    ctx.drawImage(tempImg, 0, 0, canvas.width, canvas.height);

    // Convert the canvas content to a data URL
    let resizedImageUrl = canvas.toDataURL('image/jpeg', 0.5); // Adjust the quality (0.5 is 50% quality)

    // Update the selected product's image URL to the resized image URL
    selectedProduct.imageUrl = resizedImageUrl;

    // Rest of your addToCart logic
    let carts = JSON.parse(localStorage.getItem('carts'));
    if (!carts[loggedInUser]) {
      carts[loggedInUser] = [];
    }

    let existingProduct = carts[loggedInUser].find(p => p.id === selectedProduct.id);

    if (existingProduct) {
      existingProduct.counter++;
    } else {
      selectedProduct.isInCart = true;
      selectedProduct.counter = 1;
      carts[loggedInUser].push(selectedProduct);
    }

    // Update the carts in localStorage
    localStorage.setItem('carts', JSON.stringify(carts));

    // Show the updated cart
    showCart();
  };
}

function showCart() {
  let carts = JSON.parse(localStorage.getItem('carts'));
  let cart = carts[loggedInUser] || [];
  let totalPrice = 0;

  $("#modalCartItems").html("");

  cart.forEach(p => {
    totalPrice += p.price * p.counter;
    $("#modalCartItems").append(
      `<div class="cart-item" style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="${p.imageUrl}" alt="${p.name}" class="img-thumbnail" style="max-width: 50px; max-height: 50px; margin-right: 10px;"> 
        <div>${p.name}</div>
        <div style="margin-left: auto;"> ₱${p.price} </div>
        <div style="margin-left: 10px;">x${p.counter}</div>
      </div>`
    );
  });

  // Display the total price at the bottom of the modal
  $("#modalCartItems").append(`<div style="float: right;" >Total Price: ₱${totalPrice}</div>`);

  $("#addToCartModal").modal("show");
}