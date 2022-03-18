var Constructor = function()
{
    this.init = function(co, map)
    {
        co.setPowerStars(4);
        co.setSuperpowerStars(4);
    };

    this.getCOStyles = function()
    {
    };

    this.activatePower = function(co, map)
    {

        var dialogAnimation = co.createPowerSentence();
        var powerNameAnimation = co.createPowerScreen(GameEnums.PowerMode_Power);
        dialogAnimation.queueAnimation(powerNameAnimation);

        var units = co.getOwner().getUnits();
        var animations = [];
        var counter = 0;
        units.randomize();
        for (var i = 0; i < units.size(); i++)
        {
            var unit = units.at(i);
            var animation = GameAnimationFactory.createAnimation(map, unit.getX(), unit.getY());
            var delay = globals.randInt(135, 265);
            if (animations.length < 5)
            {
                delay *= i;
            }
            animation.setSound("power0.wav", 1, delay);
            if (animations.length < 5)
            {
                animation.addSprite("power0", -map.getImageSize() * 1.27, -map.getImageSize() * 1.27, 0, 2, delay);
                powerNameAnimation.queueAnimation(animation);
                animations.push(animation);
            }
            else
            {
                animation.addSprite("power0", -map.getImageSize() * 1.27, -map.getImageSize() * 1.27, 0, 2, delay);
                animations[counter].queueAnimation(animation);
                animations[counter] = animation;
                counter++;
                if (counter >= animations.length)
                {
                    counter = 0;
                }
            }
        }
        units.remove();
    };

    this.activateSuperpower = function(co, powerMode, map)
    {
        var dialogAnimation = co.createPowerSentence();
        var powerNameAnimation = co.createPowerScreen(powerMode);
        powerNameAnimation.queueAnimationBefore(dialogAnimation);

        var units = co.getOwner().getUnits();
        var animations = [];
        var counter = 0;
        units.randomize();
        for (var i = 0; i < units.size(); i++)
        {
            var unit = units.at(i);
            var animation = GameAnimationFactory.createAnimation(map, unit.getX(), unit.getY());
            animation.writeDataInt32(unit.getX());
            animation.writeDataInt32(unit.getY());
            animation.writeDataInt32(2);
            animation.setEndOfAnimationCall("CO_MEIYO", "postAnimationRanking");
            var delay = globals.randInt(135, 265);
            if (animations.length < 7)
            {
                delay *= i;
            }
            if (i % 2 === 0)
            {
                animation.setSound("power12_1.wav", 1, delay);
            }
            else
            {
                animation.setSound("power12_2.wav", 1, delay);
            }
            if (animations.length < 7)
            {
                animation.addSprite("power12", -map.getImageSize() * 2, -map.getImageSize() * 2, 0, 2, delay);
                powerNameAnimation.queueAnimation(animation);
                animations.push(animation);
            }
            else
            {
                animation.addSprite("power12", -map.getImageSize() * 2, -map.getImageSize() * 2, 0, 2, delay);
                animations[counter].queueAnimation(animation);
                animations[counter] = animation;
                counter++;
                if (counter >= animations.length)
                {
                    counter = 0;
                }
            }
        }
        units.remove();
    };

    this.postAnimationRanking = function(postAnimation)
    {
        postAnimation.seekBuffer();
        var x = postAnimation.readDataInt32();
        var y = postAnimation.readDataInt32();
        var upgrade = postAnimation.readDataInt32();
        if (map.onMap(x, y))
        {
            var unit = map.getTerrain(x, y).getUnit();
            if (unit !== null)
            {
                for (var i = 0; i < upgrade; i++)
                {
                    UNITRANKINGSYSTEM.increaseRang(unit);
                }
            }
        }
    }

    this.loadCOMusic = function(co, map)
    {
        // put the co music in here.
        switch (co.getPowerMode())
        {
        case GameEnums.PowerMode_Power:
            audio.addMusic("resources/music/cos/power.mp3", 992, 45321);
            break;
        case GameEnums.PowerMode_Superpower:
            audio.addMusic("resources/music/cos/superpower.mp3", 1505, 49515);
            break;
        case GameEnums.PowerMode_Tagpower:
            audio.addMusic("resources/music/cos/tagpower.mp3", 14611, 65538);
            break;
        default:
            audio.addMusic("mods/kbraidcos/music/cos/eva.mp3", 209, 110309);
            break;
        }
    };

    this.getCOUnitRange = function(co, map)
    {
        return 0;
    };
    this.getCOArmy = function()
    {
        return "GS";
    };
    this.getOffensiveBonus = function(co, attacker, atkPosX, atkPosY,
                                      defender, defPosX, defPosY, isDefender, action, luckmode, map)
    {
        if (unit.getUnitID() === "INFANTRY")
        {
            return -10;
        }
        if (unit.getUnitID() === "ZCOUNIT_PARTISAN")
        {
            return -10;
        }
        if (unit.getUnitID() === "MECH")
        {
            return -5;
        }
        if (unit.getUnitID() === "MOROTBIKE")
        {
            return -5;
        }
        if (unit.getUnitID() === "RECON")
        {
            return -5;
        }
        if (unit.getUnitID() === "SNIPER")
        {
            return -5;
        }
        if (unit.getUnitID() === "FLARE")
        {
            return -5;
        }
        if (unit.getUnitID() === "ZCOUNIT_AT_CYCLE")
        {
            return -5;
        }
        if (unit.getUnitID() === "ZCOUNIT_HOT_TANK")
        {
            return -5;
        }
        if (unit.getUnitID() === "ZCOUNIT_SMUGGLER")
        {
            return -5;
        }
        if (unit.getUnitID() === "ANTITANKCANNON")
        {
            return 10;
        }
        if (unit.getUnitID() === "HEAVY_TANK")
        {
            return 10;
        }
        if (unit.getUnitID() === "HEAVY_HOVERCRAFT")
        {
            return 10;
        }
        if (unit.getUnitID() === "WATERPLANE")
        {
            return 10;
        }
        if (unit.getUnitID() === "CRUISER")
        {
            return 10;
        }
        if (unit.getUnitID() === "SUBMARINE")
        {
            return 10;
        }
        if (unit.getUnitID() === "AIRCRAFTCARRIER")
        {
            return 10;
        }
        if (unit.getUnitID() === "ZCOUNIT_AUTO_TANK")
        {
            return 10;
        }
        if (unit.getUnitID() === "ZCOUNIT_KIROV")
        {
            return 10;
        }
        if (unit.getUnitID() === "ZCOUNIT_TANK_HUNTER")
        {
            return 10;
        }
        if (unit.getUnitID() === "NEOTANK")
        {
            return 20;
        }
        if (unit.getUnitID() === "REOCKETTHROWER")
        {
            return 20;
        }
        if (unit.getUnitID() === "MISSILE")
        {
            return 20;
        }
        if (unit.getUnitID() === "FIGHTER")
        {
            return 20;
        }
        if (unit.getUnitID() === "BOMBER")
        {
            return 20;
        }
        if (unit.getUnitID() === "BATTLESHIP")
        {
            return 20;
        }
        if (unit.getUnitID() === "ZCOUNIT_NEOSPIDER_TANK")
        {
            return 20;
        }
        if (unit.getUnitID() === "ZCOUNIT_ROYAL_GUARD")
        {
            return 20;
        }
        if (unit.getUnitID() === "MEGATANK")
        {
            return 30;
        }
        if (unit.getUnitID() === "STEALTHBOMBER")
        {
            return 30;
        }
        if (unit.getUnitID() === "DESTROYER")
        {
            return 30;
        }
        if (unit.getUnitID() === "ZCOUNIT_SIEGE_CANNON")
        {
            return 30;
        }
        if (unit.getUnitID() === "ZCOUNIT_CRYSTAL_TANK")
        {
            return 30;
        }
        if (unit.getUnitID() === "ZCOUNIT_MISSILE_SUB")
        {
            return 30;
        }
    };

    this.getAiCoUnitBonus = function(co, unit, map)
    {
        return 1;
    };

    // CO - Intel
    this.getBio = function(co)
    {
        return qsTr("A CO who belives 'Might makes Right' who will seek out and crush all who oppose Golden Sun.");
    };
    this.getHits = function(co)
    {
        return qsTr("Her Luger pistol");
    };
    this.getMiss = function(co)
    {
        return qsTr("Wusses");
    };
    this.getCODescription = function(co)
    {
        return qsTr("Puts extra focus on more heavy hitting units but tends to neglect her weaker units.");
    };
    this.getLongCODescription = function()
    {
        return qsTr("\nGlobal Effect: all her units are given a buff or debuff in attack and denfense based on her own personal preferance.\n") +
                qsTr("\n\nCO Zone Effect: Units within her CO Zone give her CO unit increased attack and defense based on their combined value. Her own forces to not gain any benefit themselves from being inside her CO Zone.\n");
    };
    this.getPowerDescription = function(co)
    {
        return qsTr("units gain a moderate boost to power based on unit's deployment cost");
    };
    this.getPowerName = function(co)
    {
        return qsTr("Iron Fall");
    };
    this.getSuperPowerDescription = function(co)
    {
        return qsTr("units gain a substantial boost to power based on unit's deployment cost");
    };
    this.getSuperPowerName = function(co)
    {
        return qsTr("Power Overwhelming");
    };
    this.getPowerSentences = function(co)
    {
        return [qsTr("My might is unrivaled!"),
                qsTr("I will crush all beneath me!"),
                qsTr("This battle is already over."),
                qsTr("You were doomed to fail from the start.")];
    };
    this.getVictorySentences = function(co)
    {
        return [qsTr("Pathetic."),
                qsTr("You can't hope to match my might.")];
    };
    this.getDefeatSentences = function(co)
    {
        return [qsTr("Impossible!")];
        return [qsTr("I will not stand for this...")];
    };
    this.getName = function()
    {
        return qsTr("Eva");
    };
}

Constructor.prototype = CO;
var CO_EVA = new Constructor();
