// using System.Collections;
// using System.Collections.Generic;
using UnityEngine;

public class PlayInfo
{
    public string playerName;
    public int playerID;
    public string category;    // burger, bus, plaza
    public string playType;    // tutorial, exercise, practice
    public int stage;   // 1, 2, 3...
    public string selectedCharacterName;
    public string busNum;
    public string busStopName;
    public bool isRode101 = false;
    public bool isRode102 = false;
    public bool isGetOffTag = false;
    public int rideCnt = 0;
    // success condition
    public PlayInfo(string playerName, int playerID, string category, string playType, int stage)
    {
        this.playerName = playerName;
        this.playerID = playerID;
        this.category = category;
        this.playType = playType;
        this.stage = stage;
    }
}
