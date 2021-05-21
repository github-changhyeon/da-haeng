using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class testtest : MonoBehaviour
{
    // Start is called before the first frame update
    GameObject go;
    Image image1;
    Image image2;
    Text text;

    void Start()
    {
        go = Managers.Resource.Instantiate("UI/Notification", null);
        image1 = Util.FindChild(go, "Panel1", true).GetComponent<Image>();
        image2 = Util.FindChild(go, "Panel2", true).GetComponent<Image>();
        text = Util.FindChild(go, "Text", true).GetComponent<Text>();
        // StartCoroutine(FadeImage(true));
    }

    // Update is called once per frame
    // void Update()
    // {
    //     Util.FindChild(go, "Text", true).GetComponent<Text>().color = new Color(0, 0, 0, 0);
    //     StartCoroutine(FadeImage(false));
    // }

    IEnumerator FadeImage(bool fadeAway)
    {
        // fade from opaque to transparent
        if (fadeAway)
        {
            // loop over 1 second backwards
            for (float i = 0.5f; i >= 0; i -= Time.deltaTime/3)
            {
                // set color with i as alpha
                // Debug.Log("haha");
                // if(i > image1.color.a){continue;}
                image1.color = new Color(image1.color.r, image1.color.g, image1.color.b, i);
                image2.color = new Color(image2.color.r, image2.color.g, image2.color.b, i);
                text.color = new Color(text.color.r, text.color.g, text.color.b, i);
                yield return null;
            }
        }
        // fade from transparent to opaque
        // else
        // {
        //     // loop over 1 second
        //     for (float i = 0; i <= 1; i += Time.deltaTime)
        //     {
        //         // set color with i as alpha
        //         image1.color = new Color(1, 1, 1, i);
        //         yield return null;
        //     }
        // }
    }

}
