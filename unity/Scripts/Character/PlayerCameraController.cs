using System.Collections;
using System.Collections.Generic;
using UnityEngine;
// using Photon.Pun;

public class PlayerCameraController : MonoBehaviour
{

    Transform cameraPos;
    Camera characterCamera;
    private float smooth = 4.0f;
    private int layerMask;

    private void Start()
    {
        GameObject characterCameraObj = GameObject.Find ("CameraPos");
        cameraPos = characterCameraObj.transform;
        transform.position = cameraPos.position;
        transform.forward = cameraPos.forward;
        characterCamera = GetComponent<Camera>();	
        layerMask = 1<<(LayerMask.NameToLayer("BusFrontDoor"));
    }

    private void Update()
    {
        SetCameraPositionNormalView ();
        ClickFrontDoor();

    }
    void SetCameraPositionNormalView ()
    {

        transform.position = Vector3.Lerp (transform.position, cameraPos.position, Time.deltaTime * smooth);	
        transform.forward = Vector3.Lerp (transform.forward, cameraPos.forward, Time.deltaTime * smooth);

    }
    void ClickFrontDoor()
    {
        if (Input.GetMouseButtonDown(0) && characterCamera)
        {

            Ray ray = characterCamera.ScreenPointToRay(Input.mousePosition);
            RaycastHit hit;

            if (Physics.Raycast(ray, out hit, 15f, layerMask) && hit.transform.gameObject.name == "ClickFrontCube" 
            && hit.transform.parent.gameObject.GetComponent<BusMoveController>()._state == BusMoveController.BusState.WaitOpenDoor)
            {
                cameraPos.parent.gameObject.GetComponent<PlayerController>().SetBusNum(hit.transform.gameObject.tag);
                GameObject.Find("PlayInfoObj").GetComponent<PlayInfoObj>().playInfo.busNum = Util.FindChild(cameraPos.parent.gameObject, "UserPlayInfo", true).GetComponent<UserPlayInfo>().userPlayInfo.busNum;
                GameObject.Find("PlayInfoObj").GetComponent<PlayInfoObj>().playInfo.busStopName = Util.FindChild(cameraPos.parent.gameObject, "UserPlayInfo", true).GetComponent<UserPlayInfo>().userPlayInfo.busStopName;
                GameObject.Find("PlayInfoObj").GetComponent<PlayInfoObj>().playInfo.isRode101 = Util.FindChild(cameraPos.parent.gameObject, "UserPlayInfo", true).GetComponent<UserPlayInfo>().userPlayInfo.isRode101;
                GameObject.Find("PlayInfoObj").GetComponent<PlayInfoObj>().playInfo.isRode102 = Util.FindChild(cameraPos.parent.gameObject, "UserPlayInfo", true).GetComponent<UserPlayInfo>().userPlayInfo.isRode102;
                GameObject.Find("PlayInfoObj").GetComponent<PlayInfoObj>().playInfo.rideCnt = Util.FindChild(cameraPos.parent.gameObject, "UserPlayInfo", true).GetComponent<UserPlayInfo>().userPlayInfo.rideCnt+1;

                GameObject.Find("PhotonController").GetComponent<MatchMaker>().DisconnectFunc();
                Managers.Scene.LoadScene(Define.Scene.BusScene);
                // DontDestroyOnLoad(cameraPos.parent.gameObject);
            }
        

        }
    }

}
