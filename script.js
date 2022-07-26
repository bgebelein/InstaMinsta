const videoContainer = document.querySelector('#camera');
const video = document.querySelector('#video-preview');
const canvas = document.querySelector('canvas');
let videoWidth = 0;
let videoHeight = 0;

// Start video
function initiateCamera (camera = 'user') {
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            width: {ideal: 1920},
            height: {ideal: 1080},
            facingMode: camera
        }
    })
    .then(function(mediaStream) {
        /* use the stream */
        video.srcObject = mediaStream;
        video.onloadedmetadata = function(e) {
            video.play();
        };
    
        // log actual width & height of the camera video
        let stream_settings = mediaStream.getVideoTracks()[0].getSettings();
        videoWidth = stream_settings.width;
        videoHeight = stream_settings.height;
        console.log('Camera Resolution: ' + stream_settings.width + 'x' + stream_settings.height);

        // Setup canvas
        canvas.height = parseInt(videoHeight < videoWidth ? videoHeight : videoWidth);
        canvas.width = parseInt(videoHeight < videoWidth ? videoHeight : videoWidth);

        console.log('Canvas size: ' + canvas.height + 'x' + canvas.width);
    })
    .catch(function(error) {
        /* handle error */
        console.log(error.name + ": " + error.message);
    });
}

initiateCamera();

// Switch camera
const cameraSwitch = document.querySelector('#switch-camera');
cameraSwitch.addEventListener('click', function() {
    switch (camera){
        case 'user':
            initiateCamera('environment');
            break;
        case 'environment':
            initiateCamera('user');
            break;
    }
});

// Take snapshot
const snap = document.querySelector('#snap');
const ctx =  canvas.getContext('2d');
const photo = document.querySelector('#photo');

snap.addEventListener('click', function(e){
    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // apply filter to canvas
    let filter = getComputedStyle(videoContainer).filter;
    ctx.filter = filter;

    // Get scale factor for videoframe to fill square canvas
    let scale = Math.max(canvas.width / videoWidth, canvas.height / videoHeight);
    let x = (canvas.width / 2) - (videoWidth / 2) * scale;
    let y = (canvas.height / 2) - (videoHeight / 2) * scale;

    // add video frame to canvas
    ctx.drawImage(video, x, y, videoWidth * scale, videoHeight * scale);

    // apply overlays to canvas
    applyOverlay(getComputedStyle(videoContainer, '::before'));
    applyOverlay(getComputedStyle(videoContainer, '::after'));    

    // covert canvas to dataURL
    const data = canvas.toDataURL('image/jpeg', 1.0);

    // save image
    photo.setAttribute('href', data);
    photo.click();
    e.preventDefault();
}, false);

// Filters

const filterSelect = document.querySelector('#filter-selection');

const filters = [
    "filter-1977",
    "filter-aden",
    "filter-amaro",
    "filter-ashby",
    "filter-brannan",
    "filter-brooklyn",
    "filter-charmes",
    "filter-clarendon",
    "filter-crema",
    "filter-dogpatch",
    "filter-earlybird",
    "filter-gingham",
    "filter-ginza",
    "filter-hefe",
    "filter-helena",
    "filter-hudson",
    "filter-inkwell",
    "filter-kelvin",
    "filter-juno",
    "filter-lark",
    "filter-lofi",
    "filter-ludwig",
    "filter-maven",
    "filter-mayfair",
    "filter-moon",
    "filter-nashville",
    "filter-perpetua",
    "filter-poprocket",
    "filter-reyes",
    "filter-rise",
    "filter-sierra",
    "filter-skyline",
    "filter-slumber",
    "filter-stinson",
    "filter-sutro",
    "filter-toaster",
    "filter-valencia",
    "filter-vesper",
    "filter-walden",
    "filter-willow",
    "filter-xpro-ii"
]

filters.forEach(function(filter){
    let label = document.createElement('label');
    label.setAttribute('for', filter);
    label.textContent = filter.replace('filter-', '');

    let input = document.createElement('input');
    input.setAttribute('type', 'radio');
    input.setAttribute('id', filter);
    input.setAttribute('name', 'filter');
    input.setAttribute('value', filter);

    filterSelect.appendChild(input);
    filterSelect.appendChild(label);
});

// Set filter on video preview

filterSelect.addEventListener('click', function(){
    let seletctedFilter = document.querySelector('input[type=radio]:checked').value;
    videoContainer.className = '';

    if (filterSelect.value === "None") {
        return;
    } else {
        videoContainer.classList.add(seletctedFilter);
    }
}, false);


// apply overlay function
function applyOverlay(overlayElement){
    // set blendmode
    ctx.globalCompositeOperation = overlayElement.mixBlendMode;

    if(overlayElement.opacity !== 1){
        ctx.globalAlpha = overlayElement.opacity;
    }

    // set color and add rectangle to canvas
    ctx.fillStyle = overlayElement.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // set blendmode
    ctx.globalCompositeOperation = overlayElement.mixBlendMode;

    // set gradients
    if (overlayElement.backgroundImage.startsWith('radial-gradient')) {
        let gradient = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, Math.sqrt((canvas.width / 2) * (canvas.width / 2) + (canvas.width / 2) * (canvas.width / 2)));

        // Get gradient values
        let gradientColors = overlayElement.backgroundImage.match(/rgba\(\d+, \d+, \d+, (\d*|(\.\d+)|\d.\d+)\)/g);
        let gradientStops = overlayElement.backgroundImage.match(/\) \d+/g);

        for (let i = 0; i < gradientColors.length; i++) {
            gradientStops[i] = gradientStops[i].replace(') ', '');
            gradientStops[i] = parseInt(gradientStops[i]) / 100;
            gradient.addColorStop(gradientStops[i], gradientColors[i]);
        }

        ctx.fillStyle = gradient;
        
    } else if (overlayElement.backgroundImage.startsWith('linear-gradient')) {
        let gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);

        // Get gradient values
        let gradientColors = overlayElement.backgroundImage.match(/rgba\(\d+, \d+, \d+, (\d*|(\.\d+)|\d.\d+)\)/g);
        let gradientStops = [0,1];

        for (let i = 0; i < gradientColors.length; i++) {
            gradient.addColorStop(gradientStops[i], gradientColors[i]);
            console.log(gradientStops[i], gradientColors[i]);
        }
        
        ctx.fillStyle = gradient;
    }

    // add colored rectangle to canvas
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1;
}