// call the html tags here
let shop = document.getElementById("shop");

let cart = JSON.parse(localStorage.getItem("data")) || [];

// make the generator functions for making the cards dynamic
let generatorCards = () => {
  return (shop.innerHTML = cardsInfo
    .map((x) => {
      let { id, img, title, desc, price } = x;
      let search = cart.find((x) => x.id === id) || [];
      return `
        <div id = "product-${id}" class="card">
            <img width="200" src="${img}" alt="img">
            <h2 class="title">${title}</h2>
            <div class="shop-details">
                <p class="description">${desc}</p>
                <div class="buttons">
                    <div class="price">$ ${price}</div>
                    <div class="quantity">
                        <div onclick = increment(${id}) class="plus">
                            <i class="fas fa-plus"></i>
                        </div>
                        <div id = ${id} class="item-quantity">${
        search.item === undefined ? 0 : search.item
      }</div>
                        <div onclick = decrement(${id}) class="minus">
                        <i class="fas fa-minus"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    })
    .join(""));
};
generatorCards();

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
  localStorage.setItem("data", JSON.stringify(cart));
};

// make the update function
let update = (id) => {
  let search = cart.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};

// make the calculation function
let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = cart.map((x) => x.item).reduce((x, y) => x + y, 0);
};
calculation();
// store the data in the local storage

// make the cart page
