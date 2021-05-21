using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BusWorldController : MonoBehaviour
{

    // private float timeT;
    private float speedWeight = 6.0f;
    private Vector3 nextPosition;
    private void Start()
    {
        nextPosition = gameObject.transform.position;
    }

    // Update is called once per frame
    private void FixedUpdate()
    {
        nextPosition.z += speedWeight * Time.fixedDeltaTime;
        gameObject.transform.position = nextPosition;

    }
}
