import { Sequelize } from 'sequelize';
import * as config from '../config/database';
import Team from './Team';

const sequelize = new Sequelize(config)

export default sequelize;
export { Team };