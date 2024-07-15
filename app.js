// // Sample data (you might load this dynamically or from an API)
// let items = [
//     { name: "TM- shirt", price: 10.00 },
//     { name: "Tommy Jeans", price: 15.00 },
//     { name: "New Balance sneakers", price: 15.00},
//     { name: "Reebok strides", price: 15.00},
//     { name: "Spagheti italino", price: 15.00}
//   ];
  
//   // Function to render items in the cart
//   function renderCart() {
//     const cartElement = document.getElementById("cart");
//     cartElement.innerHTML = "";
  
//     items.forEach((item, index) => {
//       const itemElement = document.createElement("div");
//       itemElement.classList.add("item");
//       itemElement.innerHTML = `
//         <span class="item-name">${item.name}</span>
//         <span class="item-price">$${item.price.toFixed(2)}</span>
//         <button class="quantity-decrease" data-index="${index}">-</button>
//         <span class="item-quantity">1</span>
//         <button class="quantity-increase" data-index="${index}">+</button>
//         <button class="item-delete" data-index="${index}">Delete</button>
//         <button class="item-like" data-index="${index}">Like ❤️</button>
//       `;
//       cartElement.appendChild(itemElement);
//     });
  
//     updateTotalPrice();
//   }
  
//   // Function to update total price
//   function updateTotalPrice() {
//     const totalPriceElement = document.getElementById("total-amount");
//     const totalPrice = items.reduce((total, item) => {
//       return total + item.price;
//     }, 0);
//     totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
//   }
  
//   // Event listeners for buttons
//   document.addEventListener("click", function(event) {
//     if (event.target.classList.contains("quantity-increase")) {
//       const index = event.target.getAttribute("data-index");
//       items[index].quantity++;
//       renderCart();
//     }
  
//     if (event.target.classList.contains("quantity-decrease")) {
//       const index = event.target.getAttribute("data-index");
//       if (items[index].quantity > 1) {
//         items[index].quantity--;
//         renderCart();
//       }
//     }
  
//     if (event.target.classList.contains("item-delete")) {
//       const index = event.target.getAttribute("data-index");
//       items.splice(index, 1);
//       renderCart();
//     }
  
//     if (event.target.classList.contains("item-like")) {
//       const index = event.target.getAttribute("data-index");
//       // Toggle like status or change color
//       event.target.classList.toggle("liked");
//     }
//   });
  
//   // Initial render
//   renderCart();
  

document.addEventListener('DOMContentLoaded', function() {
  const quantityBtns = document.querySelectorAll('.quantity-btn');
  const likeBtns = document.querySelectorAll('.like-btn');
  const deleteBtns = document.querySelectorAll('.delete-btn');
  const totalPriceElement = document.getElementById('total-price');

  let totalPrice = 0; // Initial total price

  quantityBtns.forEach(btn => {
      btn.addEventListener('click', function() {
          const item = btn.parentElement;
          const price = parseFloat(item.querySelector('.item-price').textContent.slice(1));
          const quantity = parseInt(item.querySelector('.quantity').textContent);

          if (btn.classList.contains('minus')) {
            if (quantity <= 0) {
              item.querySelector('.quantity').textContent = quantity = 0;
              totalPrice = 0;

            } else if (quantity > 0) {
                  item.querySelector('.quantity').textContent = quantity - 1;
                  totalPrice -= price;
              }
          } else if (btn.classList.contains('plus')) {
              item.querySelector('.quantity').textContent = quantity + 1;
              totalPrice += price;
          }

          totalPriceElement.textContent = '$' + totalPrice.toFixed(2);
      });
  });

  // Like buttons
  likeBtns.forEach(btn => {
      btn.addEventListener('click', function() {
          btn.classList.toggle('active');
      });
  });

  // Delete buttons
  deleteBtns.forEach(btn => {
      btn.addEventListener('click', function() {
          const item = btn.parentElement;
          const price = parseFloat(item.querySelector('.item-price').textContent.slice(1));
          const quantity = parseInt(item.querySelector('.quantity').textContent);
          totalPrice -= price * quantity;
          item.remove();
          totalPriceElement.textContent = '$' + totalPrice.toFixed(2);
      });
  });
});
