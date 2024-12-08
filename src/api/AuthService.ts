import { ApiClient } from '@api';
import { LoginRequestDTO, RegisterRequestDTO } from '@dto';

export class AuthService {
  async login(body: LoginRequestDTO) {
    try {
      const response = await ApiClient.post('v1/auth/login', body);
      console.log('response', response);
      // FIXME: handle response
      if (response && response.status >= 200 && response.status < 300) {
        return response.data;
      }
    } catch (e) {
      console.log(e);
    }
  }

  async register(body: RegisterRequestDTO) {
    try {
      const response = await ApiClient.post('v1/auth/signup', body);

      // FIXME: handle response
      if (response && response.status >= 200 && response.status < 300) {
        return response.data;
      }
    } catch (e) {
      console.log(e);
    }
  }
}
