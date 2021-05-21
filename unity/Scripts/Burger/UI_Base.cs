using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using System;
using UnityEngine.EventSystems;

// Custom mapping type의 어머니
public class UI_Base : MonoBehaviour
{
    // 딕셔너리로 타입별로 관리 
    Dictionary<Type, UnityEngine.Object[]> _objects = new Dictionary<Type, UnityEngine.Object[]>();

    // proteced는 내자식들은 이함수를 잘 사용할 수 있도록 해주는것!
    protected void Bind<T>(Type type) where T : UnityEngine.Object
    {
        //   C# 문법인데 Enum에서 이름가져와서 names에 string으로 넣어주기 가능
        string[] names = Enum.GetNames(type);

        // objects를 Enum속 변수 갯수 크기로 만들어줌
        UnityEngine.Object[] objects = new UnityEngine.Object[names.Length];
        // 딕셔너리에 추가
        _objects.Add(typeof(T), objects);

        for (int i = 0; i < names.Length; i++)
        {
            // object 일 경우
            if (typeof(T) == typeof(GameObject))
                objects[i] = Util.FindChild(gameObject, names[i], true);
            else
                // 최상위 부모, 이름, recursive = true(자식의 자식까지 다 찾아야함)
                objects[i] = Util.FindChild<T>(gameObject, names[i], true);

            if (objects[i] == null)
                Debug.Log($"Failed to bind!  {name[i]} // {type}");
        }
    }

    // Bind 된 것을 꺼내 쓰는 함수
    protected T Get<T>(int idx) where T : UnityEngine.Object
    {
        UnityEngine.Object[] objects = null;

        // 키값(typeof(T))을 이용해 가져오기
        // 가져오기 실패하는 경우
        if (_objects.TryGetValue(typeof(T), out objects) == false)
        {
            // Debug.Log("가져오기 실패");
            return null;
        }
        // 가져오기 성공
        return objects[idx] as T;
    }

    // Text 가져올 경우
    protected Text GetText(int idx)
    {
        return Get<Text>(idx);
    }

    // Button 가져올 경우
    protected Button GetButton(int idx)
    {
        return Get<Button>(idx);
    }

    // Image 가져올 경우
    protected Image GetImage(int idx)
    {
        return Get<Image>(idx);
    }

    public static void AddUIEvent(GameObject go, Action<PointerEventData> action, Define.UIEvent type = Define.UIEvent.Click)
    {
        // 컴포넌츠 추출
        UI_EventHandler evt = Util.GetOrAddComponent<UI_EventHandler>(go);
        Debug.Log($"UI_Base_up: ${evt}");


        switch (type)
        {
            case Define.UIEvent.Click:
                Debug.Log($"UI_Base: ${evt}");
                evt.OnClickHandler -= action;
                evt.OnClickHandler += action;
                break;

            case Define.UIEvent.Drag:
                evt.OnDragHandler -= action;
                evt.OnDragHandler += action;
                break;
        }


        // 람다 형식으로
        // drag한 위치의 좌표를 가져와야 하기때문에 evt.transform
        // evt.OnDragHandler += ((PointerEventData data) => { evt.gameObject.transform.position = data.position; });
    }
}
