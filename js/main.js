
///////////////++++ VARIABLES ++++///////////////

let html=  document.querySelector('.grid');



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
          </a>`
  }



})//****capitalize city****

// .catch(Error=>{
//   console.log(Error); need to give a better error
// })


const input= document.querySelector('.search');
const filter = input.value.toUpperCase();
const grid= document.querySelector('.grid');
const gridItem= grid.children;
//let txtContent;




function employeeFilter(){

  for(let i=0; i<gridItem.length;i++){

    const txtContent= gridItem[i].children[1].textContent.toUpperCase();

      //console.log(gridItem[i]);


        if(txtContent.indexOf(filter) > -1){
          gridItem[i].style.display = "";
        }else{
          gridItem[i].style.display = "none";
        }


  }
}


input.addEventListener( 'keyup',  ()=>{
  employeeFilter();
});
