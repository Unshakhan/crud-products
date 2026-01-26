// let cardGroup = document.getElementById("cardGroup")
// fetch('https://dummyjson.com/products')
// .then((res)=>{
//   // console.log(res.json())
// return res.json()
// }
// ).then((res2)=>{console.log(res2.products);
// let products = res2.products;
// for(val of products){
//   console.log(val.images);
//   cardGroup.innerHTML +=` <div class="card col-md-3 mb-4 m-4">
//       <img src="${val.images[0]}" class="card-img-top" alt="...">
//       <div class="card-body">
//         <h5 class="card-title">${val.title}</h5>
//         <p class="card-text">${val.description}</p>
//       </div>
//       <div class="card-footer">
//         <small class="text-body-secondary">Last updated 3 mins ago</small>
//       </div>
//     </div>`
// }
// }
// )

let cardGroup = document.getElementById("cardGroup")
let brand = document.getElementById("brand")
let category = document.getElementById("category")
let allProducts = []  // global variable

fetch('https://dummyjson.com/products')
.then(res => res.json())
.then(res2 => {
    allProducts = res2.products
    console.log(allProducts); // store all products
    renderCards(allProducts)     // render initially
})
function renderCards(products){
  cardGroup.innerHTML = ""
  for(val of products){
    //   brand.innerHTML +=`<li><a class="dropdown-item"  href="#">${val.category}</a></li>
    // `
    cardGroup.innerHTML +=`<div class="card col-md-3 mb-4 m-4">
     <img src="${val.images[0]}" class="card-img-top" alt="...">
       <div class="card-body">
         <h5 class="card-title">${val.title}</h5>
         <p class="card-text">${val.description}</p>
       </div>
       <div class="card-footer">
         <small class="text-body-secondary">Rs : ${val.price}$</small>
       </div>
     </div>`
  }
}
let searchForm = document.getElementById("searchForm")
let InputValue = document.getElementById("searchInput")
searchForm.addEventListener("submit",function(){
  event.preventDefault()
let mySearchVal = InputValue.value.toLowerCase().trim()
let filtered = allProducts.filter((products)=>{
  let title= products.title.toLowerCase()
  return title.includes(mySearchVal)
}
)
renderCards(filtered)
})