import { Request, Response } from 'express';
import { CustomError } from '../../../errors/CustomError';
import AuthService from '../services/AuthService';

class AuthController {
  async authenticate(request: Request, response: Response) {
    const authService = new AuthService();

    const authenticated = await authService.authenticate(request.body);

    if (authenticated.success) {
      return response.status(200).json(authenticated.data);
    }

    throw new CustomError(authenticated.message, 401);
  }
}

export default AuthController;
