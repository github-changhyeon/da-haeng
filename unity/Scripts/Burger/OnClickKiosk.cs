using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;

public class OnClickKiosk : MonoBehaviour
{
    private Camera cam;

    // private bool isClickKiosk = false;

    private void Start()
    {
        // cam = transform.FindChild("CamPos").gameObject;
        //cam = transform.Find("CamPos").gameObject.GetComponentInChildren<Camera>();
    }
    private void Update()
    {
        if (Input.GetMouseButtonDown(0))
        {
            if (cam)
            {
                Ray ray = cam.ScreenPointToRay(Input.mousePosition);
                RaycastHit hit;
                if (Physics.Raycast(ray, out hit, Mathf.Infinity) && hit.transform.gameObject.name == "Kiosk")
                {

                    if (!EventSystem.current.IsPointerOverGameObject())
                    {
                        //클릭 처리
                        // 키오스크를 눌렀을 경우에 UI 보여지도록
                        // Debug.Log("키오스크 열어!");
                        Managers.UI.ShowPopupUI<KioskUI>();
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
