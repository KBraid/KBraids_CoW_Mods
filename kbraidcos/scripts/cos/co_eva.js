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

    this.coZoneBonus = 20;
    this.getOffensiveBonus = function(co, attacker, atkPosX, atkPosY,
                                 defender, defPosX, defPosY, isDefender, action, luckmode, map)
    {
        switch (co.getPowerMode())
        {
            case GameEnums.PowerMode_Tagpower:
            case GameEnums.PowerMode_Superpower:

            case GameEnums.PowerMode_Power:

            default:
                if (attacker.getUnitID() === "INFANTRY") { return -20; };
                // tier 1
                if (attacker.getUnitID() === "MECH") { return -10; };
                if (attacker.getUnitID() === "SNIPER") { return -10; };
                if (attacker.getUnitID() === "MOTORBIKE") { return -10; };
                if (attacker.getUnitID() === "RECON") { return -10; };
                if (attacker.getUnitID() === "FLARE") { return -10; };
                if (attacker.getUnitID() === "FLAKGUN") { return -10; };
                //tier 2
                if (attacker.getUnitID() === "ARTILLERY") { return -5; };
                if (attacker.getUnitID() === "ARTILLERYCRAFT") { return -5; };
                if (attacker.getUnitID() === "FLAK") { return -5; };
                if (attacker.getUnitID() === "HOVERFLAK") { return -5; };
                if (attacker.getUnitID() === "LIGHT_TANK") { return -5; };
                if (attacker.getUnitID() === "HOVERCRAFT") { return -5; };
                if (attacker.getUnitID() === "FLAME") { return -5; };
                if (attacker.getUnitID() === "IFV") { return -5; };
                if (attacker.getUnitID() === "TECH") { return -5; };
                if (attacker.getUnitID() === "TRANSPORT_TRUCK") { return -5; };
                if (attacker.getUnitID() === "K_HELI") { return -5; };
                if (attacker.getUnitID() === "DUSTER") { return -5; };
                if (attacker.getUnitID() === "CANNONBOAT") { return -5; };
                //tier 3
                if (attacker.getUnitID() === "ANTITANKCANNON") { return 10; };
                if (attacker.getUnitID() === "MEDIUM_TANK") { return 10; };
                if (attacker.getUnitID() === "WATERPLANE") { return 10; };
                if (attacker.getUnitID() === "ASSAULT_FIGHTER") { return 10; };
                if (attacker.getUnitID() === "CRUISER") { return 10; };
                if (attacker.getUnitID() === "SUBMARINE") { return 10; };
                //tier 4
                if (attacker.getUnitID() === "HEAVY_TANK") { return 20; };
                if (attacker.getUnitID() === "HEAVY_HOVERCRAFT") { return 20; };
                if (attacker.getUnitID() === "NEOTANK") { return 20; };
                if (attacker.getUnitID() === "ROCKETTHROWER") { return 20; };
                if (attacker.getUnitID() === "MISSILE") { return 20; };
                if (attacker.getUnitID() === "ASSAULT_GUN") { return 20; };
                if (attacker.getUnitID() === "TRAIN") { return 20; };
                if (attacker.getUnitID() === "FLAKTRAIN") { return 20; };
                if (attacker.getUnitID() === "FIGHTER") { return 20; };
                if (attacker.getUnitID() === "BOMBER") { return 20; };
                if (attacker.getUnitID() === "DESTROYER") { return 20; };
                if (attacker.getUnitID() === "AIRCRAFTCARRIER") { return 20; };
                //tier 5
                if (attacker.getUnitID() === "MEGATANK") { return 30; };
                if (attacker.getUnitID() === "PIPERUNNER") { return 30; };
                if (attacker.getUnitID() === "SIEGE_TRAIN") { return 30; };
                if (attacker.getUnitID() === "STEALTHBOMBER") { return 30; };
                if (attacker.getUnitID() === "BATTLESHIP") { return 30; };
            break;
        }
        return 0;
    };

    this.getDeffensiveBonus = function(co, attacker, atkPosX, atkPosY,
                                 defender, defPosX, defPosY, isAttacker, action, luckmode, map)
    {
        switch (co.getPowerMode())
        {
            case GameEnums.PowerMode_Tagpower:
            case GameEnums.PowerMode_Superpower:

            case GameEnums.PowerMode_Power:

            default:
                // tier 0
                if (defender.getUnitID() === "INFANTRY") { return -20; };
                // tier 1
                if (defender.getUnitID() === "MECH") { return -10; };
                if (defender.getUnitID() === "SNIPER") { return -10; };
                if (defender.getUnitID() === "MOTORBIKE") { return -10; };
                if (defender.getUnitID() === "RECON") { return -10; };
                if (defender.getUnitID() === "FLARE") { return -10; };
                if (defender.getUnitID() === "FLAKGUN") { return -10; };
                //tier 2
                if (defender.getUnitID() === "ARTILLERY") { return -5; };
                if (defender.getUnitID() === "ARTILLERYCRAFT") { return -5; };
                if (defender.getUnitID() === "FLAK") { return -5; };
                if (defender.getUnitID() === "HOVERFLAK") { return -5; };
                if (defender.getUnitID() === "LIGHT_TANK") { return -5; };
                if (defender.getUnitID() === "HOVERCRAFT") { return -5; };
                if (defender.getUnitID() === "FLAME") { return -5; };
                if (defender.getUnitID() === "IFV") { return -5; };
                if (defender.getUnitID() === "TECH") { return -5; };
                if (defender.getUnitID() === "TRANSPORT_TRUCK") { return -5; };
                if (defender.getUnitID() === "K_HELI") { return -5; };
                if (defender.getUnitID() === "DUSTER") { return -5; };
                if (defender.getUnitID() === "CANNONBOAT") { return -5; };
                //tier 3
                if (defender.getUnitID() === "ANTITANKCANNON") { return 10; };
                if (defender.getUnitID() === "MEDIUM_TANK") { return 10; };
                if (defender.getUnitID() === "WATERPLANE") { return 10; };
                if (defender.getUnitID() === "ASSAULT_FIGHTER") { return 10; };
                if (defender.getUnitID() === "CRUISER") { return 10; };
                if (defender.getUnitID() === "SUBMARINE") { return 10; };
                //tier 4
                if (defender.getUnitID() === "HEAVY_TANK") { return 20; };
                if (defender.getUnitID() === "HEAVY_HOVERCRAFT") { return 20; };
                if (defender.getUnitID() === "NEOTANK") { return 20; };
                if (defender.getUnitID() === "ROCKETTHROWER") { return 20; };
                if (defender.getUnitID() === "MISSILE") { return 20; };
                if (defender.getUnitID() === "ASSAULT_GUN") { return 20; };
                if (defender.getUnitID() === "TRAIN") { return 20; };
                if (defender.getUnitID() === "FLAKTRAIN") { return 20; };
                if (defender.getUnitID() === "FIGHTER") { return 20; };
                if (defender.getUnitID() === "BOMBER") { return 20; };
                if (defender.getUnitID() === "DESTROYER") { return 20; };
                if (defender.getUnitID() === "AIRCRAFTCARRIER") { return 20; };
                //tier 5
                if (defender.getUnitID() === "MEGATANK") { return 30; };
                if (defender.getUnitID() === "PIPERUNNER") { return 30; };
                if (defender.getUnitID() === "SIEGE_TRAIN") { return 30; };
                if (defender.getUnitID() === "STEALTHBOMBER") { return 30; };
                if (defender.getUnitID() === "BATTLESHIP") { return 30; };
            break;
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
