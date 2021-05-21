using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;


// 역할: 이벤트 시스템이 뭔가 일어났다는거를 감지했을 경우 이벤트를 쫙 던져 줄때 UI에서 catch해서 콜백해줌
public class UI_EventHandler : MonoBehaviour, IBeginDragHandler, IDragHandler, IPointerClickHandler
{

    // Drag
    public Action<PointerEventData> OnBeginDragHandler = null;
    public Action<PointerEventData> OnDragHandler = null;

    // Click
    public Action<PointerEventData> OnClickHandler = null;


    // Drag 시작햇을때 
    public void OnBeginDrag(PointerEventData eventData)
    {
        if (OnBeginDragHandler != null)
            // eventData를 전파
            OnBeginDragHandler.Invoke(eventData);
    }
    // Drag 일어나고 있는지 
    public void OnDrag(PointerEventData eventData)
    {
        if (OnDragHandler != null)
            // eventData를 전파
            OnDragHandler.Invoke(eventData);
    }

    // Click 일어나고 있는지 
    public void OnPointerClick(PointerEventData eventData)
    {
        // Debug.Log($"Event_Handler: {eventData}");
        if (OnClickHandler != null)
            // eventData를 전파
            OnClickHandler.Invoke(eventData);
    }

}
