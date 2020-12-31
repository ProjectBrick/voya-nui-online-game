# Voya Nui Online Game -- README


## Debug Keys

Press the following debug key combinations to use debug command.

| Key Combination                 | Action                                  |
| :------------------------------ | :-------------------------------------- |
| <kbd>Ctrl</kbd> + <kbd>1</kbd>  | Toggle grid.                            |
| <kbd>Ctrl</kbd> + <kbd>2</kbd>  | Toggle transparent characters.          |
| <kbd>Ctrl</kbd> + <kbd>'</kbd>  | Toggle [debug console](#debug-console). |
| <kbd>Ctrl</kbd> + <kbd>\`</kbd> | Toggle [debug console](#debug-console). |


## Debug Console

In the debug console, the following commands can be entered.

| Command  | Action                                    |
| :------- | :---------------------------------------- |
| `fps`    | Toggle the FPS counter.                   |
| `core`   | Enter module: [`core`](#module-core).     |
| `ui`     | Enter module: [`ui`](#module-ui).         |
| `audio`  | Enter module: [`audio`](#module-audio).   |
| `worker` | Enter module: [`worker`](#module-worker). |
| `..`     | Exit current module.                      |


### Module: `core`

This module contains the following debug commands:

| Command         | Action                                                                                                                                                                         |
| :-------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `info`          | Shows Web Service Path, Asset Path, and Chapters Available.                                                                                                                    |
| `where`         | Shows character name, map number, cell number, and the number of monsters.                                                                                                     |
| `build`         | Shows the build number.                                                                                                                                                        |
| `anim name`     | Play the specified player [animation `name`](#animations).                                                                                                                     |
| `skin id`       | Change player skin to [sprite `id`](#sprites) (not all skins have all animations).                                                                                             |
| `nextstep`      | Skip to next quest.                                                                                                                                                            |
| `onemorenight`  | Adds 1 to chapters available (all chapters are already available).                                                                                                             |
| `step id`       | Move to corresponding [quest `id`](#quests).                                                                                                                                   |
| `chapter id`    | Move to corresponding [chapter `id`](#chapters).                                                                                                                               |
| `god`           | Toggle monsters will attack.                                                                                                                                                   |
| `script name`   | Run the specified [script `name`](#scripts).                                                                                                                                   |
| `cancel`        | Abandon fight.                                                                                                                                                                 |
| `pieceofcake`   | Add to inventory 1 Life Stone, 1 Nui Blaster, 1 Medium Attack Greaves of Air, 1 Medium Attack Armor of Air, 1 Attack Noble Kanohi of Air, 1 Thok Key, and 3 Hidden Caves Keys. |
| `level number`  | Increase level to the specified `number` (`1`-`50`).                                                                                                                           |
| `move id`       | Move to specified [map `id`](#maps).                                                                                                                                           |
| `move x,y`      | Move to specified [map `x` and `y`](#maps).                                                                                                                                    |
| `random a b`    | Generate random number from `a` to `b-1`.                                                                                                                                      |
| `itemlist`      | For listing inventory and equipped inventory, not working.                                                                                                                     |
| `gimmy`         | Gives the player 1 of every item in the game.                                                                                                                                  |
| `equip id`      | Add to inventory 1 of [item `id`](#items).                                                                                                                                     |
| `equip id slot` | Add to inventory 1 of [item `id`](#items) and equip to `slot` (`0`: 2nd, `1`: 3rd, `2`: 4th).                                                                                  |
| `spell`         | Shows the equipped items.                                                                                                                                                      |
| `spell slot`    | Shows info about item equipped to `slot` (`1`: 1st, `2`: 2nd, `3`: 3rd, `4`: 4th).                                                                                             |
| `spell slot id` | Equip to `slot` (`1`: 1st, `2`: 2nd, `3`: 3rd, `4`: 4th) a [spell `id`](#spells) (not all spells have an icon).                                                                |
| `fight`         | Toggle between combat and roleplay modes.                                                                                                                                      |
| `makemerich`    | Add to inventory 10 of stone, earth, water, ice, fire, and air shards.                                                                                                         |


### Module: `ui`

This module contains the following debug commands:

| Command               | Action                                                                                                                                                    |
| :-------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `msgbox text title`   | Show a message dialog with the specified `text` and `title`.                                                                                              |
| `msg text type`       | Show message the the specified `text` and `type` (1: white, 2: red).                                                                                      |
| `sa id name`          | Set sprite animation command [sprite `id`](#sprites) and [animation `name`](#animations).                                                                 |
| `open name`           | Open specified menu `name` (`MainMenu`, `Banner`, `Cinematic`, `ChooseCharacter`, `Timeline`, `Map`, `Quests`, `CenterText`, `InventoryStats`, `Dialog`). |
| `hb button`           | Highlight `button` (`1`-`3`).                                                                                                                             |


### Module: `audio`

This module contains the following debug commands:

| Command      | Action                                        |
| :----------- | :-------------------------------------------- |
| `sound name` | Play [sound `name`](#audio-sounds).           |
| `event name` | Play [event `name`](#audio-events).           |


### Module: `worker`

This module has no debug commands.


### Maps

<!--{MAP}-->


#### Useful Locations

| ID    | Description                          |
| :---- | :----------------------------------- |
| `24`  | Protodermis Lake                     |
| `92`  | Lagoon (starting spot)               |
| `119` | Cave Entrance                        |
| `180` | Garan's Hideout                      |
| `250` | Matoran Santuary                     |
| `283` | Piraka Fortress                      |
| `409` | Chamber of Truth Entrance            |
| `411` | Chamber of the Mask of Life Entrance |
| `413` | Lava Dam Station                     |
| `479` | Matoran Fortress                     |
| `515` | Black Rocks Entrance                 |
| `523` | Ussal Crab Cave                      |


### Chapters

| ID  | Description                                       |
| :-- | :------------------------------------------------ |
| `0` | Entry of the Lagoon                               |
| `1` | The Matoran village                               |
| `2` | The Coasts of Voya Nui                            |
| `3` | The caves of Voya Nui                             |
| `4` | The Voya Nui desert                               |
| `5` | The Black Rocks                                   |
| `6` | The Piraka's virus factory                        |
| `7` | The chamber of truth                              |
| `8` | The Lava Lake and the Chamber of the Mask of Life |
| `9` | The End                                           |


### Quests

| ID    | Description                                                                                                                                                                                                                |
| :---- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `1`   | Talk to Garan the Matoran, and answer to his questions.                                                                                                                                                                    |
| `2`   | Garan needs Ice metal pieces. Bring him back five Ice metal pieces by fighting Gafna.                                                                                                                                      |
| `3`   | Find the Protodermis lake, and fight the Protodermis Burnak.                                                                                                                                                               |
| `4`   | Find the hidden objects in the Matoran village.                                                                                                                                                                            |
| `5`   | Fight the Nektann and the Guardian in the main village area.                                                                                                                                                               |
| `6`   | Escort Garan to the Wasteland                                                                                                                                                                                              |
| `7`   | Fight all Nektann and help Garan to leave.                                                                                                                                                                                 |
| `8`   | Try to find and defeat Reidak.                                                                                                                                                                                             |
| `9`   | Explore the north part of the iced coasts.                                                                                                                                                                                 |
| `10`  | Try to locate the Matoran fortress entry and talk to Balta.                                                                                                                                                                |
| `11`  | Meet Velika at the Matoran fortress in order to find new equipment.                                                                                                                                                        |
| `12`  | Help the Matoran of the fortress to repair their locating stone.                                                                                                                                                           |
| `13`  | Battle the Rock Ussal.                                                                                                                                                                                                     |
| `14`  | Find the entry of the caves of Voya Nui, search who are guarding the entry.                                                                                                                                                |
| `15`  | Return talk to Garan.                                                                                                                                                                                                      |
| `16`  | Rescue a group of Matoran slaves and escort them to the Matoran fortress.                                                                                                                                                  |
| `17`  | Sabotage the Piraka installations in order to prevent them from finding the Mask of Life.                                                                                                                                  |
| `18`  | Find a way to get in a hidden part of the caves that leads to a teleportation platform.                                                                                                                                    |
| `19`  | Garan wants to go to his hiding place in order to pick up the big amount of equipment he stocked there. Escort him up to there via desert area along the jungle.                                                           |
| `20`  | The hidden place of Garan should not be found nor by the Rock Ussal neither by Fikou. If they regroup around the hidden place, it will alert the Piraka. Destroy all the groups of Rock Ussal and Fikou that prowl around. |
| `21`  | Garan will need to rebuild his Protodermis stock. Go and ask Kazi at the fortress to help you to bring some Protodermis back.                                                                                              |
| `22`  | Explore the surroundings of the black rocks area to find any clue to what's going on in there.                                                                                                                             |
| `23`  | Find Zaktan near the Lake of Protodermis an try to defeat him.                                                                                                                                                             |
| `24`  | Attack 4 camps of black Husis and then come back and see Garan.                                                                                                                                                            |
| `27`  | Locate all the different possible entries to the cave and then come back and see Garan.                                                                                                                                    |
| `28`  | Zaktan have decided to besiege and attack the Matoran fortress. Fight against these enemies in order to free the fortress.                                                                                                 |
| `29`  | Find the Piraka Stronghold, fight the guards at the entry and come back to Garan to make your report.                                                                                                                      |
| `30`  | Find another way to enter the Stronghold.                                                                                                                                                                                  |
| `31`  | Use the tamed Burnak to enter the Piraka Stronghold.                                                                                                                                                                       |
| `32`  | Progress in the Piraka Stronghold in order to find the control room and open the launcher store.                                                                                                                           |
| `33`  | Go to the launcher store room and fight against Zaktan.                                                                                                                                                                    |
| `34`  | Locate the Chamber of Truth using the teleportation gate in the boarding area.                                                                                                                                             |
| `35`  | Ask Balta to help you to find the key to open the secret passage of the Chamber of Truth.                                                                                                                                  |
| `36`  | Fight the Nektann group one after another and fight also the Nektann in the village in order to attract Reidak.                                                                                                            |
| `37`  | Answer correctly to several questions asked by Vezok in order to be taken to the prison and maybe escape.                                                                                                                  |
| `38`  | Use your tamed Burnak to escape from the jail.                                                                                                                                                                             |
| `39`  | Explore the surroundings of the Lava lake and lava reservoir in order to understand what is going on.                                                                                                                      |
| `40`  | Ask Dalu what the intentions of the Piraka are regarding the lava lake.                                                                                                                                                    |
| `41`  | Defeat Hakann                                                                                                                                                                                                              |
| `42`  | Go back to the lava lake.                                                                                                                                                                                                  |
| `43`  | Enter the Chamber of Life                                                                                                                                                                                                  |
| `45`  | Go back to meet Garan in the village                                                                                                                                                                                       |
| `46`  | Garan can improve your weapon if you find his improvement kit. Go to the north-west edge of Voya Nui, and find it under the rocks.                                                                                         |
| `47`  | find them along the coasts.                                                                                                                                                                                                |
| `48`  | Velika told you to open the safes in the launcher store of the Matoran village and to take the armor.                                                                                                                      |
| `49`  | Garan has hidden two metal pieces near the lighthouse area. They are under the stones heaps. Dig them up and bring them back to Garan.                                                                                     |
| `50`  | A creature is guarding the wood tunnel entry. Escort Garan to this wood tunnel and try to create a diversion in order to allow Garan to reach the other shore safely.                                                      |
| `51`  | Help Kazi to fill up the container with Protodermis.                                                                                                                                                                       |
| `52`  | Escort Kazi  to Garan Hideout to bring the new Protodermis stock.                                                                                                                                                          |
| `53`  | Go to the Matoran Fortress and Talk to Piruk                                                                                                                                                                               |
| `54`  | Go to the Piraka Warehouse and destroy all the equipment.                                                                                                                                                                  |
| `55`  | Go to the Matoran Fortress and talk to Velika about carving tools.                                                                                                                                                         |
| `56`  | Bring back to Velika the Fikou metal pieces.                                                                                                                                                                               |
| `57`  | Go back to Garan's hidden place.                                                                                                                                                                                           |
| `58`  | Go back to the caves, cure the slave and talk to him about the buried equipment (1)                                                                                                                                        |
| `59`  | Go back to the caves, cure the slave and talk to him about the buried equipment (2)                                                                                                                                        |
| `60`  | Go back to the caves, cure the slave and talk to him about the buried equipment (3)                                                                                                                                        |
| `61`  | Find the buried equipment (1)                                                                                                                                                                                              |
| `62`  | Find the buried equipment (2)                                                                                                                                                                                              |
| `63`  | Find the buried equipment (3)                                                                                                                                                                                              |
| `70`  | Bring back the tools to Garan.                                                                                                                                                                                             |
| `71`  | Locate an defeat Thok.                                                                                                                                                                                                     |
| `72`  | Go back to the Matoran Fortress and talk to Balta about the fight against Thok.                                                                                                                                            |
| `73`  | Go back to the Matoran Fortress and talk to Piruk                                                                                                                                                                          |
| `74`  | Sabotage the Piraka drilling material                                                                                                                                                                                      |
| `75`  | Help Piruk to heal the Tamed Burnak. You can find Life Stone on Fire Gafna, you can find them in the blackrocks. And energy crystal on Lava Ape, further in the south west of Voya Nui                                     |
| `76`  | Find the Tamed Burnak.                                                                                                                                                                                                     |
| `77`  | Bring back to Balta the needed equipment in order to repair the portal.                                                                                                                                                    |
| `78`  | Go to the Chamber of Truth                                                                                                                                                                                                 |
| `79`  | Infiltrate the Chamber of Truth                                                                                                                                                                                            |
| `80`  | Bring back the Ussal Crab Shells to Garan, be careful they are hidden in a secret cave. you can enter in by running straight starting from the bridge, until you reach some pillars.                                       |
| `81`  | Escort the Matoran Slave to his house (1)                                                                                                                                                                                  |
| `82`  | Escort the Matoran Slave to his house (2)                                                                                                                                                                                  |
| `83`  | Escort the Matoran Slave to his house (3)                                                                                                                                                                                  |
| `85`  | Talk to the Matoran Slave                                                                                                                                                                                                  |
| `86`  | Bring back fire metal pieces from Fire Gafna to Dalu.                                                                                                                                                                      |
| `87`  | Train a bit before your next mission                                                                                                                                                                                       |
| `88`  | Escort the Matoran Slaves to the jungle santuary                                                                                                                                                                           |
| `89`  | Try to find a way inside the lava dam station                                                                                                                                                                              |
| `90`  | Find an energy stone on a Nektann.                                                                                                                                                                                         |
| `91`  | Distract the blocking Lava Ape and escort Garan to the Jungle Island.                                                                                                                                                      |
| `92`  | Find slave room in Voya Nui caves.                                                                                                                                                                                         |
| `94`  | Go to the Matoran fortress, and try to find a way to repair the lightstone.                                                                                                                                                |
| `95`  | Garan told you to train a bit against earth enemies in Jungle.                                                                                                                                                             |
| `96`  | Meet Garan in his hideout                                                                                                                                                                                                  |
| `97`  | Explore the cave and steal equipment.                                                                                                                                                                                      |
| `98`  | Retrieve invisibility stone                                                                                                                                                                                                |
| `99`  | Talk to Garan                                                                                                                                                                                                              |
| `100` | Progress in the Piraka Stronghold tunnel and open the main door                                                                                                                                                            |
| `101` | Heal your Burnak                                                                                                                                                                                                           |
| `102` | Use your burnak to activate the switch into the Dam Station                                                                                                                                                                |
| `103` | Free the slave using protodermis                                                                                                                                                                                           |
| `104` | Fight the 6 Pirakas                                                                                                                                                                                                        |
| `105` | Defeat the seventh Piraka                                                                                                                                                                                                  |
| `106` | Free Voya Nui                                                                                                                                                                                                              |
| `107` | Toa holidays                                                                                                                                                                                                               |


### Items

| ID    | Name                            |
| :---- | :------------------------------ |
| `2`   | Ice metal piece                 |
| `6`   | Lava Launcher                   |
| `7`   | Slow Action Pack                |
| `8`   | Defense Kanohi of Fire          |
| `12`  | Teleportation Pack              |
| `16`  | Enhanced Lava Launcher          |
| `24`  | Defense Noble Kanohi of Fire    |
| `25`  | Light Defense Armor of Fire     |
| `26`  | Light Defense Greaves of Fire   |
| `28`  | Life Stone                      |
| `30`  | Slow Motion Pack                |
| `31`  | Range Pack                      |
| `33`  | Tamed Burnak                    |
| `35`  | Water Ion Launcher              |
| `36`  | Enhanced Water Ion Launcher     |
| `37`  | Stone Ion Launcher              |
| `38`  | Enhanced Stone Ion Launcher     |
| `39`  | Ice Ion Launcher                |
| `40`  | Enhanced Ice Ion Launcher       |
| `41`  | Air Ion Launcher                |
| `42`  | Enhanced Air Ion Launcher       |
| `43`  | Earth Ion Launcher              |
| `44`  | Enhanced Earth Ion Launcher     |
| `45`  | Fire Zamor Launcher             |
| `46`  | Enhanced Fire Zamor Launcher    |
| `47`  | Stone Zamor Launcher            |
| `48`  | Enhanced Stone Zamor Launcher   |
| `49`  | Water Zamor Launcher            |
| `50`  | Enhanced Water Zamor Launcher   |
| `51`  | Ice Zamor Launcher              |
| `52`  | Enhanced Ice Zamor Launcher     |
| `53`  | Air Zamor Launcher              |
| `54`  | Enhanced Air Zamor Launcher     |
| `55`  | Earth Zamor Launcher            |
| `56`  | Enhanced Earth Zamor Launcher   |
| `57`  | Fire Reaper                     |
| `58`  | Fire Shredder                   |
| `59`  | Stone Ripper                    |
| `60`  | Stone Shredder                  |
| `61`  | Water Ripper                    |
| `62`  | Water Shredder                  |
| `63`  | Ice Ripper                      |
| `64`  | Ice Shredder                    |
| `65`  | Air Ripper                      |
| `66`  | Air Shredder                    |
| `67`  | Earth Reaper                    |
| `68`  | Earth Shredder                  |
| `69`  | Fire Slash                      |
| `70`  | Fire Reaver                     |
| `71`  | Stone Slash                     |
| `72`  | Stone Reaver                    |
| `73`  | Water Slash                     |
| `74`  | Water Reaver                    |
| `75`  | Ice Slash                       |
| `76`  | Ice Reaver                      |
| `77`  | Air Slash                       |
| `78`  | Air Reaver                      |
| `79`  | Earth Slash                     |
| `80`  | Earth Reaver                    |
| `81`  | Fire Claw                       |
| `82`  | Fire Talon                      |
| `83`  | Stone Claw                      |
| `84`  | Stone Talon                     |
| `85`  | Water Claw                      |
| `86`  | Water Talon                     |
| `87`  | Ice Claw                        |
| `88`  | Ice Talon                       |
| `89`  | Air Claw                        |
| `90`  | Air Talon                       |
| `91`  | Earth Claw                      |
| `92`  | Earth Talon                     |
| `93`  | Fire Spear                      |
| `94`  | Fire Harpoon                    |
| `95`  | Stone Spear                     |
| `96`  | Stone Harpoon                   |
| `97`  | Water Spear                     |
| `98`  | Water Harpoon                   |
| `99`  | Ice Spear                       |
| `100` | Ice Harpoon                     |
| `101` | Air Spear                       |
| `102` | Air Harpoon                     |
| `103` | Earth Spear                     |
| `104` | Earth Harpoon                   |
| `105` | Fire Launcher                   |
| `106` | Fire Power Launcher             |
| `107` | Stone Launcher                  |
| `108` | Stone Power Launcher            |
| `109` | Water Launcher                  |
| `110` | Water Power Launcher            |
| `111` | Ice Launcher                    |
| `112` | Ice Power Launcher              |
| `113` | Air Launcher                    |
| `114` | Air Power Launcher              |
| `115` | Earth Launcher                  |
| `116` | Earth Power Launcher            |
| `117` | Medium Defense Armor of Fire    |
| `118` | Heavy Defense Armor of Fire     |
| `119` | Defense Great Kanohi of Fire    |
| `120` | Defense Kanohi of Stone         |
| `121` | Defense Noble Kanohi of Stone   |
| `122` | Defense Great Kanohi of Stone   |
| `123` | Defense Kanohi of Water         |
| `124` | Defense Noble Kanohi of Water   |
| `125` | Defense Great Kanohi of Water   |
| `126` | Defense Kanohi of Ice           |
| `127` | Defense Noble Kanohi of Ice     |
| `128` | Defense Great Kanohi of Ice     |
| `129` | Defense Kanohi of Air           |
| `130` | Defense Noble Kanohi of Air     |
| `131` | Defense Great Kanohi of Air     |
| `132` | Defense Kanohi of Earth         |
| `133` | Defense Noble Kanohi of Earth   |
| `134` | Defense Great Kanohi of Earth   |
| `135` | Attack Kanohi of Fire           |
| `136` | Attack Noble Kanohi of Fire     |
| `137` | Attack Great Kanohi of Fire     |
| `138` | Attack Kanohi of Stone          |
| `139` | Attack Noble Kanohi of Stone    |
| `140` | Attack Great Kanohi of Stone    |
| `141` | Attack Kanohi of Water          |
| `142` | Attack Noble Kanohi of Water    |
| `143` | Attack Great Kanohi of Water    |
| `144` | Attack Kanohi of Ice            |
| `145` | Attack Noble Kanohi of Ice      |
| `146` | Attack Great Kanohi of Ice      |
| `147` | Attack Kanohi of Air            |
| `148` | Attack Noble Kanohi of Air      |
| `149` | Attack Great Kanohi of Air      |
| `150` | Attack Kanohi of Earth          |
| `151` | Attack Noble Kanohi of Earth    |
| `152` | Attack Great Kanohi of Earth    |
| `153` | Light Defense Armor of Stone    |
| `154` | Medium Defense Armor of Stone   |
| `155` | Heavy Defense Armor of Stone    |
| `156` | Light Defense Armor of Water    |
| `157` | Medium Defense Armor of Water   |
| `158` | Heavy Defense Armor of Water    |
| `159` | Light Defense Armor of Ice      |
| `160` | Medium Defense Armor of Ice     |
| `161` | Heavy Defense Armor of Ice      |
| `162` | Light Defense Armor of Air      |
| `163` | Medium Defense Armor of Air     |
| `164` | Heavy Defense Armor of Air      |
| `165` | Light Defense Armor of Earth    |
| `166` | Medium Defense Armor of Earth   |
| `167` | Heavy Defense Armor of Earth    |
| `168` | Medium Defense Greaves of Fire  |
| `169` | Heavy Defense Greaves of Fire   |
| `170` | Light Defense Greaves of Stone  |
| `171` | Medium Defense Greaves of Stone |
| `172` | Heavy Defense Greaves of Stone  |
| `173` | Light Defense Greaves of Water  |
| `174` | Medium Defense Greaves of Water |
| `175` | Heavy Defense Greaves of Water  |
| `176` | Light Defense Greaves of Ice    |
| `177` | Medium Defense Greaves of Ice   |
| `178` | Heavy Defense Greaves of Ice    |
| `179` | Light Defense Greaves of Air    |
| `180` | Medium Defense Greaves of Air   |
| `181` | Heavy Defense Greaves of Air    |
| `182` | Light Defense Greaves of Earth  |
| `183` | Medium Defense Greaves of Earth |
| `184` | Heavy Defense Greaves of Earth  |
| `185` | Light Attack Greaves of Fire    |
| `186` | Medium Attack Greaves of Fire   |
| `187` | Heavy Attack Greaves of Fire    |
| `188` | Light Attack Greaves of Stone   |
| `189` | Medium Attack Greaves of Stone  |
| `190` | Heavy Attack Greaves of Stone   |
| `191` | Light Attack Greaves of Water   |
| `192` | Medium Attack Greaves of Water  |
| `193` | Heavy Attack Greaves of Water   |
| `194` | Light Attack Greaves of Ice     |
| `195` | Medium Attack Greaves of Ice    |
| `196` | Heavy Attack Greaves of Ice     |
| `197` | Light Attack Greaves of Air     |
| `198` | Medium Attack Greaves of Air    |
| `199` | Heavy Attack Greaves of Air     |
| `200` | Light Attack Greaves of Earth   |
| `201` | Medium Attack Greaves of Earth  |
| `202` | Heavy Attack Greaves of Earth   |
| `206` | Improved Range Pack             |
| `207` | Improved Teleportation Pack     |
| `208` | Improved Slow Action Pack       |
| `212` | Light Attack Armor of Fire      |
| `213` | Medium Attack Armor of Fire     |
| `214` | Heavy Attack Armor of Fire      |
| `215` | Light Attack Armor of Stone     |
| `216` | Medium Attack Armor of Stone    |
| `217` | Heavy Attack Armor of Stone     |
| `218` | Light Attack Armor of Water     |
| `219` | Medium Attack Armor of Water    |
| `220` | Heavy Attack Armor of Water     |
| `221` | Light Attack Armor of Ice       |
| `222` | Medium Attack Armor of Ice      |
| `223` | Heavy Attack Armor of Ice       |
| `224` | Light Attack Armor of Air       |
| `225` | Medium Attack Armor of Air      |
| `226` | Heavy Attack Armor of Air       |
| `227` | Light Attack Armor of Earth     |
| `228` | Medium Attack Armor of Earth    |
| `229` | Heavy Attack Armor of Earth     |
| `239` | Improvement kit                 |
| `241` | Nui Blaster                     |
| `242` | Lifestone                       |
| `243` | Lightstone                      |
| `244` | Power stone                     |
| `245` | Energy Stone                    |
| `246` | Destruction Stone               |
| `247` | Locating Stone                  |
| `249` | Burnak food                     |
| `250` | Fikou metal piece               |
| `251` | Equipment, first part           |
| `252` | Velika's carving Tools          |
| `253` | Heavy metal fragment            |
| `254` | Little metal fragment           |
| `255` | Energy crystal                  |
| `256` | Fire Metal Piece                |
| `257` | Rock Ussal Metal Piece          |
| `258` | Water Burnak metal piece        |
| `259` | Water Gafna metal piece         |
| `260` | Hidden Caves Key                |
| `261` | Vision Mask                     |
| `262` | Intelligence Stone              |
| `263` | Magic Invisibility Stone        |
| `264` | Vision Pack                     |
| `265` | Improved Vision Pack            |
| `266` | Improved Slow Motion Pack       |
| `267` | Energy Stone                    |
| `268` | Thok Key                        |
| `269` | Box of metal eating insects     |
| `270` | Chamber of Truth Key            |
| `271` | Equipment, second part          |
| `272` | Equipment, third part           |
| `273` | Garan's Equipment               |
| `274` | Ussal crab shell                |
| `275` | Velika's special tools          |
| `276` | Elemental stone of birth        |
| `277` | Elemental Stone of grown        |
| `278` | Elemental Stone of death        |
| `279` | Wind stone                      |
| `280` | Velika's Key                    |
| `281` | Destruction crystals            |
| `282` | Mask of Life                    |
| `283` | Air shard                       |
| `284` | Fire shard                      |
| `285` | Ice shard                       |
| `286` | Water shard                     |
| `287` | Earth shard                     |
| `288` | Stone shard                     |
| `289` | Powerful Life Stone             |
| `290` | Soul Stone                      |
| `291` | Powerful Soul Stone             |


### Spells

| ID    | Name                            |
| :---- | :------------------------------ |
| `1`   | Special Toa Earth               |
| `2`   | Special Toa Stone               |
| `3`   | Special Toa Water               |
| `4`   | Special Toa Ice                 |
| `5`   | Special Toa Fire                |
| `6`   | Special Toa Air                 |
| `7`   | Ice Ratigo's bite               |
| `8`   | Earth Ratigo's bite             |
| `9`   | Carapace throwing               |
| `10`  | Mechanical attack               |
| `11`  | Attraction                      |
| `12`  | Fire Ratigo's bite              |
| `13`  | Nozzle Blow                     |
| `14`  | Take-off                        |
| `15`  | Paralysing ray                  |
| `16`  | Crushing                        |
| `17`  | Perforation                     |
| `18`  | Water blow                      |
| `19`  | Self defense                    |
| `20`  | Water Pinching                  |
| `21`  | Water Ratigo's bite             |
| `22`  | Kofo Jaga cac                   |
| `23`  | Prodermis boost                 |
| `24`  | Ussal Bite                      |
| `25`  | Debuff pa                       |
| `26`  | Attraction allié                |
| `27`  | Acceleration                    |
| `28`  | Nui Blaster                     |
| `29`  | Scout Patacle cac               |
| `30`  | Defense Patacle                 |
| `31`  | Attaque Fikou                   |
| `32`  | Attaque distance Fusa           |
| `33`  | Stone Ratigo's bite             |
| `34`  | Attaque du Combat Patacle       |
| `35`  | Air Ratigo's bite               |
| `36`  | Debuff Patacle                  |
| `37`  | Ice blow                        |
| `38`  | Fire blow                       |
| `39`  | Stone blow                      |
| `40`  | Air pinching                    |
| `41`  | Repair Strike                   |
| `42`  | Earth blow                      |
| `43`  | Fire pinching                   |
| `44`  | Ice pinching                    |
| `45`  | Earth pinching                  |
| `46`  | Stone pinching                  |
| `47`  | Motivation                      |
| `48`  | Air blow                        |
| `49`  | Fire Ion Launcher               |
| `50`  | Fire Power Launcher             |
| `51`  | Powerful lava launcher (water)  |
| `52`  | YoYo                            |
| `53`  | Stone Power Launcher            |
| `54`  | Powerful lava launcher (fire)   |
| `55`  | Water Power Launcher            |
| `56`  | Water Ion Laucnher              |
| `57`  | Bring life                      |
| `58`  | Debuff rp                       |
| `59`  | Ussal shell                     |
| `60`  | Sacrifice                       |
| `61`  | Powerful lava launcher (ice)    |
| `62`  | Mental Blast                    |
| `63`  | Air Ion Launcher                |
| `64`  | Swarm WIll                      |
| `65`  | Powerful lava launcher (air)    |
| `66`  | Air Harpoon                     |
| `67`  | Earth Ion Launcher              |
| `68`  | Air Claw                        |
| `69`  | Powerful lava launcher (earth)  |
| `70`  | Air Prison                      |
| `71`  | Fire Zamor Launcher             |
| `72`  | Earth absorption                |
| `73`  | Powerful zamor launcher (fire)  |
| `74`  | Fire Harpoon                    |
| `75`  | Stone Zamor Launcher            |
| `76`  | Ice Harpoon                     |
| `77`  | Powerful zamor launcher (stone) |
| `78`  | Earth Harpoon                   |
| `79`  | Water Zamor Launcher            |
| `80`  | Stone Spear                     |
| `81`  | Powerful zamor launcher (water) |
| `82`  | Water Spear                     |
| `83`  | Ice Zamor Launcher              |
| `84`  | Ice Spear                       |
| `85`  | Powerful zamor launcher (ice)   |
| `86`  | Air Launcher                    |
| `87`  | Air Zamor Launcher              |
| `88`  | Earth Launcher                  |
| `89`  | Powerful zamor launcher (air)   |
| `90`  | Ice Launcher                    |
| `91`  | Earth Zamor Launcher            |
| `92`  | Stone Launcher                  |
| `93`  | Powerful zamor launcher (earth) |
| `94`  | Water Launcher                  |
| `95`  | Fire Reaper                     |
| `96`  | A supprimer                     |
| `97`  | Fire Shredder                   |
| `98`  | Fire Launcher                   |
| `99`  | Stone Reaper                    |
| `100` | Earth Claw                      |
| `101` | Stone Shredder                  |
| `102` | Ice Claw                        |
| `103` | Water Reaper                    |
| `104` | Stone Claw                      |
| `105` | Water Shredder                  |
| `106` | Water Claw                      |
| `107` | Ice Reaper                      |
| `108` | Air Spear                       |
| `109` | Ice Shredder                    |
| `110` | Earth Spear                     |
| `111` | Air Reaper                      |
| `112` | Fire Spear                      |
| `113` | Air Shredder                    |
| `114` | Earth Talon                     |
| `115` | Earth Reaper                    |
| `116` | Water Talon                     |
| `117` | Earth Shredder                  |
| `118` | Air Talon                       |
| `119` | Fire Slash                      |
| `120` | Stone Harpoon                   |
| `121` | Fire Reaver                     |
| `122` | Stone Talon                     |
| `123` | Stone Slash                     |
| `124` | Water Harpoon                   |
| `125` | Stone Reaver                    |
| `126` | Air Power Launcher              |
| `127` | Water Slash                     |
| `128` | Earth Power Launcher            |
| `129` | Water Reaver                    |
| `130` | Stone aborption                 |
| `131` | Ice Slash                       |
| `132` | Fire Absorption                 |
| `133` | Ice Reaver                      |
| `134` | Ice Power Launcher              |
| `135` | Air Slash                       |
| `136` | Water absorption                |
| `137` | A supprimer                     |
| `138` | Air Reaver                      |
| `139` | Ice absorption                  |
| `140` | Earth Slash                     |
| `142` | Earth Reaver                    |
| `144` | Fire Claw                       |
| `145` | Wind absorption                 |
| `146` | Fire Talon                      |
| `150` | Ice Talon                       |
| `154` | Ice Ion Launcher                |
| `156` | Powerful lava launcher (stone)  |
| `158` | Stone Ion Launcher              |
| `160` | Powerful Soul stone             |
| `161` | Frenzy                          |
| `162` | Wind Stone                      |
| `167` | Improved Vision pack            |
| `168` | Vision pack                     |
| `172` | Improved slow motion pack       |
| `173` | Slow action pack                |
| `174` | Improved slow action pack       |
| `175` | Slow action pack                |
| `176` | Teleportation pack              |
| `177` | Little teleportation pack       |
| `178` | Improved range pack             |
| `179` | Range pack                      |
| `180` | Soul Stone                      |
| `181` | Powerful life stone             |
| `182` | Life Stone                      |


### Sprites

| ID     | Description      |
| :----- | :--------------- |
| `1`    | Hewkii           |
| `2`    | Nuparu           |
| `3`    | Hahli            |
| `4`    | Matoro           |
| `5`    | Jaller           |
| `6`    | Kongu            |
| `10`   | Avak             |
| `11`   | Hakann           |
| `12`   | Reidak           |
| `13`   | Thok             |
| `14`   | Vezok            |
| `15`   | Zaktan           |
| `16`   | Gafna            |
| `17`   | Nektann          |
| `18`   | Burnak           |
| `19`   | Lava Ape         |
| `20`   | Shore Turtle     |
| `21`   | Fikou            |
| `22`   | Kofo-Jaga        |
| `23`   | Ussal            |
| `24`   | Guardian         |
| `25`   | Seventh Piraka   |
| `26`   | Hikaki           |
| `27`   | Ash Hoto         |
| `28`   | Frozen tree      |
| `101`  | Velika           |
| `102`  | Garan            |
| `103`  | Dalu             |
| `104`  | Kazi             |
| `105`  | Balta            |
| `106`  | Piruk            |
| `107`  | Storage          |
| `108`  | Matoran Slave    |
| `109`  | Frozen tree      |
| `1000` | Vezok            |
| `1001` | Nektan           |
| `9999` | Nektan           |


### Animations

| Name     | Description      |
| :------- | :--------------- |
| `emote1` | Create diversion |
| `emote2` | Dig the ground   |
| `emote3` | Hide             |
| `static` |                  |
| `walk`   |                  |
| `run`    |                  |
| `hit`    |                  |
| `die`    |                  |
| `bonus`  |                  |
| `anim0`  |                  |
| `anim1`  |                  |
| `anim2`  |                  |
| `anim10` |                  |
| `anim11` |                  |
| `anim20` |                  |
| `anim21` |                  |


### Scripts

| Name                | Description         |
| :------------------ | :------------------ |
| `intro`             | Intro               |
| `thok`              | Thok                |
| `sabotagechap3`     | Sabotage            |
| `sabotagechap4`     | Sabotage 2          |
| `controlroom`       | Control Room        |
| `zaktanflee`        | Zaktan Flee         |
| `toadeath`          | Toa Death           |
| `freematoran`       | Free Matoran 1      |
| `teleportprison`    | Teleport Prison     |
| `teleportprison2`   | Jail                |
| `burnaktrap`        | Burnak Trap         |
| `burnaklava`        | Burnak Lava         |
| `burnaktriggerlava` | Burnak Trigger Lava |
| `escapejail`        | Escape From Jail    |
| `hakanndialog`      | Hakann Dialog       |
| `pirakadialog`      | Piraka Dialog       |
| `seventhdialog`     | Seventh Dialog      |
| `zaktanndialog`     | Zaktann Dialog      |
| `hakannflee`        | Hakann Flee         |
| `findclue`          | Find Clue           |
| `strongholdtunnel`  | Stronghold Tunnel   |
| `end1`              | End1                |


### Audio Sounds

| Name           |
| :------------- |
| `toa_choice`   |
| `stars`        |
| `spell_water`  |
| `spell_stone`  |
| `spell_ice`    |
| `spell_fire`   |
| `spell_earth`  |
| `spell_air`    |
| `space_tir`    |
| `shoot`        |
| `rapid_swish`  |
| `punch`        |
| `menu_button`  |
| `load_spell`   |
| `little_pose`  |
| `impact_lourd` |
| `hit_defaut`   |
| `feuillage`    |
| `explo`        |
| `deflagration` |
| `death_fall`   |
| `death`        |
| `click4`       |
| `click`        |
| `clak`         |
| `button_click` |
| `baton`        |
| `aspiration`   |


### Audio Events

| Name                 |
| :------------------- |
| `onMenuButtons`      |
| `onToaChoice`        |
| `onBannerUIButons`   |
| `onBoostButtons`     |
| `onEquipItem`        |
| `onMusicExploration` |
| `onMusicFight`       |


## Bug Fixes

-   Flash Player 10+ version detection.


## License

Copyright 2006 The LEGO Group and Ankama Studio. Unofficial release by Project Brick.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
