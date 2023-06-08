const form = document.getElementById('nibbleForm');
const selectGenreElem = document.getElementById('bookGenre');
const bookImageElem = document.getElementById('bookImage');

updateLibrary();

form.addEventListener('submit', function(event) {
  event.preventDefault();
  let bookRating = runTest();

  addNibble(
    form.elements.bookTitle.value,
    form.elements.bookAuthor.value,
    form.elements.bookStatus.value,
    form.elements.bookGenre.value,
    form.elements.bookStart.value,
    form.elements.bookFinish.value,
    bookRating,
    form.elements.bookNotes.value,
    'false'
  )

  bookImageElem.setAttribute('src', 'assets/default_book.png');
})

function runTest(){
  var starRadioElem = document.querySelector('input[name="bookRating"]:checked');
  console.log(starRadioElem.value);
  return starRadioElem.value;
}

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

  // Return form to original state
  form.reset();
  let startDate = document.getElementById('bookStart');
  startDate.setAttribute('type', 'text');
  let finishDate = document.getElementById('bookFinish');
  finishDate.setAttribute('type', 'text');
}

// Changes image preview to the book genre when user selects a genre
selectGenreElem.addEventListener('input', updateImage);
function updateImage() {
  bookImageElem.setAttribute('src', 'assets/' + form.elements.bookGenre.value + '_book.svg');
}

// Updates the library list with items from local storage
function updateLibrary() {
  emptyLibrary.style.display = "none";
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

      // Star rating
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

      // Favourite and Status
      let additionalInfo = document.createElement('div');
      additionalInfo.setAttribute('class', 'additional-info');

      let favourite = document.createElement('img');
      favourite.setAttribute('class', 'favourite')
      favourite.src = 'assets/favourite_' + nibble.favourite + '.svg';

      favourite.addEventListener('click', function() {
        if (nibble.favourite == 'false') {
          nibble.favourite = 'true';
        } else {
          nibble.favourite = 'false';
        }
        favourite.src = 'assets/favourite_' + nibble.favourite + '.svg';
        console.log(nibble.favourite);
        console.log(favourite.src);
        
        localStorage.setItem('nibbleLibrary', JSON.stringify(nibbleLibrary))

        });


      additionalInfo.appendChild(favourite);

      item.appendChild(additionalInfo);

      nibbleList.appendChild(item);
    })

  } else {
    emptyLibrary.style.display = "flex";
  }
}