import { getCustomRepository } from 'typeorm';

import { CreateType, IdParamType, EditBodyType, ResponseType } from '../@types';
import { ConfigsRepository } from '../repositories/ConfigsRepository';

class ConfigService {
  async create(payload: CreateType): Promise<ResponseType> {
    try {
      const { content } = payload;

      const configRepository = getCustomRepository(ConfigsRepository);

      const configCreated = configRepository.create({
        content,
      });

      await configRepository.save(configCreated);

      return {
        success: true,
        data: configCreated,
      };
    } catch (err) {
      return {
        success: false,
        message: err.message,
      };
    }
  }

  async list(): Promise<ResponseType> {
    try {
      const configRepository = getCustomRepository(ConfigsRepository);

      const config = await configRepository.findOne();

      return {
        success: true,
        data: config,
      };
    } catch (err) {
      return {
        success: false,
        message: err.message,
      };
    }
  }

  async edit(
    params: IdParamType,
    payload: EditBodyType
  ): Promise<ResponseType> {
    try {
      const { id } = params;

      const configRepository = getCustomRepository(ConfigsRepository);

      await configRepository.update(id, { ...payload });

      const config = await configRepository.findOne({ id });

      return {
        success: true,
        data: config,
      };
    } catch (err) {
      return {
        success: false,
        message: err.message,
      };
    }
  }
}

export default ConfigService;
