using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using System;
using UnityEngine.EventSystems;

public class Side_Option : UI_Popup
{
    private void Start()
    {
        Init();
    }

    public override void Init()
{
    base.Init();
}
    
public void OnCloseSide()
{
    Managers.UI.ClosePopupUI();
    // Debug.Log("닫아줄래...?");
}

public void OnSubmitSide()
{

    GameObject Menu_Obj = GameObject.Find("ChooseMenu");
    string currentOption = Util.FindChild(Menu_Obj, "Choose_Text", true).GetComponent<Text>().text;
    string strPrice = Util.FindChild(Menu_Obj, "Choose_Price", true).GetComponent<Text>().text;
    strPrice = strPrice.Replace(",", "");
    int currentPlusPrice = 1 * Convert.ToInt32(strPrice);
    Detail Detail_Obj = GameObject.Find("Detail").GetComponent<Detail>();

    Detail_Obj.item.AddOptions("사이드", currentOption, currentPlusPrice);


    GameObject Option_Obj = GameObject.Find("Option");
    // 사이드 옵션
    Util.FindChild(Option_Obj, "Side_Option_Text", true).GetComponent<Text>().text = currentOption;


    string Drink = Util.FindChild(Option_Obj, "Drink_Option_Text", true).GetComponent<Text>().text;
    string Topping = Util.FindChild(Option_Obj, "Topping_Option_Text", true).GetComponent<Text>().text;

    string totalOption = currentOption + " " + Drink + " " + Topping;

    // 전체 옵션
    Util.FindChild(Option_Obj, "Option_Text", true).GetComponent<Text>().text = totalOption;

    Managers.UI.ClosePopupUI();
}

public void OnClickMenu()
{
    GameObject TargetSide = EventSystem.current.currentSelectedGameObject;
    string sideName = TargetSide.GetComponentInChildren<Text>().text;
    string sidePrice = Util.FindChild(TargetSide, "Price", true).GetComponent<Text>().text;

    // 이건 부모 찾을때
    GameObject Menu_Obj = GameObject.Find("ChooseMenu");
    // Detail의 Item_Name에 아이템 이름 넣어주기
    Util.FindChild(Menu_Obj, "Choose_Text", true).GetComponent<Text>().text = sideName;
    Util.FindChild(Menu_Obj, "Choose_Price", true).GetComponent<Text>().text = sidePrice;


}
}
