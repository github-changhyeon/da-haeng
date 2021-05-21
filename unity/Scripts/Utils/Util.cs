using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using System;
using UnityEngine.EventSystems;

public class Util
{
  // 기능성 함수 넣어주는 공간

  public static T GetOrAddComponent<T>(GameObject go) where T : UnityEngine.Component
  {
    T component = go.GetComponent<T>();
    if (component == null)
      component = go.AddComponent<T>();
    return component;
  }

  // Object일 경우
  public static GameObject FindChild(GameObject go, string name = null, bool recursive = false)
  {
    // Transform 컴포넌트를 꺼내와서
    Transform transform = FindChild<Transform>(go, name, recursive);
    // null이 아니라면 gameObject를 리턴
    if (transform == null)
      return null;
    else
      return transform.gameObject;
  }


  // 최상위 부모, 이름, 재귀적으로 찾을것인가(자식만 찾을 것인지 아니면 자식의 자식까지 모두 찾을 것인지)
  // Unity Object인것만 해줄거다. => 이 함수 쓰는 곳에도 조건을 넣어줘야함
  // <T>는 찾곡 싶은 컴포넌트
  public static T FindChild<T>(GameObject go, string name = null, bool recursive = false) where T : UnityEngine.Object
  {
    if (go == null)
      return null;

    // 직속 자식만 찾는 경우
    if (recursive == false)
    {
      for (int i = 0; i < go.transform.childCount; i++)
      {
        // 내모든 자식들을 스캔
        Transform transform = go.transform.GetChild(i);
        // 이름으로 걸러야 할지 안할지
        if (string.IsNullOrEmpty(name) || transform.name == name)
        {
          T component = transform.GetComponent<T>();
          if (component != null)
            return component;
        }
      }
    }
    else
    {
      // T 타입의 컴포넌트 스캔
      foreach (T component in go.GetComponentsInChildren<T>())
      {
        // 컴포넌트 이름이 내가 원하는 이름과 같으면 return
        if (string.IsNullOrEmpty(name) || component.name == name)
          return component;
      }
    }
    return null;
  }

}
