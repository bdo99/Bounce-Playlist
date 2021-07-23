var access_token = 'BQBmtvLiqRWAlczJoJ_JmSdvKJffJERGOHCG91K-WTeZQWPYstKDrQEgBrbOjuz2OD_danqSz0PebJgKPog-zVJt-rRmbM1EYlxcXMrt9hTMJDeL2Ta1dwBxePfTzhqdvmeM6v1cChmzunk3MqHkMIsxu1gYPYQ1leQK_OMk3BfG3FkKziQJQlecJL421-ERIDwe9mdTPurlmDphNFoMnG7-DOIM7jNnFdRN1WEJxkD4WuVAQVSUoI7CkCiSPvyuRJCSfZ1GUVCxARh6rumu1g';
var playlistID = '0kusChdgJQxnReE6Gnn2HR';

function confirmButton() {
    var song = document.getElementById("song").value;
    //alert("Value inside this text box is: " + song); //Creates a popup after the click event happens to ensure the code was working as intended.
    song = song.replace(/ /g,"+");
    fetch("https://api.spotify.com/v1/search?query=" + song + "&type=track&market=US&offset=5&limit=10", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token
        }
    })
    .then(response => response.json())
    .then(data => {
        var tracks = data.tracks.items;
        addSongToCollection(tracks[0].external_urls.spotify);
    });

}

function clearButton() {
    document.getElementById("song").value = "";
}

function addSongToCollection(url) {
    var parseURL = url.split("/");
    parseURL = parseURL[parseURL.length - 1];
    fetch("https://api.spotify.com/v1/playlists/" + playlistID + "/tracks?uris=spotify%3Atrack%3A" + parseURL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token
        }
    })
    .then(response => {
        getPlaylist();
    });
}

function getPlaylist() {
    fetch("https://api.spotify.com/v1/playlists/" + playlistID, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token
        }
    })
    .then(response => {
        console.log(response);
    })
}