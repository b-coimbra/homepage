class Api {
  constructor() {
    this.url = "https://api.github.com/users/" + this.username;
    this.data = this.getData();
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
      avatar_url: "../../../assets/avatar.jpg"
    }
  }

  async getData() {
    try {
      let response = await fetch(this.url);

      if (this.achievedRateLimit(response))
        return this.defaultResponse;

      return await response.json();
    } catch(err) {
      console.error(err);
      return this.defaultResponse;
    }
  }

  achievedRateLimit({ status }) {
    return [403, 404].includes(status);
  }
}

export default new Api();
