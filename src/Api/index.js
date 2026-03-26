import {api, API_URL} from './config';


export default class Api {
  static url = API_URL;

  static login(data) {
    return api.post(`login`, data);
  }
  static registrationByPhone(id, data){
    return api.patch(`register`, data)
  }
  static registrationByEmail(id, data){
    return api.patch(`register`, data)
  }
  static emailOptCheck(data) {
    return api.post(`v1/otp/email/verify`, data);
  }
  static emailSendOpt(deviceId, target) {
    const body = {
      device_id: String(deviceId),
      target: String(target),
    };

    return api.post(`v1/otp/email/send`, body, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

  }
}
