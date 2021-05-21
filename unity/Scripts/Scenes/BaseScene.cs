// using System.Collections;
// using System.Collections.Generic;
using UnityEngine;

public abstract class BaseScene : MonoBehaviour
{
    // Start is called before the first frame update
    public Define.Scene SceneType {get; protected set;} = Define.Scene.Unknow;
    void Start()
    {
        
    }

    protected virtual void Init()
    {

    }

    public abstract void Clear();


}
