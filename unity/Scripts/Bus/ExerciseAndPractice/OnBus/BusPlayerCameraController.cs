using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.EventSystems;

public class BusPlayerCameraController : MonoBehaviour
{

    Transform cameraPos;
    Camera characterCamera;
    private OnBusController onBusController;
    private string[] busStopNames = {"SouthBusStop", "WestBusStop", "NorthBusStop", "EastBusStop"};
    private string[] busStopKoreanNames = {"광장 남문", "광장 서문", "광장 북문", "광장 동문"};




    private float smooth = 4.0f;

    private void Start()
    {
        GameObject characterCameraObj = GameObject.Find ("CameraPos");
        cameraPos = characterCameraObj.transform;
        transform.position = cameraPos.position;
        transform.forward = cameraPos.forward;	
        characterCamera = GetComponent<Camera>();
        onBusController = GameObject.Find("BusForScene").GetComponent<OnBusController>();

    }

    private void Update()
    {
        SetCameraPositionNormalView ();
        ClickFunc();

    }
    private void SetCameraPositionNormalView ()
    {

        transform.position = Vector3.Lerp (transform.position, cameraPos.position, Time.deltaTime * smooth);	
        transform.forward = Vector3.Lerp (transform.forward, cameraPos.forward, Time.deltaTime * smooth);

    }

    private void ClickFunc()
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
                    Managers.Sound.Play("Bus/buscardtag");
                    Managers.Resource.DestroyAfterDelay(noti, 2.5f);
                    GameObject.Find("BlockCube").GetComponent<Collider>().enabled = false;
                }
            }
            else if (Physics.Raycast(ray, out hit, Mathf.Infinity) && hit.transform.gameObject.tag == "CardReaderBack")
            {
                GameObject noti = Managers.Resource.Instantiate("UI/Notification");
                Util.FindChild(noti, "Text", true).GetComponent<Text>().text = "하차 태그 되었습니다";
                Managers.Sound.Play("Bus/buscardtag2");
                Managers.Resource.DestroyAfterDelay(noti, 2.5f);
            }
            else if (Physics.Raycast(ray, out hit, Mathf.Infinity) && hit.transform.gameObject.name == "ClickBackDoor" && onBusController._state == OnBusController.BusState.WaitOpenDoor && onBusController.isNowOpen)
            {
                // Debug.Log("클릭 백도어");
                GameObject.Find("PlayInfoObj").GetComponent<PlayInfoObj>().playInfo.busStopName = busStopNames[onBusController.busStopIdx];
                Managers.Scene.LoadScene(Define.Scene.PlazaScene);
            }
            else if (Physics.Raycast(ray, out hit, Mathf.Infinity) && hit.transform.gameObject.tag == "StopBell")
            {
                GameObject noti = Managers.Resource.Instantiate("UI/Notification");
                Util.FindChild(noti, "Text", true).GetComponent<Text>().text = "하차벨이 눌렸습니다";
                Managers.Sound.Play("Bus/stopbell");
                Managers.Resource.DestroyAfterDelay(noti, 2.5f);
                onBusController.isClickStop = true;
            }
            else if (Physics.Raycast(ray, out hit, Mathf.Infinity) && hit.transform.gameObject.name == "DestinationInfoBlue")
            {
                GameObject noti = Managers.Resource.Instantiate("UI/Destination");
                Util.FindChild(noti, "Text", true).GetComponent<Text>().text = $"이번 정류장은 {busStopKoreanNames[onBusController.busStopIdx]} 입니다";
                onBusController.isClickStop = true;
            }

        }
    }

}
