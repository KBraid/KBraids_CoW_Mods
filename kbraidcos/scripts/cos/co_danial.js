var Constructor = function()
{
    this.init = function(co, map)
    {
        co.setPowerStars(4);
        co.setSuperpowerStars(5);
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
            animation.setEndOfAnimationCall("CO_DANIAL", "postAnimationRanking");
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
            audio.addMusic("mods/kbraidcos/music/cos/danial.mp3", 367, 61954);
            break;
        }
    };

    this.getCOUnitRange = function(co, map)
    {
        return 2;
    };
    this.getCOArmy = function()
    {
        return "GS";
    };
    this.getOffensiveBonus = function(co, attacker, atkPosX, atkPosY,
                                     defender, defPosX, defPosY, isDefender, action, luckmode, map)
    { 
        var bonus = -10;     // set start value based on cop or in co-range stuff
        var tileBonus = 5; // determine this based on cop / scop
        switch (co.getPowerMode())
        {
            case GameEnums.PowerMode_Tagpower:
            case GameEnums.PowerMode_Superpower:
            {
                bonus = -10;     // set start value based on cop or in co-range stuff
                tileBonus = 10; // determine this based on cop / scop
            }
        }
        if (action !== null &&
            !isDefender)
        {
            var distance =  globals.getDistance(Qt.point(atkPosX, atkPosY), attacker.getPosition());
            var pathLength = action.getMovePathLength() - 1;
            if (pathLength > 0 || distance > 0)
            {
                if (pathLength > distance)
                {
                    // actual calculation
                    bonus += tileBonus * pathLength;
                }
                else
                {
                    // for ai simulation
                    bonus += tileBonus * distance;
                }
            }
        }
        return bonus;
    };

    this.getMovementpointModifier = function(co, unit, posX, posY, map)
    {
        // maybe you want to spread it to all units during cop and scop
        if (co.inCORange(Qt.point(posX, posY), unit))
        {
            // co range bonus
            return 1;
        }
        return 0;
    };

    this.getDeffensiveBonus = function(co, attacker, atkPosX, atkPosY,
                                       defender, defPosX, defPosY, isAttacker, action, luckmode, map)
    {
        var defenseBonus = 30;
        var defenseMalus = -15;
        switch (co.getPowerMode())
        {
            case GameEnums.PowerMode_Tagpower:
            case GameEnums.PowerMode_Superpower:
            {
                defenseMalus = -10;
                defenseBonus = 60;
                break;
            }
            case GameEnums.PowerMode_Power:
            {
                    defenseMalus = -5;
                    defenseBonus = 80;
                    break;
            } 
        }       
        var variables = defender.getVariables();
        var variable = variables.createVariable("CO_DANIAL"); // todo change co name to the actual name
        var counter = variable.readDataInt32();
        if (counter > 0)
        {
            // unit has moved return defensive malus
            return -15;
        }
        else
        {
            // unit didn't move
            return 10;
        }
    };

    this.getFirstStrike = function(co, unit, posX, posY, attacker, isDefender, map)
    {
        if(unit !== null)
        {
            switch (co.getPowerMode())
            {
            case GameEnums.PowerMode_Tagpower:
            case GameEnums.PowerMode_Superpower:
                if (isDefender)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            case GameEnums.PowerMode_Power:
                return false;
            default:
                return false;
            }
        }
        return false;
    };

    this.postAction = function(co, action, map)
    {
        var unit = action.getMovementTarget();
        if (unit !== null &&
            action.getMovePathLength() > 1)
        {
            var variables = unit.getVariables();
            var variable = variables.createVariable("CO_DANIAL"); // todo change co name to the actual name
            variable.writeDataInt32(1); // mark unit as has moved
        }
    };

    this.startOfTurn = function(co, map)
    {
        var player = co.getOwner();
        if (!player.getIsDefeated())
        {
            var units = co.getOwner().getUnits();
            for (var i = 0; i < units.size(); i++)
            {
                var unit = units.at(i);
                var variables = unit.getVariables();
                var variable = variables.createVariable("CO_DANIAL"); // todo change co name to the actual name
                variable.writeDataInt32(0); // reset unit has moved
            }
        }
    };
    
    // CO - Intel
    this.getBio = function(co)
    {
        return qsTr("Danial's tactics are rather unorthadox compared to those of his fellow Golden Sun COs, choosing to encorperate hit and run maneuvers with entrenching strategic positions for both a powerful offense and defense.");
    };
    this.getHits = function(co)
    {
        return qsTr("campfire stories");
    };
    this.getMiss = function(co)
    {
        return qsTr("glory seekers");
    };
    this.getCODescription = function(co)
    {
        return qsTr("Units deal more damage the further they move however become vulrable to attack, units that don't move can't hit has hard but themselves become harder to hit and also strike first.");
    };
    this.getLongCODescription = function()
    {
        return qsTr("\nGlobal Effect: \n+30 def and -10 atk for units that have not moved, -15 def after moving and +5 atk (from 0) for every tile the unit moves onto.") +
                qsTr("\n\nCO Zone Effect: \n+10 def and +1 movement");
    };
    this.getPowerDescription = function(co)
    {
        return qsTr("Units that don't move gain +80 def, -5 def after moving");
    };
    this.getPowerName = function(co)
    {
        return qsTr("Dig In");
    };
    this.getSuperPowerDescription = function(co)
    {
        return qsTr("Units that don't move gain +60 def, -10 def after moving and gain +10 atk for every tile the unit moves onto");
    };
    this.getSuperPowerName = function(co)
    {
        return qsTr("Asymmetric Warfare");
    };
    this.getPowerSentences = function(co)
    {
        return [qsTr("Get ready, here it comes!"),
                qsTr("Hold firm, strike hard!"),
                qsTr("Brace yourself!")];
    };
    this.getVictorySentences = function(co)
    {
        return [qsTr("Survival of the fittest mate."),
                qsTr("No hard feelings mate."),
                qsTr("Someone needs to go back to the Scouts.")];
    };
    this.getDefeatSentences = function(co)
    {
        return [qsTr("I left myself open..."),
                qsTr("Blast, i was too cocky.")];
    };
    this.getName = function()
    {
        return qsTr("Danial");
    };
}

Constructor.prototype = CO;
var CO_DANIAL = new Constructor();
