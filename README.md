<a href="https://travis-ci.org/joyarzun/speeech"><img src="https://api.travis-ci.org/joyarzun/speeech.svg?branch=master" alt="Build Status"/></a>
# Speeech
Alexa style's speech recognition with hotword offline support detection for nodejs. Hotword recognition it's offline then you can use an online service streaming like Google Speech or Wit.ai.

**Important: This is an Work in Progress**

## Installation

```
npm install --save speeech
```

## Requirements

You need to have [SoX](http://sox.sourceforge.net) installed.

#### Debian and derivatives:
```
sudo apt-get install sox libsox-fmt-all
```
#### Arch Linux:
```
yaourt sox cblas
```
#### MacOS:
```
brew install sox
```

Once SoX it's installed you can try with:
```
rec new-file.wav
```

## Usage

Inside of examples folder you can find templates for each service.
Check out the comments for install others dependencies.

### Google Speech
```
const speeech = require("speeech");

const serviceConfig = {
  auth: {
    projectId: "streaming-speech-sample",
    keyFilename: "./keyfile.json"
  },
  streaming: {
    config: {
      encoding: "LINEAR16",
      sampleRateHertz: 16000,
      languageCode: "en-US"
    },
    singleUtterance: true,
    interimResults: true
  }
};

speeech.emit("start", speeech.googleService(serviceConfig));
speeech.on("result", result => console.log("result", result));

```

You need to download a keyfile from google console.

### Wit.ai
```
const speeech = require("speeech");

const serviceConfig = require("./witkeyfile.json");

speeech.emit("start", speeech.witService(serviceConfig));
speeech.on("result", result => console.log("result", result));

```

witkeyfile.json:
```
{
  "witToken": "XXXXXXXXXXXXXXXXXXX"
}
```
