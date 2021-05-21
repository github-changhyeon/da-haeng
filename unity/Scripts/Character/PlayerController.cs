using UnityEngine;
using UnityEngine.UI;
using Photon.Pun;
using System.Runtime.InteropServices;


public class PlayerController : MonoBehaviourPun 
{
    private Animator animator;
    private float rotateSpeed = 1.2f;
    // private Vector3 velocity;
    private CharacterController characterController;
    private float gravity = -9.81f;
    private float jumpForce = 2.0f;
    private float timeT = 0f;
    private Text childText;
    private Canvas childCanvas;
    private Vector3 characterPosition =  new Vector3(0, 0, 0);
    private UserPlayInfo userPlayInfoScript;
    // for Sit On 
    private bool isWalkingTowards = false;
    private bool sittingOn = false;
    private Vector3 chairPosition = new Vector3(0, 0, 0);
    private GameObject targetChair;
    private float timeForSit = 0f;
    private bool isStanding = false;
    private bool isStartCountTime;
    private float countTime;
    private bool isMoveCharacter;


    [DllImport("__Internal")]
    private static extern void SendResult (string resultInfo);

    private void Awake()
    {
        animator = GetComponent<Animator>();
        characterController = GetComponent<CharacterController>();
    }

    private void Start()
    {
        childCanvas = GetComponentInChildren<Canvas>();
        childText = GetComponentInChildren<Text>();
        PlayInfo tempPlayInfo = GameObject.Find("PlayInfoObj").GetComponent<PlayInfoObj>().playInfo;
        userPlayInfoScript = GetComponentInChildren<UserPlayInfo>();
        userPlayInfoScript.userPlayInfo = new PlayInfo(tempPlayInfo.playerName, tempPlayInfo.playerID, tempPlayInfo.category, tempPlayInfo.playType, tempPlayInfo.stage);
        userPlayInfoScript.userPlayInfo.busStopName = tempPlayInfo.busStopName;
        userPlayInfoScript.userPlayInfo.isRode101 = tempPlayInfo.isRode101;
        userPlayInfoScript.userPlayInfo.isRode102 = tempPlayInfo.isRode102;
        userPlayInfoScript.userPlayInfo.rideCnt = tempPlayInfo.rideCnt;
        // Debug.Log("인포" + userPlayInfoScript.userPlayInfo.playerName);
        isStartCountTime = false;
        isMoveCharacter = true;
        countTime = 0f;
        // Destroy(GameObject.Find("PlayInfoObj"));
        //string tmp = Util.FindChild(gameObject, "Nickname", true).GetComponent<Text>().text;
        //Debug.Log($"{tmp}");
        //Util.FindChild(gameObject, "Nickname", true).GetComponent<Text>().text = userPlayInfoScript.userPlayInfo.playerName;
        if(photonView.IsMine && userPlayInfoScript.userPlayInfo.playType == "practice")
        {   
            
            if(userPlayInfoScript.userPlayInfo.rideCnt == 0)
            {
                Managers.Sound.Play("BusPractice/"+ userPlayInfoScript.userPlayInfo.stage);
                if (userPlayInfoScript.userPlayInfo.stage == 1)
                {
                    string practiceDescription = "101번 버스를 타고 광장 서문에서 내리기\n(시작 위치는 상관없음)";
                    Util.FindChild(gameObject, "Talk_Text", true).GetComponent<Text>().text = practiceDescription;
                    Util.FindChild(gameObject, "PracticeLargeCanvas", true).GetComponent<Canvas>().enabled = true;
                }
                else if(userPlayInfoScript.userPlayInfo.stage == 2)
                {
                    string practiceDescription = "102번 버스를 타고 광장 북문에서 내리기\n(시작 위치는 상관없음)";
                    Util.FindChild(gameObject, "Talk_Text", true).GetComponent<Text>().text = practiceDescription;
                    Util.FindChild(gameObject, "PracticeLargeCanvas", true).GetComponent<Canvas>().enabled = true;

                }
                else if(userPlayInfoScript.userPlayInfo.stage == 3)
                {
                    string practiceDescription = "버스 한번 환승해서 광장 동문에서 내리기\n(제한조건: 101, 102버스 모두 이용하기)";
                    Util.FindChild(gameObject, "Talk_Text", true).GetComponent<Text>().text = practiceDescription;
                    Util.FindChild(gameObject, "PracticeLargeCanvas", true).GetComponent<Canvas>().enabled = true;
                }
            }
            else if(userPlayInfoScript.userPlayInfo.rideCnt == 1 && userPlayInfoScript.userPlayInfo.stage == 1)
            {
                // Debug.Log("역이름  " + userPlayInfoScript.userPlayInfo.isRode101);
                // Debug.Log("역이름  " + userPlayInfoScript.userPlayInfo.busStopName);
                isMoveCharacter = false;
                string resultInfo = null;
                if(userPlayInfoScript.userPlayInfo.isRode101 && userPlayInfoScript.userPlayInfo.busStopName == "WestBusStop")
                {
                    Util.FindChild(gameObject, "SuccessBus", true).GetComponent<Canvas>().enabled = true;
                    resultInfo = "success";
                }
                else{
                    Util.FindChild(gameObject, "TryAgainBus", true).GetComponent<Canvas>().enabled = true;
                    resultInfo = "fail";
                }
                #if (UNITY_WEBGL == true && UNITY_EDITOR == false)
                SendResult (resultInfo);
                #endif
                isStartCountTime = true;
            }
            else if(userPlayInfoScript.userPlayInfo.rideCnt == 1 && userPlayInfoScript.userPlayInfo.stage == 2)
            {
                isMoveCharacter = false;
                string resultInfo = null;

                if(userPlayInfoScript.userPlayInfo.isRode102 && userPlayInfoScript.userPlayInfo.busStopName == "NorthBusStop")
                {
                    Util.FindChild(gameObject, "SuccessBus", true).GetComponent<Canvas>().enabled = true;
                    resultInfo = "success";
                }
                else{
                    Util.FindChild(gameObject, "TryAgainBus", true).GetComponent<Canvas>().enabled = true;
                    resultInfo = "fail";
                }
                #if (UNITY_WEBGL == true && UNITY_EDITOR == false)
                SendResult (resultInfo);
                #endif
                isStartCountTime = true;
            }
            else if(userPlayInfoScript.userPlayInfo.rideCnt == 1 && userPlayInfoScript.userPlayInfo.stage == 3)
            {
                string practiceDescription = "버스 한번 환승해서 광장 동문에서 내리기\n(제한조건: 101, 102버스 모두 이용하기)";
                Util.FindChild(gameObject, "Info_Text", true).GetComponent<Text>().text = practiceDescription;
                Util.FindChild(gameObject, "PracticeSmallCanvas", true).GetComponent<Canvas>().enabled = true;
            }
            else if(userPlayInfoScript.userPlayInfo.rideCnt == 2 && userPlayInfoScript.userPlayInfo.stage == 3)
            {
                isMoveCharacter = false;
                string resultInfo = null;
                // Debug.Log("101" + userPlayInfoScript.userPlayInfo.isRode101);
                // Debug.Log("102" + userPlayInfoScript.userPlayInfo.isRode102);
                // Debug.Log("busStopName" + userPlayInfoScript.userPlayInfo.busStopName);

                if(userPlayInfoScript.userPlayInfo.isRode101 && userPlayInfoScript.userPlayInfo.isRode102 && userPlayInfoScript.userPlayInfo.busStopName == "EastBusStop")
                {
                    Util.FindChild(gameObject, "SuccessBus", true).GetComponent<Canvas>().enabled = true;
                    resultInfo = "success";
                }
                else{
                    Util.FindChild(gameObject, "TryAgainBus", true).GetComponent<Canvas>().enabled = true;
                    resultInfo = "fail";
                }
                #if (UNITY_WEBGL == true && UNITY_EDITOR == false)
                SendResult (resultInfo);
                #endif
                isStartCountTime = true;
            }
        }
    }

