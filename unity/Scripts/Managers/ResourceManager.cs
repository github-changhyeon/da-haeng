using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ResourceManager
{
  // Load 만들기
  // where 조건 추가 
  public T Load<T>(string path) where T : Object
  {
    return Resources.Load<T>(path);
  }

  //  Instantiate 맵핑
  public GameObject Instantiate(string path, Transform parent = null)
  {
    //  prefab 로드 
    GameObject prefab = Load<GameObject>($"Prefabs/{path}");
    // 문제가 생겻을 경우
    if (prefab == null)
    {
      // Debug.Log($"Failed to load prefab : {path}");
      return null;
    }
    // 잘 찾으면 prefab과 parent return
    // 재귀를 막기 위해 Object의 Instantiate라고 명시
    GameObject ret = Object.Instantiate(prefab, parent);
    ret.name = prefab.name;
    return ret;
  }

  // 게임 오브젝트 삭제
  public void Destroy(GameObject go)
  {
    if (go == null)
      return;
    Object.Destroy(go);
  }

  public void DestroyAfterDelay(GameObject go, float t)
  {
    if (go == null)
      return;
    Object.Destroy(go, t);
  }

}
