using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;

public class BurgerPlayerCameraController : MonoBehaviour
{

    Transform cameraPos;
    Camera characterCamera;

    private float smooth = 4.0f;

    private void Start()
    {
        GameObject characterCameraObj = GameObject.Find ("CameraPos");
        cameraPos = characterCameraObj.transform;
        transform.position = cameraPos.position;
        transform.forward = cameraPos.forward;	
        characterCamera = GetComponent<Camera>();
    }

    private void Update()
    {
        SetCameraPositionNormalView ();
        ClickKioskFunc();

    }
    private void SetCameraPositionNormalView ()
    {

        transform.position = Vector3.Lerp (transform.position, cameraPos.position, Time.deltaTime * smooth);	
        transform.forward = Vector3.Lerp (transform.forward, cameraPos.forward, Time.deltaTime * smooth);

    }

    private void ClickKioskFunc()
    {
        if (Input.GetMouseButtonDown(0))
        {
            if (characterCamera)
            {
                Ray ray = characterCamera.ScreenPointToRay(Input.mousePosition);
                RaycastHit hit;
                if (Physics.Raycast(ray, out hit, Mathf.Infinity) && hit.transform.gameObject.name == "Kiosk")
                {

                    if (!EventSystem.current.IsPointerOverGameObject())
                    {
                        //클릭 처리
                        // 키오스크를 눌렀을 경우에 UI 보여지도록
                        // Debug.Log("키오스크 열어!");
                        Managers.UI.ShowPopupUI<KioskUI>();
                        GameObject.Find("CameraPos").transform.parent.GetComponent<BurgerPlayerController>().enabled = false;
                    }

                }
            }
            else
            {
                // Debug.Log("없따");
            }

        }
    }

}
