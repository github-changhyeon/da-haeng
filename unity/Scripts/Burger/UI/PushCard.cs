using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
using System.Runtime.InteropServices;

public class PushCard : UI_Popup
{
    [DllImport("__Internal")]
    private static extern void SendResult(string resultInfo);

    string resultInfo;
    public GameObject pointCard;


    float waitTimeT = 0f;
    bool isShow = false;
    float resultTimeT = 0f;
    bool isResult = false;

    List<SelectedItem> result;

    public void WaitPayment()
    {
        isShow = true;
        if (SceneManager.GetActiveScene().name == "Burger_Tutorial")
        {
            pointCard.SetActive(false);
            Managers.tutorialNo++;
            Managers.boxFlag = true;

        }
        if (SceneManager.GetActiveScene().name == "Burger" && Managers.IsPractice)
        {
            GameObject missionInfo = GameObject.Find("SummaryInfo");
            missionInfo.SetActive(false);
        }

    }

    private void FixedUpdate()
    {


        if (isShow)
        {
            waitTimeT += Time.fixedDeltaTime;
            if (waitTimeT >= 1.0f)
            {
                isShow = false;
                waitTimeT = 0f;

                if (Managers.IsPractice)
                {
                    //Debug.Log("도전하기니..?");
                    if (checkPass())
                    {
                        //Debug.Log("성공햇뉭?");
                        Managers.Sound.Play("Effect/fanfare");
                        Managers.UI.CloseAllPopupUI();

                        Managers.UI.ShowPopupUI<Success>();
                        resultInfo = "success";
                        isResult = true;
                        // Debug.Log("성공");
                    }
                    else
                    {
                        //Debug.Log("다시할래??");
                        Managers.UI.CloseAllPopupUI();

                        Managers.UI.ShowPopupUI<TryAgain>();
                        // 다시 한번 도전하세요 표시
                        resultInfo = "fail";
                        isResult = true;

                    }
#if (UNITY_WEBGL == true && UNITY_EDITOR == false)
                            SendResult (resultInfo);
#endif



                    Managers.UI.Orders.CancelPayment();
                    // Managers.UI.CloseAllPopupUI();

                }
                else
                {
                    Managers.UI.Orders.CancelPayment();
                    Managers.UI.CloseAllPopupUI();
                    Managers.UI.ShowPopupUI<Complete>();
                }

//                if (isResult)
//                {
//                    Debug.Log("제발 와줘");
//                    resultTimeT += Time.fixedDeltaTime;
//                    Debug.Log($"시간:  {resultTimeT}");
//                    if (resultTimeT >= 3.0f)
//                    {
//                        resultTimeT = 0;
//                        isResult = false;
//                        Debug.Log("됫니?");
//#if (UNITY_WEBGL == true && UNITY_EDITOR == false)
//                            SendResult ("close");
//#endif
//                    }
//                }
            }
        }
    }

    private bool checkPass()
    {
        result = Managers.UI.Orders.GetSelectedItems();
        switch (Managers.StageNo)
        {
            case 1:
                if (!stageOne())
                    return false;
                break;
            case 2:
                if (!stageTwo())
                    return false;
                break;
            case 3:
                if (!stageThree())
                    return false;
                break;
            case 4:
                if (!stageFour())
                    return false;
                break;
            case 5:
                if (!stageFive())
                    return false;
                break;
        }
        return true;
    }


    private bool stageOne()
    {
        if (result.Count != 1)
            return false;
        if (!result[0].GetName().Equals("싸이버거"))
            return false;
        return true;
    }

    private bool stageTwo()
    {
        List<string> names = new List<string>();
        names.Add("화이트갈릭버거");
        names.Add("간장마늘치킨");

        if (result.Count != 2)
            return false;
        foreach (SelectedItem item in result)
        {
            if (!names.Contains(item.GetName()))
                return false;
        }
        return true;
    }

    private bool stageThree()
    {
        if (result.Count != 1)
            return false;
        if (!result[0].GetName().Equals("양념치킨싸이버거"))
            return false;
        if (result[0].GetCount() != 3)
            return false;
        return true;
    }

    private bool stageFour()
    {
        List<string> options = new List<string>();
        options.Add("사이다");
        options.Add("피클빼기");

        if (result.Count != 1)
            return false;
        if (!result[0].GetName().Equals("딥치즈버거세트"))
            return false;
        foreach (string opt in result[0].GetOptions())
        {
            if (!options.Contains(opt))
                return false;
        }

        return true;
    }

    private bool stageFive()
    {
        if (result.Count != 2)
            return false;
        for (int i = 0; i < result.Count; i++)
        {
            // Debug.Log("dkdkkdkdkd");

            List<string> options = new List<string>();
            if (result[i].GetName().Equals("인크레더블버거세트"))
            {
                // Debug.Log("세트문제");
                options.Add("콜라사이즈업");
                options.Add("치즈스틱");
                if (result[i].GetCount() != 2)
                    return false;

            }
            else if (result[i].GetName().Equals("싸이버거"))
            {
                // Debug.Log("버거문제");
                options.Add("양파빼기");
                options.Add("토마토빼기");
            }
            else
            {
                return false;
            }
            foreach (string opt in result[i].GetOptions())
            {
                if (!options.Contains(opt))
                    return false;
            }
        }

        return true;
    }
}