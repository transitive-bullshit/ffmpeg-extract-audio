# ffmpeg-extract-audio

> Extracts an audio stream from a media file using [fluent-ffmpeg](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg).

[![NPM](https://img.shields.io/npm/v/ffmpeg-extract-audio.svg)](https://www.npmjs.com/package/ffmpeg-extract-audio) [![Build Status](https://travis-ci.org/transitive-bullshit/ffmpeg-extract-audio.svg?branch=master)](https://travis-ci.org/transitive-bullshit/ffmpeg-extract-audio) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save ffmpeg-extract-audio
# or
yarn add ffmpeg-extract-audio
```

## Usage

```js
const extractAudio = require('ffmpeg-extract-audio')

await extractAudio({
  input: 'media/1.mp4',
  output: 'test.mp3'
})
```

## API

### extractAudio(options)

Extracts an audio stream from a media file. Returns a `Promise` for when the operation is complete.

#### options

##### input

Type: `String`

Path or URL to a media file.

##### output

Type: `String`

Path to write the output file to. If `output` is not specified, the result will be a `ReadableStream`.

##### format

Type: `String`

Audio container format to use.

Note: you may either specify `output` or `format`. If `format` is not specified, it will be inferred from the `output` file extension. If no `format` or `output` file is specified, the result will default to an `mp3` stream.

##### channel

Type: `Number`
Default: `0`

Which audio channel to extract in the case of multiple audio channels.

##### transform

Type: `Function`
Default: `noop`

Optional function to make changes to the underlying [fluent-ffmpeg](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg) command. You may, for instance, change the [audio bitrate](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg#audiobitratebitrate-set-audio-bitrate) or add custom [audio filters](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg#audiofiltersfilter-add-custom-audio-filters).

Example:
```js
// extract audio at 50% volume (result is an mp3 stream)
const mp3Stream = await extractAudio({
  input: 'media/1.mp4',
  format: 'mp3',
  transform: (cmd) => {
    cmd.audioFilters([
      {
        filter: 'volume',
        options: '0.5'
      }
    ])
  }
})
```

##### log

Type: `Function`
Default: `noop`

Optional function to log the underlying ffmpeg command. You may, for example, use `console.log`

## Related

- [fluent-ffmpeg](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg)
- [awesome-ffmpeg](https://github.com/transitive-bullshit/awesome-ffmpeg) - A curated list of awesome ffmpeg resources with a focus on JavaScript.

## License

MIT © [Travis Fischer](https://github.com/transitive-bullshit)
