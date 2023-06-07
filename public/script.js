const form = document.getElementById('nibbleForm');
const nibbleListElem = document.querySelector('#nibbleList');
const selectGenreElem = document.getElementById('bookGenre');
const bookImageElem = document.getElementById('bookImage');

form.addEventListener('submit', function(event) {
  event.preventDefault();
  // handle the event here
  addNibble(
    form.elements.bookTitle.value,
    form.elements.bookAuthor.value,
    form.elements.bookStatus.value,
    form.elements.bookGenre.value,
    form.elements.bookStart.value,
    form.elements.bookFinish.value,
    5,
    form.elements.bookNotes.value,
    false
  )

  bookImageElem.setAttribute('src', 'assets/default_book.png');

  console.log(nibbleList);
})

var nibbleList = [];

function addNibble(name, author, status, genre, started, finished, rating, note, favourite) {
  let nibble = {
    name,
    id: Date.now(),
    author,
    status,
    genre,
    started,
    finished,
    rating,
    note,
    favourite
  }

  nibbleList.push(nibble);
  displayNibble(nibble)
}


function displayNibble(nibble) {
    let item = document.createElement('div');
    item.className = "card";
    item.setAttribute('data-id', nibble.id);
    let genreImage = document.createElement('img')
    genreImage.setAttribute('src', 'assets/default_book.png');
    item.appendChild(genreImage);
    item.innerHTML = `<p> <strong>${nibble.name}</strong> <br/> ${nibble.author} </p>`
    nibbleListElem.appendChild(item);
    form.reset();
  
    let delButton = document.createElement('button');
    let delButtonText = document.createTextNode('Delete');
    delButton.appendChild(delButtonText);
    item.appendChild(delButton);
  
    delButton.addEventListener('click', function(event){
      item.remove();
      nibbleList.forEach(function(nibbleArrayElement, nibbleArrayIndex){
        if (nibbleArrayElement.id == item.getAttribute('data-id')) {
          nibbleList.splice(nibbleArrayIndex, 1)
        }
      })
      console.log(nibbleList);
    })
  }


  selectGenreElem.addEventListener('input', updateImage);

  function updateImage() {
    bookImageElem.setAttribute('src', 'assets/' + form.elements.bookGenre.value + '_book.svg');
  }