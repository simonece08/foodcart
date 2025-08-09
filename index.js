$("document").ready(function () {
  console.log("Hello World");

  let btnCreate = document.querySelector("#btnCreate");
  let btnProductModal = document.querySelector("#btnProductModal");
  btnCreate.onclick = function () {
    let floatingProductName = document.querySelector("#floatingProductName");
    let floatingPrice = document.querySelector("#floatingPrice");
    let imageUpload = document.querySelector("#imageUpload");
    let imageUrl = '';

    if (imageUpload.files.length > 0) {
      let file = imageUpload.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        imageUrl = reader.result;
        createProduct(floatingProductName.value, floatingPrice.value, imageUrl);
      };
    } else {
      createProduct(floatingProductName.value, floatingPrice.value, imageUrl);
    }
  };

  btnProductModal.onclick = () => {
    $("#floatingProductName").val("");
    $("#floatingPrice").val("");
    $("#imageUpload").val("");
  };

  getProducts();
});

let productToUpdate = -1;

// CREATE
function createProduct(productName, productPrice, imageUrl) {
  if (!productName) return alert("Product Name is required");
  else if (!productPrice) return alert(`Product must have a price.`);

  let product = {
    name: productName,
    price: productPrice,
    imageUrl: imageUrl,
  };

  let products = localStorage.getItem("product");

  if (!products) products = [];
  else products = JSON.parse(products);

  let productIsExisting = products.findIndex((p) => {
    return p.name == product.name;
  });

  if (productIsExisting >= 0)
    return alert(`${product.name} is already in the database.`);

  products.push(product);
  localStorage.setItem("product", JSON.stringify(products));
  getProducts();

  $("#btnCancelCreate").click();
  alert(`${product.name} has been successfully added.`);
}

// READ
function getProducts() {
  $("#tbodyProducts").html("");

  let products = localStorage.getItem("product");

  if (!products) products = [];
  else products = JSON.parse(products);

  products.forEach((p, i) => {
    if (!p.isDeleted) {
      let imageHtml = p.imageUrl ? `<img src="${p.imageUrl}" class="img-thumbnail" style="max-width: 100px;" />` : '';
      $("#tbodyProducts").append(
        `<tr>
        <td>${imageHtml}  </td>   
          <td>${p.name}</td>
          <td>${p.price}</td>
          <td><button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#updateProductModal" onclick="openUpdateModal(${i})">Update</button>
          <button class="btn btn-danger" onclick="deleteProduct(${i})">Delete</button> 
        </tr>`
      );
    }
  });
}



// UPDATE

function updateProduct() {
  let productName = $("#floatingUpdateProductName").val();
  let productPrice = $("#floatingUpdatePrice").val();
  let imageUpload = document.querySelector("#imageUploadUpdate");
  let imageUrl = '';

  if (imageUpload.files.length > 0) {
    let file = imageUpload.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      imageUrl = reader.result;
      saveUpdatedProduct(productName, productPrice, imageUrl);
    };
  } else {
    saveUpdatedProduct(productName, productPrice, imageUrl);
  }
}

function saveUpdatedProduct(productName, productPrice, imageUrl) {
  let products = localStorage.getItem("product");

  if (!products) products = [];
  else products = JSON.parse(products);

  products[productToUpdate].name = productName;
  products[productToUpdate].price = productPrice;
  products[productToUpdate].imageUrl = imageUrl;

  localStorage.setItem("product", JSON.stringify(products));

  getProducts();

  alert(`Product has been successfully updated.`);
}

function openUpdateModal(productIndex) {
  // Get the initial value of products array
  let products = localStorage.getItem("product");
  // Check if array is empty
  if (!products) products = [];
  else products = JSON.parse(products); // Parse to JSON object if not null.

  $(`#floatingUpdateProductName`).val(products[productIndex].name);
  $(`#floatingUpdatePrice`).val(products[productIndex].price);
  
  productToUpdate = productIndex;
}


// DELETE
function deleteProduct(productIndex) {
  let products = localStorage.getItem("product");

  if (!products) products = [];
  else products = JSON.parse(products);

  products[productIndex].isDeleted = true;

  localStorage.setItem("product", JSON.stringify(products));
  getProducts();
}
