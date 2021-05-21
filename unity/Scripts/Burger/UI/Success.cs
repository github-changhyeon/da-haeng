using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.Runtime.InteropServices;


public class Success : UI_Popup
{
    [DllImport("__Internal")]
    private static extern void SendResult(string resultInfo);


    float completeTimeT = 0f;
    bool isComplete = true;

    private void FixedUpdate()
    {
        if (isComplete)
        {
            completeTimeT += Time.fixedDeltaTime;
            if (completeTimeT >= 4.0f)
            {
                isComplete = false;
                // Debug.Log("도착!");

#if (UNITY_WEBGL == true && UNITY_EDITOR == false)
                            SendResult ("close");
#endif
                completeTimeT = 0f;
            }
        }
    }
}
