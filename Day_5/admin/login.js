var email = document.getElementById('email'); 
var pass = document.getElementById('password'); 

document.getElementById("form").addEventListener("submit", (ee)=>{
    ee.preventDefault(); 
    console.log(email.value); 
    console.log(pass.value); 
    if (email.value == "admin@gmail.com" && pass.value =="admin@123"){
        new swal({
            title:'Welcom', 
            html:'Access Granted',  
            type:'success'
        }); 
        setTimeout(()=>{
            loadPage(); 
        },3000);  
    }else{
        new swal({
            title:'Error', 
            html:'Access denied',  
            type:'error'
        }); 
       
    }  
    function loadPage(){
        window.location.href="./admin.html"
    }
})