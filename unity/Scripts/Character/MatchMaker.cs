using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Photon.Pun;
using Photon.Realtime;
// using UnityChan;

public class MatchMaker : MonoBehaviourPunCallbacks {

	private GameObject photonObject;
    public GameObject photonController;
    private PlayInfo playInfo;
    private string selectedCharacterName;

    private void Awake()
    {
        if(GameObject.Find("PlayInfoObj") != null)
        {
            playInfo = GameObject.Find("PlayInfoObj").GetComponent<PlayInfoObj>().playInfo;
            selectedCharacterName = GameObject.Find("PlayInfoObj").GetComponent<PlayInfoObj>().playInfo.selectedCharacterName;
        }
        if(playInfo != null)
        {
            selectedCharacterName = playInfo.selectedCharacterName;
        }
        if(selectedCharacterName == null)
        {
            selectedCharacterName = "michelle";
        }
        // Debug.Log("it is gameObj" + sceneManagerObj);
        // Debug.Log("it is name" + selectedCharacterName);
        // selectedCharacterName = "jackie";
        photonObject = (GameObject)(Resources.Load(selectedCharacterName));
        // if(GameObject.Find("PlayInfoObj") != null)
        // {
        //     Destroy(GameObject.Find("PlayInfoObj"));
        // }
    }

	void Start () {

		// Debug.Log ("start");
		PhotonNetwork.ConnectUsingSettings ();
        PhotonNetwork.GameVersion = "0.1";
	}


    public override void OnConnectedToMaster()
    {
        // Debug.Log("OnConnectedToMaster() was called by PUN");
        // PhotonNetwork.JoinRandomRoom();
        
        PhotonNetwork.JoinOrCreateRoom("ssafy", new RoomOptions {MaxPlayers = 20}, null);
    }


    public override void OnJoinedRoom()
    {
        // Debug.Log("OnJoinedRoom() called by PUN. Now this client is in a room.");

		float randomX = photonController.transform.position.x + Random.Range(-6f, 6f); 
        GameObject myPlayer = null;
        if((playInfo.category == "bus" || playInfo.category == "plaza") && playInfo.busStopName != null)
        {
            if(playInfo.busStopName == "SouthBusStop")
            {
                myPlayer = (GameObject)PhotonNetwork.Instantiate(
                    photonObject.name,
                    new Vector3(120f, 1f, -16.5f + Random.Range(-6f, 6f)),
                    Quaternion.identity, 
                    0
                );
            }
            else if(playInfo.busStopName == "WestBusStop")
            {
                myPlayer = (GameObject)PhotonNetwork.Instantiate(
                    photonObject.name,
                    new Vector3(-16.5f, 1f, 130f + Random.Range(-6f, 6f)),
                    Quaternion.identity, 
                    0
                );

            }
            else if(playInfo.busStopName == "NorthBusStop")
            {
                myPlayer = (GameObject)PhotonNetwork.Instantiate(
                    photonObject.name,
                    new Vector3(128, 1f, 270 + Random.Range(-6f, 6f)),
                    Quaternion.identity, 
                    0
                );

            }
            else if(playInfo.busStopName == "EastBusStop")
            {
                myPlayer = (GameObject)PhotonNetwork.Instantiate(
                    photonObject.name,
                    new Vector3(270, 1f, 125 + Random.Range(-6f, 6f)),
                    Quaternion.identity, 
                    0
                );

            }
        }

        else
        {
            myPlayer = (GameObject)PhotonNetwork.Instantiate(
                photonObject.name,
                new Vector3(randomX, 1f, photonController.transform.position.z),
                Quaternion.identity, 
                0
            );
        }

        Util.FindChild(myPlayer, "UserPlayInfo", true).GetComponent<UserPlayInfo>().userPlayInfo = playInfo;
        
        // myPlayer.transform.FindChild("CameraPos").gameObject.SetActive(true);
		GameObject mainCamera = GameObject.FindWithTag("MainCamera");
		mainCamera.GetComponent<PlayerCameraController>().enabled = true;

        GameObject playerDot = GameObject.Find("PlayerDot");
		playerDot.GetComponent<PlayerDotController>().enabled = true;

        // GameObject.Find("Bus101").GetComponent<BusController>().SyncBusFunc();
        // GameObject.Find("Bus102").GetComponent<BusController>().SyncBusFunc();
        // GameObject.Find("Bus101_2").GetComponent<BusController>().SyncBusFunc();
        // GameObject.Find("Bus102_2").GetComponent<BusController>().SyncBusFunc();
        // GameObject notification = GameObject.Find("Notification");
		// notification.GetComponent<NotificationController>().enabled = true;

    }

    public void DisconnectFunc()
    {
        if(PhotonNetwork.IsConnected)
        {
            PhotonNetwork.Disconnect();
        }
    }

	public override void OnJoinRandomFailed(short returnCode, string message)
    {
        // Debug.Log("OnJoinRandomFailed() was called by PUN. No random room available, so we create one.\nCalling: PhotonNetwork.CreateRoom");

        // #Critical: we failed to join a random room, maybe none exists or they are all full. No worries, we create a new room.
        PhotonNetwork.CreateRoom(null);

		//PhotonNetwork.CreateRoom(null, new RoomOptions{MaxPlayers = 4});
    }
   

}
