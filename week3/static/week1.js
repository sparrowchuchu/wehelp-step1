
const dropOption = document.querySelector('.dropOption');
const dropdown = document.querySelector('.dropdown');
const btnX = document.querySelector('.btn-x');

const toggleDropdown = () =>{
    dropOption.style.display = "none";
    dropdown.style.display = "block";
}
const toggleClose = () =>{
    dropOption.style.display = "block";
    dropdown.style.display = "none";
}


dropOption.addEventListener('click', toggleDropdown);
btnX.addEventListener('click', toggleClose);


