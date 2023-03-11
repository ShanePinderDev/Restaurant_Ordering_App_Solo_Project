import { menuArray } from "./data.js";

const creditCardForm = document.getElementById("credit-card-form");
const containerOrder = document.getElementById("container-order");
const containerProducts = document.getElementById("container-products");
const containerPrice = document.getElementById("container-price");
const creditCardModal = document.getElementById("credit-card-modal");
const containerThanks = document.getElementById("container-thanks");

let orderedItemsArr = [];

document.addEventListener("click", function (e) {
  if (e.target.dataset.menuItem) {
    getOrderItems(menuArray[e.target.dataset.menuItem]);
    addTotalPrice();
    renderOrders();
    renderTotalPrice();
  }

  if (e.target.dataset.orderItem) {
    removeOrderItem(menuArray[e.target.dataset.orderItem]);
    getRemainingOrderItems(orderedItemsArr);
    addTotalPrice();
    renderRemainingOrders();
    renderTotalPrice();
  }

  if (e.target.id === "order-btn") {
    creditCardModal.style.display = "flex";
  }

  if (e.target.id === "credit-card-btn") {
    creditCardProcessed();
  }
});

function getMenuItems() {
  let menuItemsHtml = "";

  for (let menuItem of menuArray) {
    menuItemsHtml += `
        <div class="container">
       <div class="container-inner">
         <div class="container-inner-product">
           <p class="emoji">${menuItem.emoji}</p>
           <div class="container-product">
             <h3 class="product-heading" id="product-pizza">${menuItem.name}</h3>
             <p class="product-description">${menuItem.ingredients}</p>
             <p class="product-price" id="price-pizza">$${menuItem.price}</p>
           </div>
         </div>
         <button class="add-btn" id="add-btn" data-menu-item="${menuItem.id}">+</button>
       </div>
       </div>
       `;
  }
  return menuItemsHtml;
}

let orderItemsHtml = "";

function getOrderItems(orderItem) {
  orderedItemsArr.push(orderItem);

  for (let order of orderedItemsArr) {
    if (orderItem.id === order.id) {
      orderItemsHtml = `
  <div class="container-products-order">
         <div class="container-product-order">
          <h3 class="product-heading">${order.name}</h3>
           <button class="remove-btn" id="remove-btn" data-order-item="${order.id}">remove</button>
         </div>
         <p class="product-price">$${order.price}</p>
       </div>
  `;
    }
  }

  containerOrder.style.display = "flex";

  return orderItemsHtml;
}

let totalPriceHtml = "";

function addTotalPrice() {
  let priceArray = [];
  for (let i = 0; i < orderedItemsArr.length; i++) {
    if (orderedItemsArr[i].price > 0) {
      priceArray.push(orderedItemsArr[i].price);
    }
  }

  let totalPrice = 0;

  for (let e of priceArray) {
    totalPrice += e;
  }

  if (priceArray.length > 0) {
    totalPriceHtml = `
    <hr class="order-hr" />
    <div class="container-total-price">
      <h3 class="total-price">Total price:</h3>
      <p class="product-price">$${totalPrice}</p>
    </div>
    <button class="order-btn" id="order-btn">Complete order</button>
    `;
  } else {
    totalPriceHtml = `
    <hr class="order-hr" />
    <div class="container-total-price">
      <h3 class="total-price">Total price:</h3>
      <p class="product-price">$0</p>
    </div>
    <button class="order-btn">Complete order</button>
    `;
  }
  return totalPriceHtml;
}

function removeOrderItem(removeOrderItem) {
  let removedItem = orderedItemsArr.indexOf(removeOrderItem);

  orderedItemsArr.splice(removedItem, 1);
}

function getRemainingOrderItems(orderItem) {
  orderItemsHtml = "";
  for (let order of orderedItemsArr) {
    orderItemsHtml += `
    <div class="container-products-order">
           <div class="container-product-order">
            <h3 class="product-heading">${order.name}</h3>
             <button class="remove-btn" id="remove-btn" data-order-item="${order.id}">remove</button>
           </div>
           <p class="product-price">$${order.price}</p>
         </div>
    `;
  }

  return orderItemsHtml;
}

function creditCardProcessed() {
  creditCardForm.addEventListener("submit", function (e) {
    e.preventDefault();
    creditCardModal.style.display = "none";
    containerOrder.style.display = "none";
    containerProducts.innerHTML = "";
    containerPrice.innerHTML = "";
    containerThanks.style.display = "flex";
    setTimeout(removeThanksMsg, 2000);
    disableOrderButtons();
    document.getElementById("credit-card-form").reset();
  });
}

function removeThanksMsg() {
  containerThanks.style.display = "none";
}

function disableOrderButtons() {
  let orderBtns = document.querySelectorAll("#add-btn");

  orderBtns.forEach(function (e) {
    e.disabled = true;
    setTimeout(function () {
      e.disabled = false;
    }, 2000);
  });
}

function render() {
  document.getElementById("container-menu-items").innerHTML = getMenuItems();
}

render();

function renderOrders() {
  containerProducts.innerHTML += orderItemsHtml;
}

function renderRemainingOrders() {
  containerProducts.innerHTML = orderItemsHtml;
}

function renderTotalPrice() {
  containerPrice.innerHTML = totalPriceHtml;
}
