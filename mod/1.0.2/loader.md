# Version detecting 10+ bug

## `scripts` -> `lego.Loader`

Original:

```
class lego.Loader
{
	// ...
	function checkFlashPlayer()
	{
		this.log(this.getText("DETECTING"),lego.Loader.NORMAL_LOG_COLOR[0],lego.Loader.NORMAL_LOG_COLOR[1]);
		var _loc2_ = System.capabilities.version;
		var _loc3_ = Number(_loc2_.split(" ")[1].substring(0,1));
		var _loc4_ = System.capabilities.playerType.length != 0?" (" + System.capabilities.playerType + ")":" ";
		this.log("Flash player" + _loc4_ + " <b>" + _loc2_ + "</b>",lego.Loader.NORMAL_LOG_COLOR[0],lego.Loader.NORMAL_LOG_COLOR[1]);
		if(_loc3_ >= 8)
		{
			return true;
		}
		this.log(this.getText("BAD_FLASHPLAYER"),lego.Loader.ERROR_LOG_COLOR[0],lego.Loader.ERROR_LOG_COLOR[1]);
		return false;
	}
	// ...
}
```

Modified:

```
class lego.Loader
{
	// ...
	function checkFlashPlayer()
	{
		this.log(this.getText("DETECTING"),lego.Loader.NORMAL_LOG_COLOR[0],lego.Loader.NORMAL_LOG_COLOR[1]);
		var _loc2_ = System.capabilities.version;
		var _loc3_ = Number(_loc2_.split(" ")[1].split(",")[0]);
		var _loc4_ = System.capabilities.playerType.length != 0?" (" + System.capabilities.playerType + ")":" ";
		this.log("Flash player" + _loc4_ + " <b>" + _loc2_ + "</b>",lego.Loader.NORMAL_LOG_COLOR[0],lego.Loader.NORMAL_LOG_COLOR[1]);
		if(_loc3_ >= 8)
		{
			return true;
		}
		this.log(this.getText("BAD_FLASHPLAYER"),lego.Loader.ERROR_LOG_COLOR[0],lego.Loader.ERROR_LOG_COLOR[1]);
		return false;
	}
	// ...
}
```


# Hide context menu keeping the projector menu bar

When hiding the menu it removes the menu bar from a projector, leaving overflow.

Setting a custom menu with hidden built-in items does the same thing, keeping the menu bar.

## `scripts` -> `lego.Loader`

Original:

```
class lego.Loader
{
	// ...
	function Loader(mcRoot)
	{
		this.init(mcRoot);
		Stage.showMenu = false;
		this.start();
	}
	// ...
}
```

Modified:

```
class lego.Loader
{
	// ...
	function Loader(mcRoot)
	{
		this.init(mcRoot);
		var _loc4_ = new ContextMenu();
		_loc4_.hideBuiltInItems();
		_root.menu = _loc4_;
		this.start();
	}
	// ...
}
```
