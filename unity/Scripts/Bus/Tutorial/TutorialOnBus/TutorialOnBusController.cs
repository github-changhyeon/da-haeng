using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class TutorialOnBusController : MonoBehaviour
{

    public enum BusState
    {
        Stop,
        WaitOpenDoor,
        WaitCloseDoor,
        Drive,
    }

    private GameObject frontDoor, backDoor;
    private Animator frontAnimator, backAnimator;
    public BusState _state;
    private bool isWait, isAnnounced, isAnnounced2;
    public bool isClickStop, isNowOpen;
    private float doorTime, moveTime;
    private TutorialOnBusPlayerCameraController tutorialOnBusPlayerCameraController;
    // private int stage;
    // public int busStopIdx;



    // private Dictionary<string,int> getBusStopNum = new Dictionary<string, int>()
    // {
    //     {"SouthBusStop", 0},
    //     {"WestBusStop", 1},
    //     {"NorthBusStop", 2},
    //     {"EastBusStop", 3},
    // };

    // private string[] busStopNames = {"SouthBusStop", "WestBusStop", "NorthBusStop", "EastBusStop"};

    // private string[] busStopKoreanNames = {"광장 남문", "광장 서문", "광장 북문", "광장 동문"};

    
    private void StopFunc()
    {
        frontAnimator.SetBool("Idle", false);
        frontAnimator.SetBool("Open", true);
        if(isClickStop)
        {
            backAnimator.SetBool("Idle", false);
            backAnimator.SetBool("Open", true);
            isNowOpen = true;
        }
        Managers.Sound.StopEffect();
        Managers.Sound.Play("Bus/dooropen");
        _state = BusState.WaitOpenDoor;
        tutorialOnBusPlayerCameraController._step = TutorialOnBusPlayerCameraController.TutorialStep.Stop;
        tutorialOnBusPlayerCameraController.descriptionText = "버스가 멈췄어!\n버스에서 내리기 전에 하차 태그를 찍자!";
        Managers.Sound.Play("BusTutorial/10");
        tutorialOnBusPlayerCameraController.EnableCloseCanvas();
    }
    private void WaitOpenFunc()
    {
        isWait = true;
        if(doorTime >= 5.0f)
        {
            isWait = false;
            doorTime = 0f;
            // frontAnimator.SetBool("Open", false);
            // frontAnimator.SetBool("Close", true);
            // if(isClickStop)
            // {
            //     backAnimator.SetBool("Open", false);
            //     backAnimator.SetBool("Close", true);
            // }
            // _state = BusState.WaitCloseDoor;
        }
    }

    // private void WaitCloseDoor()
    // {
    //     isWait = true;
    //     if(doorTime >= 2.0f)
    //     {
    //         isWait = false;
    //         doorTime = 0f;
    //         frontAnimator.SetBool("Close", false);
    //         frontAnimator.SetBool("Idle", true);
    //         backAnimator.SetBool("Close", false);
    //         backAnimator.SetBool("Idle", true);
    //         isNowOpen = false;
    //         isClickStop = false;
    //         // busStopIdx += 1;
    //         // busStopIdx %= busStopNames.Length;
    //         _state = BusState.Drive;
    //     }
    // }


    private void DriveFunc()
    {
        if(tutorialOnBusPlayerCameraController.isClickCardReader)
        {
            moveTime += Time.fixedDeltaTime;
        }
        // announce
        if(!isAnnounced && moveTime >= 7f)
        {
            isAnnounced = true;
            // Debug.Log("내릴곧은" + busStopNames[busStopIdx]);
            GameObject noti = Managers.Resource.Instantiate("UI/Notification");
            Util.FindChild(noti, "Text", true).GetComponent<Text>().text = "이번 정류장은 광장 서문 입니다";
            Managers.Resource.DestroyAfterDelay(noti, 2.5f);
            Managers.Sound.StopEffect();
            Managers.Sound.Play("BusStop/1");
        }
        if (!isAnnounced2 && moveTime >= 10f)
        {
            isAnnounced2 = true;
            tutorialOnBusPlayerCameraController._step = TutorialOnBusPlayerCameraController.TutorialStep.Announce;
            tutorialOnBusPlayerCameraController.descriptionText = "안내 방송이 나왔어!\n이번역에서 내려야 하니 하차벨을 누르자!";
            Managers.Sound.Play("BusTutorial/8");
            tutorialOnBusPlayerCameraController.EnableCloseCanvas();
            tutorialOnBusPlayerCameraController.isClickCardReader = false;
        }
        if(moveTime >= 20f)
        {
            moveTime = 0f;
            isAnnounced = false;
            _state = BusState.Stop;
        }
    }

    private void Start()
    {
        frontDoor = Util.FindChild(gameObject, "Low_Floor_Bus_Frontdoor", true);
        backDoor = Util.FindChild(gameObject, "Low_Floor_Bus_Backdoor", true);
 
        frontAnimator = frontDoor.GetComponent<Animator>();
        backAnimator = backDoor.GetComponent<Animator>();
        tutorialOnBusPlayerCameraController = GameObject.FindWithTag("MainCamera").GetComponent<TutorialOnBusPlayerCameraController>();
        doorTime = 0f;
        _state = BusState.Drive;
        isWait = isAnnounced = isAnnounced2 = isClickStop = isNowOpen = false;

        // busStopIdx = getBusStopNum[GameObject.Find("PlayInfoObj").GetComponent<PlayInfoObj>().playInfo.busStopName];
        // busStopIdx += 1;
        // busStopIdx %= busStopNames.Length;
    }

    // Update is called once per frame
    private void FixedUpdate()
    {
        if(_state == BusState.Stop)
        {
            StopFunc();
        }
        else if(_state == BusState.WaitOpenDoor)
        {
            WaitOpenFunc();
        }
        // else if(_state == BusState.WaitCloseDoor)
        // {
        //     WaitCloseDoor();
        // }
        else if(_state == BusState.Drive)
        {
            DriveFunc();
        }

        if(isWait)
        {
            doorTime += Time.fixedDeltaTime;

        }

    }
}
