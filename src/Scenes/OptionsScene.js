import Phaser from 'phaser';

export default class OptionsScene extends Phaser.Scene {
  constructor() {
    super('Options');
  }

  create() {
    this.soundOn = true;

    this.text = this.add.text(300, 100, 'Options', { fontSize: 40 });

    this.soundButton = this.add.image(200, 300, 'checkedBox');
    this.soundText = this.add.text(250, 290, 'Sound Enabled', { fontSize: 24 });

    this.soundButton.setInteractive();

    this.soundButton.on('pointerdown', () => {
      this.soundOn = !this.soundOn;
      this.updateAudio();
    });

    this.menuButton = this.add.sprite(400, 500, 'blueButton1').setInteractive();
    this.menuText = this.add.text(0, 0, 'Menu', { fontSize: '32px', fill: '#fff' });
    Phaser.Display.Align.In.Center(this.menuText, this.menuButton);

    this.menuButton.on('pointerdown', () => {
      this.scene.start('Title');
    });

    this.updateAudio();
  }

  updateAudio() {
    if (this.soundOn === false) {
      this.soundButton.setTexture('box');
      this.game.sound.mute = true;
    } else {
      this.soundButton.setTexture('checkedBox');
      this.game.sound.mute = false;
    }
  }
}
