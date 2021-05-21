using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using System;
using UnityEngine.EventSystems;
using UnityEngine.SceneManagement;


public class Order_List : MonoBehaviour
{
    List<SelectedItem> orderList = new List<SelectedItem>();

    public void AddItem(SelectedItem item)
    {

        // 기존에 있는 아이템의 개수를 늘릴 건지, 새로운 아이템으로 추가할 건지 확인
        bool flag = false;

        for (int i = 0; i < orderList.Count; i++)
        {
            // 리스트에 기존에 존재하는 아이템이라면 
            if (item.Equals(orderList[i]))
            {
                // 갯수만 늘리고 for문 중지
                orderList[i].AddCount(item.GetCount());
                flag = true;
                break;
            }
        }

        // 존재하지 않으면 아이템 추가
        if (!flag)
            orderList.Add(item);

        // 주문 리스트 다시 그리기
        ReloadOrderBottom();
    }

    public void RemoveAndReload(GameObject index)
    {
        string nameAndOptions = Util.FindChild(index, "Order_Name", true).GetComponent<Text>().text;
        string countStr = Util.FindChild(index, "Order_Count", true).GetComponent<Text>().text;
        string priceStr = Util.FindChild(index, "Order_Price", true).GetComponent<Text>().text;
        int count = Convert.ToInt32(countStr);
        int price = Convert.ToInt32(priceStr);

        for (int i = 0; i < orderList.Count; i++)
        {
            // 전체 order list에서 클릭된 inddx와 같은 놈은 지우고 for문 끝내기
            if (orderList[i].Equals(nameAndOptions, count, price))
            {
                orderList.RemoveAt(i);
                break;
            }
        }

        // 주문 리스트 다시 그리기
        ReloadOrderBottom();
    }

    public void ReloadOrderBottom()
    {
        // 모든 index object 삭제
        removeAllIndexObject();

        // Contents 객체 가져옴
        GameObject Content_Obj = GameObject.Find("Content");

        RectTransform Content_Rect = Content_Obj.GetComponent<RectTransform>();

        // order list의 정보를 가지고 index 객체를 만들어서 표시함 
        int totalPrice = 0;
        for (int i = 0; i < orderList.Count; i++)
        {
            totalPrice += orderList[i].GetTotalPrice();
            GameObject index = Managers.Resource.Instantiate($"Burger/UI/Index");

            Util.FindChild(index, "Order_Name", true).GetComponent<Text>().text = orderList[i].GetNameAndOptions();
            Util.FindChild(index, "Order_Count", true).GetComponent<Text>().text = (orderList[i].GetCount()).ToString();
            Util.FindChild(index, "Order_Price", true).GetComponent<Text>().text = (orderList[i].GetTotalPrice()).ToString();

            index.GetComponent<RectTransform>().SetSizeWithCurrentAnchors(RectTransform.Axis.Horizontal, Content_Rect.sizeDelta.x);

            // Content 아래 요소로 출력
            index.transform.SetParent(Content_Obj.transform);
            index.transform.localScale = new Vector3(1f, 1f, 1f);
        }

        Content_Rect.SetSizeWithCurrentAnchors(RectTransform.Axis.Vertical, 17 * orderList.Count + 3);

        ShowTotalPrice(totalPrice);
    }

    public void CancelPayment()
    {
        // 모든 index object 삭제
        Managers.UI.Orders.removeAllIndexObject();

        // 주문 리스트 비우기
        Managers.UI.Orders.orderList.Clear();
        Managers.UI.Orders.ShowTotalPrice(0);
    }

    public void Payment()
    {
        if (Managers.UI.Orders.orderList.Count == 0)
            return;
        if (SceneManager.GetActiveScene().name == "Burger_Tutorial" && Managers.tutorialNo == 14)
        {
            GameObject target = GameObject.Find("point_payment");
            target.SetActive(false);
            Managers.tutorialNo++;
            Managers.boxFlag = true;
            Managers.Sound.Play("BurgerTutorial/" + Managers.tutorialNo);
        }
        Managers.UI.ShowPopupUI<GoHere>();
    }

    public void removeAllIndexObject()
    {
        // Contents 객체 가져옴
        GameObject Content_Obj = GameObject.Find("Content");
        if (Content_Obj == null)
            return;
        // Contents 객체의 자식들을 가져옴
        Transform[] children = Content_Obj.transform.GetComponentsInChildren<Transform>();
        if (children != null)
        {
            // 자식들 중에서 
            for (int i = 0; i < children.Length; i++)
            {
                // index가 아니면 continue
                if (!children[i].gameObject.name.Equals("Index"))
                    continue;
                // index이면 삭제
                Destroy(children[i].gameObject);
            }
        }
    }

    public void ShowTotalPrice(int price)
    {
        // order list에 있는 모든 아이템 가격의 총합을 표시함
        GameObject Order_Bottom_Obj = GameObject.Find("Order_Bottom");
        if (Order_Bottom_Obj == null)
            return;

        Util.FindChild(Order_Bottom_Obj, "TotalPrice", true).GetComponent<Text>().text = String.Format("{0:#,0}", price) + " 원";

    }

    public string GetTotalPrice()
    {
        GameObject Order_Bottom_Obj = GameObject.Find("Order_Bottom");
        return Util.FindChild(Order_Bottom_Obj, "TotalPrice", true).GetComponent<Text>().text;
    }

    public List<SelectedItem> GetSelectedItems()
    {
        return orderList;
    }


    // 키오스크 UI 하단에 있는 주문 리스트에서 x 버튼을 누르면 호출되는 메소드
    // 여기서 바로 처리하지 않고 Managers에 연결된 Orders를 호출하여 RemoveAndReload를 통해 list에 있는 해당 아이템을 지움
    public void RemoveItem()
    {
        // 클릭된 오브젝트(x 버튼)의 부모 오브젝트 == Index 
        GameObject TargetItem = EventSystem.current.currentSelectedGameObject.transform.parent.gameObject;
        Managers.UI.Orders.RemoveAndReload(TargetItem);
    }
}