using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class TestSound : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }


    public AudioClip audioClip;
    public AudioClip audioClip2;

    public void OnClick()
    {
        /*        AudioSource audioSource = GetComponent<AudioSource>();
                audioSource.PlayOneShot(audioClip);
                audioSource.PlayOneShot(audioClip2);
                float lifeTime = Mathf.Max(audioClip.length, audioClip2.length);
                GameObject.Destroy(gameObject, lifeTime);*/
        // Debug.Log("zzz");
        Managers.Sound.Play("Sound/01");
    }
}
