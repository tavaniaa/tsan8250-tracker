const form = document.getElementById('nibbleForm');
const selectGenreElem = document.getElementById('bookGenre');
const bookImageElem = document.getElementById('bookImage');

updateLibrary();

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
    3,
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
    nibbleLibrary = [nibble]
  } else {
    // Check to see if nibble exists in localStorage
    if (nibbleLibrary.find(element => element.id === nibble.id)) {
      console.log('Nibble already exists')
    } else {
      nibbleLibrary.push(nibble)
    }
  }
  localStorage.setItem('nibbleLibrary', JSON.stringify(nibbleLibrary))
  console.log(JSON.parse(localStorage.getItem('nibbleLibrary')))

  updateLibrary();
  form.reset();
}

// Changes image preview to the book genre when user selects a genre
selectGenreElem.addEventListener('input', updateImage);
function updateImage() {
  bookImageElem.setAttribute('src', 'assets/' + form.elements.bookGenre.value + '_book.svg');
}

// Updates the library list with items from local storage
function updateLibrary() {
  let nibbleList = document.querySelector('ul');
  nibbleList.innerHTML = "";
  
  let nibbleLibrary = JSON.parse(localStorage.getItem('nibbleLibrary'));
  
  // Display each nibble in the library as a card
  if (nibbleLibrary !== null) {
    nibbleLibrary.forEach((nibble) => {
      let item = document.createElement('li');
      item.setAttribute('class', 'card');
      
      let cardImage = new Image();
      cardImage.src = 'assets/' + nibble.genre + '_card.svg';
      cardImage.alt =  nibble.genre + ' Image'
      item.appendChild(cardImage);

      let nibbleInfo = document.createElement('div');
      nibbleInfo.setAttribute('class', 'nibble-info')
      nibbleInfo.innerHTML = `<p> <strong>${nibble.name}</strong> <br/> ${nibble.author}</p>`
      item.appendChild(nibbleInfo);

      let ratingWrap = document.createElement('div');
      ratingWrap.setAttribute('class', 'rating-wrap');
      nibbleInfo.appendChild(ratingWrap);

      for (i = 0; i < 5; i++) {
        let star = document.createElement('span');
        star.innerHTML = 'star';
        star.setAttribute('class', 'material-symbols-rounded');
        star.setAttribute('style', 'font-size: 16px');

        if (i < nibble.rating) {
          star.setAttribute('style', 'color: #3E8C97');
        } else {
          star.setAttribute('style', 'color: #D9D9D9');
        }
        ratingWrap.appendChild(star);
      }

      nibbleList.appendChild(item);
    })
  }
}

