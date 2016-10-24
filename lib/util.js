const Util = {
  dist (pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
  },

  enemyVel() {
    let yVel = Math.random() * 2
    yVel *= Math.floor(Math.random() * 2) === 1 ? 1 : -1
    return [
      yVel,
      (Math.random() + 2 * 4)
    ]
  }
}

module.exports = Util;
