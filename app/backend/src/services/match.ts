import Match from '../database/models/Match';

const getAll = async () => {
  const matches = await Match.findAll({
    include: [
      { association: 'homeTeam', attributes: ['teamName'] },
      { association: 'awayTeam', attributes: ['teamName'] },
    ],
  });
  return matches;
};

export default {
  getAll,
};
