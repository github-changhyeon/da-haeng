using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class OnBusController : MonoBehaviour
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
    private bool isWait, isAnnounced;
    public bool isClickStop, isNowOpen;
    private float doorTime, moveTime;
    private int stage;
    public int busStopIdx;



    private Dictionary<string,int> getBusStopNum = new Dictionary<string, int>()
    {
        {"SouthBusStop", 0},
        {"WestBusStop", 1},
        {"NorthBusStop", 2},
        {"EastBusStop", 3},
    };

    private string[] busStopNames = {"SouthBusStop", "WestBusStop", "NorthBusStop", "EastBusStop"};

    private string[] busStopKoreanNames = {"광장 남문", "광장 서문", "광장 북문", "광장 동문"};

    
    private void StopFunc()
    {
        Managers.Sound.Play("Bus/dooropen");
        frontAnimator.SetBool("Idle", false);
        frontAnimator.SetBool("Open", true);
        if(isClickStop)
        {
            backAnimator.SetBool("Idle", false);
            backAnimator.SetBool("Open", true);
            isNowOpen = true;
        }
        _state = BusState.WaitOpenDoor;
    }
    private void WaitOpenFunc()
    {
        isWait = true;
        if(doorTime >= 5.0f)
        {
            Managers.Sound.Play("Bus/dooropen");
            isWait = false;
            doorTime = 0f;
            frontAnimator.SetBool("Open", false);
            frontAnimator.SetBool("Close", true);
        if(isClickStop)
        {
            backAnimator.SetBool("Open", false);
            backAnimator.SetBool("Close", true);
        }
            _state = BusState.WaitCloseDoor;
        }
    }

    private void WaitCloseDoor()
    {
        isWait = true;
        if(doorTime >= 2.0f)
        {
            isWait = false;
            doorTime = 0f;
            frontAnimator.SetBool("Close", false);
            frontAnimator.SetBool("Idle", true);
            backAnimator.SetBool("Close", false);
            backAnimator.SetBool("Idle", true);
            isNowOpen = false;
            isClickStop = false;
            busStopIdx += 1;
            busStopIdx %= busStopNames.Length;
            _state = BusState.Drive;
        }
    }


    private void DriveFunc()
    {
        moveTime += Time.fixedDeltaTime;
        // announce
        if(!isAnnounced && moveTime >= 25f)
        {
            isAnnounced = true;
            // Debug.Log("내릴곳은" + busStopNames[busStopIdx]);
            GameObject noti = Managers.Resource.Instantiate("UI/Notification");
            Util.FindChild(noti, "Text", true).GetComponent<Text>().text = $"이번 정류장은 {busStopKoreanNames[busStopIdx]} 입니다";
            Managers.Resource.DestroyAfterDelay(noti, 2.5f);
            Managers.Sound.Play("BusStop/" + busStopIdx);
            // announce
        }
        if(moveTime >= 45f)
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
        doorTime = 0f;
        _state = BusState.Drive;
        isWait = isAnnounced = isClickStop = isNowOpen = false;
        

        busStopIdx = getBusStopNum[GameObject.Find("PlayInfoObj").GetComponent<PlayInfoObj>().playInfo.busStopName];
        busStopIdx += 1;
        busStopIdx %= busStopNames.Length;
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
        else if(_state == BusState.WaitCloseDoor)
        {
            WaitCloseDoor();
        }
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
