var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var S6InstaJam;
(function (S6InstaJam) {
    var Environment = (function (_super) {
        __extends(Environment, _super);
        function Environment(p_game) {
            var _this = _super.call(this, p_game, p_game.world, 'Environment', true, true, Phaser.Physics.ARCADE) || this;
            _this.locs = [];
            for (var idx = 0; idx < 50; ++idx) {
                _this.uniqueLoc();
            }
            p_game.add.existing(_this);
            return _this;
        }
        Environment.prototype.uniqueLoc = function () {
            var limit = this.game.world.height * 1.5;
            var idx;
            console.log('limit: ' + limit);
            do {
                var x = this.game.rnd.realInRange(-this.game.world.centerY, limit) / limit;
                var y = this.game.rnd.realInRange(-this.game.world.centerY, limit) / limit;
                if (y > limit) {
                    y = limit;
                }
                idx = (y * 17) + x;
                console.log('x: ' + x + ', y: ' + y + ', idx: ' + idx);
            } while (this.locs.indexOf(idx) !== -1);
            this.locs.push(idx);
            this.create(x * limit, y * limit, 'BGAtlas', this.game.rnd.integerInRange(1, 10));
        };
        return Environment;
    }(Phaser.Group));
    S6InstaJam.Environment = Environment;
})(S6InstaJam || (S6InstaJam = {}));
var S6InstaJam;
(function (S6InstaJam) {
    var Main = (function (_super) {
        __extends(Main, _super);
        function Main() {
            var _this = _super.call(this, 607, 1080, Phaser.AUTO, 'content', null) || this;
            _this.state.add('BootState', S6InstaJam.BootState, false);
            _this.state.add('PreloaderState', S6InstaJam.PreloaderState, false);
            _this.state.add('MainMenuState', S6InstaJam.MainMenuState, false);
            _this.state.add('GameState', S6InstaJam.GameState, false);
            _this.state.start('BootState');
            return _this;
        }
        return Main;
    }(Phaser.Game));
    S6InstaJam.Main = Main;
})(S6InstaJam || (S6InstaJam = {}));
window.onload = function () {
    var game = new S6InstaJam.Main();
};
var S6InstaJam;
(function (S6InstaJam) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(p_game, p_x, p_y) {
            var _this = _super.call(this, p_game, p_x, p_y, 'PlayerAtlas', 0) || this;
            _this.anchor.setTo(0.5, 0.5);
            p_game.add.existing(_this);
            var idleSpeed = 30;
            var shootSpeed = 30;
            var frameNames = [];
            for (var idx = 0; idx < 12; ++idx) {
                frameNames.push('back_idle_' + idx + '.png');
            }
            _this.animations.add('BackIdle', frameNames, idleSpeed, true);
            frameNames = [];
            for (var idx = 0; idx < 6; ++idx) {
                frameNames.push('back_shoot_' + idx + '.png');
            }
            _this.animations.add('BackShoot', frameNames, shootSpeed, false);
            frameNames = [];
            for (var idx = 0; idx < 12; ++idx) {
                frameNames.push('left_idle_' + idx + '.png');
            }
            _this.animations.add('LeftIdle', frameNames, idleSpeed, true);
            frameNames = [];
            for (var idx = 0; idx < 6; ++idx) {
                frameNames.push('left_shoot_' + idx + '.png');
            }
            _this.animations.add('LeftShoot', frameNames, shootSpeed, false);
            frameNames = [];
            for (var idx = 0; idx < 12; ++idx) {
                frameNames.push('right_idle_' + idx + '.png');
            }
            _this.animations.add('RightIdle', frameNames, idleSpeed, true);
            frameNames = [];
            for (var idx = 0; idx < 6; ++idx) {
                frameNames.push('right_shoot_' + idx + '.png');
            }
            _this.animations.add('RightShoot', frameNames, shootSpeed, false);
            frameNames = [];
            for (var idx = 0; idx < 6; ++idx) {
                frameNames.push('front_shoot_' + idx + '.png');
            }
            _this.animations.add('FrontShoot', frameNames, shootSpeed, false);
            frameNames = [];
            for (var idx = 0; idx < 12; ++idx) {
                frameNames.push('front_' + idx + '.png');
            }
            _this.animations.add('FrontIdle', frameNames, idleSpeed, true).play();
            return _this;
        }
        Player.prototype.faceDirection = function (p_angle, p_shootFirst) {
            console.log('angle: ' + p_angle);
            switch (p_angle) {
                case 0:
                    {
                        this.animations.getAnimation('RightIdle').play();
                        break;
                    }
                case -90:
                    {
                        this.animations.getAnimation('BackIdle').play();
                        break;
                    }
                case 180:
                case -180:
                    {
                        this.animations.getAnimation('LeftIdle').play();
                        break;
                    }
                default:
                    {
                        this.animations.getAnimation('FrontIdle').play();
                        break;
                    }
            }
        };
        Player.prototype.die = function () {
            this.alive = false;
        };
        return Player;
    }(Phaser.Sprite));
    S6InstaJam.Player = Player;
})(S6InstaJam || (S6InstaJam = {}));
var S6InstaJam;
(function (S6InstaJam) {
    var Enemy = (function (_super) {
        __extends(Enemy, _super);
        function Enemy(p_game, p_player, p_x, p_y) {
            var _this = _super.call(this, p_game, p_x, p_y, 'ZombieAtlas1', 'zombie1_front_0.png') || this;
            _this.player = p_player;
            _this.anchor.setTo(0.5, 0.5);
            _this.exists = false;
            var frameNames = [];
            for (var idx = 0; idx < 6; ++idx) {
                frameNames.push('zombie1_front_' + idx + '.png');
            }
            _this.animations.add('FrontWalk', frameNames, 30, true);
            frameNames = [];
            for (var idx = 0; idx < 6; ++idx) {
                frameNames.push('zombie1_back_' + idx + '.png');
            }
            _this.animations.add('BackWalk', frameNames, 30, true);
            frameNames = [];
            for (var idx = 0; idx < 6; ++idx) {
                frameNames.push('zombie1_left_' + idx + '.png');
            }
            _this.animations.add('LeftWalk', frameNames, 30, true);
            frameNames = [];
            for (var idx = 0; idx < 6; ++idx) {
                frameNames.push('zombie1_right_' + idx + '.png');
            }
            _this.animations.add('RightWalk', frameNames, 30, true);
            p_game.add.existing(_this);
            return _this;
        }
        Enemy.prototype.spawn = function (p_x, p_y) {
            this.reset(p_x, p_y);
            this.alpha = 1.0;
            this.angle = 0.0;
            this.scale.setTo(1, 1);
            this.speed = (80 * Math.random()) + 50;
            var angle = this.game.physics.arcade.angleToXY(this, this.player.position.x, this.player.position.y);
            angle *= 180 / Math.PI;
            angle = 90 * Math.round(angle / 90);
            switch (angle) {
                case 0:
                    {
                        this.animations.getAnimation('RightWalk').play();
                        break;
                    }
                case -90:
                    {
                        this.animations.getAnimation('BackWalk').play();
                        break;
                    }
                case 180:
                case -180:
                    {
                        this.animations.getAnimation('LeftWalk').play();
                        break;
                    }
                default:
                    {
                        this.animations.getAnimation('FrontWalk').play();
                        break;
                    }
            }
        };
        Enemy.prototype.die = function () {
            var _this = this;
            this.body.velocity.setTo(0, 0);
            this.animations.currentAnim.stop();
            this.frameName = 'zombie1_0.png';
            var tween = this.game.add.tween(this).to({ alpha: 0.5 }, Phaser.Timer.SECOND * 0.5, Phaser.Easing.Linear.None, true);
            this.game.add.tween(this).to({ angle: 180 }, Phaser.Timer.SECOND * 0.5, Phaser.Easing.Linear.None, true);
            this.game.add.tween(this.scale).to({ x: 1.5, y: 1.5 }, Phaser.Timer.SECOND * 0.5, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(function () { _this.kill(); }, this);
        };
        Enemy.prototype.update = function () {
            if (this.exists && this.player.alive) {
                this.game.physics.arcade.moveToXY(this, this.player.position.x, this.player.position.y, this.speed);
                if (this.game.physics.arcade.distanceBetween(this, this.player, true) <= 50.0) {
                    this.player.die();
                    this.body.velocity.setTo(0, 0);
                }
            }
            else {
                this.body.velocity.setTo(0, 0);
            }
        };
        return Enemy;
    }(Phaser.Sprite));
    S6InstaJam.Enemy = Enemy;
})(S6InstaJam || (S6InstaJam = {}));
var S6InstaJam;
(function (S6InstaJam) {
    var EnemyPool = (function (_super) {
        __extends(EnemyPool, _super);
        function EnemyPool(p_game, p_player) {
            var _this = _super.call(this, p_game, p_game.world, 'EnemyPool', false, true, Phaser.Physics.ARCADE) || this;
            _this.player = p_player;
            _this.spawnRadius = p_game.world.height * 0.55;
            var offsetX = p_player.position.x + _this.spawnRadius;
            var offsetY = p_player.position.y + _this.spawnRadius;
            for (var count = 0; count < 100; ++count) {
                _this.add(new S6InstaJam.Enemy(_this.game, _this.player, offsetX, offsetY), true);
            }
            _this.setup();
            p_game.add.existing(_this);
            return _this;
        }
        EnemyPool.prototype.setup = function () {
            this.spawnRate = Phaser.Timer.SECOND * 0.5;
            this.nextSpawnTime = 0;
        };
        EnemyPool.prototype.spawn = function () {
            if (this.nextSpawnTime > this.game.time.time) {
                return;
            }
            var angle = Math.random() * 360;
            var positionX = this.player.position.x + this.spawnRadius * Math.cos(angle);
            var positionY = this.player.position.y + this.spawnRadius * Math.sin(angle);
            var enemy = this.getFirstExists(false);
            if (enemy == null) {
                return;
            }
            enemy.spawn(positionX, positionY);
            this.nextSpawnTime = this.game.time.time + this.spawnRate;
        };
        return EnemyPool;
    }(Phaser.Group));
    S6InstaJam.EnemyPool = EnemyPool;
})(S6InstaJam || (S6InstaJam = {}));
var S6InstaJam;
(function (S6InstaJam) {
    var BootState = (function (_super) {
        __extends(BootState, _super);
        function BootState() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BootState.prototype.preload = function () {
            this.game.load.image('TitleBG', 'assets/img/title_nazi.png');
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;
            this.scale.windowConstraints.bottom = 'visual';
            this.game.scale.refresh();
            this.scale.windowConstraints.bottom = 'visual';
        };
        BootState.prototype.create = function () {
            this.game.stage.backgroundColor = '#ACE56E';
            this.input.maxPointers = 2;
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.state.start('PreloaderState', true, false);
        };
        return BootState;
    }(Phaser.State));
    S6InstaJam.BootState = BootState;
})(S6InstaJam || (S6InstaJam = {}));
var S6InstaJam;
(function (S6InstaJam) {
    var GameState = (function (_super) {
        __extends(GameState, _super);
        function GameState() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        GameState.prototype.create = function () {
            var _this = this;
            var environment = new S6InstaJam.Environment(this.game);
            var bunker = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'BGAtlas', 'bunker.png');
            bunker.anchor.setTo(0.55, -0.5);
            this.player = new S6InstaJam.Player(this.game, this.game.world.centerX, this.game.world.centerY);
            this.enemies = new S6InstaJam.EnemyPool(this.game, this.player);
            this.weapon = new S6InstaJam.Weapon(this.game, this.player, this.enemies);
            this.landmines = new S6InstaJam.Landmine(this.game, this.enemies);
            this.isTrapPlanted = false;
            this.depthSort = this.game.add.group();
            this.depthSort.add(this.player);
            environment.forEach(function (p_bg) {
                _this.depthSort.add(p_bg);
            }, this);
            this.enemies.forEach(function (p_enemy) {
                _this.depthSort.add(p_enemy);
            }, this);
            this.landmines.forEach(function (p_landmine) {
                _this.depthSort.add(p_landmine);
            }, this);
            this.depthSort.sort();
            this.gameOverUI = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'UIAtlas', 'ui_gameOver.png');
            this.gameOverUI.visible = false;
            this.gameOverUI.anchor.setTo(0.5, 2.0);
            this.retryButton = this.game.add.button(this.game.world.centerX, this.game.world.centerY, 'UIAtlas', function () {
                _this.player.alive = true;
                _this.enemies.killAll();
                _this.landmines.killAll();
                _this.gameOverUI.visible = false;
                _this.retryButton.visible = false;
            }, this);
            this.retryButton.setFrames('ui_btnPlayAgainUp.png', 'ui_btnPlayAgainUp.png', 'ui_btnPlayAgainDown.png', 'ui_btnPlayAgainUp.png');
            this.retryButton.visible = false;
            this.retryButton.anchor.setTo(0.5, 1.0);
            this.game.input.onDown.add(this.standbyWeapon, this);
            this.game.input.onUp.add(this.fire, this);
        };
        GameState.prototype.standbyWeapon = function (p_pointer) {
            if (!this.player.alive) {
                return;
            }
            if (this.isWorldRotating()) {
                return;
            }
            this.trapTimerEvent = this.game.time.events.add(Phaser.Timer.SECOND * 0.5, this.plantTrap, this, p_pointer.position.x, p_pointer.position.y);
        };
        GameState.prototype.fire = function (p_pointer) {
            if (p_pointer.identifier === null) {
                return;
            }
            if (this.isWorldRotating()) {
                return;
            }
            var angle = this.game.physics.arcade.angleToXY(this.player, p_pointer.position.x, p_pointer.position.y);
            angle *= 180 / Math.PI;
            angle = 90 * Math.round(angle / 90);
            this.player.faceDirection(angle, this.isTrapPlanted);
            if (!this.isTrapPlanted) {
                this.weapon.fire();
            }
            this.isTrapPlanted = false;
            this.game.time.events.remove(this.trapTimerEvent);
        };
        GameState.prototype.plantTrap = function (p_x, p_y) {
            this.isTrapPlanted = true;
            console.log('plant trap: ' + p_x + ", " + p_y);
            this.landmines.plant(p_x, p_y);
        };
        GameState.prototype.isWorldRotating = function () {
            var isWorldRotating = this.game.input.keyboard.isDown(Phaser.KeyCode.SHIFT);
            isWorldRotating = isWorldRotating || (this.game.input.countActivePointers() > 1);
            return isWorldRotating;
        };
        GameState.prototype.update = function () {
            if (!this.player.alive) {
                this.gameOverUI.visible = true;
                this.retryButton.visible = true;
                this.game.world.bringToTop(this.gameOverUI);
                this.game.world.bringToTop(this.retryButton);
                return;
            }
            this.enemies.spawn();
            this.depthSort.sort('y', Phaser.Group.SORT_ASCENDING);
            this.game.world.bringToTop(this.enemies);
        };
        return GameState;
    }(Phaser.State));
    S6InstaJam.GameState = GameState;
})(S6InstaJam || (S6InstaJam = {}));
var S6InstaJam;
(function (S6InstaJam) {
    var MainMenuState = (function (_super) {
        __extends(MainMenuState, _super);
        function MainMenuState() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MainMenuState.prototype.create = function () {
            this.titleBackground = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'TitleBG');
            this.titleBackground.anchor.setTo(0.5, 0.5);
            this.playButton = this.game.add.button(this.game.world.centerX, this.game.world.centerY + (this.game.world.height * 0.4), 'UIAtlas', this.fadeOut, this);
            this.playButton.setFrames('ui_btnPlayUp.png', 'ui_btnPlayUp.png', 'ui_btnPlayDown.png', 'ui_btnPlayUp.png');
            this.playButton.anchor.setTo(0.5, 0.5);
        };
        MainMenuState.prototype.fadeOut = function () {
            var tween = this.add.tween(this.playButton).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startGame, this);
        };
        MainMenuState.prototype.startGame = function () {
            this.game.state.start('GameState', true, false);
        };
        return MainMenuState;
    }(Phaser.State));
    S6InstaJam.MainMenuState = MainMenuState;
})(S6InstaJam || (S6InstaJam = {}));
var S6InstaJam;
(function (S6InstaJam) {
    var PreloaderState = (function (_super) {
        __extends(PreloaderState, _super);
        function PreloaderState() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PreloaderState.prototype.preload = function () {
            this.titleBackground = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'TitleBG');
            this.titleBackground.anchor.setTo(0.5, 0.5);
            this.game.load.atlasJSONHash('BGAtlas', 'assets/atlas_img/bg.png', 'assets/atlas_json/bg.json');
            this.game.load.atlasJSONHash('UIAtlas', 'assets/atlas_img/ui.png', 'assets/atlas_json/ui.json');
            this.game.load.atlasJSONHash('FXAtlas', 'assets/atlas_img/fx.png', 'assets/atlas_json/fx.json');
            this.game.load.atlasJSONHash('GameObjectAtlas', 'assets/atlas_img/gobj.png', 'assets/atlas_json/gobj.json');
            this.game.load.atlasJSONHash('PlayerAtlas', 'assets/atlas_img/briffin_anim.png', 'assets/atlas_json/briffin_anim.json');
            this.game.load.atlasJSONHash('ZombieAtlas1', 'assets/atlas_img/zombie1_anim.png', 'assets/atlas_json/zombie1_anim.json');
            this.game.load.atlasJSONHash('ZombieAtlas2', 'assets/atlas_img/zombie2_anim.png', 'assets/atlas_json/zombie2_anim.json');
        };
        PreloaderState.prototype.create = function () {
            this.startMainMenu();
        };
        PreloaderState.prototype.startMainMenu = function () {
            this.game.state.start('MainMenuState', true, false);
        };
        return PreloaderState;
    }(Phaser.State));
    S6InstaJam.PreloaderState = PreloaderState;
})(S6InstaJam || (S6InstaJam = {}));
var S6InstaJam;
(function (S6InstaJam) {
    var Landmine = (function (_super) {
        __extends(Landmine, _super);
        function Landmine(p_game, p_enemies) {
            var _this = _super.call(this, p_game, p_game.world, 'Landmine') || this;
            _this.explosions = new Phaser.Group(p_game, p_game.world, 'Explosion');
            _this.enemies = p_enemies;
            for (var idx = 0; idx < 20; ++idx) {
                _this.landmineSprite = _this.add(new Phaser.Sprite(p_game, 0, 0, 'GameObjectAtlas', 'gobj_landMine_0.png'));
                _this.landmineSprite.exists = false;
                _this.landmineSprite.anchor.setTo(0.5, 0.5);
                _this.landmineSprite.animations.add('blink', ['gobj_landMine_0.png', 'gobj_landMine_1.png'], 4, true);
                _this.explosionSprite = _this.explosions.add(new Phaser.Sprite(p_game, 0, 0, 'FXAtlas', 0));
                _this.explosionSprite.exists = false;
                _this.explosionSprite.animations.add('explode', [0, 1, 2, 3, 4, 5]);
                _this.explosionSprite.anchor.setTo(0.5, 0.5);
            }
            p_game.add.existing(_this);
            return _this;
        }
        Landmine.prototype.plant = function (p_x, p_y) {
            this.landmineSprite = this.getFirstExists(false);
            if (this.landmineSprite === null) {
                return;
            }
            this.landmineSprite.reset(p_x, p_y);
            this.landmineSprite.animations.getAnimation('blink').play();
        };
        Landmine.prototype.explode = function (p_landmine) {
            var _this = this;
            this.explosionSprite = this.explosions.getFirstExists(false, false);
            if (this.explosionSprite != null) {
                this.explosionSprite.reset(p_landmine.position.x, p_landmine.position.y);
                this.explosionSprite.animations.getAnimation('explode').play(15, false, true);
            }
            this.enemies.forEachExists(function (p_enemy) {
                if (_this.game.physics.arcade.distanceBetween(p_landmine, p_enemy, true) <= 200) {
                    p_enemy.die();
                }
            }, this);
            p_landmine.kill();
        };
        Landmine.prototype.update = function () {
            var _this = this;
            this.forEachExists(function (p_landmine) {
                _this.enemies.forEachExists(function (p_enemy) {
                    if (_this.game.physics.arcade.distanceBetween(p_landmine, p_enemy, true) <= 50) {
                        _this.explode(p_landmine);
                    }
                }, _this);
            }, this);
        };
        return Landmine;
    }(Phaser.Group));
    S6InstaJam.Landmine = Landmine;
})(S6InstaJam || (S6InstaJam = {}));
var S6InstaJam;
(function (S6InstaJam) {
    var Bullet = (function (_super) {
        __extends(Bullet, _super);
        function Bullet(p_game) {
            var _this = _super.call(this, p_game, 0, 0, 'GameObjectAtlas', 'gobj_bulletFront.png') || this;
            _this.anchor.set(0.5);
            _this.exists = false;
            _this.speed = 500;
            _this.game.add.existing(_this);
            return _this;
        }
        Bullet.prototype.fire = function (p_x, p_y, p_target) {
            this.reset(p_x, p_y);
            this.target = p_target;
        };
        Bullet.prototype.update = function () {
            if (this.exists) {
                if (!this.target.exists) {
                    this.kill();
                }
                this.rotation = this.game.physics.arcade.angleToXY(this, this.target.position.x, this.target.position.y);
                this.rotation -= 90;
                this.game.physics.arcade.moveToXY(this, this.target.position.x, this.target.position.y, this.speed);
                if (this.game.physics.arcade.distanceBetween(this, this.target, true) <= 100.0) {
                    this.kill();
                    this.target.die();
                }
            }
        };
        return Bullet;
    }(Phaser.Sprite));
    S6InstaJam.Bullet = Bullet;
})(S6InstaJam || (S6InstaJam = {}));
var S6InstaJam;
(function (S6InstaJam) {
    var BulletPool = (function (_super) {
        __extends(BulletPool, _super);
        function BulletPool(p_game) {
            var _this = _super.call(this, p_game, p_game.world, 'BulletPool', false, true, Phaser.Physics.ARCADE) || this;
            for (var count = 0; count < 20; ++count) {
                _this.add(new S6InstaJam.Bullet(p_game), true);
            }
            p_game.add.existing(_this);
            return _this;
        }
        BulletPool.prototype.fire = function (p_x, p_y, p_target) {
            var bullet = this.getFirstExists(false);
            if (bullet === null) {
                return;
            }
            bullet.fire(p_x, p_y, p_target);
        };
        return BulletPool;
    }(Phaser.Group));
    S6InstaJam.BulletPool = BulletPool;
})(S6InstaJam || (S6InstaJam = {}));
var S6InstaJam;
(function (S6InstaJam) {
    var Weapon = (function (_super) {
        __extends(Weapon, _super);
        function Weapon(p_game, p_player, p_enemies) {
            var _this = _super.call(this, p_game, p_player.position.x, p_player.position.y) || this;
            _this.bulletPool = new S6InstaJam.BulletPool(p_game);
            _this.enemies = p_enemies;
            _this.quadTree = new Phaser.QuadTree(0, 0, p_game.world.width, p_game.world.height, 10, 4, 0);
            _this.quadTreeMarker = new Phaser.Rectangle(0, 0, 128, 128);
            _this.targetArray = [];
            _this.setup();
            p_game.add.existing(_this);
            return _this;
        }
        Weapon.prototype.setup = function () {
            this.fireRate = Phaser.Timer.SECOND * 0.1;
            this.currentTargetIndex = 0;
            this.nextFireTime = 0;
            this.range = 150;
            this.burstCapacity = 5;
        };
        Weapon.prototype.fire = function () {
            if (this.targetArray.length > 0) {
                return;
            }
            var existingEnemies = this.enemies.getAll('exists', true);
            var inputX = this.game.input.x;
            var inputY = this.game.input.y;
            var enemyOnCheck;
            if (existingEnemies.length <= 0) {
                return;
            }
            this.quadTree.clear();
            for (var idx = existingEnemies.length - 1; idx >= 0; --idx) {
                this.quadTree.insert(existingEnemies[idx]);
            }
            this.quadTreeMarker.x = inputX;
            this.quadTreeMarker.y = inputY;
            existingEnemies = this.quadTree.retrieve(this.quadTreeMarker);
            for (var idx = existingEnemies.length - 1; idx >= 0; --idx) {
                enemyOnCheck = existingEnemies[idx];
                if (this.game.physics.arcade.distanceToXY(enemyOnCheck, inputX, inputY) <= this.range) {
                    this.targetArray.push(enemyOnCheck);
                }
                if (this.targetArray.length >= this.burstCapacity) {
                    break;
                }
            }
            this.currentTargetIndex = 0;
        };
        Weapon.prototype.update = function () {
            var _this = this;
            if (this.currentTargetIndex >= this.targetArray.length) {
                return;
            }
            if (this.nextFireTime > this.game.time.time) {
                return;
            }
            var enemy = this.targetArray[this.currentTargetIndex++];
            var angle = this.game.physics.arcade.angleToXY(this, enemy.position.x, enemy.position.y);
            var posx = this.position.x + 70 * Math.cos(angle);
            var posy = this.position.y + 70 * Math.sin(angle);
            enemy.events.onKilled.add(function () { _this.targetArray.pop(); });
            this.bulletPool.fire(posx, posy, enemy);
            this.nextFireTime = this.game.time.time + this.fireRate;
        };
        return Weapon;
    }(Phaser.Sprite));
    S6InstaJam.Weapon = Weapon;
})(S6InstaJam || (S6InstaJam = {}));
