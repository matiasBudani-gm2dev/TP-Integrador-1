import { getProducts } from "./listing-products.js";

document.querySelectorAll('.filters button').forEach(btn => {
  btn.addEventListener('click', function() {
    checkFilterSize(this.id);
  });
});

getProducts()

let countSelected = 0;
function showSelected(){
    const selected = document.querySelector(".selected")
    if(countSelected != 0){
        selected.innerHTML = `<p class="count-selected">${countSelected} selected</p>
        <button onclick="deleteSelected()">Borrar todo</button>`
    }else{
        selected.innerHTML = ""
    }
    console.log(countSelected)
}

function deleteSelected(){
    const selected = document.querySelector(".selected")
    const buttons = document.querySelectorAll(".filters button")
    buttons.forEach((button)=>{
        const buttonImage = button.querySelector("img")
        buttonImage.setAttribute('src',"/assets//unchecked box.svg")
    })
    countSelected = 0
    showSelected()
}

function checkFilterSize(id){
    const size = document.getElementById(id)
    const img = size.querySelector("img")
    if(img.getAttribute('src') === "/assets//unchecked box.svg"){
        img.setAttribute('src',"/assets//checked box.svg")
        countSelected++
    }else{
        img.setAttribute('src',"/assets//unchecked box.svg")
        countSelected--
    }
    showSelected()
}
