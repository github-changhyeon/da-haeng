using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BusTutorialPlazaScene : BaseScene
{
    private PlayInfo playInfo;
    void Start()
    {
        Init();
    }

    protected override void Init()
    {
        base.Init();
        playInfo = GameObject.Find("PlayInfoObj").GetComponent<PlayInfoObj>().playInfo;
        string characterName = playInfo.selectedCharacterName;
        GameObject characterObj = Managers.Resource.Instantiate($"Character/BusTutorial/{characterName}");

        GameObject mainCamera = GameObject.FindWithTag("MainCamera");
		mainCamera.GetComponent<TutorialBusPlayerCameraController>().enabled = true;
        GameObject playerDot = GameObject.Find("PlayerDot");
		playerDot.GetComponent<PlayerDotController>().enabled = true;
    }

    public override void Clear()
    {
        // Debug.Log("clear?");
    }

}
