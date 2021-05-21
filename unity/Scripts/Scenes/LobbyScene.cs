// using System.Collections;
// using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class LobbyScene : BaseScene
{

    private PlayInfo playInfo;
    private GameObject canvasObj;

    void Start()
    {
        Init();
    }

    protected override void Init()
    {
        base.Init();
        SceneType = Define.Scene.LobbyScene;
        playInfo = GameObject.Find("PlayInfoObj").GetComponent<PlayInfoObj>().playInfo;
        canvasObj = GameObject.Find("UI_Lobby");
        // Debug.Log(playInfo.playType);
        if(playInfo.category.Equals("bus"))
        {
            // Debug.Log("jjjjjjjjjjjjjjjjjjjjjjjj");
            Util.FindChild(canvasObj, "BackgroundImage", true).GetComponent<Image>().sprite = Resources.Load<Sprite>("BackgroundImages/busSceneImage");
        }
        else if(playInfo.category.Equals("burger"))
        {
            Util.FindChild(canvasObj, "BackgroundImage", true).GetComponent<Image>().sprite = Resources.Load<Sprite>("BackgroundImages/burgerSceneImage");
        }

    }

    public override void Clear()
    {
        // Debug.Log("clear?");
    }

    public void loadNextScene()
    {
        playInfo.selectedCharacterName = Util.FindChild(canvasObj, "CharacterName", true).GetComponent<Text>().text;

        if(playInfo.category.Equals("burger"))
        {
            if(playInfo.playType.Equals("tutorial"))
            {
                Managers.Scene.LoadScene(Define.Scene.Burger_Tutorial);
            }
            else
            {
                Managers.Scene.LoadScene(Define.Scene.Burger);

            }
        }
        else if(playInfo.category.Equals("bus"))
        {
            if(playInfo.playType.Equals("tutorial"))
            {
                Managers.Scene.LoadScene(Define.Scene.BusTutorialPlaza);
            }
            else
            {
                Managers.Scene.LoadScene(Define.Scene.PlazaScene);
            }
        }
        else if(playInfo.category.Equals("plaza"))
        {
            Managers.Scene.LoadScene(Define.Scene.PlazaScene);
        }

    }
   
}
