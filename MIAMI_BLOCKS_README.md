#WDI Project 1 - Miami Blocks
####A Tetris Game by Johnnie de La Moriniere


##TECHNOLOGY

The game is built using HTML5, CSS3 and JavaScript/JQuery.

##OVERVIEW

This game was created as my first project during a Web Development Course in London. 

##CONTROLS
* Left/Right - move the active shape along the x-axis in the grid
* Down - Speed up the descent of the shape
* Esc - pause the game
* M - mute the sounds

##JS/JQUERY OVERIVEW
#####Grid Structure
A standard Tetris grid consists of 200 squares (20 rows of 10), but my grid contains an extra 4 rows, which are hidden above the upper edge of the grid div. This area is used to originally generate each new shape before it drops into the visible area of the grid. 

#####Shape generation on the grid
Each of the seven shapes is an object with properties including colour, imageURL and - most importantly - coordinates which indicate where the grid should be lit up. These coordinates relate to a variable called currentLi which refers to one square in the grid. As the pieces are rotated, this stays constant. currentLi updates on 3 events:

* The player has moved left or right
* The shape has been dropped one row by the timed function
* A new shape has been generated following the final positioning of another shape - (whereupon a random squre from between 1-9 is chosen as the currentLi)

#####Edge detection
The biggest challenge posed by this game was preventing the shapes from overlapping the edge of the grid upon rotation. I fixed this by keeping track of which column the currentLi variable was currently in and setting up a property of the shape which indicates whether the shape would need to have room to the left, right or above upon its next rotation. By using this I was able to force the shape to move quickly in the direction required for it remain fully within the borders of the grid.

#####Fixture of shapes
Once a shape has reached the bottom of the grid (or settled upon another shape) it is embedded in the grid by having its value changed from 0 to 1. If a square has its value set to 1, the game knows not to delete the background color that has been injected into it... (until a row deletion - see below).

#####Row deletion
With each run of the interval that moves the grid down, a check is run to see whether any of the rows is filled. If so, the row of squares (LIs) is removed from the grid and then 10 new ones are prepended to the grid (UL).

#####Collision detection
Local variables are set up in correpsonding functions for each of the movement types within the game (left/right, down, rotation). These dictate whether the move would be legal within the game and therefore whether or not the function should be invoked. Collision detection is also used to trigger the function which embeds the colours in teh grid (once a shape has settled).

#####Interval for dropping pieces
As in any game of Tetris, the shapes drop at regular intervals. The function that causes the drop is called by another function which considers an interval. The length of the interval changes as the time goes on, with its length reducing by 20% with each new level.

#####Design
The design of the game (sound/images/CSS) was inspired by 80s 8-bit arcade-games. This approach - along with a setting in Miami - gave me an excuse to put a colourful twist on one of my favourite puzzle games.

##DISCLAIMER 

Several pieces of content featured in this site were taken from other sources. A list of these can be found below. If - for any reason - the owner of any of the pieces of content so wishes, I am very happy to edit the site accordingly. 

###CONTENT CREDITS

#####Music/Sound effects:
*https://www.youtube.com/user/brandnameaudio - Brand Name Audio
https://www.youtube.com/channel/UCG1GQMSlp1eZAwk9RFo9nqg - NitromathThePizzaGuy*


#####Background Image:
*http://lamebwoy.tumblr.com/post/54328536719/8-bit-city*




















