using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.EventSystems;
using System.Runtime.InteropServices;


public class TutorialBusPlayerCameraController : MonoBehaviour
{

    Transform cameraPos;
    Camera characterCamera;
    // private OnBusController onBusController;
    // private string[] busStopNames = {"SouthBusStop", "WestBusStop", "NorthBusStop", "EastBusStop"};
    // private string[] busStopKoreanNames = {"광장 남문", "광장 서문", "광장 북문", "광장 동문"};


    public enum TutorialStep
    {
        Start,
        FindBusRoute,
        FindBusNum,
        GetOnBus,
        Success,

    }

    private float smooth = 4.0f;
    public TutorialStep _step;
    private string descriptionText;
    GameObject tutorialNext, tutorialClose;
    private int layerMask;
    private bool isStartCountTime;
    private float countTime;

    [DllImport("__Internal")]
    private static extern void SendResult (string resultInfo);

    private void Start()
    {
        GameObject characterCameraObj = GameObject.Find ("CameraPos");
        cameraPos = characterCameraObj.transform;
        transform.position = cameraPos.position;
        transform.forward = cameraPos.forward;	
        characterCamera = GetComponent<Camera>();
        // onBusController = GameObject.Find("BusForScene").GetComponent<OnBusController>();
        _step = TutorialStep.Start;
        descriptionText = "a";
        layerMask = 1<<(LayerMask.NameToLayer("BusFrontDoor"));
        // Debug.Log(layerMask);
        layerMask |= 1<<(LayerMask.NameToLayer("ClickVisibleLayer"));
        // Debug.Log(1<<(LayerMask.NameToLayer("ClickVisibleLayer")));
        // Debug.Log(layerMask);

        isStartCountTime = false;
        countTime = 0f;
        tutorialNext = GameObject.Find("TutorialNext");
        tutorialClose = GameObject.Find("TutorialClose");
        tutorialNext.GetComponent<Canvas>().enabled = false;
        tutorialClose.GetComponent<Canvas>().enabled = false;

        if(GameObject.Find("PlayInfoObj").GetComponent<PlayInfoObj>().playInfo.rideCnt > 0)
        {
            GameObject.Find("CameraPos").transform.parent.GetComponent<BusPlayerController>().enabled = false;
            GameObject.Find("CameraPos").transform.parent.position = new Vector3(-16.5f, 1f, 130f);
            Managers.Resource.Instantiate("UI/Complete");
            isStartCountTime = true;
        }
        else{
            descriptionText = "반가워! 나는 다햄찌야!!\n오늘은 버스 이용 방법에 대해서 공부하자!\n오른쪽 아래 다음 버튼을 눌러줘~!";
            Managers.Sound.StopEffect();
            Managers.Sound.Play("BusTutorial/1");
            EnableNextCanvas();
        }

    }

    private void FixedUpdate()
    {
        SetCameraPositionNormalView ();
        ClickFunc();

        if(isStartCountTime)
        {
            countTime += Time.fixedDeltaTime;
            if(countTime >= 4f)
            {
                isStartCountTime = false;
                countTime = 0f;
                #if (UNITY_WEBGL == true && UNITY_EDITOR == false)
                SendResult ("close");
                #endif
            }
        }

    }

    private void EnableCloseCanvas()
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

    public void ClickNextFunc()
    {

        if(_step == TutorialStep.Start && !tutorialClose.GetComponent<Canvas>().enabled)
        {
            _step = TutorialStep.FindBusRoute;
            descriptionText = "우선 버스 노선표를 확인해야해!\n남문 정류장의 버스 노선표를 찾아서 클릭해보자!";
            Managers.Sound.StopEffect();
            Managers.Sound.Play("BusTutorial/2");
            EnableCloseCanvas();
        }
        if(_step == TutorialStep.FindBusRoute && !tutorialClose.GetComponent<Canvas>().enabled)
        {
            _step = TutorialStep.FindBusNum;
            descriptionText = "그 다음엔 버스 번호를 확인해야해!\n버스 몸통에 있는 버스 번호를 찾아서 클릭해보자!";
            Managers.Sound.StopEffect();
            Managers.Sound.Play("BusTutorial/4");
            EnableCloseCanvas();
        }
    }

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
    private void ClickFunc()
    {
        if (Input.GetMouseButtonDown(0) && characterCamera)
        {

            Ray ray = characterCamera.ScreenPointToRay(Input.mousePosition);
            RaycastHit hit;
            if (_step == TutorialStep.FindBusRoute && Physics.Raycast(ray, out hit, 40f, layerMask) && hit.transform.gameObject.name == "ClickBusRoute" )
            {
                descriptionText = "좋았어! 현재 위치는 빨간색 점으로 표시되어있어\n여기서 101번 버스를 타고 서문으로 가보자!";
                Managers.Sound.StopEffect();
                Managers.Sound.Play("BusTutorial/3");
                EnableNextCanvas();
            }
            else if (_step == TutorialStep.FindBusNum && Physics.Raycast(ray, out hit, 40f, layerMask) && hit.transform.gameObject.name == "ClickNumber101" )
            {
                _step = TutorialStep.GetOnBus;
                descriptionText = "좋았어! 이 버스가 우리가 타야할 101번 버스야. \n버스 앞문이 열렸을때 가까이 가서 클릭하면 버스에 탑승할 수 있어!";
                Managers.Sound.StopEffect();
                Managers.Sound.Play("BusTutorial/5");
                EnableCloseCanvas();
            }
            else if (_step == TutorialStep.GetOnBus && Physics.Raycast(ray, out hit, 15f, layerMask) && hit.transform.gameObject.name == "ClickFrontCube" )
            {
                GameObject.Find("PlayInfoObj").GetComponent<PlayInfoObj>().playInfo.rideCnt += 1;
                Managers.Scene.LoadScene(Define.Scene.TutorialBusScene);
            }
 

        }
    }

}
