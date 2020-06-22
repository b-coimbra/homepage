class Api {
  constructor() {
    this.url = "https://api.github.com/users/" + this.username;
    this.data = this.getData(this.url);
  }

  get username() {
    const { URL } = document;

    if (URL.includes('localhost'))
      return this.defaultResponse.username;

    return URL
      .split('/')[2]
      .split('.')[0];
  }

  get defaultResponse() {
    return {
      username: '0-l',
      name: 'Bruno',
      surname: 'Coimbra',
      bio: "I'm a fullstack developer living in Brazil.",
      followers: 30
    }
  }

  async getData(url) {
    try {
      let response = await fetch(url);

      if (this.hasFailed(response))
        return this.defaultResponse;

      return await response.json();
    } catch(err) {
      console.error(err);
      return this.defaultResponse;
    }
  }

  hasFailed({ status }) {
    return [403, 404].includes(status);
  }
}

export default new Api();
