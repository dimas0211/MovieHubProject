import { IoCContainer, iocClass } from 'libioc';
import { httpService } from '../services/dataService';
import GetDataService from '../services/dataService/GetDataService';
import LoginService from '../services/dataService/LoginService';
import { routingConfig } from '../config/routingConfig';
import { apiCallConfig } from '../config/apiCallConfig';

export function createClientIoCContainer() {
  const container = new IoCContainer();

  container.registerAll({
    httpService: iocClass(httpService),
    apiCallConfig,
    routingConfig,
    getDataService: iocClass(GetDataService),
    loginService: iocClass(LoginService)
  });

  return container;
}
