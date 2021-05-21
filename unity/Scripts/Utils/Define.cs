using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Define
{
  public enum Scene
  {
    Unknow,
    LobbyScene,
    PlazaScene,
    BusScene,
    Burger_Tutorial,
    Burger,
    BusTutorialPlaza,
    TutorialBusScene,
  }

  public enum UIEvent
  {
    Click,
    Drag,
  }

  public enum MouseEvent
  {
    Press,
    Click,
    Drag,
  }
  public enum CameraMode
  {
    QuarterView,
  }
    public enum Sound
    {
        Bgm,
        Effect,
        MaxCount,
    }
}
