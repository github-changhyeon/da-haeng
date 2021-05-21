// using System.Collections;
// using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class BusScene : BaseScene
{

    private PlayInfo userPlayInfo;
    void Start()
    {
        Init();
    }

    protected override void Init()
    {
        base.Init();
        if(GameObject.Find("PlayInfoObj") != null)
        {
            userPlayInfo = GameObject.Find("PlayInfoObj").GetComponent<PlayInfoObj>().playInfo;
            // Debug.Log("으아아앙 " + $"Character/Bus/{userPlayInfo.selectedCharacterName}");
            Managers.Resource.Instantiate($"Character/Bus/{userPlayInfo.selectedCharacterName}", null);
        }
        else
        {
            Managers.Resource.Instantiate($"Character/Bus/{"michelle"}", null);
        }
        GameObject.FindWithTag("MainCamera").GetComponent<BusPlayerCameraController>().enabled = true;
        if(userPlayInfo.busNum == "Bus101")
        {
            GameObject.Find("BusNumSprite").GetComponent<SpriteRenderer>().sprite = Resources.Load<Sprite>("Image/Number_101");
        }
        else
        {
            GameObject.Find("BusNumSprite").GetComponent<SpriteRenderer>().sprite = Resources.Load<Sprite>("Image/Number_102");
        }
        // Debug.Log("플레이어" + userPlayInfo.playerName);
        // Debug.Log("버스넘버" + userPlayInfo.busNum);
        // Debug.Log("버스스탑" + userPlayInfo.busStopName);


    }

    public override void Clear()
    {
        // Debug.Log("clear?");
    }

   
}
