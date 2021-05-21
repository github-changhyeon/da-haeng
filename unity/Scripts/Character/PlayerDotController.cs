using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerDotController : MonoBehaviour
{
    Transform playerDotPos;
    Vector3 vector;

    // private float smooth = 4.0f;

    private void Start()
    {
        playerDotPos = GameObject.Find ("PlayerDotPos").transform;
        vector = playerDotPos.position;
        vector.y = transform.position.y;
        transform.position = vector;
        transform.forward = playerDotPos.forward;
    }

    private void Update()
    {
        setDotPosition ();

    }
    void setDotPosition ()
    {
        vector.x = playerDotPos.position.x;
        vector.z = playerDotPos.position.z;
        transform.position = vector;
        transform.forward = playerDotPos.forward;
    }
}
