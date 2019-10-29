const fs = require('fs-extra');
const Airtable = require('airtable');

const client = new Airtable({
  apiKey: process.env.AIRTABLE_API_TOKEN,
  requestTimeout: 5000,
});

const base = client.base(process.env.AIRTABLE_API_BASE);

function loadResourse(table) {
  console.log('start', table);

  return fs
    .ensureDir('out')
    .then(() =>
      base(table)
        .select()
        .all(),
    )
    .then(tableResult => fs.writeJSON(`out/${table}.json`, tableResult))
    .then(() => console.log('complete', table));
}

return Promise.all(
  ['Meetups', 'Talks', 'Speakers', 'Companies', 'Venues', 'DevRels'].map(loadResourse),
);
