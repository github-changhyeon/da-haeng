using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class UI_Popup : UI_Base
{
  public virtual void Init()
  {
    // sorting 해주세요
    Managers.UI.SetCanvas(gameObject, true);
    // Debug.Log("order");
  }

  public virtual void ClosePopupUI()
  {
    Managers.UI.ClosePopupUI(this);
  }

}

