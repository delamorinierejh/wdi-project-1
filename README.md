#<span style="color:#d626b5; text-shadow: 3px 3px #dee339; font-family:Mistral; font-size:48px"">Miami Blocks</span>
####A Tetris Game by Johnnie de La Moriniere


![alt text](http://i.imgur.com/LdUPIwf.png "Miami Blocks Start Screen")

![alt text](http://i.imgur.com/8OXoYxw.png "Miami Blocks Gameplay")

##Overview
**Miami Blocks** was created as my first project for a Web Development Course in London. It was built using HTML5, CSS3 and JavaScript/jQuery.

The game can be played here: [**Miami Blocks**](https://miami-blocks.herokuapp.com/)

##How To Play
The object of the game is to play for as long as possible before the shapes stack up too high and break the top edge of the grid. In order to survive, you need to arrange the falling shapes in such a way as to fill rows, which will then be deleted, creating extra space. **Basically it's Tetris**

##Controls
* **Left/Right** - move the active shape along the x-axis in the grid
* **Down** - Speed up the descent of the shape
* **Esc** - pause the game
* **M** - mute the sounds

##JavaScript/jQuery Overview
#####Grid Structure
A standard Tetris grid consists of 200 squares (20 rows of 10), but my grid contains an extra 4 rows, which are hidden above the upper edge of the grid div. This area is used to generate each new shape before it drops into the visible area of the grid. 

#####Shape generation on the grid
Each of the seven shapes is an object with properties including colour, imageURL and - most importantly - coordinates which indicate where the grid should be lit up. These coordinates relate to one square in the grid - the *key square*. This stays constant while the shapes rotate, updating on **3 events:**

* The player moves left or right
* The shape is dropped one row by the timed function
* A new shape is generated following the final positioning of another shape - (whereupon a random square from between 1-9 is chosen as the new *key square*)

#####Edge detection
The biggest challenge posed by this game was preventing the shapes from overlapping the edge of the grid upon rotation. I fixed this by keeping track of which column the *key square* is currently in and setting up a property of the shape which indicates whether the shape would need to have room to the left, right or up with its next rotation. By using this I was able to force the shape to move quickly in the direction required for it remain fully within the borders of the grid after rotating.

#####Fixture of shapes
Once a shape has reached the bottom of the grid (or settled upon another shape) it is embedded in the grid by having its value changed from 0 to 1. If a square has its value set to 1, the game knows not to delete the background color that has been injected into it... (until a row deletion - see below).

#####Row deletion
With each run of the interval that moves the grid down, a check is run to see whether any of the rows are filled. If so, the row of squares (LIs) is removed from the grid and then 10 new ones are prepended to the grid (UL).

#####Collision detection
Local variables are set up in corresponding functions for each of the movement types within the game (left/right, down, rotation). These dictate whether the move would be legal within the game and therefore whether or not the function should be invoked. Collision detection is also used to trigger the function which embeds the colours in the grid (once a shape has settled).

#####Interval for dropping pieces
As in any game of Tetris, the shapes drop at regular intervals. The function that causes the drop is called by another function which considers an interval. The length of the interval changes as the time goes on, with its duration reduced by 20% with each new level.

##CSS Design
The design of the game (sound/images/CSS) was inspired by 80s 8-bit arcade-games. This approach - along with a setting in Miami - gave me an excuse to put a colourful twist on one of my favourite puzzle games.

##Credits
Many thanks to my course instructors **Alex** and **Rane** for their help and advice on this project.

##Disclaimer 

This site was built as part of an educational purposes on a budget of £0.00. Several pieces of content featured were taken from other sources. A list of these can be found below. If - for any reason - the owner of any of the pieces of content so wishes, I am very happy to edit the game accordingly. 

###Content credits

#####Music/Sound effects:
- [**Brand Name Audio**](https://www.youtube.com/user/brandnameaudio)
- [**NitromathThePizzaGuy**](https://www.youtube.com/channel/UCG1GQMSlp1eZAwk9RFo9nqg)

#####Background Image:
- [**8-bit City**](*http://lamebwoy.tumblr.com/post/54328536719/8-bit-city*)





















