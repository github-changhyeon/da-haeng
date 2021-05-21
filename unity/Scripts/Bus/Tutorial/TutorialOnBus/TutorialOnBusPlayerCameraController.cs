using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.EventSystems;

public class TutorialOnBusPlayerCameraController : MonoBehaviour
{

    Transform cameraPos;
    Camera characterCamera;
    // private OnBusController onBusController;
    // private string[] busStopNames = {"SouthBusStop", "WestBusStop", "NorthBusStop", "EastBusStop"};
    // private string[] busStopKoreanNames = {"광장 남문", "광장 서문", "광장 북문", "광장 동문"};


    public enum TutorialStep
    {
        Start,
        ClickCardReader,
        Announce,
        ClickStopBell,
        Stop,
        ClickGetOffReader,


    }

    private float smooth = 4.0f;
    public bool isClickCardReader = false;
    public TutorialStep _step;
    public string descriptionText;
    GameObject tutorialNext, tutorialClose;
    private TutorialOnBusController tutorialOnBusController;

    // private int layerMask;


    private void Start()
    {
        GameObject characterCameraObj = GameObject.Find ("CameraPos");
        cameraPos = characterCameraObj.transform;
        transform.position = cameraPos.position;
        transform.forward = cameraPos.forward;	
        characterCamera = GetComponent<Camera>();
        tutorialOnBusController = GameObject.Find("BusForScene").GetComponent<TutorialOnBusController>();
        _step = TutorialStep.Start;
        descriptionText = "a";
        // layerMask = 1<<(LayerMask.NameToLayer("BusFrontDoor"));
        // Debug.Log(layerMask);
        // layerMask |= 1<<(LayerMask.NameToLayer("ClickVisibleLayer"));
        // Debug.Log(1<<(LayerMask.NameToLayer("ClickVisibleLayer")));
        // Debug.Log(layerMask);

        tutorialNext = GameObject.Find("TutorialNext");
        tutorialClose = GameObject.Find("TutorialClose");
        tutorialNext.GetComponent<Canvas>().enabled = false;
        tutorialClose.GetComponent<Canvas>().enabled = false;

        descriptionText = "버스에 타면 가장 먼저 버스 요금 결제부터 해야해!\n카드 리더기를 클릭해서 요금을 결제하자!";
        Managers.Sound.StopEffect();
        Managers.Sound.Play("Sound/bgm/bus", Define.Sound.Bgm);
        Managers.Sound.Play("BusTutorial/6");
        EnableCloseCanvas();
        

    }

    private void Update()
    {
        SetCameraPositionNormalView ();
        NotificationFunc();
        TutorialFunc();

    }

    public void EnableCloseCanvas()
    {
        if(tutorialNext.GetComponent<Canvas>().enabled)
        {
            tutorialNext.GetComponent<Canvas>().enabled = false;
        }
        Util.FindChild(tutorialClose, "Description", true).GetComponent<Text>().text = descriptionText;
        tutorialClose.GetComponent<Canvas>().enabled = true;
    }
    private void EnableNextCanvas()
    {
        if(tutorialClose.GetComponent<Canvas>().enabled)
        {
            tutorialClose.GetComponent<Canvas>().enabled = false;
        }
        Util.FindChild(tutorialNext, "Description", true).GetComponent<Text>().text = descriptionText;
        tutorialNext.GetComponent<Canvas>().enabled = true;
    }
    private void SetCameraPositionNormalView ()
    {

        transform.position = Vector3.Lerp (transform.position, cameraPos.position, Time.deltaTime * smooth);	
        transform.forward = Vector3.Lerp (transform.forward, cameraPos.forward, Time.deltaTime * smooth);

    }

    // public void ClickNextFunc()
    // {

    //     if(_step == TutorialStep.Start && !tutorialClose.GetComponent<Canvas>().enabled)
    //     {
    //         _step = TutorialStep.FindBusRoute;
    //         descriptionText = "우선 버스 노선표를 확인해야해!\n남문 정류장의 버스 노선표를 찾아서 클릭해보자!";
    //         EnableCloseCanvas();
    //     }
    //     if(_step == TutorialStep.FindBusRoute && !tutorialClose.GetComponent<Canvas>().enabled)
    //     {
    //         _step = TutorialStep.FindBusNum;
    //         descriptionText = "우선 버스 번호를 확인해야해!\n버스 몸통에 있는 버스 번호를 찾아서 클릭해보자!";
    //         EnableCloseCanvas();
    //     }
    // }

    public void ClickCloseFunc()
    {
        if(tutorialClose.GetComponent<Canvas>().enabled)
        {
            tutorialClose.GetComponent<Canvas>().enabled = false;
        }
        // if(_step == TutorialStep.Start)
        // {
        //     _step = TutorialStep.FindBusRoute;
        //     GameObject tutorialClose = Managers.Resource.Instantiate("UI/TutorialClose");
        //     descriptionText = "우선 버스 노선표를 확인해야해!\n남문 정류장의 버스 노선표를 찾아서 클릭해보자!";
        //     Util.FindChild(tutorialClose, "Description", true).GetComponent<Text>().text = descriptionText;
        // }
    }

