import axios from "axios";

export default class Service {
  serviceUrl;

  constructor(serviceUrl) {
    this.serviceUrl = serviceUrl;
  }

  async getOwnedGames(id) {
    return await axios
      .get(`${this.serviceUrl}/getOwnedGames?id=${id}`)
      .then(resp => resp.data);
  }
}
