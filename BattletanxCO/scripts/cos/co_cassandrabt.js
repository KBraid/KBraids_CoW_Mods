var Constructor = function(){

    this.getAiUsePower = function(co, powerSurplus, unitCount, repairUnits, indirectUnits, directUnits, enemyUnits, turnMode)
    {
        return CO.getAiUsePowerAtUnitCount(co, powerSurplus, turnMode, directUnits);
    };

 this.loadCOMusic = function (co,map) {
        
        switch (co.getPowerMode()) {
            case GameEnums.PowerMode_Superpower:
                audio.addMusic("mods/BattletanxCO/music/cos/Cassandra_super.mp3", 0, 0);
                break;
            case GameEnums.PowerMode_Tagpower:
                audio.addMusic("resources/music/cos/bh_tagpower.mp3", 779 , 51141);
                break;
            default:
                audio.addMusic("mods/BattletanxCO/music/cos/Cassandra.mp3", 0, 0);
                break;
        }
    };
 
   this.init = function(co,map)
    {
        co.setSuperpowerStars(10);
    };

    this.getCOArmy = function()
    {
        return "DM";
    };

    this.getDeffensiveBonus = function(co, attacker, atkPosX, atkPosY,
                                      defender, defPosX, defPosY, isDefender, action, luckmode, map)
    {
        switch (co.getPowerMode())
        {
        default:
        if (defender.getMovementType() === "MOVE_TANK")
            return 40;
        else
            return 0;
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
            animation.writeDataInt32(unit.getX());
            animation.writeDataInt32(unit.getY());
            animation.writeDataInt32(5);
            animation.setEndOfAnimationCall("ANIMATION", "postAnimationHeal");
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

    this.getBio = function (co) {
        return qsTr("A powerful warlord and scientific mastermind with incredible psycic power, able to bend the minds of those around her to her own will.");
    };

    this.getHits = function (co) {
        return qsTr("Scientific superiority");
    };

    this.getMiss = function (co) {
        return qsTr("Power couples");
    };

    this.getCODescription = function (co) {
        return qsTr("Treaded units have deffense increased by 40%");
    };

    this.getPowerName = function (co) {
        return qsTr("no CO Power");
    };

    this.getSuperPowerDescription = function (co) {
        return qsTr("Takes permenant controld of 25% of her opponent's forces and stuns another 25% of them");
    };

    this.getSuperPowerName = function (co) {
        return qsTr("Dream Wraith");
    };

    this.getPowerSentences = function (co) {
        return [qsTr("You've defeated my raiders. But now I'll turn your army against you."),
        qsTr("Kill your own people or die yourself!"),
        qsTr("Fear the power of the Edge!")];
    };

    this.getVictorySentences = function (co) {
        return [qsTr("Can you feel me within your mind?")];
    };

    this.getDefeatSentences = function (co) {
        return [qsTr("Warriors, retreat - we can't win here.")];
    };

    this.getName = function () {
        return qsTr("Cassandra");
    };

}

Constructor.prototype = CO;
var CO_CASSANDRABT = new Constructor();

