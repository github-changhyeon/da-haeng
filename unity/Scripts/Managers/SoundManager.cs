using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class SoundManager
{

    AudioSource[] _audioSources = new AudioSource[(int) Define.Sound.MaxCount];
    Dictionary<string, AudioClip> _audioClips = new Dictionary<string, AudioClip>();

    public void Init()
    {
        GameObject root = GameObject.Find("@Sound");
        if(root == null)
        {
            root = new GameObject { name = "@Sound" };
            Object.DontDestroyOnLoad(root);

            string[] soundNames = System.Enum.GetNames(typeof(Define.Sound));
            for(int i = 0; i < soundNames.Length-1; i++)
            {
                GameObject gameObject = new GameObject { name = soundNames[i] };
                _audioSources[i] = gameObject.AddComponent<AudioSource>();
                gameObject.transform.parent = root.transform;
            }
            _audioSources[(int)Define.Sound.Bgm].loop = true;
        }
    }

    public void StopEffect()
    {
        _audioSources[(int)Define.Sound.Effect].clip = null;
        _audioSources[(int)Define.Sound.Effect].Stop();
    }

    public void Clear()
    {
        foreach(AudioSource audioSource in _audioSources)
        {
            audioSource.clip = null;
            audioSource.Stop();
        }
        _audioClips.Clear();
    }

    public void Play (string path, Define.Sound type = Define.Sound.Effect, float pitch = 1.0f)
    {
        AudioClip audioClip = GetOrAddAudioClip(path, type);
        Play(audioClip, type, pitch);
    }

    public void Play(AudioClip audioClip, Define.Sound type = Define.Sound.Effect, float pitch = 1.0f)
    {
        if (audioClip == null)
            return;

        if (type == Define.Sound.Bgm)
        {
            // Debug.Log("bgm start");
        }
        else
        {
            // Debug.Log("effect");
        }

        if (type == Define.Sound.Bgm)
        {
            AudioSource audioSource = _audioSources[(int)Define.Sound.Bgm];

            if (audioSource.isPlaying)
                audioSource.Stop();

            audioSource.pitch = pitch;
            audioSource.clip = audioClip;
            audioSource.Play();
        }
        else
        {
            AudioSource audioSource = _audioSources[(int)Define.Sound.Effect];

            audioSource.pitch = pitch;
            audioSource.PlayOneShot(audioClip);
        }

        
    }

    AudioClip GetOrAddAudioClip(string path, Define.Sound type = Define.Sound.Effect)
    {
        if (path.Contains("Sound/") == false)
            path = "Sound/" + path;

        AudioClip audioClip = null;

        if (type == Define.Sound.Bgm)
        {
            audioClip = Managers.Resource.Load<AudioClip>(path);
        }
        else
        {
            if (_audioClips.TryGetValue(path, out audioClip) == false)
            {
                audioClip = Managers.Resource.Load<AudioClip>(path);
                _audioClips.Add(path, audioClip);
            }
        }
        if (audioClip == null)
        {
            // Debug.Log($"AudioClip Missing: {path}");
        }

        return audioClip;
    }

    public void SetBGM(string scene)
    {
        if (scene == "LobbyScene")
            Play("Sound/bgm/toy town", Define.Sound.Bgm);
        else if (scene == "PlazaScene")
            Play("Sound/bgm/with my puppy", Define.Sound.Bgm);
        else if (scene == "Burger" || scene == "BusScene")
        {
            Play("Sound/bgm/cooking time", Define.Sound.Bgm);
            if(Managers.IsPractice)
                _audioSources[(int)Define.Sound.Bgm].volume = 0.5f;
        }
        else if (scene == "Burger_Tutorial" || scene == "BusTutorialPlaza")
        {
            Play("Sound/bgm/cooking time", Define.Sound.Bgm);
            _audioSources[(int)Define.Sound.Bgm].volume = 0.17f;
        }
    }

}
