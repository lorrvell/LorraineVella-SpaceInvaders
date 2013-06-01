#pragma strict
var laserSlot:Rigidbody;
static var score:int;
static var health:int; //static meaning the only one in the game
static var shotsfired:int;
static var shotshit:int;

var level:int;

var style:GUISkin;
var boost:boolean;
var speed:int;
var n:int;

function Start ()
{
	health = 20;
	shotsfired = 0;
	shotshit = 0;
	score = 0;
	boost = false;
	DontDestroyOnLoad(this.gameObject);
	
}


function Update ()
{	
	borderController.EnableBorders(this.transform);
	transform.Translate(Vector3.right * speed * Input.GetAxis("Horizontal") * Time.deltaTime);
	
	//shoot the laser
	if(Input.GetKeyDown(KeyCode.Space))
	{
		Instantiate(laserSlot,transform.position,transform.rotation);
		shotsfired++;
	}	
		
	if (health <= 0)
	{
		health = 0;
		Destroy(GameObject.FindGameObjectWithTag("spaceship"));
		//game ends .... goes to game over scene
		Application.LoadLevel(8);
	}
	else 
	{
		if (health > 20)
		{
			health = 20;
		}
	}
	
	if(n<6)
	{
		var myAlienGenerator:alienGenerator;
		myAlienGenerator=GameObject.FindGameObjectWithTag("swarm").GetComponent(alienGenerator);
	
		if(myAlienGenerator.aliencount<=0)
		{
			score = 0;
			level = Application.loadedLevel;
			n = level+1;
			Application.LoadLevel(n);
		}
	}
	else
	{
		if (laserController.bosshealth==0)
		{
			Destroy(GameObject.FindGameObjectWithTag("spaceship"));
			Application.LoadLevel(9);
		}
	}
}

function OnGUI()
{
	var shotsmissed:int;
	shotsmissed = shotsfired - shotshit;
	
	GUI.skin = style;
	GUILayout.BeginArea(Rect(0,0,1024,40));
	GUILayout.BeginHorizontal();
	GUILayout.Label("Name: "+nameController.username);
	GUILayout.FlexibleSpace();
	GUILayout.Label("Score: "+score);
	GUILayout.FlexibleSpace();
	GUILayout.Label("Health: "+health);
	GUILayout.FlexibleSpace();
	GUILayout.Label("Shots Fired: "+shotsfired);
	GUILayout.FlexibleSpace();
	GUILayout.Label("Shots Hit: "+shotshit);
	GUILayout.FlexibleSpace();
	GUILayout.Label("Shots Missed: "+shotsmissed);
	GUILayout.FlexibleSpace();
	GUILayout.EndHorizontal();
	GUILayout.EndArea();
}

function OnTriggerEnter(other:Collider)
{
	if(other.gameObject.tag=="enemylaser")
	{
		health--;
	}
	
	if(other.gameObject.tag=="healthboost")
	{
		if (health < 20)
		{
			health = health + 5;
		}
		Destroy(GameObject.FindGameObjectWithTag("healthboost"));
	}
	
	if(other.gameObject.tag=="speedboost")
	{
		Destroy(GameObject.FindGameObjectWithTag("speedboost"));
		boost = true;
		speed = 30;
		yield WaitForSeconds (5);
		boost = false;
		speed = 15;
	}
}

