using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BusMoveController : MonoBehaviour
{
    public enum BusState
    {
        Stop,
        WaitOpenDoor,
        WaitCloseDoor,
        Drive,
        // DriveCorner,
    }

    private GameObject frontWheels, backWheels;
    private GameObject frontDoor, backDoor;
    private Animator frontAnimator, backAnimator;
    public BusState _state = BusState.Stop;
    private float wheelRotX;
    // private float BusRotY;
    private float timeT;
    private bool isWait;
    public float speedWeight = 20f;
    public PathCreation.PathCreator pathCreator;
    public PathCreation.EndOfPathInstruction endOfPathInstruction;
    private float distanceTravelled;

    // private float speedWeight = 50.5f;

    private void Start()
    {
        if (pathCreator != null)
        {
            // Subscribed to the pathUpdated event so that we're notified if the path changes during the game
            pathCreator.pathUpdated += OnPathChanged;
        }
        OnPathChanged();

        frontWheels = Util.FindChild(gameObject, "Tire_Front", true);
        backWheels = Util.FindChild(gameObject, "Tire_Back", true);

        frontDoor = Util.FindChild(gameObject, "Low_Floor_Bus_Frontdoor", true);
        backDoor = Util.FindChild(gameObject, "Low_Floor_Bus_Backdoor", true);
 
        frontAnimator = frontDoor.GetComponent<Animator>();
        backAnimator = backDoor.GetComponent<Animator>();
        wheelRotX = timeT = 0f;
        _state = BusState.Drive;
        isWait = false;
    }

    public void SyncBusFunc()
    {
        OnPathChanged();
    }

    private void StopFunc()
    {
        frontAnimator.SetBool("Idle", false);
        frontAnimator.SetBool("Open", true);
        backAnimator.SetBool("Idle", false);
        backAnimator.SetBool("Open", true);
        _state = BusState.WaitOpenDoor;
    }
    private void WaitOpenFunc()
    {
        isWait = true;
        if(timeT >= 7.0f)
        {
            isWait = false;
            timeT = 0f;
            frontAnimator.SetBool("Open", false);
            frontAnimator.SetBool("Close", true);
            backAnimator.SetBool("Open", false);
            backAnimator.SetBool("Close", true);
            _state = BusState.WaitCloseDoor;
        }
    }

    private void WaitCloseDoor()
    {
        isWait = true;
        if(timeT >= 2.0f)
        {
            isWait = false;
            timeT = 0f;
            frontAnimator.SetBool("Close", false);
            frontAnimator.SetBool("Idle", true);
            backAnimator.SetBool("Close", false);
            backAnimator.SetBool("Idle", true);
            _state = BusState.Drive;
        }
    }


    private void DriveFunc()
    {

        // SyncBusFunc();
        
        if (pathCreator != null)
        {
            distanceTravelled += speedWeight * Time.fixedDeltaTime;
            transform.position = pathCreator.path.GetPointAtDistance(distanceTravelled, endOfPathInstruction);
            transform.rotation = Quaternion.Euler(pathCreator.path.GetRotationAtDistance(distanceTravelled, endOfPathInstruction).eulerAngles.x, pathCreator.path.GetRotationAtDistance(distanceTravelled, endOfPathInstruction).eulerAngles.y, 0);
        }

        wheelRotX += 120f * Time.fixedDeltaTime;
        if(wheelRotX > 360f)
        wheelRotX = 0f;
        // Debug.Log("롯@@ " + wheelRotX);
        frontWheels.transform.localRotation = Quaternion.Euler(wheelRotX, 0, 0);
        backWheels.transform.localRotation = Quaternion.Euler(wheelRotX, 0, 0);
    }

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
            timeT += Time.fixedDeltaTime;

        }
    }
    private void OnPathChanged() {
        distanceTravelled = pathCreator.path.GetClosestDistanceAlongPath(transform.position);
    }
}
