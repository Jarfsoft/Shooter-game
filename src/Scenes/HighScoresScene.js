import Phaser from 'phaser';
import { getData as onlineData } from '../apiHelper';
import ScrollingBackground from '../Entities/ScrollingBackground';

export default class HighScoresScene extends Phaser.Scene {
  constructor() {
    super({ key: 'HighScores' });
  }

  create() {
    this.title = this.add.text(this.game.config.width * 0.5, 128, 'High Scores', {
      fontFamily: 'Retroniod',
      fontSize: 48,
      fontStyle: 'bold',
      color: 'green',
      align: 'center',
    });
    this.title.setOrigin(0.5);

    onlineData().then((data) => {
      data.result.sort((a, b) => b.score - a.score)
        .slice(0, 6)
        .map((game, i) => {
          const text = `${i + 1}. ${game.user} --- Score: ${game.score}`;
          this.add.text(800 / 2, (65 * (i + 1.1)) + 100, text, {
            fontFamily: 'Retroniod',
            fontSize: '28px',
            color: 'red',
            align: 'center',
            lineHeight: '1.5',
          }).setOrigin(0.5, 0.5);
          return text;
        });
    });

    this.btnRestart = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.9,
      'sprBtnRestart',
    );

    this.btnRestart.setInteractive();

    this.btnRestart.on('pointerout', () => {
      this.setTexture('sprBtnRestart');
    });

    this.btnRestart.on('pointerdown', () => {
      this.btnRestart.setTexture('sprBtnRestartDown');
    }, this);

    this.btnRestart.on('pointerup', () => {
      this.btnRestart.setTexture('sprBtnRestart');
      this.scene.start('Title');
    }, this);

    this.backgrounds = [];
    for (let i = 0; i < 1; i += 1) {
      const keys = ['sprBg0'];
      const key = keys[Phaser.Math.Between(0, keys.length - 1)];
      const bg = new ScrollingBackground(this, key, 1 * 10);
      this.backgrounds.push(bg);
    }
  }

  update() {
    for (let i = 0; i < this.backgrounds.length; i += 1) {
      this.backgrounds[i].update();
    }
  }
}