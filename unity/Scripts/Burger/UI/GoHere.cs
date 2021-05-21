using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using System;
using UnityEngine.EventSystems;
using UnityEngine.SceneManagement;


public class GoHere : UI_Popup
{
    public void OnSubmit()
    {
        if (SceneManager.GetActiveScene().name == "Burger_Tutorial" && Managers.tutorialNo == 15)
        {
            GameObject target = GameObject.Find("point_here");
            target.SetActive(false);
            Managers.tutorialNo++;
            Managers.boxFlag = true;
            Managers.Sound.Play("BurgerTutorial/" + Managers.tutorialNo);
        }

        Managers.UI.ShowPopupUI<PushCard>();
        GameObject PushCard_Obj = GameObject.Find("PushCard");
        Util.FindChild(PushCard_Obj, "CreditPrice", true).GetComponent<Text>().text = Managers.UI.Orders.GetTotalPrice();
    }

    public void GoBack()
    {
        Managers.UI.ClosePopupUI();
    }
}
