/**
 * 
 * -------------------------------------
 * DOM Manipulation / Traversal Activity
 * -------------------------------------
 * 
 * 1. Create and attach an event handler (function) to each ".image" 
 * element so that when the ".image" element is clicked, the corresponding 
 * image loads in the .featured image element.
 * 
 * 2. Create event handlers for the next and previous buttons. The next button should
 *    show the next image in the thumbnail list. The previous should show the previous.
 * 
 * 3. If you get to the end, start at the beginning. 
 * 
 * 4. If you get to the beginning, loop around to the end.
 * 
 * 
 */

let currentIndex = 0; 

const images = [
    'images/field1.jpg',
    'images/purple.jpg',
    'images/jar.jpg',
    'images/green.jpg',
    'images/green1.jpg',
    'images/purple1.jpg',
    'images/magnolias.jpg',
    'images/daisy1.jpg'
];

const initScreen = () => {
    images.forEach((image, idx) => {
        document.querySelector('.cards').innerHTML += `
        <li class="card">
            <div class="image" 
                onclick="handleThumbnailClick(event)" 
                style="background-image:url('${image}')"
                data-index=${idx}"
                aria-label="Displays image ${idx} in the main panel."></button>
        </li>`;
    });
};

const handleThumbnailClick = ev => {
    // figure out which element the user clicked on: 
    const elem = ev.currentTarget; 
    currentIndex = parseInt(elem.dataset.index); 
    console.log(elem); 
    const bgImage = elem.style.backgroundImage; 
    document.querySelector('.featured_image').style.backgroundImage = bgImage;
    // update the currentIndex to the inddex associated with the
    // thumbnail the user just clicked on. 
    document.querySelector('.featured_image').setAttribute(style,`background-Image; url(${images[currentIndex]})`); 
    // currentIndex = Number(elem.getAttribute('data-index')); 
}

// Goal:
// 1. Create a function that handles previous 
// 2. Create a function that handles next 

const previous = () => {
    if (currentIndex > 0) {
        currentIndex -= 1; 
    } else {
        currentIndex = 7; 
    }
    console.log('Show previous image', currentIndex);
    console.log(images[currentIndex]);
    document.querySelector('.featured_image').style.backgroundImage = `
        url('${images[currentIndex]}')
    `; 
}; 

const next = () => {
    if (currentIndex < 7) {
        currentIndex += 1; 
    } else {
        // reset index back to the beginning
        currentIndex = 0; 
    }
    console.log('Show next image', currentIndex); 
    console.log(images[currentIndex]); 
    document.querySelector('.featured_image').style.backgroundImage = `
        url('${images[currentIndex]}')
    `;
}; 

initScreen();