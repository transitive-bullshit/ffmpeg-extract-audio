'use strict'

const { test } = require('ava')
const fs = require('fs')
const path = require('path')
const promisepipe = require('promisepipe')
const tempy = require('tempy')

const extractAudio = require('.')
const ffmpegProbe = require('ffmpeg-probe')

const fixturesPath = path.join(__dirname, `media`)
const input = path.join(fixturesPath, 'test.mp4')

test('output mp3 file', async (t) => {
  const output = tempy.file({ extension: 'mp3' })
  await extractAudio({
    log: console.log,
    input,
    output
  })

  const info = await ffmpegProbe(output)
  t.deepEqual(info.duration, 13035)
})

test('output mp3 stream', async (t) => {
  const stream = await extractAudio({
    log: console.log,
    input,
    format: 'mp3'
  })

  const output = tempy.file({ extension: 'mp3' })
  await promisepipe(stream, fs.createWriteStream(output))

  const info = await ffmpegProbe(output)
  t.deepEqual(info.duration, 13035)
})

test('output mp3 file with audio transform', async (t) => {
  const output = tempy.file({ extension: 'mp3' })
  await extractAudio({
    log: console.log,
    input,
    output,
    transform: (cmd) => {
      cmd.audioFilters([
        {
          filter: 'volume',
          options: '0.5'
        }
      ])
    }
  })

  const info = await ffmpegProbe(output)
  t.deepEqual(info.duration, 13035)
})
