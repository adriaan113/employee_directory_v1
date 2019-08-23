
///////////////++++ VARIABLES ++++///////////////

const html=  document.querySelector('.grid');


const modal= document.querySelector('.modal');
const modalContent= document.querySelector('.modal-content');
//let modalClose;

const input= document.querySelector('.search');
const gridItem= html.children;


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
    const capitalizeCity= `${city.charAt(0).toUpperCase()}${city.substring(1).toLowerCase()}`;

    //extra modal info

    const cell = data.results[i].cell;
    const street = data.results[i].location.street;
    const state = data.results[i].location.state;
    const postcode= data.results[i].location.postcode;
    const dob= data.results[i].dob.date;
    const partOfDob= dob.substring(0, 10);



    html.innerHTML+=
          `<a class="grid-item">
              <span class="modal-close">x</span>
              <div class="img-container">
                <img src="${profileImg}">
              </div>
              <span class="modal-prev">&lt</span>
              <span class="modal-next">&gt</span>
              <div class="text-container">
                <h3>${fullName}</h3>
                <p>${email}</p>
                <p>${capitalizeCity}</p>
              </div>
              <div class="text-container-modal">
                <p>${cell}</p>
                <p>${street} ${postcode} ${state}</p>
                <p>${partOfDob}</p>
              </div>
          </a>`
  }



})//****capitalize city****

// .catch(Error=>{
//   console.log(Error); need to give a better error
// })


///////////////++++ FUNCTIONS ++++///////////////

function employeeFilter(){
  for(let i=0; i<gridItem.length;i++){
    const txtContent= gridItem[i].children[4].textContent.toUpperCase();

    if(txtContent.indexOf(input.value.toUpperCase()) > -1){
      gridItem[i].style.display = "";
    }else{
      gridItem[i].style.display = "none";
    }
  }//modal prev and next buttons don't follow the filter
}

function prevNext(prev) {


  const previousEmployee = prev.previousElementSibling;
  const nextEmployee = prev.nextElementSibling;

  const toLastEmployee= gridItem[11];
  const toFirstEmployee= gridItem[0];



  modalContent.innerHTML = prev.innerHTML;
  modalContent.children[5].style.display = "block";
  modalContent.children[0].style.display = "block";
  modalContent.children[2].style.display = "inline";
  modalContent.children[3].style.display = "inline";



  modalContent.children[2].addEventListener('click', () => {

    if(prev === gridItem[0]){
      modalContent.innerHTML = gridItem[11].innerHTML;
      modalContent.children[5].style.display = "block";
      modalContent.children[0].style.display = "block";
      modalContent.children[2].style.display = "inline";
      modalContent.children[3].style.display = "inline";
      prevNext(toLastEmployee);
      close();


    }else{
      prevNext(previousEmployee);
      close();
    }
  });

  modalContent.children[3].addEventListener('click', () => {

    if(prev === gridItem[11]){
      //console.log('satan');
      modalContent.innerHTML = gridItem[0].innerHTML;
      modalContent.children[5].style.display = "block";
      modalContent.children[0].style.display = "block";
      modalContent.children[2].style.display = "inline";
      modalContent.children[3].style.display = "inline";
      prevNext(toFirstEmployee);
      close();
    }else{
      prevNext(nextEmployee);
      close();
    }
  });
}



function close(){
  modalContent.children[0].addEventListener('click', ()=>{
    modal.style.display= 'none';
  });
}


///////////////++++ LISTENERS ++++///////////////

input.addEventListener( 'keyup',  ()=>{
  employeeFilter();
});



html.addEventListener('click', (e)=>{
  modal.style.display= "block";

  if(e.target.tagName==='DIV'){
    modalContent.innerHTML= e.target.parentNode.innerHTML;
    modalContent.children[5].style.display= "block";
    modalContent.children[0].style.display= "block";
    modalContent.children[2].style.display= "inline";
    modalContent.children[3].style.display= "inline";

   }else if(e.target.tagName === 'MAIN'){
     modal.style.display = "none";

   }else if(e.target.tagName==='IMG' || e.target.tagName==='H3' || e.target.tagName==='P'){
    modalContent.innerHTML= e.target.parentNode.parentNode.innerHTML;
    modalContent.children[5].style.display= "block";
    modalContent.children[0].style.display= "block";
    modalContent.children[2].style.display= "inline";
    modalContent.children[3].style.display= "inline";

    }else{
      modalContent.innerHTML= e.target.innerHTML;
      modalContent.children[5].style.display= "block";
      modalContent.children[0].style.display= "block";
      modalContent.children[2].style.display= "inline";
      modalContent.children[3].style.display= "inline";
    }

  close();


  const previousEmployee=  e.target.parentNode.previousElementSibling;
  const previousEmployeeImgH3P= e.target.parentNode.parentNode.previousElementSibling;
  const previousEmployeeA= e.target.previousElementSibling;

  const nextEmployee= e.target.parentNode.nextElementSibling;
  const nextEmployeeImgH3P = e.target.parentNode.parentNode.nextElementSibling;
  const nextEmployeeA= e.target.nextElementSibling;

  const firstEmployee= gridItem[0];
  const lastEmployee= gridItem[11];


  modalContent.children[2].addEventListener('click', ()=>{

    if(e.target.parentNode === firstEmployee || e.target.parentNode.parentNode === firstEmployee || e.target === firstEmployee){
      prevNext(lastEmployee);
      close();

    }else{

      if(e.target.tagName === 'IMG' || e.target.tagName === 'H3' || e.target.tagName === 'P'){
        prevNext(previousEmployeeImgH3P);
        close();
      }else if(e.target.tagName === 'A'){
        prevNext(previousEmployeeA);
        close();
      }else{
        prevNext(previousEmployee);
        close();
      }
    }

  });


  modalContent.children[3].addEventListener('click', ()=>{

    if(e.target.parentNode === lastEmployee || e.target.parentNode.parentNode === lastEmployee || e.target === lastEmployee){
      prevNext(firstEmployee);
      close();

    }else{

      if(e.target.tagName === 'IMG' || e.target.tagName === 'H3' || e.target.tagName === 'P'){
        prevNext(nextEmployeeImgH3P);
        close();
      }else if(e.target.tagName === 'A'){
        prevNext(nextEmployeeA);
        close();
      }else if(e.target.parentNode === lastEmployee){
        prevNext(firstEmployee);
        close();
      }else{
        prevNext(nextEmployee);
        close();
      }
  }

  });

});
