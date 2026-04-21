const videoContainer = document.querySelector('#camera');
const video = document.querySelector('#video-preview');
const canvas = document.querySelector('canvas');
let camera = 'environment';
let torch = false;
let videoWidth = 0;
let videoHeight = 0;

// Start camera
function initiateCamera() {
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            width: { min: 1024, ideal: 4096, max: 4006 },
            height: { min: 1024, ideal: 4096, max: 4006 },
            resizeMode: "crop-and-scale",
            facingMode: camera,
            advanced: [{
                torch: torch,
            }]
        }
    })
        .then(function (mediaStream) {
            // Set stream as video source and start video
            video.srcObject = mediaStream;
            video.onloadedmetadata = function (e) {
                video.play();
            };

            // Get stream video track dimensions
            let stream = mediaStream.getVideoTracks()[0];
            videoWidth = stream.getSettings().width;
            videoHeight = stream.getSettings().height;
            console.log('Camera Resolution: ' + videoWidth + 'x' + videoHeight);

            // Implement torch functionality
            const torchToggle = document.querySelector('#toggle-torch');

            // Disable torch button if torch is not available
            if (!stream.getCapabilities().torch) {
                torchToggle.disabled = true;
            } else {
                torchToggle.addEventListener('click', function () {
                    torch === !torch;

                    stream.applyConstraints({
                        advanced: [{
                            torch: torch,
                        }]
                    });
                    console.log('Torch: ' + (torch ? 'On' : 'Off'));
                });
            }

            // Close camera when page is not active
            document.addEventListener("visibilitychange", () => {
                if (document.visibilityState === "visible") {
                    initiateCamera();
                    console.log('Stream re-started');
                } else {
                    stream.stop();
                    console.log('Stream stopped');
                }
            });

            // Setup canvas - square size matching the smaller video dimension
            const squareSize = Math.min(videoWidth, videoHeight);
            canvas.width = squareSize;
            canvas.height = squareSize;
            console.log('Canvas size: ' + canvas.width + 'x' + canvas.height);
        })
        .catch(function (error) {
            /* handle error */
            console.log(error.name + ": " + error.message);
        });
}

initiateCamera();

// Stop Camera
function stopCamera() {
    if (video.srcObject) {
        const tracks = video.srcObject.getTracks();
        tracks.forEach(function (track) {
            track.stop();
        });
        video.srcObject = null;
    }
}

// Switch camera facingmode
const cameraSwitch = document.querySelector('#switch-camera');

cameraSwitch.addEventListener('click', function () {
    stopCamera();
    camera === 'user' ? camera = 'environment' : camera = 'user';
    console.log('Facingmode: ' + camera);
    initiateCamera();
});

// Take snapshot
const snap = document.querySelector('#snap');
const ctx = canvas.getContext('2d');
const photo = document.querySelector('#photo');

snap.addEventListener('click', function (e) {
    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // apply filter to canvas
    let filter = getComputedStyle(videoContainer).filter;
    ctx.filter = filter;

    // disable image smoothening bcuz it sucks
    ctx.imageSmoothingEnabled = false;

    // Center-crop video to fill square canvas
    const squareSize = Math.min(videoWidth, videoHeight);
    const sx = (videoWidth - squareSize) / 2;
    const sy = (videoHeight - squareSize) / 2;

    // Draw cropped square from video center to fill canvas
    ctx.drawImage(video, sx, sy, squareSize, squareSize, 0, 0, canvas.width, canvas.height);

    // apply overlays to canvas
    applyOverlay(getComputedStyle(videoContainer, '::before'));
    applyOverlay(getComputedStyle(videoContainer, '::after'));

    // convert canvas to dataURL
    const image = canvas.toDataURL('image/jpeg', 0.8);

    // save image
    let timestamp = new Date(Date.now());
    timestamp = {
        'year': timestamp.getFullYear(),
        'month': timestamp.getMonth() + 1,
        'day': timestamp.getDate(),
        'hour': timestamp.getHours(),
        'min': timestamp.getMinutes(),
        'sec': timestamp.getSeconds()
    }

    photo.download = 'IMG_' + timestamp.year + '-' + timestamp.month + '-' + timestamp.day + '_' + timestamp.hour + '-' + timestamp.min + '-' + timestamp.sec + '.jpg';
    photo.setAttribute('href', image);
    photo.click();

}, false);

