using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class UIManager
{
    // sort하기 위해 order 필요
    int _order = 11;

    Stack<UI_Popup> _popupStack = new Stack<UI_Popup>();
    UI_Scene _sceneUI = null;

    Order_List list_instance;
    public Order_List Orders { get { Init(); return Managers.UI.list_instance; } }


    public void Init()
    {
        if(list_instance == null)
        {
            list_instance = Root.AddComponent<Order_List>();
        }
    }


    public GameObject Root
    { 
        get
        {
            // UI_Root라는 곳에 유아이 만들어주는거
            GameObject root = GameObject.Find("@UI_Root");
            // root가 null이면 새로 만들어 주기
            if (root == null)
                root = new GameObject { name = "@UI_Root" };
            return root;
        }
    }


    public void SetCanvas(GameObject go, bool sort = true)
    {
        Canvas canvas = Util.GetOrAddComponent<Canvas>(go);
        canvas.renderMode = RenderMode.ScreenSpaceOverlay;
        canvas.overrideSorting = true;
        //Debug.Log($"++");
        if (sort)
        {
            canvas.sortingOrder = _order;
            _order++;
        }
        else
        {
            canvas.sortingOrder = 0;
        }
    }
    // 팝업 열고
    // name은 prefab이름 T는 script => name과 T 일치 시켜주는게 일반적
    public T ShowPopupUI<T>(string name = null) where T : UI_Popup
    {
        //Debug.Log($"hi:  {_order}");

        //_order++;
        if (string.IsNullOrEmpty(name))
            name = typeof(T).Name;

        if (SceneManager.GetActiveScene().name == "Burger")
        {
            //Debug.Log($"씬이름: {SceneManager.GetActiveScene().name}");
            GameObject go = Managers.Resource.Instantiate($"Burger/Main/{name}");
            T popup = Util.GetOrAddComponent<T>(go);
            _popupStack.Push(popup);

            // 위에서 함수 만들어준거 Root.transform
            go.transform.SetParent(Root.transform);
            return popup;
        }
        else
        {
            //Debug.Log($"씬이름: {SceneManager.GetActiveScene().name}");
            GameObject go = Managers.Resource.Instantiate($"Burger/UI/{name}");
            T popup = Util.GetOrAddComponent<T>(go);
            _popupStack.Push(popup);

            // 위에서 함수 만들어준거 Root.transform
            go.transform.SetParent(Root.transform);
            return popup;
    }



}


    public T ShowSceneUI<T>(string name = null) where T : UI_Scene
    {
        if (string.IsNullOrEmpty(name))
            name = typeof(T).Name;

        GameObject go = Managers.Resource.Instantiate($"UI/Scene/{name}");
        T sceneUI = Util.GetOrAddComponent<T>(go);
        _sceneUI = sceneUI;

        go.transform.SetParent(Root.transform);

        return sceneUI;
    }

    // 내가 정확히 뭘 삭제할지 좀더 안전함
    public void ClosePopupUI(UI_Popup popup)
    {
        if (_popupStack.Count == 0)
            return;

        if (_popupStack.Peek() != popup)
        {
            // Debug.Log("Close Popup 실패");
            return;
        }

        ClosePopupUI();
    }


    // 팝업 하나 닫고
    public void ClosePopupUI()
    {
        //Debug.Log($"bye:  {_order}");
        if (_popupStack.Count == 0)
            return;
        UI_Popup popup = _popupStack.Pop();
        Managers.Resource.Destroy(popup.gameObject);
        popup = null;
        _order--;
    }

    public void CloseAllPopupUI()
    {
        while (_popupStack.Count > 0)
            ClosePopupUI();
    }

    public void Clear()
    {
        CloseAllPopupUI();
        _sceneUI = null;
    }
}