    private void TutorialFunc()
    {
        if (Input.GetMouseButtonDown(0) && characterCamera)
        {

            Ray ray = characterCamera.ScreenPointToRay(Input.mousePosition);
            RaycastHit hit;
            //_step == TutorialStep.Start && 
            if (_step == TutorialStep.Start && Physics.Raycast(ray, out hit, Mathf.Infinity) && hit.transform.gameObject.name == "ClickCardReaderFront" )
            {
                isClickCardReader = true;
                _step = TutorialStep.ClickCardReader;
                descriptionText = "좋았어!\n이제 버스 도착정보 안내방송을 기다리자!";
                Managers.Sound.StopEffect();
                Managers.Sound.Play("Bus/buscardtag");
                Managers.Sound.Play("BusTutorial/7");
                EnableCloseCanvas();
            }
            else if (_step == TutorialStep.Announce && Physics.Raycast(ray, out hit, Mathf.Infinity) && hit.transform.gameObject.tag == "StopBell")
            {
                _step = TutorialStep.ClickStopBell;
                isClickCardReader = true;
                descriptionText = "좋았어!\n이제 버스가 멈출때까지 기다리자!";
                Managers.Sound.StopEffect();
                Managers.Sound.Play("BusTutorial/9");
                EnableCloseCanvas();
            }
            else if (_step == TutorialStep.Stop && Physics.Raycast(ray, out hit, Mathf.Infinity) && hit.transform.gameObject.tag == "CardReaderBack")
            {
                _step = TutorialStep.ClickGetOffReader;
                Managers.Sound.StopEffect();
                Managers.Sound.Play("Bus/buscardtag2");
                descriptionText = "좋았어! 하차 태그되었으니 이제 하차하자!\n뒷문이 열렸을때 클릭하면 하차할 수 있어";
                
                Managers.Sound.Play("BusTutorial/11");
                EnableCloseCanvas();
            }
            else if (_step == TutorialStep.ClickGetOffReader && Physics.Raycast(ray, out hit, Mathf.Infinity) && hit.transform.gameObject.name == "ClickBackDoor")
            {
                // Debug.Log("여ㅕㅕㅕㅕㅕㅕㅕㅕㅕㅕㅕㅕㅕㅕㅕㅕ기ㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣ");
                Managers.Scene.LoadScene(Define.Scene.BusTutorialPlaza);
                Managers.Sound.StopEffect();
                Managers.Sound.Play("Effect/fanfare");
            }
            // else if (_step == TutorialStep.FindBusNum && Physics.Raycast(ray, out hit, Mathf.Infinity) && hit.transform.gameObject.name == "ClickNumber101" )
            // {
            //     _step = TutorialStep.GetOnBus;
            //     descriptionText = "좋았어! 이제 버스를 타보자\n버스 앞문이 열렸을때 가까이 가서 클릭하면 버스에 탑승할 수 있어!";
            //     EnableCloseCanvas();
            // }
            // else if (_step == TutorialStep.GetOnBus && Physics.Raycast(ray, out hit, Mathf.Infinity) && hit.transform.gameObject.name == "ClickFrontCube" )
            // {
            //     Managers.Scene.LoadScene(Define.Scene.TutorialBusScene);
            // }
 

        }
    }

    private void NotificationFunc()
    {
        if (Input.GetMouseButtonDown(0) && characterCamera)
        {

            Ray ray = characterCamera.ScreenPointToRay(Input.mousePosition);
            RaycastHit hit;
            if (Physics.Raycast(ray, out hit, Mathf.Infinity) && hit.transform.gameObject.name == "ClickCardReaderFront")
            {
                if(GameObject.Find("BlockCube").GetComponent<Collider>().enabled)
                {
                    GameObject noti = Managers.Resource.Instantiate("UI/Notification");
                    Util.FindChild(noti, "Text", true).GetComponent<Text>().text = "버스 요금이 결제되었습니다";
                    Managers.Resource.DestroyAfterDelay(noti, 2.5f);
                    GameObject.Find("BlockCube").GetComponent<Collider>().enabled = false;
                }
            }
            else if (Physics.Raycast(ray, out hit, Mathf.Infinity) && hit.transform.gameObject.tag == "CardReaderBack")
            {
                GameObject noti = Managers.Resource.Instantiate("UI/Notification");
                Util.FindChild(noti, "Text", true).GetComponent<Text>().text = "하차 태그 되었습니다";
                Managers.Resource.DestroyAfterDelay(noti, 2.5f);
            }
            // else if (Physics.Raycast(ray, out hit, Mathf.Infinity) && hit.transform.gameObject.name == "ClickBackDoor" && tutorialOnBusController._state == TutorialOnBusController.BusState.WaitOpenDoor && tutorialOnBusController.isNowOpen)
            // {
            //     Debug.Log("클릭 백도어");
            //     // GameObject.Find("PlayInfoObj").GetComponent<PlayInfoObj>().playInfo.busStopName = busStopNames[onBusController.busStopIdx];
            //     Managers.Scene.LoadScene(Define.Scene.PlazaScene);
            // }
            else if (Physics.Raycast(ray, out hit, Mathf.Infinity) && hit.transform.gameObject.tag == "StopBell")
            {
                GameObject noti = Managers.Resource.Instantiate("UI/Notification");
                Util.FindChild(noti, "Text", true).GetComponent<Text>().text = "하차벨이 눌렸습니다";
                Managers.Resource.DestroyAfterDelay(noti, 2.5f);
                ///////////////////////////////////////////////////////////////////
                tutorialOnBusController.isClickStop = true;
            }
            else if (Physics.Raycast(ray, out hit, Mathf.Infinity) && hit.transform.gameObject.name == "DestinationInfoBlue")
            {
                GameObject noti = Managers.Resource.Instantiate("UI/Destination");
                Util.FindChild(noti, "Text", true).GetComponent<Text>().text = $"이번 정류장은 광장 서문 입니다";
            }

        }
    }

}
