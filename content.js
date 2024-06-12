let durationDisplayed = false; // Flag to prevent multiple executions

function formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
}



function calculateTotalDuration() {
    console.log('Calculating total duration...');
    let videoDurations = Array.from(document.querySelectorAll('ytd-playlist-video-list-renderer ytd-playlist-video-renderer ytd-thumbnail-overlay-time-status-renderer span'));

    if (videoDurations.length == 0) {
        console.log('No video durations found, trying a different selector.');
        videoDurations = Array.from(document.querySelectorAll('ytd-playlist-panel-renderer ytd-playlist-panel-video-renderer ytd-thumbnail-overlay-time-status-renderer span'));
    }

    if (videoDurations.length === 0) {
        console.log('No video durations found.');
        return null;
    }

    console.log('Found video durations:', videoDurations);

    const totalSeconds = videoDurations.reduce((total, element) => {
        const timeParts = element.innerText.trim().split(':').map(Number);
        let seconds = 0;
        if (timeParts.length === 3) {
            seconds = timeParts[0] * 3600 + timeParts[1] * 60 + timeParts[2];
        } else if (timeParts.length === 2) {
            seconds = timeParts[0] * 60 + timeParts[1];
        }
        return total + seconds;
    }, 0);

    console.log('Total seconds:', totalSeconds);
    return formatTime(totalSeconds);
}



function displayLoadingMessage(playlistHeader) {
    let durationElement = document.querySelector('#total-playlist-duration');
    if (!durationElement) {
      durationElement = document.createElement('div');
      durationElement.id = 'total-playlist-duration';
      durationElement.style.textAlign = 'center';
      durationElement.style.fontSize = '1em'; // Decreased font size
      durationElement.style.marginTop = '10px';
      durationElement.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'; // Opaque background
      durationElement.style.color = 'white'; // White text color
      durationElement.style.padding = '5px'; // Padding around the text
      durationElement.style.borderRadius = '5px'; // Rounded corners
      playlistHeader.parentElement.appendChild(durationElement);
    }
  
    durationElement.innerHTML = `Total Duration: <img src="https://i.gifer.com/ZKZx.gif" alt="Loading..." style="width:18px;height:18px;vertical-align:middle;">`;
  }


  function updateTotalDuration(playlistHeader) {
    const totalDuration = calculateTotalDuration();
    if (!totalDuration) {
      console.log('Failed to calculate total duration.');
      return;
    }
  
    console.log('Total duration:', totalDuration);
  
    let durationElement = document.querySelector('#total-playlist-duration');
    if (!durationElement) {
      durationElement = document.createElement('div');
      durationElement.id = 'total-playlist-duration';
      durationElement.style.textAlign = 'center';
      durationElement.style.fontSize = '1em'; // Decreased font size
      durationElement.style.marginTop = '10px';
      durationElement.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'; // Opaque background
      durationElement.style.color = 'white'; // White text color
      durationElement.style.padding = '5px'; // Padding around the text
      durationElement.style.borderRadius = '5px'; // Rounded corners
      playlistHeader.parentElement.appendChild(durationElement);
    }
  
    durationElement.textContent = `Total Duration: ${totalDuration}`;
    console.log('Duration element updated.');
    durationDisplayed = true; // Set flag to true after execution
  }



// function displayTotalDuration() {
//     if (durationDisplayed) return; // Prevent multiple executions

//     console.log('Displaying total duration...');
//     let playlistHeader = document.evaluate(
//         "/html/body/ytd-app/div[1]/ytd-page-manager/ytd-browse/ytd-playlist-header-renderer/div/div[2]/div[1]/div/ytd-inline-form-renderer/div[1]/yt-dynamic-sizing-formatted-string/div/yt-formatted-string",
//         document,
//         null,
//         XPathResult.FIRST_ORDERED_NODE_TYPE,
//         null
//     ).singleNodeValue;

//     if (!playlistHeader) {
//         console.log('Playlist header not found, trying a different selector.');
//         playlistHeader = document.querySelector("#columns ytd-playlist-panel-renderer #header-description > h3:nth-child(1) > yt-formatted-string")
//     }

//     if (!playlistHeader) {
//         console.log('Playlist header not found. Returning');
//         return;
//     }

    // console.log('Playlist header element:', playlistHeader);
    // displayLoadingMessage(playlistHeader); // Display loading message

    // const totalDuration = calculateTotalDuration();
    // if (!totalDuration) {
    //     console.log('Failed to calculate total duration.');
    //     return;
    // }

    // console.log('Total duration:', totalDuration);

    // let durationElement = document.querySelector('#total-playlist-duration');
    // if (!durationElement) {
    //     durationElement = document.createElement('div');
    //     durationElement.id = 'total-playlist-duration';
    //     durationElement.style.textAlign = 'center';
    //     durationElement.style.fontSize = '1.2em'; // Decreased font size
    //     durationElement.style.marginTop = '10px';
    //     durationElement.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'; // Opaque background
    //     durationElement.style.color = 'white'; // White text color
    //     durationElement.style.padding = '5px'; // Padding around the text
    //     durationElement.style.borderRadius = '5px'; // Rounded corners
    //     playlistHeader.parentElement.appendChild(durationElement);
    // }

//     durationElement.textContent = `Total Duration: ${totalDuration}`;
//     console.log('Duration element updated.');
//     durationDisplayed = true; // Set flag to true after execution
// }



function ensureAllVideosLoaded() {
    const videoCount = document.querySelectorAll('ytd-playlist-panel-video-renderer').length;
    const durationCount = document.querySelectorAll('ytd-thumbnail-overlay-time-status-renderer span').length;
    return videoCount === durationCount;
}



function init() {
    console.log('Initializing...');

    let playlistHeader = document.evaluate(
        "/html/body/ytd-app/div[1]/ytd-page-manager/ytd-browse/ytd-playlist-header-renderer/div/div[2]/div[1]/div/ytd-inline-form-renderer/div[1]/yt-dynamic-sizing-formatted-string/div/yt-formatted-string",
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
    ).singleNodeValue;

    if (!playlistHeader) {
        console.log('Playlist header not found, trying a different selector.');
        playlistHeader = document.querySelector("#columns ytd-playlist-panel-renderer #header-description > h3:nth-child(1) > yt-formatted-string")
    }

    if (!playlistHeader) {
        console.log('Playlist header not found. Returning');
        return;
    }

    displayLoadingMessage(playlistHeader); // Display loading message

    const observer = new MutationObserver((mutations, obs) => {
        if (ensureAllVideosLoaded()) {
            console.log('All video durations found, displaying total duration...');
            updateTotalDuration(playlistHeader);
            obs.disconnect();
            return;
        }
    });

    observer.observe(document, {
        childList: true,
        subtree: true
    });

    // Retry mechanism if not all videos are loaded
    const retryInterval = setInterval(() => {
        if (ensureAllVideosLoaded()) {
            console.log('All video durations found on retry, displaying total duration...');
            updateTotalDuration(playlistHeader);
            clearInterval(retryInterval);
        }
    }, 1000);

    // Fallback in case the observer and retries don't trigger
    setTimeout(() => {
        clearInterval(retryInterval);
        updateTotalDuration(playlistHeader);
    }, 10000);
}

window.addEventListener('load', init);
window.addEventListener('yt-page-data-updated', init);



