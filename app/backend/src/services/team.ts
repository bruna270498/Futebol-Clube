import Team from '../database/models/Team';

const getAll = async () => {
  const teams = await Team.findAll();
  return teams;
};

export default {
  getAll,
};
