import Phaser from 'phaser';
import { postData as saveOnline } from '../apiHelper';
import ScrollingBackground from '../Entities/ScrollingBackground';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneGameOver' });
  }

  init(s) {
    if (`${s}` === '[object Object]') this.score = 0;
    else this.score = s;
  }

  create() {
    this.title = this.add.text(this.game.config.width * 0.5, 128, `GAME OVER\nScore: ${this.score}`, {
      fontFamily: 'monospace',
      fontSize: 48,
      fontStyle: 'bold',
      color: 'green',
      align: 'center',
    });
    this.title.setOrigin(0.5);

    this.btnRestart = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      'sprBtnRestart',
    );

    this.saveScore = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.6,
      'blueButton1',
    );
    this.saveText = this.add.text(
      0,
      0,
      'Save Score', { fontSize: '28px', fill: 'black' },
    );
    Phaser.Display.Align.In.Center(this.saveText, this.saveScore);

    this.btnRestart.setInteractive();
    this.saveScore.setInteractive();

    const t = this;

    this.btnRestart.on('pointerup', () => {
      t.btnRestart.setTexture('sprBtnRestart');
      t.scene.start('Title');
    }, t);

    this.saveScore.on('pointerup', () => {
      /* eslint-disable no-alert */
      const user = prompt('Enter your name:', 'Name');
      /* eslint-enable no-alert */
      if (user !== null) saveOnline(user, t.score);
    }, t);

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