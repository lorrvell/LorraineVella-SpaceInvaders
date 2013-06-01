#pragma strict

static var username = "Type your name here";
var checkname: boolean = false;
var style:GUISkin;

function Start ()
{
	username = "Type your name here";

}

function Update ()
{

}

function OnGUI()
{
	GUI.skin = style;
	
	if(checkname == true)
	{
		Application.LoadLevel(1);
		
	} 
	else 
	{
		GUILayout.BeginArea (Rect(Screen.width/2-100,Screen.height/2-50,200,200));
		username = GUILayout.TextField(username);
		
		//If user presses on the button but the name is empty, it will remain on the same screen
		if(GUILayout.Button("Start Game"))
		{
			if(username == "Type your name here")
			{
				checkname = false;				
			} 
			else 
			{
				checkname = true;
			}
		}
		GUILayout.EndArea();
	}
}

