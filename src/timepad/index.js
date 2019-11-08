const fs = require('fs-extra');
const { resolve } = require('path');
const axios = require('axios').default;
const pLimit = require('p-limit');

const eventsIds = require('./eventsIds');

const OUT_PATH = 'src/timepad/events';

const limit = pLimit(4);

const input = eventsIds.map(eventId => {
  return limit(() => {
    console.log('Start event ', eventId);

    const uri = `https://api.timepad.ru/v1/events/${eventId}`;
    return axios
      .get(uri)
      .then(response => {
        const filePath = resolve(OUT_PATH, `${eventId}.json`);
        return fs.writeJSON(filePath, response.data, { spaces: 2 });
      })
      .then(() => console.log('Complete event ', eventId));
  });
});

fs.ensureDir(OUT_PATH)
  .then(() => console.log('Start'))
  .then(() => Promise.all(input))
  .then(() => console.log('Complete'));
