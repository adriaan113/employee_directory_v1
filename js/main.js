var xhr = new XMLHttpRequest();
 xhr.onreadystatechange = function() {
   if (this.readyState == 4 && this.status == 200) {
     document.querySelector(".grid").innerHTML =
     this.responseText;
   }
 };
 xhr.open("GET", "ajax_info.txt", true);
 xhr.send();
