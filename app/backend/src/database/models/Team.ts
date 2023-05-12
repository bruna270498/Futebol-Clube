import { Model, DataTypes } from 'sequelize';
import db from '.';

class Team extends Model {
  declare id: number;
  declare teamName: string;
}

Team.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  underscored: true,
  sequelize: db,
  tableName: 'teams',
  timestamps: false,
});

// Team.hasMany(Match, { foreignKey: 'homeTeamId', as: 'homeTeam' });
// Team.hasMany(Match, { foreignKey: 'awayTeamId', as: 'awayTeam' });

export default Team;
