export class API {
  private static BASE_PATH = "/api";

  public static URL = {
    sign_up: () => `${this.BASE_PATH}/sessions/sign_up`,
    log_in: () => `${this.BASE_PATH}/sessions/log_in`,
    infrastructures: () => `${this.BASE_PATH}/infrastructures`,
    scales: () => `${this.BASE_PATH}/scales`,
    positions: () => `${this.BASE_PATH}/positions`,
    core_stacks: () => `${this.BASE_PATH}/core_stacks`,
    histories: () => `${this.BASE_PATH}/histories`,
  };

  public static createURL(url: string): string {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    if (!baseUrl) {
      throw new Error("Environment variable VITE_API_BASE_URL is not defined.");
    }
    return `${baseUrl}${url}`;
  }
}

console.log("API URL:", API.createURL(API.URL.sign_up()));
console.log("API URL:", API.createURL(API.URL.log_in()));
