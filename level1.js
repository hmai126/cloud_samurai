class level1 extends Phaser.Scene
{
    constructor() {
        super("level1")
    }

    cursors;
    currentPlayer;
    player2;
    player1;
    movingPlatform;
    platforms;
    playerdead;
    port;
    port2;

    preload ()
    {
        this.load.path = './assets/';
        // mine
        this.load.audio('music', 'coniferous-forest-142569.mp3'); 
        this.load.audio('jumpSFX', 'cartoon-jump-6462.mp3');
        this.load.audio('entPortal', 'teleport-90137.mp3');
        this.load.audio('landing', 'human-impact-on-ground-6982.mp3');
        //

        // player anims
        this.load.image('purpleidle0', 'sprite_purp_samurai_idle0.png');
        this.load.image('purpleidle1', 'sprite_purp_samurai_idle1.png');
        this.load.image('purpleidle2', 'sprite_purp_samurai_idle2.png');
        this.load.image('purplerun0', 'sprite_purp_samurai_run0.png');
        this.load.image('purplerun1', 'sprite_purp_samurai_run1.png');
        this.load.image('purplerun2', 'sprite_purp_samurai_run2.png');
        this.load.image('purplerun3', 'sprite_purp_samurai_run3.png');
        this.load.image('redidle0', 'sprite_red_samurai_idle0.png');
        this.load.image('redidle1', 'sprite_red_samurai_idle1.png');
        this.load.image('redidle2', 'sprite_red_samurai_idle2.png');
        this.load.image('redrun0', 'sprite_purp_samurai_run0.png');
        this.load.image('redrun1', 'sprite_purp_samurai_run1.png');
        this.load.image('redrun2', 'sprite_purp_samurai_run2.png');
        this.load.image('redrun3', 'sprite_purp_samurai_run3.png');
        this.load.image('purple_jump', 'Purp Samurai Jump.png');
        this.load.image('red_jump', 'Red Samurai Jump.png');
        //
    
        this.load.image('sky', 'sky.png');
        this.load.image('ground', 'ground.png');
        this.load.image('samurai', 'samurai.png' );
        this.load.image('platform', 'cloudplatform.png' );
        this.load.image('portal1', 'portal1.png');
        this.load.image('portal2', 'portal2.png');
        this.load.image('portal3', 'portal3.png');
        this.load.image('portal4', 'portal4.png');
        this.load.image('portal5', 'portal5.png');
        this.load.image('portal6', 'portal6.png');
        this.load.image('portal7', 'portal7.png');
        this.load.image('portal8', 'portal8.png');
        this.load.image('portal9', 'portal9.png');
        this.load.image('portal10', 'portal10.png');
        this.load.image('portal11', 'portal11.png');
        this.load.image('portal12', 'portal12.png');
    }

    create ()
    {
        // mine
        this.music =  this.sound.add('music', {
            volume: 0.2,
            loop: true
        })
    
        if (!this.sound.locked)
        {
            // already unlocked so play
            this.music.play();
        }
        else
        {
            // wait for 'unlocked' to fire and then play
            this.sound.once(Phaser.Sound.Events.UNLOCKED, () => {
                this.music.play();
            })
        }
        //
        
        this.add.image(500, 400, 'sky').setScale(1.4);

        const ground = this.physics.add.staticGroup();

        ground.create(500, 900, 'ground').setScale(1.3).refreshBody();

        
        
        this.player1 = this.physics.add.sprite(230, 600, 'samurai').setBounce(0.2).setCollideWorldBounds(true);
        

        this.player1.name = 'Purple';

        // mine
        this.player1.inAir = true;
        this.player1.end = false;
        //
        

        this.currentPlayer = this.player1;
        
        //portal mechanics

        this.anims.create({
            key: 'portal',
            frames: [
                { key: 'portal1' },
                { key: 'portal2' },
                { key: 'portal3' },
                { key: 'portal4' },
                { key: 'portal5' },
                { key: 'portal6' },
                { key: 'portal7' },
                { key: 'portal8' },
                { key: 'portal9' },
                { key: 'portal10' },
                { key: 'portal11' },
                { key: 'portal12', duration: 50 }
            ],
            frameRate: 8,
            repeat: -1
        });

        // player animations
        this.anims.create({
            key: 'purpleidle',
            frames: [
                {key: 'purpleidle0'},
                {key: 'purpleidle1'},
                {key: 'purpleidle2'},
            ],
            frameRate: 2,
            repeat: -1
        });

        this.anims.create({
            key: 'purplerun',
            frames: [
                {key: 'purplerun0'},
                {key: 'purplerun1'},
                {key: 'purplerun2'},
                {key: 'purplerun3'},
            ],
            frameRate: 3,
            repeat: 0
        });
        this.anims.create({
            key: 'purplejump',
            frames: [
                {key: 'purple_jump'},
            ],
            frameRate: 1,
            repeat: 0
        });
        //

        
       

        
        
        this.port2 = this.physics.add.staticGroup();
        this.port2.create(950, 700, "portal1").setScale(.5).refreshBody();
            this.add.sprite(950, 700, 'portal1')
            .play('portal');
        
        
        
        this.physics.add.collider(this.currentPlayer, this.port2, () => {

            // mine
            this.music =  this.sound.add('entPortal', {
                volume: 0.2,
                loop: false
            })
        
            if (!this.sound.locked)
            {
                // already unlocked so play
                this.music.play();
            }
            else
            {
                // wait for 'unlocked' to fire and then play
                this.sound.once(Phaser.Sound.Events.UNLOCKED, () => {
                    this.music.play();
                })
            }
            this.currentPlayer.end = true;
            //

            this.time.delayedCall(200, () => this.scene.start('level2'));

        });

        
        
        /*
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });*/

        this.cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(this.player1, ground, () => {
            // mine
            if (this.currentPlayer.inAir == true) {
                this.music =  this.sound.add('landing', {
                    volume: 0.2,
                    loop: false
                })
            
                if (!this.sound.locked)
                {
                    // already unlocked so play
                    this.music.play()
                }
                else
                {
                    // wait for 'unlocked' to fire and then play
                    this.sound.once(Phaser.Sound.Events.UNLOCKED, () => {
                        this.music.play()
                    })
                }
                this.currentPlayer.inAir = false;
            }
            //
        });
        

        

        
        window.body1 = this.player1.body;
        window.physics = this.physics;
        window.showit = false;

        
            
        this.currentPlayer = this.player1;
            

        

        
        
        this.physics.add.collider(this.currentPlayer, this.movingPlatform);
        this.physics.add.collider(
            this.currentPlayer,
            this.platforms,
            null,
            (currentPlayer, platforms) =>
            {
                return currentPlayer.body.velocity.y >= 0;
            });

            

       
        
        this.add.text(30, 30, 'MOVE WITH THE ARROW KEYS', { fontSize: '44px', fill: 'black' });

        


    }

    

    update ()
    {
        
        if (!(this.cursors.left._justDown) && !(this.cursors.up._justDown) && !(this.cursors.down._justDown) && !(this.cursors.right._justDown) && this.currentPlayer.scene) {
            this.currentPlayer.anims.play('purpleidle', true);
        }

        if (this.cursors.left._justDown && this.currentPlayer.scene)
        {
            this.currentPlayer.setVelocityX(-160);

            //this.currentPlayer.anims.play('left', true);
            this.currentPlayer.flipX = true;
            this.currentPlayer.anims.play('purplerun', true);
        }
        else if (this.cursors.right._justDown && this.currentPlayer.scene)
        {
            this.currentPlayer.setVelocityX(160);

            //this.currentPlayer.anims.play('right', true);
            this.currentPlayer.flipX = false;
            this.currentPlayer.anims.play('purplerun', true);
        }
        else
        {
            this.currentPlayer.setVelocityX(0);

            //this.currentPlayer.anims.play('turn');
        }

        if (this.cursors.up._justDown && this.currentPlayer.body.touching.down && this.currentPlayer.scene)
        {
            // mine
            this.music =  this.sound.add('jumpSFX', {
                volume: 0.2,
                loop: false
            })
        
            if (!this.sound.locked)
            {
                // already unlocked so play
                this.music.play()
            }
            else
            {
                // wait for 'unlocked' to fire and then play
                this.sound.once(Phaser.Sound.Events.UNLOCKED, () => {
                    this.music.play()
                })
            }

            this.currentPlayer.inAir = true;
            //
            // mine
            this.currentPlayer.anims.play('purplejump', true);
            //
            this.currentPlayer.setVelocityY(-230);

            window.showit = true;
        }

        // mine
        if (this.currentPlayer.end == true) {
            this.music =  this.sound.get('music');
            console.log(this.music);
            this.music.stop();
        }
        //

        
    }

    
}