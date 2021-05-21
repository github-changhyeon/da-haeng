using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using System;
using UnityEngine.EventSystems;
using UnityEngine.SceneManagement;


public class Topping_Option : UI_Popup
{
    public GameObject point;

    private void Start()
    {
        Init();
    }

    public override void Init()
    {
        base.Init();
    }

        public void OnCloseTopping()
    {
        Managers.UI.ClosePopupUI();
        // Debug.Log("닫아줄래...?");
    }

    public void OnSubmitTopping()
    {
        if (SceneManager.GetActiveScene().name == "Burger_Tutorial" && Managers.tutorialNo == 9)
        {
            point.SetActive(false);
            Managers.tutorialNo++;
            Managers.boxFlag = true;
            Managers.Sound.Play("BurgerTutorial/" + Managers.tutorialNo);
        }

        GameObject Menu_Obj = GameObject.Find("ChooseMenu");
        string currentOption = Util.FindChild(Menu_Obj, "Choose_Text", true).GetComponent<Text>().text;

        string[] optionArray =  currentOption.Split(new string[] { " " }, System.StringSplitOptions.RemoveEmptyEntries);

        // Debug.Log($"currentOption : {currentOption}");

        Detail Detail_Obj = GameObject.Find("Detail").GetComponent<Detail>();

        for (int i=0; i < optionArray.Length; i++)
        {
            // Debug.Log($"DetailObj:  {Detail_Obj.name}");

            Detail_Obj.item.AddOptions("빼기", optionArray[i],0);

        }

        // 토핑
        GameObject Option_Obj = GameObject.Find("Option");
        Util.FindChild(Option_Obj, "Topping_Option_Text", true).GetComponent<Text>().text = currentOption;

        string Side = Util.FindChild(Option_Obj, "Side_Option_Text", true).GetComponent<Text>().text;
        string Drink = Util.FindChild(Option_Obj, "Drink_Option_Text", true).GetComponent<Text>().text;

        string totalOption = Side + " " + Drink + " " + currentOption;

        // 전체 옵션
        Util.FindChild(Option_Obj, "Option_Text", true).GetComponent<Text>().text = totalOption;


        Managers.UI.ClosePopupUI();




    }

    public void OnClickMenu()
    {
        if (SceneManager.GetActiveScene().name == "Burger_Tutorial" && Managers.tutorialNo == 8)
        {
            GameObject target = GameObject.Find("point_pickle");
            target.SetActive(false);
            point.SetActive(true);
            Managers.tutorialNo++;
            Managers.boxFlag = true;
            Managers.Sound.Play("BurgerTutorial/" + Managers.tutorialNo);
        }
        GameObject TargetTopping = EventSystem.current.currentSelectedGameObject;
        string toppingName = TargetTopping.GetComponentInChildren<Text>().text;

        // 이건 부모 찾을때
        GameObject Menu_Obj = GameObject.Find("ChooseMenu");
        // Detail의 Item_Name에 아이템 이름 넣어주기
        string currentChoose = Util.FindChild(Menu_Obj, "Choose_Text", true).GetComponent<Text>().text;

        if (currentChoose.Contains(toppingName))
        {
            currentChoose = currentChoose.Replace(" " + toppingName,"");
            // Debug.Log($"교체: {currentChoose}");
        }
        else
        {
            currentChoose += " "+toppingName;
            // Debug.Log($"추가: {currentChoose}");

        }

        Util.FindChild(Menu_Obj, "Choose_Text", true).GetComponent<Text>().text = currentChoose;
    }
}
