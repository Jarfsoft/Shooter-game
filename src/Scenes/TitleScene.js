import Phaser from 'phaser';
import config from '../Config/config';
import ScrollingBackground from '../Entities/ScrollingBackground';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  preload() {
    this.load.image('sprBg0', '../assets/cloud2.jpg');
    this.load.image('sprBtnRestart', '../assets/sprBtnRestart.png');
    this.load.image('sprBtnRestartHover', '../assets/sprBtnRestartHover.png');
    this.load.image('sprBtnRestartDown', '../assets/sprBtnRestartDown.png');
  }

  create() {
    this.gameButton = this.add.sprite(100, 200, 'blueButton1').setInteractive();
    this.centerButton(this.gameButton, 1);

    this.gameText = this.add.text(0, 0, 'Play', { fontSize: '32px', fill: '#fff' });
    this.centerButtonText(this.gameText, this.gameButton);

    this.gameButton.on('pointerdown', () => {
      this.scene.start('Game');
    });

    this.optionsButton = this.add.sprite(300, 200, 'blueButton1').setInteractive();
    this.centerButton(this.optionsButton);

    this.optionsText = this.add.text(0, 0, 'Options', { fontSize: '32px', fill: '#fff' });
    this.centerButtonText(this.optionsText, this.optionsButton);

    this.optionsButton.on('pointerdown', () => {
      this.scene.start('Options');
    });

    this.creditsButton = this.add.sprite(300, 200, 'blueButton1').setInteractive();
    this.centerButton(this.creditsButton, -1);

    this.creditsText = this.add.text(0, 0, 'Credits', { fontSize: '32px', fill: '#fff' });
    this.centerButtonText(this.creditsText, this.creditsButton);

    this.creditsButton.on('pointerdown', () => {
      this.scene.start('Credits');
    });

    this.scoresButton = this.add.sprite(0, 0, 'blueButton1').setInteractive();
    this.centerButton(this.scoresButton, -1);

    this.scoresText = this.add.text(343, 485, 'Scores', { fontSize: '32px', fill: '#fff' });
    this.centerButtonText(this.scoresButton, this.scoresText);

    this.scoresButton.on('pointerdown', () => {
      this.scene.start('HighScores');
    });

    this.input.on('pointerover', (event, gameObjects) => {
      gameObjects[0].setTexture('blueButton2');
    });

    this.input.on('pointerout', (event, gameObjects) => {
      gameObjects[0].setTexture('blueButton1');
    });

    this.title = this.add.text(this.game.config.width * 0.5, 128, 'SHOOTER GAME', {
      fontFamily: 'monospace',
      fontSize: 48,
      fontStyle: 'bold',
      color: 'blue',
      align: 'center',
    });

    this.title.setOrigin(0.5);

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

  centerButton(gameObject, offset = 0) {
    Phaser.Display.Align.In.Center(
      gameObject,
      this.add.zone(
        config.width / 2,
        config.height / 2 - offset * 100,
        config.width,
        config.height,
      ),
    );
  }

  centerButtonText(gameText, gameButton) {
    if (this != null) {
      Phaser.Display.Align.In.Center(
        gameText,
        gameButton,
      );
    }
  }
}
