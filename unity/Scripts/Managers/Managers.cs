using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;


// MonoBehaviour를 빼주고 전역으로 사용
public class Managers : MonoBehaviour
{

  static Managers s_instance;       // 유일성이 보장된다
  static Managers Instance { get { Init(); return s_instance; } }  // 유일한 매니저를 갖고온다.

  InputManagers _input = new InputManagers();
  ResourceManager _resource = new ResourceManager();
  UIManager _ui = new UIManager();
  SceneManagerEx _scene = new SceneManagerEx();
    SoundManager _sound = new SoundManager();

  // 내가 지정한 이름으로 가져오기
  public static InputManagers Input { get { return Instance._input; } }
  public static ResourceManager Resource { get { return Instance._resource; } }
  public static UIManager UI { get { return Instance._ui; } }
  public static SceneManagerEx Scene { get { return Instance._scene; } }
  public static SoundManager Sound { get { return Instance._sound; } }


    private static bool isPractice = true;
    private static int stageNo = 1;
    public static bool IsPractice { get { return isPractice; } }
    public static int StageNo { get { return stageNo; } }

    public static int tutorialNo = 1;
    public static int TutorialNo { get { return tutorialNo;  } }

    public static bool boxFlag = true;
    public static bool BoxFlag { get { return boxFlag; } }


    void Start()
  {
    // 초기화
    Init();

  }

  // Update is called once per frame
  void Update()
  {
    _input.OnUpdate();
  }

  static void Init()
  {
    if (s_instance == null)
    {
      GameObject go = GameObject.Find("@Managers");
      if (go == null)
      {
        go = new GameObject { name = "@Managers" };
        go.AddComponent<Managers>();
      }
      DontDestroyOnLoad(go);
      s_instance = go.GetComponent<Managers>();
            s_instance._sound.Init();
            Sound.SetBGM(SceneManager.GetActiveScene().name);
     }
     string playType = GameObject.Find("PlayInfoObj").GetComponent<PlayInfoObj>().playInfo.playType;
     int stage = GameObject.Find("PlayInfoObj").GetComponent<PlayInfoObj>().playInfo.stage;
  
    stageNo = stage;
    isPractice =  playType == "practice" ? true : false;
  }

    public static void Clear()
    {
        Sound.Clear();
        Input.Clear();
        UI.Clear();
        Scene.Clear();
    }

    public void PracticeSetting(int stage)
    {
        isPractice = true;
        stageNo = stage;
    }
}
