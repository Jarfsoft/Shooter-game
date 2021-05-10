import 'phaser';
import postData from '../apiHelper';
import ScrollingBackground from '../Entities/ScrollingBackground';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: "SceneGameOver" });
  }

  init(s) {
    if(`${s}` === '[object Object]')
      this.score = 0;
    else
      this.score = s;
  }

  create() {
    this.title = this.add.text(this.game.config.width * 0.5, 128, `GAME OVER\nScore: ${this.score}`, {
      fontFamily: 'monospace',
      fontSize: 48,
      fontStyle: 'bold',
      color: 'green',
      align: 'center'
    });
    this.title.setOrigin(0.5);

    this.btnRestart = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      "sprBtnRestart"
    );

    this.saveScore = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.6,
      "blueButton1"
    );
    this.saveText = this.add.text(
      0,
      0,
      'Save Score', { fontSize: '28px', fill: 'black'}
    );
    Phaser.Display.Align.In.Center(this.saveText, this.saveScore);

    this.btnRestart.setInteractive();
    this.saveScore.setInteractive();

    this.btnRestart.on("pointerover", function() {
      this.btnRestart.setTexture("sprBtnRestartHover");
    }, this);

    this.btnRestart.on("pointerout", function() {
      this.setTexture("sprBtnRestart");
    });

    this.btnRestart.on("pointerdown", function() {
      this.btnRestart.setTexture("sprBtnRestartDown");
    }, this);

    this.btnRestart.on("pointerup", function() {
      this.btnRestart.setTexture("sprBtnRestart");
      this.scene.start("Title");
    }, this);

    this.saveScore.on("pointerup", function() {
      const user = prompt("Enter your name:","Name");
      if(user !== null)
        postData(user, this.score);
    }, this);

    this.backgrounds = [];
    for (var i = 0; i < 1; i++) {
      var keys = ["sprBg0"];
      var key = keys[Phaser.Math.Between(0, keys.length - 1)];
      var bg = new ScrollingBackground(this, key, 1 * 10);
      this.backgrounds.push(bg);
    }
  }

  update(){
    for (var i = 0; i < this.backgrounds.length; i++) {
      this.backgrounds[i].update();
    }
  }
};