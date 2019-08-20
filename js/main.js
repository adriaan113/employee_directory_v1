
///////////////++++ VARIABLES ++++///////////////

let html=  document.querySelector('.grid');

// const modal = document.createElement("DIV");
// modal.classList.add('modal');

const modal= document.querySelector('.modal');


///////////////++++ FETCH ++++///////////////



fetch('https://randomuser.me/api/?results=12&nat=us')
.then(response=> {
  return response.json();
})
.then(function(data){

  for(let i=0;i<12;i++){ //make forEach or i<results.length

    const profileImg= data.results[i].picture.large;

    const firstName= data.results[i].name.first;
    const lastName= data.results[i].name.last;
    const fullName= `${firstName.charAt(0).toUpperCase()}${firstName.substring(1).toLowerCase()} ${lastName.charAt(0).toUpperCase()}${lastName.substring(1).toLowerCase()}`;
    const email= data.results[i].email;
    const city= data.results[i].location.city;

    //extra modal info

    const cell = data.results[i].cell;
    const street = data.results[i].location.street;
    const state = data.results[i].location.state;
    const postcode= data.results[i].location.postcode;
    const dob= data.results[i].dob.date;



    html.innerHTML+=
          `<a class="grid-item">
              <div class="img-container">
                <img src="${profileImg}">
              </div>
              <div class="text-container">
                <h3>${fullName}</h3>
                <p>${email}</p>
                <p>${city}</p>
              </div>
              <div class="text-container-modal">
                <p>${cell}</p>
                <p>${street} ${postcode} ${state}</p>
                <p>${dob}</p>
              </div>
          </a>`


    // modal.innerHTML+= `<div class="modal-content">
    //                       <div class="img-container-modal">
    //                         <img src="${profileImg}">
    //                       </div>
    //                       <div class="text-container-modal">
    //                         <h3>${fullName}</h3>
    //                         <p>${email}</p>
    //                         <p>${city}</p>
    //                       </div>
    //                       <div class="text-container-modal-extra">
    //                         <p>${cell}</p>
    //                         <p>${street} ${postcode} ${state}</p>
    //                         <p>${dob}</p>
    //                       </div>
    //                   </div>`;
  }



})//****capitalize city****

// .catch(Error=>{
//   console.log(Error); need to give a better error
// })


const input= document.querySelector('.search');
const grid= document.querySelector('.grid');
const gridItem= grid.children;


function employeeFilter(){

  for(let i=0; i<gridItem.length;i++){

    const txtContent= gridItem[i].children[1].textContent.toUpperCase();

      if(txtContent.indexOf(input.value.toUpperCase()) > -1){
        gridItem[i].style.display = "";
      }else{
        gridItem[i].style.display = "none";
      }
  }
}

input.addEventListener( 'keyup',  ()=>{
  employeeFilter();
});



grid.addEventListener('click', (e)=>{
  modal.style.display= "block";


  modalContent= document.createElement('div');
  modalContent.classList.add('modal-content');

  modal.appendChild(modalContent);


  if(e.target.tagName==='DIV'){
    modalContent.innerHTML= e.target.parentNode.innerHTML;
    modalContent.children[2].style.display= "block";

  }else if(e.target.tagName==='IMG' || e.target.tagName==='H3' || e.target.tagName==='P'){
    modalContent.innerHTML= e.target.parentNode.parentNode.innerHTML;
    modalContent.children[2].style.display= "block";
  }else{
    modalContent.innerHTML= e.target.innerHTML;
    modalContent.children[2].style.display= "block";
  }

    //console.log(modalContent.children[2]);
  //console.log(e.target);
});
