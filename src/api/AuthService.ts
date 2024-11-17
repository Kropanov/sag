import ApiClient from '@/api/ApiClient.ts';
import { LoginRequestDTO, RegisterRequestDTO } from '@/api/dto';

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

      if (response && response.status === 200) {
        return response.data;
      }
    } catch (e) {
      console.log(e);
    }
  }
}
