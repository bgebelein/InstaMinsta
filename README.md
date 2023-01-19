# InstaMinsta

Attempt to build my own Instagram Camrea App with <s>Blackjack and Hookers</s> fancy filters.

![Bender](https://i.kym-cdn.com/entries/icons/original/000/010/832/bender.jpg)

Relying on [CSSGRam](https://una.im/CSSgram/) CSS filters for the Camera Preview.

Recreated the filters in HTML Canvas for the final image.

## Features

- Supports back- and frontfacing camera

- 44 different image styles through fancy filters

- Torch light can be turned on/off to use as a camera flash

## Demo

Torch:

![https://raw.githubusercontent.com/bgebelein/InstaMinsta/master/images/demo/torch.gif](https://raw.githubusercontent.com/bgebelein/InstaMinsta/master/images/demo/torch.gif)

Filters:

![https://raw.githubusercontent.com/bgebelein/InstaMinsta/master/images/demo/filter.webp](https://raw.githubusercontent.com/bgebelein/InstaMinsta/master/images/demo/filter.webp)

## Known Issues

- Filters won't show on the final image, if a mobile Apple device was used to take the picture, since mobile Safari does not support the HTML CanvasRenderingContext2D filters.

- Torch light cannot be switched reliably
