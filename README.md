# About Quadra Cam

Quadra Cam is a PWA that mimics the classic Instagram camera functionality.

## How it works

Quadra Cam uses the MediaStreamTrack API of the browser to get access to your device camera(s).
The camera live feed is then rendered in a video container with filters and overlays applied to it, in order to show an accurate preview of the final image.
When tapping the snapshot button, the current video frame will be added to a hidden canvas, where filters + overlays are reapplied.
Finally the canvas content is written to a dataURL, which can be downloaded.

Quadra Cam relies on [CSSGRam](https://github.com/una/CSSgram) CSS filters.

## Demo

[Take it for a test ride!](https://quadra-cam.web.app)

## Features

- 44 different image styles through fancy filters
- Support for back- and frontfacing cameras
- Support for torch light

## Demo

UI:

<img src="https://raw.githubusercontent.com/bgebelein/InstaMinsta/master/images/demo/ui.webp" title="" alt="https://raw.githubusercontent.com/bgebelein/InstaMinsta/master/images/demo/ui.webp" data-align="center">

Torch:

![https://raw.githubusercontent.com/bgebelein/InstaMinsta/master/images/demo/torch.gif](https://raw.githubusercontent.com/bgebelein/InstaMinsta/master/images/demo/torch.gif)

Filters:

![https://raw.githubusercontent.com/bgebelein/InstaMinsta/master/images/demo/filter.webp](https://raw.githubusercontent.com/bgebelein/InstaMinsta/master/images/demo/filter.webp)

## Known Issues and limitations

### The final image looks "cut off"

Some devices / browsers can not handle the camera stream dimensions properly.

### Filters do not work on mobile Safari browsers.

Mobile Safari does not support `CanvasRenderingContext2D` filters by default, but you can activate them by going to:

`Settings` > `Apps` > `Safari` > `Advanced` > `Feature Flags`

There you can search for `Canvas Filters` and activate the toggle.

### The torch light does not work.

The torch functionality is highly experimental and therefore not supported by every browser.

### The camera preview looks different compared to the final image.

This can happen on some filters. There are 2 main reasons for this:
- CSS and Canvas perform calculations in different colour spaces.
- Canvas and CSS handle transparency differently in blending calculations.

## Development

This project uses [Tailwind CSS v4](https://tailwindcss.com/)

### Run Tailwind CLI build process with `--watch` parameter

`npm run tw-watch`

### Create production build

This will create a production ready app under the `public` directory.

`npm run build`