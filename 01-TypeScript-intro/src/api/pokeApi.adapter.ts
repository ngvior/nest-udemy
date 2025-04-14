/* clase adaptadora - es para adaptar una libreria externa de terceros 
    para actuar como puente entre la libreria y el resto de la aplicacion
    por posibles futuros cambios.
    Si algo llega a cambiar, solo se debe cambiar esta clase y lo demas deberia seguir funcionando
*/
import axios from "axios";

export interface HttpAdapter {
  get<T>(url: string): Promise<T>;
}

export class PokeApiFetchAdapter implements HttpAdapter {
  async get<T>(url: string): Promise<T> {
    const resp = await fetch(url);
    const data: T = await resp.json();
    console.log("con fetch");

    return data;
  }
}

export class PokeApiAdapter implements HttpAdapter {
  private readonly axios = axios;

  async get<T>(url: string) {
    const { data } = await this.axios.get<T>(url);
    console.log("con axios");
    return data;
  }

  async post(url: string, data: any) {}

  async patch(url: string, data: any) {}

  async delete(url: string) {}
}
