using UnityEngine;

public class MoveBusSceneWorld : MonoBehaviour
{
    public PathCreation.PathCreator pathCreator;
    public PathCreation.EndOfPathInstruction endOfPathInstruction;
    public float speed = 5;

    private OnBusController onBusController;

    float distanceTravelled;

    void Start() {
        if (pathCreator != null)
        {
            // Subscribed to the pathUpdated event so that we're notified if the path changes during the game
            pathCreator.pathUpdated += OnPathChanged;
        }
        onBusController = GameObject.Find("BusForScene").GetComponent<OnBusController>();
    }

    void FixedUpdate()
    {
        if (pathCreator != null && onBusController._state == OnBusController.BusState.Drive)
        {
            distanceTravelled += speed * Time.fixedDeltaTime;
            transform.position = pathCreator.path.GetPointAtDistance(distanceTravelled, endOfPathInstruction);
            transform.rotation = Quaternion.Euler(pathCreator.path.GetRotationAtDistance(distanceTravelled, endOfPathInstruction).eulerAngles.x, pathCreator.path.GetRotationAtDistance(distanceTravelled, endOfPathInstruction).eulerAngles.y, 0);
        }
    }

    // If the path changes during the game, update the distance travelled so that the follower's position on the new path
    // is as close as possible to its position on the old path
    void OnPathChanged() {
        distanceTravelled = pathCreator.path.GetClosestDistanceAlongPath(transform.position);
    }
}
