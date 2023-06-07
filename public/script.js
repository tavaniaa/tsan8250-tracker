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

  let nibbleLibrary = JSON.parse(localStorage.getItem('nibbleLibrary'));
        
        if (nibbleLibrary == null) {
          // Set a new value for nibbleLibrary in localStorage
          nibbleLibrary = [nibble.id]
        } else {
          // Check to see if nibble exists in localStorage
          if (nibbleLibrary.find(element => element === nibble.id)) {
            console.log('Nibble already exists')
          } else {
            nibbleLibrary.push(nibble.name)
          }
        }
        localStorage.setItem('nibbleLibrary', JSON.stringify(nibbleLibrary))
        console.log(JSON.parse(localStorage.getItem('nibbleLibrary')))


  // nibbleList.push(nibble);
  // displayNibble(nibble)
}


// function displayNibble(nibble) {
//     let item = document.createElement('div');
//     item.className = "card";
//     item.setAttribute('data-id', nibble.id);
//     let genreImage = document.createElement('img')
//     genreImage.setAttribute('src', 'assets/default_book.png');
//     item.appendChild(genreImage);
//     item.innerHTML = `<p> <strong>${nibble.name}</strong> <br/> ${nibble.author} </p>`
//     nibbleListElem.appendChild(item);
//     form.reset();
//   }


  selectGenreElem.addEventListener('input', updateImage);

  function updateImage() {
    bookImageElem.setAttribute('src', 'assets/' + form.elements.bookGenre.value + '_book.svg');
  }

  function updateLibrary() {
    let list = document.getElementById('#nibbleList');
    list.innerHTML = "";
    
    let nibbleLibrary = JSON.parse(localStorage.getItem('nibbleLibrary'));
    
    if (nibbleLibrary !== null) {
      
      nibbleLibrary.forEach((nibble) => {
        let listItem = document.createElement('li');
        listItem.textContent = nibble.name;
        list.appendChild(listItem)
      })
      
    }
    
  }