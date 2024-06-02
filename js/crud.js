var InName=document.getElementById('bookmarkName');
var InLink=document.getElementById('bookmarkURL');
var BodyTable=document.getElementById('tableContent')



var sites=[];



if(localStorage.getItem('websites') ===null){
  var sites=[] ;

}else{
sites=JSON.parse(localStorage.getItem('websites'))
display();
}



function submit(){
 var website={
             
        name:bookmarkName.value,
        url:bookmarkURL.value,
         
    }
     
    sites.push(website);
    display();
    clear();
   localStorage.setItem('websites', JSON.stringify(sites));
  
}




function display() {
  var cartona = '';
  for (let i = 0; i < sites.length; i++) {
      cartona += `
      <tr>
          <td>${i + 1}</td>
          <td>${sites[i].name}</td>
          <td>
              <button class="btn btn-visit btn-success px-3" data-index="${i}">
                  <i class="fa-solid fa-eye pe-2"></i> visite
              </button>
          </td>
          <td>
              <button class="btn btn-delete pe-2 btn-danger px-3" onclick="delet(${i})">
                  <i class="fa-solid fa-trash-can text-white"></i> Delet
              </button>
          </td>
      </tr>`;
  }

  document.getElementById('tableContent').innerHTML = cartona;

  var visitBtns = document.querySelectorAll(".btn-visit");
  visitBtns.forEach(function(btn) {
      btn.addEventListener("click", function(e) {
          visitWebsite(e);
      });
  });
}

function clear(){
  bookmarkName.value="";
  bookmarkURL.value="";

}

function delet(index){
 
  sites.splice(index,1)
    display()
    localStorage.setItem('websites',JSON.stringify(sites));
}


function visitWebsite(e) {
  var index = e.target.getAttribute("data-index");

  if (index !== null) {
      var siteLink = sites[index].url;
      window.open(siteLink , '_blank');
  }
}

function validate(name, url) {
  var namePattern = /^[\u0621-\u064A\u0660-\u0669a-zA-Z0-9\s]+$/;
  var urlPattern = /^(https?:\/\/)?([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})([\/\w .-]*)*\/?$/;

  if (!namePattern.test(name)) {
      alert("name website invalid");
      return false;
  }

  if (!urlPattern.test(url)) {
      alert("  url invalid");
      return false;
  }

  return true;
}

function submit() {
  var name = bookmarkName.value;
  var url = bookmarkURL.value;

  if (!validate(name, url)) {
      return;
  }

  var website = {
      name: name,
      url: url
  };

  sites.push(website);
  display();
  clear();
  localStorage.setItem('websites', JSON.stringify(sites));
}
