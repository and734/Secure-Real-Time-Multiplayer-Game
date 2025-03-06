class Player {
  constructor({ x, y, score = 0, id }) {
    this.x = x;
    this.y = y;
    this.score = score;
    this.id = id;
  }

  movePlayer(dir, speed) {
    if (dir === 'right') {
      this.x += speed;
    } else if (dir === 'left') {
      this.x -= speed;
    }
  }

  collision(item) {
    const distance = Math.sqrt((this.x - item.x) ** 2 + (this.y - item.y) ** 2);
    return distance < 1; // Adjust the collision distance as needed
  }

  calculateRank(arr) {
    const sortedPlayers = arr.sort((a, b) => b.score - a.score);
    const rank = sortedPlayers.findIndex(player => player.id === this.id) + 1;
    return `Rank: ${rank} / ${arr.length}`;
  }
}

export default Player;