    public void setCanvas(string contents)
    {
        if(photonView.IsMine)
        {
            childText.text = contents;
            childCanvas.enabled = true;
        }
    }

    public void SetBusStopName(string busStopName)
    {
        if(photonView.IsMine)
        {
            userPlayInfoScript.userPlayInfo.busStopName = busStopName;
        }
    }
    public void SetBusNum(string busNum)
    {
        if(photonView.IsMine)
        {
            if(busNum == "Bus101")
            {
                userPlayInfoScript.userPlayInfo.isRode101 = true;
            }
            else
            {
                userPlayInfoScript.userPlayInfo.isRode102 = true;
            }
            userPlayInfoScript.userPlayInfo.busNum = busNum;
        }
    }

    public void ClickNextBtnFunc()
    {
        if(photonView.IsMine)
        {
            Util.FindChild(gameObject, "PracticeLargeCanvas", true).GetComponent<Canvas>().enabled = false;
            Util.FindChild(gameObject, "Info_Text", true).GetComponent<Text>().text = Util.FindChild(gameObject, "Talk_Text", true).GetComponent<Text>().text;
            Util.FindChild(gameObject, "PracticeSmallCanvas", true).GetComponent<Canvas>().enabled = true;
        }
    }

    public void SetRideCnt(int rideCnt)
    {
        if(photonView.IsMine)
        {
            userPlayInfoScript.userPlayInfo.rideCnt = rideCnt;
        }
    }


