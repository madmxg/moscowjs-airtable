const tableHandlers = {
  Talks(record) {
    return {
      id: record.id,
      title: record.get('Title'),
      meetup: record.get('Meetup'),
      speakers: record.get('Speakers'),
      theses: record.get('Theses'),
      status: record.get('Status'),
      presentation: record.get('Presentation'),
      record: record.get('Record'),
      phote: record.get('Photo'),
      company: record.get('Company'),
      slides: {
        pdf: record.get('Slides PDF URL'),
        keynote: record.get('Slides Keynote URL'),
        powerpoint: record.get('Slides PowerPoint URL'),
        web: record.get('Slides Web URL'),
      },
    };
  },
  Speakers(record) {
    return {
      id: record.getId(),
      name: record.get('Name'),
      photo: record.get('Photo'),
      talks: record.get('Talks'),
      about: record.get('About'),
      rating: record.get('Rating'),
      company: record.get('Company'),
      website: record.get('Personal Link'),
      // email: record.get('Email'),
      // phone: record.get('Phone'),
      // telegram: record.get('Telegram'),
      // skype: record.get('Skype'),
      // twitter: record.get('Twitter'),
      // facebook: record.get('Facebook'),
      // repositories: record.get('Github / Bitbucket'),
    };
  },
  Meetups(record) {
    return {
      id: record.getId(),
      title: record.get('Title'),
      talks: record.get('Talks'),
      company: record.get('Company'),
      address: record.get('Address'),
      date: record.get('Date'),
    };
  },
  Venues(record) {
    return {
      id: record.getId(),
      name: record.get('Name'),
      map: record.get('Map'),
      address: record.get('Address'),
      meetups: record.get('Meetups'),
      company: record.get('Company'),
    };
  },
  Companies(record) {
    return {
      id: record.getId(),
      name: record.get('Name'),
      about: record.get('About'),
      logo: record.get('Logo'),
      meetups: record.get('Meetups'),
      venues: record.get('Venues'),
    };
  },
  DevRels(record) {
    return {
      id: record.getId(),
      name: record.get('Name'),
      company: record.get('Company'),
    };
  },
};

/**
 * @param {string} tableName
 * @param {readonly import('airtable').Row<{}>[]} tableData
 */
function normalize(tableName, tableData) {
  return tableData.map(tableHandlers[tableName]);
}

module.exports = normalize;
