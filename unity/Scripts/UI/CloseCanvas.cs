using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CloseCanvas : MonoBehaviour
{
    public void ClickCloseFunc()
    {
        // Debug.Log("디스트로이");
        if(gameObject != null)
        {
            Managers.Resource.Destroy(gameObject);
        }
    }
}
