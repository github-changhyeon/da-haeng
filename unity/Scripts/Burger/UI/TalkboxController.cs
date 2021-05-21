using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class TalkboxController : MonoBehaviour
{
    Canvas challenge;
    public Text hamzzisay;
    public Text mission;


    public void Awake()
    {
        if(Managers.IsPractice)
            Managers.Sound.Play("BurgerPractice/"+Managers.StageNo);
    }
    void Start()
    {
        // IsPractice가 도전하!
        if (!Managers.IsPractice)
        {
            GameObject Challenge_Obj = GameObject.Find("IsPractice");
            Challenge_Obj.SetActive(false);
            return;
        }

        switch (Managers.StageNo)
            {
                case 1:
                {
                    hamzzisay.text = "              싸이버거 1개 구매하기!";
                    mission.text = "싸이버거 1개";
                }
                    break;
                case 2:
                {
                    hamzzisay.text = " 화이트갈릭버거 1개, 간장마늘치킨 1마리 구매하기!";
                    mission.text = "화이트갈릭버거 1개\n간장마늘치킨 1마리";
                }
                break;
                case 3:
                {
                    hamzzisay.text = "        양념치킨싸이버거 3개 구매하기!";
                    mission.text = "양념치킨싸이버거 3개";
                }
                break;
                case 4:
                {
                    hamzzisay.text = "         딥치즈버거세트 1개 구매하기!"
                                       + "\n         단, 피클 토핑 빼고 사이다로 변경!";
                    mission.text = "딥치즈버거세트 1개\n(토핑빼기: 피클, 음료: 사이다)";
                }
                    break;
                case 5:
                {
                    hamzzisay.text = "싸이버거 1개, 인크레더블버거세트 2개 구매하기!"
                                        + "\n단, 싸이버거는 양파와 토마토 토핑 빼기"
                                        + "\n인크레더블버거세트는 콜라 사이즈업, 사이드는 치즈스틱으로 변경!";
                    mission.text = "싸이버거 1개\n(토핑빼기: 양파, 토마토)\n인크레더블버거세트 2개\n(음료: 콜라사이즈업,사이드: 치즈스틱)";
                }
                    
                    break;
            }
    }

}