# Alternative saving

## `scripts` -> `lego.core.externalData.CharacterLoadRequest`

Original:

```
class lego.core.externalData.CharacterLoadRequest extends XML
{
	// ...
	function loadCharacter(sLogin, sPassword)
	{
		this.load(lego.Constants.WEBSERVICE_PATH + "GetProfile");
	}
	// ...
}
```

Modified:

```
class lego.core.externalData.CharacterLoadRequest extends XML
{
	// ...
	function loadCharacter(sLogin, sPassword)
	{
		if(_global.__voyanui)
		{
			_global.__voyanui.loadCharacter(this,lego.Constants.WEBSERVICE_PATH + "GetProfile");
		}
		else
		{
			this.load(lego.Constants.WEBSERVICE_PATH + "GetProfile");
		}
	}
	// ...
}
```

## `scripts` -> `lego.core.externalData.CharacterLoadRequest`

Original:

```
class lego.core.externalData.CharacterSaveRequest extends LoadVars
{
	// ...
	function saveState(player)
	{
		if(player.getGfx() != player.getType())
		{
			return undefined;
		}
		var _loc3_ = "";
		for(var i in player.getCurrentStep().getObjectives())
		{
			if(player.getCurrentStep().getObjectives()[i].isFinished())
			{
				if(_loc3_ < 1)
				{
					_loc3_ = player.getCurrentStep().getObjectives()[i].getID();
				}
				else
				{
					_loc3_ = _loc3_ + ("," + player.getCurrentStep().getObjectives()[i].getID());
				}
			}
		}
		var _loc4_ = "";
		for(var i in player.getInventory())
		{
			var _loc5_ = player.getInventory()[i];
			if(_loc4_.length < 1)
			{
				_loc4_ = _loc5_.getID() + "~" + _loc5_.getQuantity() + "~0";
			}
			else
			{
				_loc4_ = _loc4_ + ("," + _loc5_.getID() + "~" + _loc5_.getQuantity() + "~0");
			}
		}
		var _loc6_ = 0;
		while(_loc6_ < 6)
		{
			if(player.getEquippedItem(_loc6_) != undefined)
			{
				if(_loc4_.length < 1)
				{
					_loc4_ = player.getEquippedItem(_loc6_).getID() + "~1~" + (_loc6_ + 1);
				}
				else
				{
					_loc4_ = _loc4_ + ("," + player.getEquippedItem(_loc6_).getID() + "~1~" + (_loc6_ + 1));
				}
			}
			_loc6_ = _loc6_ + 1;
		}
		var _loc7_ = lego.Constants.WEBSERVICE_PATH + "UpdateProfile?" + "characterExperience=" + player.getCharacteristics().experience + "&characterMap=" + player.getCurrentPositionMap() + "&characterCell=" + player.getCurrentPositionCell() + "&characterBonusAttack=" + player.getAttackPoint() + "&characterBonusDefence=" + player.getDefensePoint() + "&characterBonusTechnik=" + player.getTechnicalPoint() + "&characterStepId=" + player.getCurrentStep().getID() + "&characterStepObjectiveFinished=" + _loc3_ + "&characterInventory=" + _loc4_ + "&Hash=";
		this.load(_loc7_);
	}
	function saveCharacter(characterType, characterName)
	{
		var _loc4_ = lego.Constants.WEBSERVICE_PATH + "UpdateBreedandName?" + "characterBreed=" + String(characterType) + "&characterName=" + characterName + "&Hash=";
		this.load(_loc4_);
	}
}
```

Modified:

```
class lego.core.externalData.CharacterSaveRequest extends LoadVars
{
	// ...
	function saveState(player)
	{
		if(player.getGfx() != player.getType())
		{
			return undefined;
		}
		var _loc3_ = "";
		for(var i in player.getCurrentStep().getObjectives())
		{
			if(player.getCurrentStep().getObjectives()[i].isFinished())
			{
				if(_loc3_ < 1)
				{
					_loc3_ = player.getCurrentStep().getObjectives()[i].getID();
				}
				else
				{
					_loc3_ = _loc3_ + ("," + player.getCurrentStep().getObjectives()[i].getID());
				}
			}
		}
		var _loc4_ = "";
		for(var i in player.getInventory())
		{
			var _loc5_ = player.getInventory()[i];
			if(_loc4_.length < 1)
			{
				_loc4_ = _loc5_.getID() + "~" + _loc5_.getQuantity() + "~0";
			}
			else
			{
				_loc4_ = _loc4_ + ("," + _loc5_.getID() + "~" + _loc5_.getQuantity() + "~0");
			}
		}
		var _loc6_ = 0;
		while(_loc6_ < 6)
		{
			if(player.getEquippedItem(_loc6_) != undefined)
			{
				if(_loc4_.length < 1)
				{
					_loc4_ = player.getEquippedItem(_loc6_).getID() + "~1~" + (_loc6_ + 1);
				}
				else
				{
					_loc4_ = _loc4_ + ("," + player.getEquippedItem(_loc6_).getID() + "~1~" + (_loc6_ + 1));
				}
			}
			_loc6_ = _loc6_ + 1;
		}
		var _loc7_ = lego.Constants.WEBSERVICE_PATH + "UpdateProfile?" + "characterExperience=" + player.getCharacteristics().experience + "&characterMap=" + player.getCurrentPositionMap() + "&characterCell=" + player.getCurrentPositionCell() + "&characterBonusAttack=" + player.getAttackPoint() + "&characterBonusDefence=" + player.getDefensePoint() + "&characterBonusTechnik=" + player.getTechnicalPoint() + "&characterStepId=" + player.getCurrentStep().getID() + "&characterStepObjectiveFinished=" + _loc3_ + "&characterInventory=" + _loc4_ + "&Hash=";
		if(_global.__voyanui)
		{
			_global.__voyanui.saveState(this,_loc7_);
		}
		else
		{
			this.load(_loc7_);
		}
	}
	function saveCharacter(characterType, characterName)
	{
		var _loc4_ = lego.Constants.WEBSERVICE_PATH + "UpdateBreedandName?" + "characterBreed=" + String(characterType) + "&characterName=" + characterName + "&Hash=";
		if(_global.__voyanui)
		{
			_global.__voyanui.saveCharacter(this,_loc4_);
		}
		else
		{
			this.load(_loc4_);
		}
	}
}
```
