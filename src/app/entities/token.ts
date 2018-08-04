export class Token {

  token: string = null;

  constructor(data?: any) {
    if (data) {
      const self = this;
      for (const key of Object.keys(data)) {
        if (self.hasOwnProperty(key)) {
          self[key] = data[key];
        }
      }
    }
  }

}
