import {api, API_URL} from './config';


export default class Api {
  static url = API_URL;

  static login(data) {
    return api.post(`login`, data);
  }
  static registrationByEmail(data){
    return api.post(`otp/email/send`, data)
  }
  static emailOptCheck(data) {
    return api.post(`otp/email/verify`, data);
  }
  static createUser(data){
    return api.post(`register`, data);
  }
  static getUserData(){
    return api.get(`user-information`);
  }

  static getStations(params = {}) {
    return api.get(`stations`, { params });
  }

  static getStation(stationId) {
    return api.get(`stations/${stationId}`);
  }

  static getStationPumps(stationId) {
    return api.get(`stations/${stationId}/pumps`);
  }

  static getStationServices(stationId) {
    return api.get(`stations/${stationId}/services`);
  }

  static getStationPaymentMethods(stationId) {
    return api.get(`stations/${stationId}/payment_methods`);
  }

  static getStationPrice(stationId, pump, service) {
    return api.get(`stations/${stationId}/${pump}/${service}/price`);
  }

  static createVehicle(data) {
    return api.post(`client/vehicles/create`, data);
  }

  static getVehicles() {
    return api.get(`client/vehicles`);
  }

  static createDriver(data) {
    return api.post(`client/drivers/create`, data);
  }

  static getDrivers() {
    return api.get(`client/drivers`);
  }

  static attachDriver(driverId, clientVehicleId) {
    return api.put(`client/drivers/attache-driver/${driverId}`, {
      client_vehicle_id: clientVehicleId,
    });
  }

  static deleteVehicle(vehicleId) {
    return api.delete(`client/vehicles/delete/${vehicleId}`);
  }

  static deleteDriver(driverId) {
    return api.delete(`client/drivers/delete/${driverId}`);
  }

  static getCards() {
    return api.get(`client/cards`);
  }

  static createCard(data) {
    return api.post(`client/cards/create`, data);
  }

  static updateCard(cardId, data) {
    return api.put(`client/cards/update/${cardId}`, data);
  }

  static deleteCard(cardId) {
    return api.delete(`client/cards/delete/${cardId}`);
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
