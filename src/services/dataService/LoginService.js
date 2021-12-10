import autoBind from 'auto-bind';
import ls from 'local-storage';

class GetDataService {
  static $inject = ['httpService', 'apiCallConfig'];

  static $singleton = true;

  constructor(httpService, apiCallConfig) {
    this.httpService = httpService;
    this.apiCallConfig = apiCallConfig;
    this.baseURL = this.apiCallConfig.baseURL;

    autoBind(this);
  }

  getToken() {
    const { newTokenPath } = this.apiCallConfig;

    return this.httpService.get(`${this.baseURL}${newTokenPath}`);
  }

  createSessionId() {
    const { newSession } = this.apiCallConfig;
    const token = ls.get('requestToken');
    const sessionRequestParam = {
      request_token: token
    };

    return this.httpService.post(`${this.baseURL}${newSession}`, sessionRequestParam);
  }

  loginAsUser(username, password) {
    const { newTokenWithLogin } = this.apiCallConfig;
    const token = ls.get('requestToken');
    const userLoginParams = {
      username,
      password,
      request_token: token
    };

    return this.httpService.post(`${this.baseURL}${newTokenWithLogin}`, userLoginParams);
  }

  deleteSession() {
    const { session } = this.apiCallConfig;
    const sessionId = ls.get('sessionId');
    const deleteParam = {
      session_id: sessionId
    };

    return this.httpService.delete(`${this.baseURL}${session}`, { data: { deleteParam } });
  }
}

export default GetDataService;