// Filters

const filterSelect = document.querySelector('#filter-selection');

const filters = [
    { "label": "None", "class": "none" },
    { "label": "1977", "class": "filter-1977" },
    { "label": "Aden", "class": "filter-aden" },
    { "label": "Amaro", "class": "filter-amaro" },
    { "label": "Ashby", "class": "filter-ashby" },
    { "label": "Brannan", "class": "filter-brannan" },
    { "label": "Brooklyn", "class": "filter-brooklyn" },
    { "label": "Charmes", "class": "filter-charmes" },
    { "label": "Clarendon", "class": "filter-clarendon" },
    { "label": "Crema", "class": "filter-crema" },
    { "label": "Dogpatch", "class": "filter-dogpatch" },
    { "label": "Earlybird", "class": "filter-earlybird" },
    { "label": "Gingham", "class": "filter-gingham" },
    { "label": "Ginza", "class": "filter-ginza" },
    { "label": "Hefe", "class": "filter-hefe" },
    { "label": "Helena", "class": "filter-helena" },
    { "label": "Hudson", "class": "filter-hudson" },
    { "label": "Inkwell", "class": "filter-inkwell" },
    { "label": "Kelvin", "class": "filter-kelvin" },
    { "label": "Juno", "class": "filter-juno" },
    { "label": "Lark", "class": "filter-lark" },
    { "label": "Lofi", "class": "filter-lofi" },
    { "label": "Ludwig", "class": "filter-ludwig" },
    { "label": "Maven", "class": "filter-maven" },
    { "label": "Mayfair", "class": "filter-mayfair" },
    { "label": "Moon", "class": "filter-moon" },
    { "label": "Nashville", "class": "filter-nashville" },
    { "label": "Perpetua", "class": "filter-perpetua" },
    { "label": "Poprocket", "class": "filter-poprocket" },
    { "label": "Reyes", "class": "filter-reyes" },
    { "label": "Rise", "class": "filter-rise" },
    { "label": "Sierra", "class": "filter-sierra" },
    { "label": "Skyline", "class": "filter-skyline" },
    { "label": "Slumber", "class": "filter-slumber" },
    { "label": "Stinson", "class": "filter-stinson" },
    { "label": "Sutro", "class": "filter-sutro" },
    { "label": "Toaster", "class": "filter-toaster" },
    { "label": "Valencia", "class": "filter-valencia" },
    { "label": "Vesper", "class": "filter-vesper" },
    { "label": "Walden", "class": "filter-walden" },
    { "label": "Willow", "class": "filter-willow" },
    { "label": "xPro II", "class": "filter-xpro-ii" }
]

// Generate filter selection buttons
filters.forEach(function (filter) {
    let label = document.createElement('label');
    label.setAttribute('for', filter.class);
    label.textContent = filter.label;

    let input = document.createElement('input');
    input.setAttribute('type', 'radio');
    input.setAttribute('id', filter.class);
    input.setAttribute('name', 'filter');
    input.setAttribute('value', filter.class);

    filterSelect.appendChild(input);
    filterSelect.appendChild(label);
});

// Set default filter to "None"
filterSelect.firstChild.checked = true;

// Set filter on video preview

const filterButtons = document.querySelectorAll('input[name="filter"]');

filterButtons.forEach(function (button) {
    button.addEventListener('change', function () {
        let seletctedFilter = document.querySelector('input[name="filter"]:checked').value;
        console.log("Selected filter: " + seletctedFilter);

        videoContainer.classList.remove(...filters.map(f => f.class));

        if (filterSelect.value === "") {
            return;
        } else {
            videoContainer.classList.add(seletctedFilter);
        }
    }, false);
});

// apply overlay function
function applyOverlay(overlayElement) {
    // set blendmode
    ctx.globalCompositeOperation = overlayElement.mixBlendMode;

    if (overlayElement.opacity !== 1) {
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
        let gradientStops = [0, 1];

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