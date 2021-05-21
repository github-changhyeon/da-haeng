using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using System;
using UnityEngine.EventSystems;

public class Detail_Nope : UI_Popup
{
    public SelectedItem item = new SelectedItem();

    enum Buttons
    {
        Minus_Btn,
        Plus_Btn,
        Cancel_Btn,
        Complete_Btn,
    }

    enum Texts
    {
        Count,
        Item_Name,
        Item_Price,
    }


    enum Images
    {
        Item_Image,
    }

    private void Start()
    {
        Init();
    }

    public override void Init()
    {
        base.Init();

        // enum 타입을 넘기겠다. 어떤 객체인지 힌트를 주기 위기 <T> 사용
        Bind<Button>(typeof(Buttons));
        Bind<Text>(typeof(Texts));
        // Bind<GameObject>(typeof(GameObjects));
        Bind<Image>(typeof(Images));

    }

    public void OnCloseDetail()
    {
        Managers.UI.ClosePopupUI();
        // Debug.Log("닫아줄래...?");
    }

    int _count = 1;


    public void OnClickPlus()
    {
        if (_count < 50)
        {
            _count++;
            // 이건 부모 찾을때
            GameObject Detail_Obj = GameObject.Find("Detail_Nope");
            // Detail의 Item_Name에 아이템 이름 넣어주기
            Util.FindChild(Detail_Obj, "Count", true).GetComponent<Text>().text = $"{_count}";
        }
        // Debug.Log($"더해 {_count}");

    }

    public void OnClickMinus()
    {
        if (_count > 1)
        {
            _count--;
            // 이건 부모 찾을때
            GameObject Detail_Obj = GameObject.Find("Detail");
            // Detail의 Item_Name에 아이템 이름 넣어주기
            Util.FindChild(Detail_Obj, "Count", true).GetComponent<Text>().text = $"{_count}";
        }
        // Debug.Log($"뺴 {_count}");
    }

    public void OnClickSubmit()
    {
        string name = GetText((int)Texts.Item_Name).text;
        int count = _count;
        string strPrice = (GetText((int)Texts.Item_Price).text).Replace(",", "");
        int price = 1 * Convert.ToInt32(strPrice);


        item.setProperties(name, count, price);
        Managers.UI.Orders.AddItem(item);

        Managers.UI.ClosePopupUI();
    }
}
