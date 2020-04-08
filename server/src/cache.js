class Cache {
  constructor() {
    this.contents = {};
  }

  get(key) {
    console.log(`Querying cache for SteamID: ${key}`);

    if (this.contents[key]) {
      console.log(`  - Hit for SteamID: ${key}`);
      return this.contents[key];
    }

    console.log(`  - Miss for SteamID: ${key}`);
    return null;
  }

  put(key, value) {
    this.contents[key] = value;
  }
}

module.exports = Cache;
