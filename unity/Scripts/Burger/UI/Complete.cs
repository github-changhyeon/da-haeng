using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;


public class Complete : UI_Popup
{
    float completeTimeT = 0f;
    bool isComplete = true;

    private void FixedUpdate()
    {
        if (isComplete)
        {
            completeTimeT += Time.fixedDeltaTime;
            if (completeTimeT >= 4.0f)
            {
                if (SceneManager.GetActiveScene().name == "Burger_Tutorial")
                {
                    isComplete = false;
                    Managers.UI.ShowPopupUI<TheEnd_Burger>();

                    GameObject tuto = GameObject.Find("Tutorial");
                    tuto.SetActive(false);

                    completeTimeT = 0f;
                    GameObject.Find("CameraPos").transform.parent.GetComponent<BurgerPlayerController>().enabled = true;

                }
                else
                {
                    isComplete = false;
                    Managers.UI.CloseAllPopupUI();
                    completeTimeT = 0f;
                    GameObject.Find("CameraPos").transform.parent.GetComponent<BurgerPlayerController>().enabled = true;
                }



            }
        }
    }
}
