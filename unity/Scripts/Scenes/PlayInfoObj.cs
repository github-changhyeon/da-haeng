// using System.Collections;
// using System.Collections.Generic;
using UnityEngine;

public class PlayInfoObj : MonoBehaviour
{
    public PlayInfo playInfo;

    private void Awake()
    {
        if(playInfo == null)
        {
            playInfo = new PlayInfo("이름이름", 1, "bus", "practice", 1);
            playInfo.busStopName = "SouthBusStop";
        }
        // Debug.Log(playInfo.selectedCharacterName);
        // namename = playInfo.selectedCharacterName;

        DontDestroyOnLoad(gameObject);
    }

    public void SetPlayInfo(string jsonData)
    {
        // Debug.Log("데이터 " + jsonData);
        playInfo = JsonUtility.FromJson<PlayInfo>(jsonData);
        if(playInfo.category == "bus")
        {
            playInfo.busStopName = "SouthBusStop";
        }
    }
}
