const form = document.getElementById('nibbleForm');
const selectGenreElem = document.getElementById('bookGenre');
const emptyLibrary = document.getElementById('emptyLibrary');

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

// Checks which radio button is checked and returns the rating number value
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
const bookImageElem = document.getElementById('bookImage');
selectGenreElem.addEventListener('input', updateImage);
function updateImage() {
  bookImageElem.src = 'assets/' + form.elements.bookGenre.value + '_book.svg';
}

// Updates the library list with items from local storage
function updateLibrary() {

  let nibbleList = document.querySelector('ul');
  nibbleList.innerHTML = "";
  
  let nibbleLibrary = JSON.parse(localStorage.getItem('nibbleLibrary'));

  if (nibbleLibrary.length !== 0) {
    emptyLibrary.style.display = "none";
  } else {
    emptyLibrary.style.display = "flex";
  }

  console.log(nibbleLibrary);
  
  // Display each nibble in the library as a card
  if (nibbleLibrary !== null) {
    nibbleLibrary.forEach((nibble) => {
      let item = document.createElement('li');
      item.setAttribute('class', 'card');

      // Create popup with more information about the nibble
      item.addEventListener('click', function() {
        console.log(nibble.name);
        let nibbleDetails = document.getElementById('detailsOverlay');

        nibbleDetails.setAttribute('style', 'display: flex');

        // Updates details to match nibble
        document.getElementById('detailsImage').src = 'assets/' + nibble.genre + '_book.svg';        
        document.getElementById('detailsTitle').innerHTML = nibble.name;
        document.getElementById('detailsAuthor').innerHTML = nibble.author;
        document.getElementById('detailsGenre').innerHTML = nibble.genre;
        document.getElementById('detailsStart').innerHTML = nibble.started;
        document.getElementById('detailsFinish').innerHTML = nibble.finished;
        document.getElementById('detailsNotes').innerHTML = nibble.note;
        document.getElementById('detailsRating').innerHTML = '<p><strong>Your rating: </strong>' + nibble.rating + ' / 5</p>';




        // Creates a copy of the reading status and heart elements
        let additionalDetails = document.getElementById('headerAdditionalDetails');
        additionalDetails.appendChild(createReadingStatus(nibble));
        additionalDetails.appendChild(createHeart(nibbleLibrary, nibble));

        // Clicking delete button removes the nibble from nibbleLibrary array
        let deleteNibbleButton = document.getElementById('deleteNibble');
        deleteNibbleButton.addEventListener('click', function() {
          console.log(nibble.id);
          nibbleLibrary.forEach(function(arrayID, arrayIndex) {
            if (arrayID.id === nibble.id) {
              nibbleLibrary.splice(arrayIndex, 1);
            }
          })
        
          localStorage.setItem('nibbleLibrary', JSON.stringify(nibbleLibrary))
        
          updateLibrary();
          
          closePopup('detailsOverlay');
        });
      });
      
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

      // ADDITIONAL INFO
      let additionalInfo = document.createElement('div');
      additionalInfo.setAttribute('class', 'additional-info');

      // FAVOURITE BUTTON
      favourite = createHeart(nibbleLibrary, nibble);

      additionalInfo.appendChild(favourite);

      // READING STATUS
      readingStatus = createReadingStatus(nibble);

      additionalInfo.appendChild(readingStatus);

      item.appendChild(additionalInfo);

      nibbleList.appendChild(item);
    })
  }
}

// Creates heart element that displays whether the book is favourited or not. Users can click  the icon to favourite and unfavourite.
function createHeart(nibbleLibrary, nibble) {
  let heart = document.createElement('img');
      heart.setAttribute('class', 'favourite')
      heart.src = 'assets/favourite_' + nibble.favourite + '.svg';
      heart.alt = 'Favourite Icon';

      heart.addEventListener('click', function() {
        if (nibble.favourite == 'false') {
          nibble.favourite = 'true';
        } else {
          nibble.favourite = 'false';
        }
        heart.src = 'assets/favourite_' + nibble.favourite + '.svg';

        localStorage.setItem('nibbleLibrary', JSON.stringify(nibbleLibrary))

        });
  return heart;
}

function createReadingStatus(nibble) {
  let readingStatus = document.createElement('p');
  readingStatus.setAttribute('class', 'reading-status');
  readingStatus.innerHTML = nibble.status;
  
  if(nibble.status == 'Reading') {
    readingStatus.setAttribute('style', 'color: #66A9C6; background-color: #D8EAF8');
  } else if (nibble.status == 'Completed') {
    readingStatus.setAttribute('style', 'color: #7DBC84; background-color: #DCF2DC');
  } else if (nibble.status == 'On Hold') {
    readingStatus.setAttribute('style', 'color: #E3C148; background-color: #FFF0CB');
  } else {
    readingStatus.setAttribute('style', 'color: #DB5F5F; background-color: #FFD4D4');
  }

  return readingStatus;
}

// Close icon closes popups
function closePopup(popup) {
  let popupToClose = document.getElementById(popup);
  popupToClose.setAttribute('style','display: none');
  removeAdditionalDetails();
  updateLibrary();
}

function removeAdditionalDetails() {
  headerAdditionalDetails.innerHTML = "";
}
