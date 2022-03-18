PLAYER.armies.push("CS");
PLAYER.armies.push("FH");
PLAYER.armyNames.push(qsTr("Cherrystone Kingdom"));
PLAYER.armyNames.push(qsTr("Felheim Legion"));

PLAYER.getArmyCOsCS = function()
    {
        return ["CO_MERCIA", "CO_EMERIC", "CO_CAESAR", "CO_MERCIVAL"];
    };

PLAYER.getArmyCOsFH = function()
    {
        return ["CO_VALDER", "CO_RAGNA", "CO_SIGRID"];
    };
