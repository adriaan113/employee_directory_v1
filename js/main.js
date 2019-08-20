
///////////////++++ VARIABLES ++++///////////////

let html=  document.querySelector('.grid');

// const modal = document.createElement("DIV");
// modal.classList.add('modal');

const modal= document.querySelector('.modal');
let modalContent;
let modalClose;


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
              <span class="modal-close">x</span>
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


  // modalContent= document.createElement('div');
  // modalContent.classList.add('modal-content');

  // modalClose= document.createElement('span');
  // modalClose.classList.add('modal-close');
  // modalClose.innerHTML= "<h3>x</h3>";

  //modal.appendChild(modalContent);
  // modalContent.appendChild(modalClose);


  modalContent= document.querySelector('.modal-content');
  // modalClose= document.querySelector('.modal-close');

  //modalClose.style.display="block";
  // modalClose.innerHTML="<h3>x</h3>";

//  modalContent.appendChild(modalClose);


  if(e.target.tagName==='DIV'){
    modalContent.innerHTML= e.target.parentNode.innerHTML;
    modalContent.children[3].style.display= "block";
    modalContent.children[0].style.display= "block";

   }else if(e.target.tagName === 'MAIN'){
     modal.style.display = "none";

     while (modal.firstChild){
       modal.removeChild(modal.firstChild);
     }

   }else if(e.target.tagName==='IMG' || e.target.tagName==='H3' || e.target.tagName==='P'){
    modalContent.innerHTML= e.target.parentNode.parentNode.innerHTML;
    modalContent.children[3].style.display= "block";
    modalContent.children[0].style.display= "block";

  }else{
    modalContent.innerHTML= e.target.innerHTML;
    modalContent.children[3].style.display= "block";
    modalContent.children[0].style.display= "block";
  }


  modalContent.children[0].addEventListener('click', (e)=>{ //can this be a callback function instead????
    modal.style.display= 'none';


    // while (modal.firstChild){
    //   modal.removeChild(modal.firstChild);
    // }

  });

});
