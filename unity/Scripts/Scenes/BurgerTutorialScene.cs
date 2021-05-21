// using System.Collections;
// using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class BurgerTutorialScene : BaseScene
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
            Managers.Resource.Instantiate($"Character/Burger/{userPlayInfo.selectedCharacterName}", null);
        }
        else
        {
            Managers.Resource.Instantiate($"Character/Burger/{"michelle"}", null);
        }
        GameObject.FindWithTag("MainCamera").GetComponent<BurgerPlayerCameraController>().enabled = true;


    }

    public override void Clear()
    {
        // Debug.Log("clear?");
    }

   
}
