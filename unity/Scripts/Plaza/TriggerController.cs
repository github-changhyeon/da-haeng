using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class TriggerController : MonoBehaviour
{

    Dictionary<string,string> pavements = new Dictionary<string, string>()
    {
        {"SouthDoor", "광장 남문"},
        {"NorthDoor", "광장 북문"},
        {"WestDoor", "광장 서문"},
        {"EastDoor", "광장 동문"},
        {"PlazaCenter", "광장 중앙"},
        {"SouthBusStopTrigger", "남문 버스 정류장"},
        {"NorthBusStopTrigger", "북문 버스 정류장"},
        {"WestBusStopTrigger", "서문 버스 정류장"},
        {"EastBusStopTrigger", "동문 버스 정류장"},

    };

    List<string> roads = new List<string>()
    {
        "SouthBusTrigger",
        "NorthBusTrigger",
        "WestBusTrigger",
        "EastBusTrigger",
    };

    BusMoveController busController;

    private void pavementEnter(GameObject sourceObj, GameObject other)
    {
        other.GetComponent<PlayerController>().setCanvas(pavements[$"{sourceObj.name}"]);
        if(sourceObj.name.Equals("SouthBusStopTrigger"))
        {
            other.GetComponent<PlayerController>().SetBusStopName("SouthBusStop");
        }
        else if(sourceObj.name.Equals("NorthBusStopTrigger"))
        {
            other.GetComponent<PlayerController>().SetBusStopName("NorthBusStop");
        }
        else if(sourceObj.name.Equals("WestBusStopTrigger"))
        {
            other.GetComponent<PlayerController>().SetBusStopName("WestBusStop");
        }
        else if(sourceObj.name.Equals("EastBusStopTrigger"))
        {
            other.GetComponent<PlayerController>().SetBusStopName("EastBusStop");
        }
    }

    private void roadEnter(GameObject other)
    {
        if(other.tag != "Bus101" && other.tag != "Bus102")
        {
            return;
        }
        busController = other.transform.parent.gameObject.GetComponent<BusMoveController>();
        busController._state = BusMoveController.BusState.Stop;
    }


    private void OnTriggerEnter(Collider other)
    {
        string sourceObjName = gameObject.name;
        if(pavements.ContainsKey(sourceObjName))
        {
            pavementEnter(gameObject, other.gameObject);
        }
        else if(roads.Contains(sourceObjName))
        {
            roadEnter(other.gameObject);
        }
        

        if (gameObject.tag.Equals("Chair"))
        {
            Vector3 chairLocation = new Vector3(gameObject.transform.position.x, 0f, gameObject.transform.position.y);
            other.gameObject.GetComponent<PlayerController>().sitOn(gameObject, chairLocation);
        }
       
    }

    private void OnTriggerExit(Collider other)
    {
        string sourceObjName = gameObject.name;

        if (gameObject.tag.Equals("Chair"))
        {
            other.gameObject.GetComponent<PlayerController>().standUp();
        }

    }

}
