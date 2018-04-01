'use strict'

const ffmpeg = require('fluent-ffmpeg')
const path = require('path')

const noop = () => { }

module.exports = (opts) => {
  const {
    log = noop,
    transform = noop,
    channel = 0,
    input,
    output,
    format
  } = opts

  const f = format || (output ? path.parse(output).ext.slice(1) : 'mp3')

  return new Promise((resolve, reject) => {
    const cmd = ffmpeg(input)
      .audioChannels(channel)
      .format(f)
      .on('start', (cmd) => log({ cmd }))
      .on('end', () => resolve && resolve())
      .on('error', (err) => reject(err))

    transform(cmd)

    if (output) {
      cmd.output(output).run()
    } else {
      resolve(cmd.stream())
      resolve = null
    }
  })
}
