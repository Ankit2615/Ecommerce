const firebaseConfig = {
    apiKey: "AIzaSyAMu8wTgJPh6o_Q1Z3k5TUVh-VnVi1ghsM",
    authDomain: "organicstor-5b6c2.firebaseapp.com",
    databaseURL: "https://organicstor-5b6c2-default-rtdb.firebaseio.com",
    projectId: "organicstor-5b6c2",
    storageBucket: "organicstor-5b6c2.appspot.com",
    messagingSenderId: "799023522468",
    appId: "1:799023522468:web:9d07b6dad30d8c9947bc31",
    measurementId: "G-CLBCL7NRG6"
  };

  firebase.initializeApp(firebaseConfig);

// GLOBAL
var products = [];
var cartItem = [];
var cart_n = document.getElementById('cart_n');

const database = firebase.database();
const imagesRef = database.ref("items");

const dataContainer = document.getElementById("fruitsDiv");

imagesRef.on("value", snapshot => {
    dataContainer.innerHTML = ""; // Clear previous data
    snapshot.forEach(childSnapshot => {
        const childData = childSnapshot.val();
        const imageUrl = childData.imageUrl;
        const name = childData.name;
        const description = childData.description;
        const price = childData.price;

        dataContainer.innerHTML += showItem(imageUrl, name, description, price);
    });

    // Update cart count and call animation here if needed
    render();
});

function showItem(imageUrl, name, description, price) {
    let urls = `${imageUrl}`;
    let btn = `btn${name.replace(/\s+/g, '')}`; // Generate a unique button ID based on the item name
    
    return `
        <div class="col-md-4">
            <div class="card mb-4 shadow-sm">
                <img class="card-img-top" style="height: 16rem;" src="${urls}" alt="Card img cap">
                <div class="card-body">
                    <i style="color:#ffae00;" class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star" style="color:#ffae00;"></i>
                    <i class="fa-solid fa-star" style="color:#ffae00;"></i>
                    <i class="fa-solid fa-star" style="color:#ffae00;"></i>
                    <i class="fa-solid fa-star" style="color:#ffae00;"></i>
                    <p class="card-text">${name}</p>
                    <p class="card-text">${description}</p>
                    <p class="card-text">${price}.00</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                            <button type="button" class="btn btn-sm btn-outline-secondary" onclick="cart2('${name}','${description}','${price}','${urls}','${btn}')" ><a style="color:inherit;" href="cart.html">Buy</a></button>
                            <button type="button" class="btn btn-sm btn-outline-secondary" id="${btn}" onclick="cart('${name}','${description}','${price}','${urls}','${btn}')" >Add to cart</button>
                        </div>
                        <small class="text-muted">Free Shipping</small>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Animation
function animation() {
    const toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1000
    });
    toast({
        type: 'success',
        title: 'Added to shopping cart'
    });
}

// Cart Function
function cart(name, description, price, url, btncart) {
    var items = {
        name: name,
        description: description,
        price: price,
        url: url,
    };
    cartItem.push(items);
    let storage = JSON.parse(localStorage.getItem("cart"));
    if (storage == null) {
        products.push(items);
        localStorage.setItem("cart", JSON.stringify(products));
    } else {
        products = JSON.parse(localStorage.getItem("cart"));
        products.push(items);
        localStorage.setItem("cart", JSON.stringify(products));
    }
    products = JSON.parse(localStorage.getItem("cart"));
    cart_n.innerHTML = `[${products.length}]`;
    document.getElementById(btncart).style.display = "none";
    animation();
}

function cart2(name, description, price, url, btncart) {
    var items = {
        name: name,
        description: description,
        price: price,
        url: url,
    };
    cartItem.push(items);
    let storage = JSON.parse(localStorage.getItem("cart"));
    if (storage == null) {
        products.push(items);
        localStorage.setItem("cart", JSON.stringify(products));
    } else {
        products = JSON.parse(localStorage.getItem("cart"));
        products.push(items);
        localStorage.setItem("cart", JSON.stringify(products));
    }
    products = JSON.parse(localStorage.getItem("cart"));
    cart_n.innerHTML = `[${products.length}]`;
    document.getElementById(btncart).style.display = "none";
}

// Render
function render() {
    // If you want to render any other elements or perform additional actions after fetching data, you can do so here.
    // You can update the cart count or perform animations if needed.
}
