//
// var xhr = new XMLHttpRequest();
//  xhr.onreadystatechange = function() {
//    if (xhr.readyState == 4 && xhr.status == 200) {
//
//      const mensjes= JSON.parse(xhr.responseText);
//
//      document.querySelector('.grid').innerHTML=
//      `<a class="grid-item"> ${mensjes.results[0].name.first
//      } </a>`
//
//
//
//     //console.log(mensjes.results[0].gender);
//    }
//  };
//  xhr.open("GET", 'https://randomuser.me/api/');
//  xhr.send();







///////////////++++ VARIABLES ++++///////////////

let html=  document.querySelector('.grid');
//let name;



///////////////++++ FUNCTIONS ++++///////////////


// let process= (prom)=>{
//   prom.then(data=>{
//   person= JSON.stringify(data.results[0].name.first);
//
//     html.innerHTML+=
//           `<a class="grid-item"> ${person} </a>`;
//   })}



///////////////++++ FETCH ++++///////////////


// Promise.all([
//   fetch('https://randomuser.me/api/'),
//   fetch('https://randomuser.me/api/'),
//   fetch('https://randomuser.me/api/'),
//   fetch('https://randomuser.me/api/'),
// ]).then(response=> {
//     response.forEach(answer =>{
//       process(answer.json());
//     });
// })





fetch('https://randomuser.me/api/?results=12')
.then(response=> {
  return response.json();
})
.then(function(data){

  for(let i=0;i<12;i++){
    const firstName= data.results[i].name.first;
    const lastName= data.results[i].name.last;
    const fullName= `${firstName.charAt(0).toUpperCase()}${firstName.substr(1).toLowerCase()}
                    ${lastName.charAt(0).toUpperCase()}${lastName.substr(1).toLowerCase()}`;
    html.innerHTML+=
          `<a class="grid-item"> ${fullName} </a>`
  }

})
// .catch(Error=>{
//   console.log(Error);
// })
