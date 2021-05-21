using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;

public class InputManagers
{
    public Action KeyAction = null;
    public Action<Define.MouseEvent> MouseAction = null;

    bool _pressed = false;

    public void OnUpdate()
    {
        // UI가 클릭되었는지 안되어있는지 확인하는 함수
        if (EventSystem.current != null && EventSystem.current.IsPointerOverGameObject())
            return;

        if (Input.anyKey && KeyAction != null)
            KeyAction.Invoke();

        if (MouseAction != null)
        {
            // 0번은 왼쪽 마우스 클릭
            if (Input.GetMouseButton(0))
            {
                // 마우스가 눌리면 _pressed = true로 만들어주기
                MouseAction.Invoke(Define.MouseEvent.Press);
                _pressed = true;

            }
            else
            {
                // 마우스가 눌림이 풀렷을 경우 
                if (_pressed)
                    MouseAction.Invoke(Define.MouseEvent.Click);
                _pressed = false;
            }
        }

    }

    public void Clear()
    {
        KeyAction = null;
        MouseAction = null;
    }
}