 public void sitOn(GameObject chair, Vector3 chairPos)
    {
        if (!sittingOn)
        {
            animator.SetBool("Walk", true);
            isWalkingTowards = true;
            chairPosition = chairPos;
            targetChair = chair;
        }
    }

    public void standUp()
    {
        if(photonView.IsMine)
        {
            animator.SetBool("Walk", false);

            animator.SetBool("Stand", true);
            isStanding = true;
            sittingOn = false;
            isWalkingTowards = false;
            timeForSit = 0f;
            // Debug.Log("그래서??" + sittingOn);
            animator.SetBool("Sit", false);

        }
    }
    private void StartJump()
    {
        characterPosition.y = jumpForce;
    }
    private void StartStandJump()
    {
        characterPosition.y = jumpForce*1.5f;
    }
    private void MoveCharacter()
    {
        float h = Input.GetAxis ("Horizontal");				
        float v = Input.GetAxis ("Vertical");
        float speedWeight = 0.45f;
        bool isRun = Input.GetKey("left shift");
        bool isPushJump = Input.GetKey("space");
        // if(v > 0f)
        // {
        //     sittingOn = false;
        // }
        
        if(isRun)
        {
            animator.SetFloat("Run", v);
            speedWeight = 1.1f;
        }
        else{
            animator.SetFloat("Run", 0f);

        }
        if(isPushJump)
        {
            animator.SetBool("StandJump", true);
            animator.SetBool("RunJump", true);
            speedWeight = 1.1f;

        }
        else{
            animator.SetBool("StandJump", false);
            animator.SetBool("RunJump", false);
        }
        animator.SetFloat ("Speed", v);							
        animator.SetFloat ("Direction", h);

        // Debug.Log("싯팅온 " + sittingOn);
        if (!sittingOn) { 
            transform.Rotate(0, h*rotateSpeed, 0);
        }

        characterPosition.x = 0f;
        characterPosition.z = v * speedWeight;
        characterPosition = transform.TransformDirection (characterPosition);
        if(!characterController.isGrounded)
        {
            characterPosition.y += gravity* 0.6f*Time.fixedDeltaTime;

        }
        characterController.Move(characterPosition * 5.0f * Time.fixedDeltaTime);

    }

    private void FixedUpdate()
    {
            
        if(photonView && !photonView.IsMine)
        {
            return;
        }

        if(isStartCountTime)
        {
            // Debug.Log("으ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ");
            countTime += Time.fixedDeltaTime;
            if(countTime >= 4f)
            {
                isStartCountTime = false;
                countTime = 0f;
                // Debug.Log("여기ㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣ");
                #if (UNITY_WEBGL == true && UNITY_EDITOR == false)
                SendResult ("close");
                #endif
            }
        }
        if(isMoveCharacter)
        {
            MoveCharacter();
        }

        if (childCanvas.enabled)
            {
                timeT += Time.fixedDeltaTime;
                if(timeT > 3f)
                {
                    childCanvas.enabled = false;
                    timeT = 0f;
                }            
            }


        if (isWalkingTowards)
        {
            Vector3 targetDir;
            targetDir = chairPosition;
            timeForSit += Time.fixedDeltaTime;

            if (timeForSit > 1f)
            {
                animator.SetBool("Sit", true);
                //turn chracter aroudn to align forward vector
                //with object's vector
                transform.rotation = targetChair.transform.rotation;
                transform.Translate(Vector3.forward * -0.02f);
                animator.SetBool("Walk", false);
                isWalkingTowards = false;
                sittingOn = true;
                timeForSit = 0f;

            }
             
        }

        if (isStanding)
        {
            animator.SetBool("Idle", true);
            isStanding = false;
            animator.SetBool("Stand", false);
        }

        if (Input.GetKey(KeyCode.U))
        {
            if (sittingOn)
            {
                standUp();
            }
        }
    }

}
