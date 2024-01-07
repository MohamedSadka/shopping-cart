let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");

let cart = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = cart.map((x) => x.item).reduce((x, y) => x + y, 0);
};
calculation();

let generateDateCart = () => {
  if (cart.length !== 0) {
    return (shoppingCart.innerHTML = cart
      .map((x) => {
        let { id, item } = x;
        let search = cardsInfo.find((y) => y.id === id) || [];
        let { img, title, price } = search;
        return `
            <div class="shoppingCard"> 
                <img width="100" src=${img} alt="" />
                <div class="details">
                    <div class="title-price-x">
                        <h4>
                            <p class="cardTitle"> ${title} </p>
                            <div class="cartPrice"> $ ${price} </div>
                        </h4>
                        <span onclick=removeItem(${id}) class="closeCart" > del </span>  
                    </div>
                    <div class="quantity">
                        <div onclick = increment(${id}) class="plus">
                            <i class="fas fa-plus"></i>
                        </div>
                        <div id = ${id} class="item-quantity">${item}</div>
                        <div onclick = decrement(${id}) class="minus">
                        <i class="fas fa-minus"></i>
                        </div>
                    </div>
                    <h3>$ ${item * search.price}</h3>
                </div>
                
            </div>
            `;
      })
      .join(""));
  } else {
    shoppingCart.innerHTML = ``;
    label.innerHTML = `
            <h2> Cart is empty </h2>
            <a href="index.html">
                <button class="btnCart"> Back to Home </button>
            </a>
        `;
  }
};
generateDateCart();

// make the increment function
let increment = (id) => {
  let selectedItem = id;
  let search = cart.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    cart.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  generateDateCart();
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(cart));
};

// make the decrement function
let decrement = (id) => {
  let selectedItem = id;
  let search = cart.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }

  update(selectedItem.id);

  cart = cart.filter((x) => x.item !== 0);
  generateDateCart();
  localStorage.setItem("data", JSON.stringify(cart));
};

// make the update function
let update = (id) => {
  let search = cart.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  totalBill();
};

let removeItem = (id) => {
  let selectedItem = id;
  // console.log(selectedItem.id);
  cart = cart.filter((y) => y.id !== selectedItem.id);
  generateDateCart();
  totalBill();
  calculation();
  localStorage.setItem("data", JSON.stringify(cart));
};

let totalBill = () => {
  if (cart.length !== 0) {
    let amount = cart
      .map((x) => {
        let { item, id } = x;
        let search = cardsInfo.find((y) => y.id === id) || [];
        return item * search.price;
      })
      .reduce((x, y) => x + y, 0);
    label.innerHTML = `
            <h2 class="bill">Total Bill :$ ${amount} </h2>
            <button class="checkout"> Checkout </button>
            <button onclick="clearCart()" class="removeAll"> Remove Cart </button>
        `;
  } else return;
};
totalBill();

let clearCart = () => {
  cart = [];
  generateDateCart();
  calculation();
  localStorage.setItem("data", JSON.stringify(cart));
};
