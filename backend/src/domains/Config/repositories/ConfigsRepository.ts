import { EntityRepository, Repository } from 'typeorm';
import { Config } from '../models/Config';

@EntityRepository(Config)
class ConfigsRepository extends Repository<Config> {}

export { ConfigsRepository };
