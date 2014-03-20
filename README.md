# FirefoxOS Bubblescreen

This homescreen is a simple list of all installed applications. It is not complete as it does not yet support bookmarks, installation, and uninstallation. Bubblescreen bubbles the most used applications to the top of the screen as you use them. Your most used applications, always being at the top of the screen.

TODO: Installing applications should render the icon and place the app at the top of the screen.

## Installation

Homescreens are currently certified apps, so you will need to build FirefoxOS to install it.

1 - Clone this repo into your gaia checkout:
```
git clone https://github.com/KevinGrandon/firefoxos-bubblescreen.git apps/firefoxos-bubblescreen
```

2 - Reset your device to install the homescreen:
```
PRODUCTION=1 make reset-gaia
```

3 - Enable it!

Open the Settings app and navigate to Homescreens -> Bubblescreen.
