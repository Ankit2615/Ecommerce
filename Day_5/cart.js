const firebaseConfi = {
    apiKey: "AIzaSyAMu8wTgJPh6o_Q1Z3k5TUVh-VnVi1ghsM",
    authDomain: "organicstor-5b6c2.firebaseapp.com",
    databaseURL: "https://organicstor-5b6c2-default-rtdb.firebaseio.com",
    projectId: "organicstor-5b6c2",
    storageBucket: "organicstor-5b6c2.appspot.com",
    messagingSenderId: "799023522468",
    appId: "1:799023522468:web:9d07b6dad30d8c9947bc31",
    measurementId: "G-CLBCL7NRG6"
};
firebase.initializeApp(firebaseConfi); 

// GLOBAL
var products = JSON.parse(localStorage.getItem('cart')); 
var cartItem = []; 
var cart_n = document.getElementById('cart_n');  
var table = document.getElementById("table"); 
var total = 0; 

// HTML
function showHtml(i){
    return `
        <tr>
        <th scop="row">${i+1}</th>
        <td><img style="width:90px;" src="${products[i].url}"></td>
        <td>${products[i].name}</td>
        <td>1</td>
        <td>${products[i].price}</td>
        </tr>
    `
}

// BUy
function buy(){
    var d = new Date(); 
    var t = d.getTime();  
    var counter = t
    counter+=1;
    let db= firebase.database().ref("order/"+counter); 
    let itemDb ={
        id:counter,
        order:counter-895,
        total:total,
    }
    db.set(itemDb);
    
    new swal({
        position:'center', 
        type:'success', 
        title:'purchash made succesfully',
        text:`your purchased order is  :-${itemDb.order}`, 
        showConfirmButton:true, 
        timer:5000
    });
    clean(); 
}
// Clean
function clean(){
    localStorage.clear(); 
    for(var index =0; index <products.length; index++){
        table.innerHTML+=showHtml(index); 
        total=total+parseInt(products[index].price); 
    }
    total=0; 
    table.innerHTML =`
    <tr>
    <th ></th>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    </tr>
    `; 
    cart_n.innerHTML = ''; 
    document.getElementById("btnBuy").style.display ="none"; 
    document.getElementById("btnclean").style.display="none";

}

// RENDER
function render(){
    for (let index = 0; index < products.length; index++) {
        //debugger;  
        table.innerHTML+=showHtml(index); 
        total=total+parseInt(products[index].price)
    }
    table.innerHTML+=`
    <tr>
        <th scope="col"></th>
        <td scope="col"></td>
        <td scope="col">
            <button type="button" id="btnClean" onclick="clean()" value="clear "class="btn text-white btn-warning">Clean Shoping</button>   
        </td>
        <td scope="col">
            <button type="button" id="btnBuy" onclick="buy()" class="btn text-white btn-info">Buy</button>
        </td>
        <td scope="col">Toatl :- $${total}.00</td>
    </tr>
    
   
    `
}