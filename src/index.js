const fs = require('fs-extra');
const { resolve } = require('path');
const Airtable = require('airtable');
const normalize = require('./normalize');

const client = new Airtable({
  apiKey: process.env.AIRTABLE_API_TOKEN,
  requestTimeout: 5000,
});

const base = client.base(process.env.AIRTABLE_API_BASE);

/**
 * @param {string} tableName
 * @returns {Promise<void>}
 */
function loadResourse(tableName) {
  console.log('start', tableName);

  return fs
    .ensureDir('out')
    .then(() =>
      base(tableName)
        .select()
        .all(),
    )
    .then(tableData => {
      const filePath = resolve('out', `${tableName.toLowerCase()}.json`);
      const normalizedData = normalize(tableName, tableData);
      return fs.writeJSON(filePath, normalizedData);
    })
    .then(() => console.log('complete', tableName));
}

Promise.all(
  ['Meetups', 'Talks', 'Speakers', 'Companies', 'Venues', 'DevRels'].map(loadResourse),
);
