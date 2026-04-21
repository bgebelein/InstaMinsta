# InstaMinsta

Attempt to build my own Instagram Camrea App with <s>Blackjack and Hookers</s> fancy filters.

![Bender](https://i.kym-cdn.com/entries/icons/original/000/010/832/bender.jpg)

Relying on [CSSGRam](https://una.im/CSSgram/) CSS filters for the Camera Preview.

Recreated the filters in HTML Canvas for the final image.

## Demo

[Take it for a test ride!](https://bgebelein.github.io/instaminsta/)

## Features

- Supports back- and frontfacing camera

- 44 different image styles through fancy filters

- Torch light can be turned on/off to use as a camera flash

## Demo

UI:

<img src="https://raw.githubusercontent.com/bgebelein/InstaMinsta/master/images/demo/ui.webp" title="" alt="https://raw.githubusercontent.com/bgebelein/InstaMinsta/master/images/demo/ui.webp" data-align="center">

Torch:

![https://raw.githubusercontent.com/bgebelein/InstaMinsta/master/images/demo/torch.gif](https://raw.githubusercontent.com/bgebelein/InstaMinsta/master/images/demo/torch.gif)

Filters:

![https://raw.githubusercontent.com/bgebelein/InstaMinsta/master/images/demo/filter.webp](https://raw.githubusercontent.com/bgebelein/InstaMinsta/master/images/demo/filter.webp)

## Known Issues and limitations

### Filters do not work on mobile Safari browsers.

Mobile Safari does not support `CanvasRenderingContext2D` filters by default, but you can activate them by going to:

`Settings` > `Apps` > `Safari` > `Advanced` > `Feature Flags`

There you can search for `Canvas Filters` and activate the toggle.

### I dont see the torch light button / The torch light does not work.

As of today only mobile Chrome browsers support the torch.

### The camera preview looks different compared to the final image.

This can happen on some filters. There are 2 main reasons for this:
- CSS and Canvas perform calculations in different colour spaces.
- Canvas and CSS handle transparency differently in blending calculations.

## Development

This project uses
- [Tailwind CSS v4](https://tailwindcss.com/)

### Run Tailwind CLI build process with `--watch` parameter

`npm run tw-watch`

### Create production build

This will create a production ready app under the `public` directory.

`npm run build`