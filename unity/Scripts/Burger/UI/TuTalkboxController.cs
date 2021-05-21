using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;


public class TuTalkboxController : MonoBehaviour
{
    Canvas Tutorial;
    public Text hamzzisay;
    public GameObject textBox;


    public void Awake()
    {
        Managers.Sound.Play("BurgerTutorial/1");
    }


    private void Update()
    {
        textBox.SetActive(Managers.boxFlag);
        //Debug.Log($"상태: {Managers.boxFlag}");

        switch (Managers.TutorialNo)
        {
            case 1:
                {
                    hamzzisay.text = "반가워~ 나는 다햄찌야!! \n오늘은 햄버거 사는 방법에 대해서 공부해보자!\n오른쪽 아래 다음 버튼을 눌러줘~!";
                }
                break;

            case 2:
                {
                    hamzzisay.text = "햄버거 가게에 들어가면 \n가장 먼저 키오스크 앞에 줄을 서면 돼!\n키오스크는 바로 이런 모양의 모니터야!!";
                }
                break;
            case 3:
                {
                    hamzzisay.text = "첫 번째로,\n방향키를 이용해서 키오스크에 가볼까?\n그리고 키오스크를 클릭 후, 주문하기 버튼을 눌러줘!";
                }
                break;
            case 4:
                {
                    hamzzisay.text = "우와 종류가 엄청 많지~?\n오늘은 치즈홀릭버거세트를 시켜보자!!";
                }
                break;
            case 5:
                {
                    hamzzisay.text = "여기에 있는 버거세트 메뉴 버튼을클릭해 줘";
                }
                break;
            case 6:
                {
                    hamzzisay.text = "엇 찾았다!\n여기 치즈홀릭버거 세트가 있어!";
                }
                break;
            case 7:
                {
                    hamzzisay.text = "어어~? 나는 피클을 싫어해 ㅠㅠ \n피클 토핑을 빼줘!\n토핑 옵션 버튼을 눌러줘";
                }
                break;
            case 8:
                {
                    hamzzisay.text = "피클빼기 선택해줘";
                }
                break;
            case 9:
                {
                    hamzzisay.text = "완료 버튼 꾸욱~~";
                }
                break;
            case 10:
                {
                    hamzzisay.text = "음 햄버거를 먹다보면 목이 많이 마르지 않을까?? \n 음료 옵션 버튼을 눌러줘";
                }
                break;
            case 11:
                {
                    hamzzisay.text = "콜라 사이즈업!! \n아 목마르다~";
                }
                break;
            case 12:
                {
                    hamzzisay.text = "음...나는 이정도면 완벽한 것 같아!! \n완료!!!";
                }
                break;
            case 13:
                {
                    hamzzisay.text = "주문을 완전히 하기 위해서는 또 완료 버튼 누르자!!";
                }
                break;
            case 14:
                {
                    hamzzisay.text = "햄버거 선택이 끝났으니까 결제를 해볼까? \n결제 버튼 꾸욱~";
                }
                break;
            case 15:
                {
                    hamzzisay.text = "오늘은 여기서 먹고 가자!!! \n매장식사 버튼 꾸욱~";
                }
                break;
            case 16:
                {
                    hamzzisay.text = "자 이제 마지막 단계야!! \n결제를 위해 카드를 넣어줘야 하니까 \n카드넣기 버튼을 눌러줘!!";
                }
                break;
            case 17:
                {
                    hamzzisay.text = "짜잔 주문 완료! 여기 번호가 보이지? \n카운터에 이 번호가 띵동~ 하고 보이면 \n쟁반에 담긴 음식을 가져오면 돼! ";
                }
                break;
            case 18:
                {
                    hamzzisay.text = "자 이제 연습하러 떠나볼까?!\n왼쪽 위의 뒤로가기 버튼을 눌러줘!";
                }
                break;

        }
    }

    public void OnClickNext()
    {
        Managers.Sound.StopEffect();
        //Debug.Log($"현재: {Managers.tutorialNo}");
        //Managers.tutorialNo++;
        //Debug.Log($"더해졋: {Managers.tutorialNo}");

        //GameObject Tutorial = GameObject.Find("Tutorial");

        //TODO: tutorialNo==2일때 분류해줘야
        if (Managers.tutorialNo == 1 || Managers.tutorialNo == 2 || Managers.tutorialNo == 4 || Managers.tutorialNo == 17)
        {
            //Debug.Log($"현재: {Managers.tutorialNo}");
            Managers.tutorialNo++;
            Managers.Sound.Play("BurgerTutorial/" + Managers.tutorialNo);
        }
        else
        {
            //if (Managers.tutorialNo == 18)
            //{
            //    Managers.UI.ShowPopupUI<TheEnd_Burger>();
            //}
            //Debug.Log($"현재: {Managers.tutorialNo}");
            Managers.boxFlag = false;
        }
    }
}
