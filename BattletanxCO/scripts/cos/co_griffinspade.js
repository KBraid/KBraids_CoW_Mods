var Constructor = function(){

    this.getAiUsePower = function(co, powerSurplus, unitCount, repairUnits, indirectUnits, directUnits, enemyUnits, turnMode)
    {
        return CO.getAiUsePowerAtUnitCount(co, powerSurplus, turnMode, directUnits);
    };

 this.loadCOMusic = function (co,map) {
        
        switch (co.getPowerMode()) {
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
                audio.addMusic("mods/BattletanxCO/music/cos/Griffin.mp3", 0, 0);
                break;
        }
    };
 
   this.init = function(co,map)
    {
        co.setPowerStars(2);
        co.setSuperpowerStars(4);
    };

    this.getCOArmy = function()
    {
        return "OS";
    };

    this.getOffensiveBonus = function(co, attacker, atkPosX, atkPosY,
                                      defender, defPosX, defPosY, isDefender, action, luckmode, map)
    {
        switch (co.getPowerMode())
        {
        case GameEnums.PowerMode_Tagpower:
        case GameEnums.PowerMode_Superpower:
        if (attacker.getMovementType() === "MOVE_TANK")
            return 60;
        else
            return 0;
        case GameEnums.PowerMode_Power:
        if (attacker.getMovementType() === "MOVE_TANK")
            return 20;
        else
            return 0;
        default:
        if (attacker.getMovementType() === "MOVE_TANK")
        return 10;
        else
            return 0;
        }
    };

    this.getMovementpointModifier = function(co, unit, posX, posY, map)
    {
        (co.getPowerMode() === GameEnums.PowerMode_Superpower ||
            co.getPowerMode() === GameEnums.PowerMode_Tagpower ||
        	co.getPowerMode() === GameEnums.PowerMode_Power)
        {
        if (attacker.getMovementType() === "MOVE_TANK")
            return 2;
        else
            return 0;
        }
    if (attacker.getMovementType() === "MOVE_TANK")
        return 1;
    else
        return 0;
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
    };


    this.getBio = function (co) {
        return qsTr("A gifted tactition and master of tank warfare. Griffin Spade has blazed a trail to victory across every campaign he's participated in.");
    };

    this.getHits = function (co) {
        return qsTr("His wife Madison");
    };

    this.getMiss = function (co) {
        return qsTr("Mad psycic scientist warlords");
    };

    this.getCODescription = function (co) {
        return qsTr("Treaded units have +1 movement and attack increased by 10%");
    };

    this.getPowerDescription = function (co) {
        return qsTr("Treaded units have +2 movement and attack increased by 20%");
    };

    this.getPowerName = function (co) {
        return qsTr("Battlelord Blitz");
    };

    this.getSuperPowerDescription = function (co) {
        return qsTr("Treaded units have +2 movement and attack increased by 60%");
    };

    this.getSuperPowerName = function (co) {
        return qsTr("Righteous Warpath");
    };

    this.getPowerSentences = function (co) {
        return [qsTr("Attack!"), qsTr("Destroy the Enemy!")];
    };

    this.getVictorySentences = function (co) {
        return [qsTr("Victory!")];
    };

    this.getDefeatSentences = function (co) {
        return [qsTr("Defeat...")];
    };

    this.getName = function () {
        return qsTr("Griffin Spade");
    };

}

Constructor.prototype = CO;
var CO_GRIFFINSPADE = new Constructor();

