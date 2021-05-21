// using System.Collections;
// using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.EventSystems;


public class UI_Lobby : UI_Base
{

    string[] characterNames = {"leonard", "jackie", "megan", "michelle"};
    int characterIdx = 0;

    enum Buttons
    {
        LeftButton,
        RightButton,
        SelectButton,
    }

    enum GameObjects
    {
        Scrollbar,
        // leonard,
        // jackie,
        // megan,
        // michelle,
    }

    enum Images
    {
        BackgroundImage,
    }

    enum Texts
    {
        CharacterName,
    }

    void Start()
    {
        //GameObject.Find("UI_Lobby").transform
        Managers.Resource.Instantiate($"Character/Lobby/{characterNames[characterIdx]}", null);
        Bind<Button>(typeof(Buttons));
        Bind<Text>(typeof(Texts));
        Bind<Image>(typeof(Images));
        Bind<GameObject>(typeof(GameObjects));

        GameObject nameObj = GetText((int)Texts.CharacterName).gameObject;
        nameObj.GetComponent<Text>().text=characterNames[characterIdx];

        //right button
        GameObject rightButtonObj = GetButton((int)Buttons.RightButton).gameObject;
		AddUIEvent(rightButtonObj, ClickRightButton, Define.UIEvent.Click);

        //left button
        GameObject leftButtonObj = GetButton((int)Buttons.LeftButton).gameObject;
		AddUIEvent(leftButtonObj, ClickLeftButton, Define.UIEvent.Click);

        // //select button
        // GameObject selectButtonObj = GetButton((int)Buttons.SelectButton).gameObject;
		// AddUIEvent(selectButtonObj, ClickSelectButton, Define.UIEvent.Click);

        GameObject scrollbarObj = Get<GameObject>((int)GameObjects.Scrollbar).gameObject;
        // scrollbarObj.GetComponent<Scrollbar>().value = 0.5f;
		AddUIEvent(scrollbarObj, DragScrollBar, Define.UIEvent.Drag);
    }


    public void ClickLeftButton(PointerEventData data)
    {
        Managers.Resource.Destroy(GameObject.Find(characterNames[characterIdx]));
        characterIdx -= 1;
        characterIdx += characterNames.Length;
        characterIdx %= characterNames.Length;
        Managers.Resource.Instantiate($"Character/Lobby/{characterNames[characterIdx]}", null);
        GameObject nameObj = GetText((int)Texts.CharacterName).gameObject;
        nameObj.GetComponent<Text>().text=characterNames[characterIdx];
        GameObject scrollbarObj = Get<GameObject>((int)GameObjects.Scrollbar).gameObject;
        scrollbarObj.GetComponent<Scrollbar>().value = 0.5f;
    }
    public void ClickRightButton(PointerEventData data)
    {
        Managers.Resource.Destroy(GameObject.Find(characterNames[characterIdx]));
        characterIdx += 1;
        characterIdx %= characterNames.Length;
        Managers.Resource.Instantiate($"Character/Lobby/{characterNames[characterIdx]}", null);
        GameObject nameObj = GetText((int)Texts.CharacterName).gameObject;
        nameObj.GetComponent<Text>().text=characterNames[characterIdx];
        GameObject scrollbarObj = Get<GameObject>((int)GameObjects.Scrollbar).gameObject;
        scrollbarObj.GetComponent<Scrollbar>().value = 0.5f;
    }
    // public void ClickSelectButton(PointerEventData data)
    // {//characterNames[characterIdx]
    //     LobbyScene.Instance.loadPlazaScene(characterNames[characterIdx]);
    // }
    public void DragScrollBar(PointerEventData data)
    {
        GameObject characterObj = GameObject.Find(characterNames[characterIdx]);
        characterObj.transform.Rotate(0f, -Input.GetAxis("Mouse X") * 10.0f, 0f, Space.World);
        // transform.Rotate(-Input.GetAxis("Mouse Y") * speed, 0f, 0f);
    }
}
