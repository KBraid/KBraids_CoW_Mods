PLAYER.armies.push("CS");
PLAYER.armies.push("FH");
PLAYER.armies.push("GW");
PLAYER.armies.push("HS");
PLAYER.armies.push("OL");
PLAYER.armies.push("RQ");
PLAYER.armyNames.push(qsTr("Cherrystone Kingdom"));
PLAYER.armyNames.push(qsTr("Felheim Legion"));
PLAYER.armyNames.push(qsTr("Gloomwood Floran Tribes"));
PLAYER.armyNames.push(qsTr("Havensong Empire"));
PLAYER.armyNames.push(qsTr("Aurania Outlaws"));
PLAYER.armyNames.push(qsTr("Requiem"));

PLAYER.getArmyCOsCS = function()
    {
        return ["CO_MERCIA", "CO_EMERIC", "CO_CAESAR", "CO_MERCIVAL"];
    };

PLAYER.getArmyCOsFH = function()
    {
        return ["CO_VALDER", "CO_RAGNA", "CO_SIGRID"];
    };
