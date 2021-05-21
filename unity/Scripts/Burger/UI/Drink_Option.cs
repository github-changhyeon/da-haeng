using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using System;
using UnityEngine.EventSystems;
using UnityEngine.SceneManagement;


public class Drink_Option : UI_Popup
{
    public GameObject drinkComplete;

    private void Start()
    {
        Init();
    }

    public override void Init()
    {
        base.Init();
    }

    public void OnCloseDrink()
    {
        Managers.UI.ClosePopupUI();
        // Debug.Log("닫아줄래...?");
    }

    public void OnSubmitDrink()
    {
        if (SceneManager.GetActiveScene().name == "Burger_Tutorial" && Managers.tutorialNo == 12)
        {
            drinkComplete.SetActive(false);
            Managers.tutorialNo++;
            Managers.boxFlag = true;
            Managers.Sound.Play("BurgerTutorial/" + Managers.tutorialNo);
        }

        GameObject Menu_Obj = GameObject.Find("ChooseMenu");
        string currentOption = Util.FindChild(Menu_Obj, "Choose_Text", true).GetComponent<Text>().text;
        string strPrice = Util.FindChild(Menu_Obj, "Choose_Price", true).GetComponent<Text>().text;
        int currentPlusPrice = 1 * Convert.ToInt32(strPrice);
        Detail Detail_Obj = GameObject.Find("Detail").GetComponent<Detail>();

        Detail_Obj.item.AddOptions("음료", currentOption, currentPlusPrice);


        GameObject Option_Obj = GameObject.Find("Option");
        // 음료 옵션
        Util.FindChild(Option_Obj, "Drink_Option_Text", true).GetComponent<Text>().text = currentOption;


        string Side = Util.FindChild(Option_Obj, "Side_Option_Text", true).GetComponent<Text>().text;
        string Topping = Util.FindChild(Option_Obj, "Topping_Option_Text", true).GetComponent<Text>().text;

        string totalOption = Side + " " + currentOption + " " + Topping;

        // 전체 옵션
        Util.FindChild(Option_Obj, "Option_Text", true).GetComponent<Text>().text = totalOption;

        Managers.UI.ClosePopupUI();
    }

    public void OnClickMenu()
    {
        if (SceneManager.GetActiveScene().name == "Burger_Tutorial" && Managers.tutorialNo == 11)
        {
            GameObject target = GameObject.Find("point_cola");
            target.SetActive(false);

            drinkComplete.SetActive(true);
            Managers.tutorialNo++;
            Managers.boxFlag = true;
            Managers.Sound.Play("BurgerTutorial/" + Managers.tutorialNo);
        }
        GameObject TargetDrink = EventSystem.current.currentSelectedGameObject;
        string drinkName = TargetDrink.GetComponentInChildren<Text>().text;
        string drinkPrice = Util.FindChild(TargetDrink, "Price", true).GetComponent<Text>().text;

        // 이건 부모 찾을때
        GameObject Menu_Obj = GameObject.Find("ChooseMenu");
        // Detail의 Item_Name에 아이템 이름 넣어주기
        Util.FindChild(Menu_Obj, "Choose_Text", true).GetComponent<Text>().text = drinkName;
        Util.FindChild(Menu_Obj, "Choose_Price", true).GetComponent<Text>().text = drinkPrice;
        Util.FindChild(Menu_Obj, "Choose_Image", true).GetComponent<Image>().sprite = TargetDrink.GetComponentInChildren<Image>().sprite;



    }
}

