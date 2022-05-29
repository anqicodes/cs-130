const baseURL = 'https://www.apitutor.org/spotify/simple/v1/search';

// Note: AudioPlayer is defined in audio-player.js
const audioFile = 'https://p.scdn.co/mp3-preview/bfead324ff26bdd67bb793114f7ad3a7b328a48e?cid=9697a3a271d24deea38f8b7fbfa0e13c';
const audioPlayer = AudioPlayer('.player', audioFile);

const search = (ev) => {
    const term = document.querySelector('#search').value;
    console.log('search for:', term);
    // issue three Spotify queries at once...
    getTracks(term);
    getAlbums(term);
    getArtist(term);
    if (ev) {
        ev.preventDefault();
    }
}

const getTracks = (term) => {
    let url = `https://www.apitutor.org/spotify/simple/v1/search?type=track&q=${term}`
    //this code fetches tracks based on a search term and prints them
    //to the console. 
    fetch(url)
        .then((response) => response.json())
        .then ((data) => {
            if (data.length > 0) {
                let firstFive = data.splice(0, 5)
                console.log(firstFive[0]);
                //convert to html
                let html = firstFive.map(track2HTML).join("");
                //plug it bakc to the index.html file
                document.querySelector('#tracks').innerHTML = html;
            } else {
                let html = "<p>No tracks found that match your search criteria. </p>";
                document.querySelector('#tracks').innerHTML = html;
            }
        });
};

const track2HTML = (track) => {
    return `
    <button class="track-item preview" data-preview-track=${track.preview_url} onclick="handleTrackClick(event);">
        <img src=${track.album.image_url} alt="Album cover image of ${track.album.name}">
        <i class="fas play-track fa-play" aria-hidden="true"></i>
        <div class="label">
            <h2>${track.name}</h2>
            <p>
                ${track.artist.name}
            </p>
        </div>
    </button>`
}

const getAlbums = (term) => {
    let url = `https://www.apitutor.org/spotify/simple/v1/search?type=album&q=${term}`;
    fetch(url)
        .then(response => response.json())
        .then((albums) => {
            if (albums.length > 0) {
                console.log (albums);
                let html = albums.map(album2HTML).join("");
                document.querySelector("#albums").innerHTML = html;
            } else {
                let html = "<p>No albums found that match your search criteria. </p>";
                document.querySelector('#albums').innerHTML = html;
            }
        })
};

const album2HTML = (album) => {
    return `
        <section class="album-card" id="${album.id}">
            <div>
                <img src="${album.image_url}" alt="Album cover image of ${album.name}">
                <h2>${album.name}</h2>
                <div class="footer">
                    <a href="https://open.spotify.com/album/2lATw9ZAVp7ILQcOKPCPqp" target="_blank">
                    view on spotify
                    </a>
                </div>
            </div>
        </section>`
};

const getArtist = (term) => {
    console.log(`
        get artists from spotify based on the search term
        "${term}" and load the first artist into the #artist section 
        of the DOM...`);
    const elem = document.querySelector("#artist"); 
    elem.innerHTML = ""; 

    fetch(baseURL + "?type=artist&q=" + term)
        .then((response) => response.json())
        .then((data) => {
            if (data.length > 0) {
                const firstArtist = data[0]; 
                elem.innerHTML += getArtistHTML(firstArtist); 
            console.log(firstArtist); 
        }
        else {
            elem.innerHTML += `<p> no results returned</p>`; 
        }
    }); 
};

const getArtistHTML = (data) => {
    if (!data.image_url){
        data.image_url = 
        "https://www.pngkit.com/png/full/943-9439413_blue-butterfly-free-png-image-dark-blue-to.png"; 
    }
    return `<section class="artist-card" id="${data.id}">
                <div>
                    <img alt="Image of ${data.name}" src="${data.image_url}">
                    <h2>${data.name}</h2>
                    <div class="footer">
                        <a href="${data.spotify_url}" target="_blank">
                            view on spotify
                        </a>
                    </div>
                </div>
            </section>`; 
}; 

const handleTrackClick = (ev) => {
    const previewUrl = ev.currentTarget.getAttribute('data-preview-track');
    console.log(previewUrl);
}

document.querySelector('#search').onkeyup = (ev) => {
    // Number 13 is the "Enter" key on the keyboard
    console.log(ev.keyCode);
    if (ev.keyCode === 13) {
        ev.preventDefault();
        search();
    }
};