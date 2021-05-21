using UnityEngine;
using UnityEngine.UI;

public class BurgerPlayerController : MonoBehaviour
{
    private Animator animator;
    private float rotateSpeed = 1.2f;
    // private Vector3 velocity;
    private CharacterController characterController;
    private float gravity = -9.81f;
    private float jumpForce = 2.0f;
    // private float timeT = 0f;
    // private Text childText;
    // private Canvas childCanvas;
    private Vector3 characterPosition =  new Vector3(0, 0, 0);
    private TextMesh tm;
    // private UserPlayInfo userPlayInfoScript;

    private void Awake()
    {
        animator = GetComponent<Animator>();
        characterController = GetComponent<CharacterController>();
    }

    private void Start()
    {
        // childCanvas = GetComponentInChildren<Canvas>();
        // childText = GetComponentInChildren<Text>();
        // PlayInfo tempPlayInfo = GameObject.Find("PlayInfoObj").GetComponent<PlayInfoObj>().playInfo;
        // userPlayInfoScript = GetComponentInChildren<UserPlayInfo>();
        // userPlayInfoScript.userPlayInfo = new PlayInfo(tempPlayInfo.playerName, tempPlayInfo.playerID, tempPlayInfo.category, tempPlayInfo.playType, tempPlayInfo.stage);
        // Debug.Log("인포" + userPlayInfoScript.userPlayInfo.playerName);
        // // Destroy(GameObject.Find("PlayInfoObj"));
    }

    // public void setCanvas(string contents)
    // {
    //     if(photonView.IsMine)
    //     {
    //         childText.text = contents;
    //         childCanvas.enabled = true;
    //     }
    // }

    // public void SetBusStopName(string busStopName)
    // {
    //     if(photonView.IsMine)
    //     {
    //         userPlayInfoScript.userPlayInfo.busStopName = busStopName;
    //     }
    // }
    // public void SetBusNum(string busNum)
    // {
    //     if(photonView.IsMine)
    //     {
    //         userPlayInfoScript.userPlayInfo.busNum = busNum;
    //     }
    // }

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
        transform.Rotate(0, h*rotateSpeed, 0);

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
            
            // if(photonView && !photonView.IsMine)
            // {
            //     return;
            // }
            
            MoveCharacter();

            // if(childCanvas.enabled)
            // {
            //     timeT += Time.fixedDeltaTime;
            //     if(timeT > 3f)
            //     {
            //         childCanvas.enabled = false;
            //         timeT = 0f;
            //     }            
            // }
            
    }

}
