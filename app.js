let cardGroup = document.getElementById("cardGroup")
let brand = document.getElementById("brand")
let category = document.getElementById("category")
let allProducts = []  // global variable
let filters = {
  brand: null,
  category: null,
  search: ""
}


fetch('https://dummyjson.com/products')
.then(res => res.json())
.then(res2 => {
    allProducts = res2.products
    console.log(allProducts); // store all products
    renderCards(allProducts)     // render initially
})
function renderCards(products){
  cardGroup.innerHTML = ""
  brand.innerHTML = ""
  category.innerHTML=""
  let uniqueCategory =[]
  let uniquebrand = []
  for(val of products){
    if(val.brand){
      if(!uniquebrand.includes(val.brand)){
 uniquebrand.push(val.brand)
  brand.innerHTML +=`<li><a class="dropdown-item Drp-brand"  href="#" data-brand="${val.brand}">${val.brand}</a></li>
    `
      }
    }
    if(val.category){
      if(!uniqueCategory.includes(val.category)){
        uniqueCategory.push(val.category)
        category.innerHTML+=`<li><a class="dropdown-item Drp-category" href="#" data-category="${val.category}">${val.category}</a></li>`
      }
    }
     
    cardGroup.innerHTML +=`<div class="card col-md-3 mb-4 m-4">
     <img src="${val.images[0]}" class="card-img-top" alt="...">
       <div class="card-body">
         <h5 class="card-title">${val.title}</h5>
         <p class="card-text">${val.description}</p>
       </div>
       <div class="card-footer">
         <small class="">Rs : ${val.price}$</small>
       </div>
     </div>`
  }
}
let searchForm = document.getElementById("searchForm")
let InputValue = document.getElementById("searchInput")
searchForm.addEventListener("submit",function(event){
  event.preventDefault();
filters.search = InputValue.value.toLowerCase().trim()
applyFilters()
})

brand.addEventListener("click",function(e){
// console.log(e);
e.preventDefault()
if (e.target.classList.contains("Drp-brand")) {
   filters.brand = e.target.dataset.brand
   applyFilters()
}
})

category.addEventListener("click",function(e){
// console.log(e);
e.preventDefault()
if (e.target.classList.contains("Drp-category")) {
   filters.category = e.target.dataset.category
   applyFilters()
}
})

function applyFilters(){
 let filtered = allProducts.filter((products)=>{
   // 🔹 Title match
let titleMatch = products.title.toLowerCase().includes(filters.search)

// 🔹 Brand match
    let brandMatch = true
    if (filters.brand && products.brand) {
      brandMatch = products.brand === filters.brand
    }
    if (filters.brand && !products.brand) {
      brandMatch = false
    }

    // 🔹 Category match
    let categoryMatch = true
    if (filters.category) {
      categoryMatch = products.category === filters.category
    }
     return titleMatch && brandMatch && categoryMatch
 })
  if (filtered.length === 0) {
    showNotFound()
  } else {
    renderCards(filtered)
  }
}

function showNotFound() {
  cardGroup.innerHTML = `
    <div class="text-center w-100">
      <img src="https://cdn.dribbble.com/userupload/24450589/file/original-7a69eb5b87401ce59325c3291535aebc.gif" width="300">
    </div>
  `
}
