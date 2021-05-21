using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class PointLookAt : MonoBehaviour
{
    public Transform target;
    private Camera camera;
    private RaycastHit hit;
    private string name;

    void Start()
    {
        camera = Camera.main;
        name = transform.GetComponent<Text>().text;
    }
    void Update()
    {
        float offsetY = 0.0f;

        string characterType = transform.parent.parent.name;
        if (characterType.Contains("michelle"))
            offsetY = 0.65f;
        else if (characterType.Contains("megan"))
            offsetY = 0.85f;
        else if (characterType.Contains("leonard"))
            offsetY = 0.93f;
        else if (characterType.Contains("jackie"))
            offsetY = 0.7f;
        //2D 포인트 얻어오기
        Vector3 screenPos = camera.WorldToScreenPoint(new Vector3(target.position.x + 0.025f, target.position.y + offsetY, target.position.z));

        transform.position = screenPos;

        //if ((camera.transform.position - screenPos).z < 0) 
        //    Debug.Log($"{name} 뒤");
        //Debug.Log($"{name}  =>  {Vector3.Distance(camera.transform.position, screenPos)}");


        //if(Vector3.Distance(camera.transform.position, screenPos) < 2000f && (camera.transform.position - screenPos).z < 0)
        //{
        //    transform.GetComponent<Text>().text = name;
        //}
        //else
        //{
        //    transform.GetComponent<Text>().text = "";
        //}

        //if (Physics.Raycast(camera.transform.position, screenPos, out hit, 20f))
        //{
        //    transform.GetComponent<Text>().text = name;
        //    //Debug.Log("hit point : " + hit.point + ", distance : " + hit.distance + ", name : " + hit.collider.name);
        //}
        //else
        //{
        //    transform.GetComponent<Text>().text = "";
        //}
        //Debug.Log($"{name} /////// 지금은 >{transform.GetComponent<Text>().text}<");
    }
}
