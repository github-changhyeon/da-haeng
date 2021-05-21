using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using System;
using UnityEngine.EventSystems;
using UnityEngine.SceneManagement;


public class KioskUI : UI_Popup
{
    public GameObject payment;

    enum Buttons
    {

        b1
    }

    enum Texts
    {

        Item_Name,
    }
    enum Images
    {
        Image,
    }


    private void Start()
    {
        Init();
    }

    public override void Init()
    {
        base.Init();

    }

    public void OnCloseKiosk()
    {
        // KioskUI ui = Managers.UI.ShowPopupUI<KioskUI>();
        Managers.UI.Orders.CancelPayment();
        Managers.UI.ClosePopupUI();
        GameObject.Find("CameraPos").transform.parent.GetComponent<BurgerPlayerController>().enabled = true;

        // Debug.Log("닫아줄래...?");
    }

    public void OnClickItem()
    {
        // Button 하위 이름 받아오는거
        //Debug.Log("item 눌렀다.");
        //Managers.UI.ShowPopupUI<Detail>();
        // 클릭한 오브젝트를 가져와서 저장
        GameObject TargetItem = EventSystem.current.currentSelectedGameObject;
        GameObject Tutorial = GameObject.Find("Tutorial");

        if (TargetItem.transform.parent.name == "Burger_Menu" || TargetItem.transform.parent.name == "BurgerSet_Menu")
        {
            if (SceneManager.GetActiveScene().name == "Burger_Tutorial" && Managers.tutorialNo == 6)
            {
                GameObject target = GameObject.Find("point_burger");
                target.SetActive(false);
                payment.SetActive(true);
                Managers.tutorialNo++;
                Managers.boxFlag = true;
                Managers.Sound.Play("BurgerTutorial/" + Managers.tutorialNo);
            }



            Managers.UI.ShowPopupUI<Detail>();

            GameObject Detail_Obj = GameObject.Find("Detail");

            GameObject Topping_Obj = Util.FindChild(Detail_Obj, "Topping_Option", true);
            GameObject Drink_Obj = Util.FindChild(Detail_Obj, "Drink_Option", true);
            GameObject Side_Obj = Util.FindChild(Detail_Obj, "Side_Option", true);


            string Name = TargetItem.GetComponentInChildren<Text>().text;

            // 이건 부모 찾을때
            // Detail의 Item_Name에 아이템 이름 넣어주기
            Util.FindChild(Detail_Obj, "Item_Name", true).GetComponent<Text>().text = Name;

            // 부모가 잇는 친구들 찾을때
            // 특정 이름의 아이템을 가져올때
            string Price = Util.FindChild(TargetItem, "Price", true).GetComponent<Text>().text;
            // Detail의 Item_Price에 아이템 가격 넣어주기
            Util.FindChild(Detail_Obj, "Item_Price", true).GetComponent<Text>().text = Price;

            // Detail의 Item_Image에 아이템 사진 넣어주기
            Util.FindChild(Detail_Obj, "Item_Image", true).GetComponent<Image>().sprite = TargetItem.GetComponentInChildren<Image>().sprite;


            if (TargetItem.transform.parent.name == "Burger_Menu")
            {
                Topping_Obj.SetActive(true);
                Drink_Obj.SetActive(false);
                Side_Obj.SetActive(false);
            }
            else if (TargetItem.transform.parent.name == "BurgerSet_Menu")
            {
                Topping_Obj.SetActive(true);
                Drink_Obj.SetActive(true);
                Side_Obj.SetActive(true);
            }


        }
        else
        {
            Managers.UI.ShowPopupUI<Detail_Nope>();

            GameObject Detail_Nope_Obj = GameObject.Find("Detail_Nope");

            string Name = TargetItem.GetComponentInChildren<Text>().text;

            // 이건 부모 찾을때
            // Detail의 Item_Name에 아이템 이름 넣어주기
            Util.FindChild(Detail_Nope_Obj, "Item_Name", true).GetComponent<Text>().text = Name;

            // 부모가 잇는 친구들 찾을때
            // 특정 이름의 아이템을 가져올때
            string Price = Util.FindChild(TargetItem, "Price", true).GetComponent<Text>().text;
            // Detail의 Item_Price에 아이템 가격 넣어주기
            Util.FindChild(Detail_Nope_Obj, "Item_Price", true).GetComponent<Text>().text = Price;

            // Detail의 Item_Image에 아이템 사진 넣어주기
            Util.FindChild(Detail_Nope_Obj, "Item_Image", true).GetComponent<Image>().sprite = TargetItem.GetComponentInChildren<Image>().sprite;

        }


    }

    public void OnClickStart()
    {

        if (SceneManager.GetActiveScene().name == "Burger_Tutorial" && Managers.tutorialNo == 3)
        {
            GameObject target = GameObject.Find("Start");
            GameObject targetPoint = Util.FindChild(target, "point_start", true);
            targetPoint.SetActive(false);
            target.SetActive(false);

            Managers.tutorialNo++;
            Managers.boxFlag = true;
            Managers.Sound.Play("BurgerTutorial/" + Managers.tutorialNo);
        }
    }
    public void ShowTutorial()
    {

        if (SceneManager.GetActiveScene().name == "Burger_Tutorial" && Managers.tutorialNo == 5)
        {
            Managers.tutorialNo++;
            Managers.boxFlag = true;
            Managers.Sound.Play("BurgerTutorial/" + Managers.tutorialNo);
        }
    }

    public void OnClickHomeBtn()
    {
        Managers.UI.Orders.CancelPayment();
        GameObject Kiosk_Obj = GameObject.Find("KioskUI");
        Util.FindChild(Kiosk_Obj, "Order", true).SetActive(false);
    }

    public void OnClickCloseBtn()
    {
        Managers.UI.Orders.CancelPayment();
        Managers.UI.CloseAllPopupUI();
    }

}
