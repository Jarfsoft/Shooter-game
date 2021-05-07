import 'phaser';
import getData from '../apiHelper';
import ScrollingBackground from '../Entities/ScrollingBackground';

export default class HighScoresScene extends Phaser.Scene {
  constructor() {
    super({ key: "HighScores" });
  }

  create() {
    this.title = this.add.text(this.game.config.width * 0.5, 128, 'High Scores', {
      fontFamily: 'Retroniod',
      fontSize: 48,
      fontStyle: 'bold',
      color: 'green',
      align: 'center'
    });
    this.title.setOrigin(0.5);

    getData().then(data => {
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
      "sprBtnRestart"
    );

    this.btnRestart.setInteractive();

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

    this.backgrounds = [];
    for (var i = 0; i < 1; i++) {
      var keys = ["sprBg0"];
      var key = keys[Phaser.Math.Between(0, keys.length - 1)];
      var bg = new ScrollingBackground(this, key, 1 * 10);
      this.backgrounds.push(bg);
    }
  }

  update() {
    for (var i = 0; i < this.backgrounds.length; i++) {
      this.backgrounds[i].update();
    }
  }
}