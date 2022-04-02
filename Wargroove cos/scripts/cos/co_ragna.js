var Constructor = function()
{
    this.init = function(co, map)
    {
        co.setPowerStars(5);
        co.setSuperpowerStars(5);
    };

    this.activatePower = function(co, map)
    {
        var dialogAnimation = co.createPowerSentence();
        var powerNameAnimation = co.createPowerScreen(GameEnums.PowerMode_Power);
        dialogAnimation.queueAnimation(powerNameAnimation);

        CO_RAGNA.throwMeteor(co, 3, powerNameAnimation, map);
    };

    this.activateSuperpower = function(co, powerMode, map)
    {
        var dialogAnimation = co.createPowerSentence();
        var powerNameAnimation = co.createPowerScreen(powerMode);
        powerNameAnimation.queueAnimationBefore(dialogAnimation);

        CO_RAGNA.throwMeteor(co, 6.5, powerNameAnimation, map);
    };

    this.throwMeteor = function(co, damage, powerNameAnimation, map)
    {
        // let a meteor fall :D
        var meteorTarget = co.getOwner().getRockettarget(2, damage);
        // create cool meteor animation :)
        var animation = GameAnimationFactory.createAnimation(map, meteorTarget.x + 2, meteorTarget.y - 4);
        animation.addSprite("ragneor", 0, 0, 2500, 4.0);
        animation.addTweenPosition(Qt.point((meteorTarget.x - 2) * map.getImageSize(), (meteorTarget.y - 2) * map.getImageSize()), 1000);
        animation.addTweenScale(0.65, 1000);
        animation.addTweenColor(0, "#FFFFFFFF", "#00FFFFFF", 1000, false, 1200);
        animation.addSound("meteorFall.wav");
        powerNameAnimation.queueAnimation(animation);
        var animation2 = GameAnimationFactory.createAnimation(map, 0, 0);
        animation2.addSprite2("white_pixel", 0, 0, 4200, map.getMapWidth(), map.getMapHeight());
        animation2.addTweenColor(0, "#00FFFFFF", "#FFFFFFFF", 3000, true, 1000);
        animation2.addSound("meteorImpact.wav");
        powerNameAnimation.queueAnimation(animation2);
        animation.setEndOfAnimationCall("CO_RAGNA", "postAnimationThrowMeteor");
        CO_RAGNA.postAnimationThrowMeteorTarget = meteorTarget;
        CO_RAGNA.postAnimationThrowMeteorDamage = damage;
    };

    this.postAnimationThrowMeteorTarget = null;
    this.postAnimationThrowMeteorDamage = 0;
    this.postAnimationThrowMeteor = function(animation, map)
    {
        var meteorTarget = CO_RAGNA.postAnimationThrowMeteorTarget;
        var damage = CO_RAGNA.postAnimationThrowMeteorDamage;
        var fields = globals.getCircle(0, 2);
        // check all target fields
        var size = fields.size();
        for (var i = 0; i < size; i++)
        {
            var x = fields.at(i).x + meteorTarget.x;
            var y = fields.at(i).y + meteorTarget.y;
            // check if the target is on the map
            if (map.onMap(x, y))
            {
                var unit = map.getTerrain(x, y).getUnit();
                if (unit !== null)
                {
                    var hp = unit.getHpRounded();
                    if (hp <= damage)
                    {
                        // set hp to very very low
                        unit.setHp(0.001);
                    }
                    else
                    {
                        unit.setHp(hp - damage);
                    }
                }
            }
        }
        fields.remove();
        CO_RAGNA.postAnimationThrowMeteorTarget = null;
        CO_RAGNA.postAnimationThrowMeteorDamage = 0;
    };

    this.loadCOMusic = function(co, map)
    {
        // put the co music in here.
        switch (co.getPowerMode())
        {
            case GameEnums.PowerMode_Power:
                audio.addMusic("resources/music/cos/bh_power.mp3", 1091 , 49930);
                break;
            case GameEnums.PowerMode_Superpower:
                audio.addMusic("resources/music/cos/bh_superpower.mp3", 3161 , 37731);
                break;
            case GameEnums.PowerMode_Tagpower:
                audio.addMusic("resources/music/cos/bh_tagpower.mp3", 779 , 51141);
                break;
            default:
                audio.addMusic("mods/wargroove cos/music/cos/ragna.mp3", 12246, 132251)
                break;
        }
    };

    this.getCOUnitRange = function(co, map)
    {
        return 3;
    };
    this.getCOArmy = function()
    {
        return "FH";
    };
    
    this.getOffensiveBonus = function(co, attacker, atkPosX, atkPosY,
                                      defender, defPosX, defPosY, isDefender, action, luckmode, map)
    {
        if (co.inCORange(Qt.point(atkPosX, atkPosY), attacker) ||
                co.getPowerMode() > GameEnums.PowerMode_Off)
        {
            return 10;
        }
        return 0;
    };

    this.getDeffensiveBonus = function(co, attacker, atkPosX, atkPosY,
                                       defender, defPosX, defPosY, isAttacker, action, luckmode, map)
    {
        if (co.inCORange(Qt.point(defPosX, defPosY), defender) ||
                co.getPowerMode() > GameEnums.PowerMode_Off)
        {
            return 10;
        }
        return 0;
    };

    this.getAiCoUnitBonus = function(co, unit, map)
    {
        return 1;
    };
    // CO - Intel
    this.getBio = function(co)
    {
        return qsTr("Created by Valder to be the ultimate commander, Ragna is a patchwork assembly of the best parts of history's greatest warriors. She strives to be the baddest she can be. She is Queen Mercia's dedicated adversary.");
    };
    this.getHits = function(co)
    {
        return qsTr("War.");
    };
    this.getMiss = function(co)
    {
        return qsTr("You.");
    };
    this.getCODescription = function(co)
    {
        return qsTr("Assembled from the remains of fallen heroes, Ragna was created by Valder to lead the Felheim armies. With a mind as fractured as her body, Ragna makes a manic game of war that feeds her compulsive need for victory.");
    };
    this.getLongCODescription = function()
    {
               qsTr("\nGlobal Effect: \nUnits have more luck and misfortune") +
               qsTr("\n\nCO Zone Effect: \nUnits have even more luck and misfortune");
    };
    this.getPowerDescription = function(co)
    {
        return qsTr("Ragna leaps into the air. Upon landing she deals 30% damage to surrounding units.");
    };
    this.getPowerName = function(co)
    {
        return qsTr("Shield Jump");
    };
    this.getSuperPowerDescription = function(co)
    {
        return qsTr("Ragna leaps into the air. Upon landing she deals 65% damage to surrounding units.");
    };
    this.getSuperPowerName = function(co)
    {
        return qsTr("Shield Crash");
    };
    this.getPowerSentences = function(co)
    {
        return [qsTr("Get outta my way!"),
                qsTr("Fight me!"),
                qsTr("FIGHT ME!!"),
                qsTr("Fight me, Fight me! FIGHT ME!!!"),
                qsTr("I'll crush you!"),
                qsTr("Special move!"),
                qsTr("I'll tear you to pieces!"),
                qsTr("You're gonna need stitches."),
                qsTr("I'm gonna break you!")];
    };
    this.getVictorySentences = function(co)
    {
        return [qsTr("And stay down!"),
                qsTr("Get good!"),
                qsTr("It's over loser!"),
                qsTr("I won!"),
                qsTr("I'm unstoppable!")];
    };
    this.getDefeatSentences = function(co)
    {
        var randVar = globals.randInt(0,100);
        if(randVar <100) {
        return [qsTr("I'm already dead idiot!"),
                qsTr("This isn't fair!"),
                qsTr("This isn't over!"),
                qsTr("This sucks!"),
                qsTr("Grrr!")];
        } else {
            return [qsTr("It's not like i like you or anything...")];
        }
    };
    this.getName = function()
    {
        return qsTr("Ragna");
    };
}

Constructor.prototype = CO;
var CO_RAGNA = new Constructor();
