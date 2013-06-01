#pragma strict

var style:GUISkin;

function Start () {

}

function Update () {

}

function OnGUI()
{
	GUI.skin = style; 
	
	GUILayout.BeginArea(Rect(Screen.width/2-100, Screen.height/2-50, 200, 200));
	
	if(GUILayout.Button("Main Menu"))
		{
			Application.LoadLevel(0);
		}
		
	GUILayout.EndArea();
}