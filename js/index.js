var inputName = document.getElementById('BookmarkName');
var inputUrl = document.getElementById('BookmarkURL');

var regex ;
var BookMarks_arr=[];
var bookmark;
var BookmarkId ;
(function() {
    if (localStorage.length !== 0) {
        BookMarks_arr = JSON.parse(localStorage.getItem('AllBookmarks'));
        displayBookmarks();
    }
})();

function ValidateInput(id) {
    if (id== "BookmarkName") {
        regex=/^[^\s\W][A-Za-z0-9\W]{2,}$/;
        if(regex.test(inputName.value)){
            inputName.classList.remove('is-invalid');
            inputName.classList.add('is-valid');
            return true;
        }else {
            inputName.classList.remove('is-valid');
            inputName.classList.add('is-invalid');
            return false;
        }
        
       
    }
    else if(id== "BookmarkURL"){
     regex =/^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(:\d+)?(\/[^\s]*)?$/
     if(regex.test(inputUrl.value)){
        inputUrl.classList.remove('is-invalid');
        inputUrl.classList.add('is-valid');
        return true;
    }else {
        inputUrl.classList.remove('is-valid');
        inputUrl.classList.add('is-invalid');
        return false;
    }
    
    }
}

function AddBookmark() {
    
    if(ValidateInput("BookmarkName") && ValidateInput("BookmarkURL")){
        bookmark ={
            Name :inputName.value,
            Url: inputUrl.value
        }

        BookMarks_arr.push(bookmark);
        localStorage.setItem('AllBookmarks',JSON.stringify(BookMarks_arr));
        clearIputs();
        displayBookmarks();
    }
    else{
       document.getElementById("alertModal").classList.remove('d-none');
       document.getElementById("alertModal").classList.add('d-block');
       
        clearIputs();
    }
   
}

function clearIputs(){
    inputName.value = " ";
    inputUrl.value = " ";
    inputName.classList.remove('is-valid');
    inputUrl.classList.remove('is-valid');
    inputName.classList.remove('is-invalid');
    inputUrl.classList.remove('is-invalid');
}
function CloseAlert(){
    document.getElementById("alertModal").classList.add('d-none');
       document.getElementById("alertModal").classList.remove('d-block');
       
}
function displayBookmarks(){
    document.getElementById("tbody").innerHTML = " ";
    var rank;
    var BookMarks_arr = JSON.parse(localStorage.getItem('AllBookmarks'));
   for (var index = 0; index < BookMarks_arr.length; index++) {
    rank= index;
    document.getElementById("tbody").innerHTML += `
    <tr>
      <td>${++rank}</td>
      <td>${BookMarks_arr[index].Name}</td>
      <td><button onclick ="OpenBookmark(${index})" class="Btn visit-btn"><i class="fa-solid fa-eye pe-2"></i> Visit</button></td>
            <td><button onclick ="DeleteBookmark(${index}, this)" class="Btn delete-btn"> <i class="fa-solid fa-trash-can p-1"></i> Delete</button></td>
    </tr> `;
   }
}
function OpenBookmark(id) {
    BookmarkId = id;
    var url = BookMarks_arr[BookmarkId].Url;
    window.open(url);
}
function DeleteBookmark(id , button) {
    BookmarkId = id;
    var BookMarks_arr = JSON.parse(localStorage.getItem("AllBookmarks")) ;
    BookMarks_arr.splice(BookmarkId,1);
    localStorage.setItem("AllBookmarks",JSON.stringify(BookMarks_arr));

    const row = button.parentNode.parentNode; 
    row.remove(); 
    displayBookmarks();
}

