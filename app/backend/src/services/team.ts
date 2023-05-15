import Team from '../database/models/Team';

const getAll = async () => {
  const teams = await Team.findAll();
  return teams;
};

const getById = async (id: number) => {
  const team = await Team.findByPk(id);
  return team;
};

export default {
  getAll,
  getById,
};
