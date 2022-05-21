![Mock=up](assets/images/readmeimages/mockup.png)
Smoothie Moves
==============

Smoothie Moves is a fruit and veg themed memory game for children. Its main aim is to encourage children to play a colourful, friendly and fun game on a device (most specifically a tablet) or computer. Its secondary aims are to carry positive messages about gameplay and fruit and vegetables!

 

[Play the live game here.](https://dandavies23.github.io/smoothie-moves/)

 

Target audience
---------------

Its initial target user was my daughter. I noticed when playing a physical memory card game that she was considerably better and quicker than me. She is at a stage in her learning development where her short term memory is excellent. Memory games help develop this.

As the game was developed it became clear that more children would enjoy this and more focus was given to score board and gaming capabilities. 


# UX and UI

* ## Game Research

The main inspiration for this game is a physical card game that I play with my daughter. As I began my research it ocurred to me that there's quite 
 

Features
--------

The main focus of this app is the game it being easy to view and play on any size mobile device. In addition to the game there is:

**Start**

-   Title of game and site. 

-   Button navigation to game with icon

-   Button modal with rules on page

**Rules modal**

-   No need to navigate away from main play loop

-   Written in an easy to understand rules presented in a clear friendly tone

**Game**

-   Score bar to keep track of progress

-   Optimised game grid for all devices

-   Nudge encouragement

-   Simple reset or return to start buttons

-   Results layout with featured and message which encourages play at any level

 

**Scoring **

-   Decided a good confidence boost is an acheivable score of 500

-   User will score 500 if they have a system (18 moves) in around 20 seconds

-   If you are ‘lucky’ you will find a pair randomly which means that you can score over 550 - this luck element is a typical game play strategy, a system gets you so far but luck gets you even further!

 

### Features to implement

**2-player mode **

-   device to have a ‘vs’ mode whoever finds the most veg first wins

-   ‘collaboration' mode would stop the clock and only start when you tap on a tumbler

**Choose you fruit and veg**

-   More fruit and veg options to add to or extend grid

-   Choices could also be a ‘gameset’ which would also have smoothie type name ’Strawberry delight’ etc

**Highest score and leaderboard**

-   Best score saved to localStorage and then called to show progress

-   Ability to enter name at High Score and display in traditional leaderboard. 

 

Development and Testing
-----------------------

-   A [Github project](https://github.com/dandavies23/smoothie-moves/projects/1) using a Kanban Board was created to organise development, track bugs and suggest enhancements. 

-   Progress was detailed in commit messages with frequent pushes to Github. 

-   Project was deployed early so colleagues, peers and user-testers could give feedback

-   My daughter proved to be an excellent user-tester managing to break the first full prototype in about 30 second and therefore raise three bugs!

-   Game was tested on all devices and optimised for tablet as this is what children most use. 

Validation
----------

-   App passed with [W3 Validator](https://validator.w3.org/nu/?doc=https%3A%2F%2Fdandavies23.github.io%2Fsmoothie-moves%2F)

-   App passed with [CSS Validator ](https://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2Fdandavies23.github.io%2Fsmoothie-moves%2F&profile=css3svg&usermedium=all&warning=1&vextwarning=&lang=en)

 

Deployment 
-----------

To deploy this page to GitHub Pages from its [GitHub repository](https://github.com/dandavies23/smoothie-moves), the following steps were taken:

1.  From the menu items near the top of the page, select **Settings**.

2.  Scroll down to the **GitHub Pages** section.

3.  Under **Source** click the drop-down menu labelled **None** and select **Master Branch**

4.  On selecting Master Branch, the page is automatically refreshed, the website is now deployed.

5.  Scroll back down to the **GitHub Pages** section to retrieve the link to the deployed website.

 

To clone this project from GitHub:

1.  Under the repository name, click "Clone or download".

2.  In the Clone with HTTPs section, copy the clone URL for the repository.

3.  In your local IDE open Git Bash.

4.  Change the current working directory to the location where you want the cloned directory to be made.

5.  Type `git clone`, and then paste the URL you copied in Step 3.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
git clone https://github.com/dandavies23/smoothie-moves
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1.  Press Enter. Your local clone will be created.

Further reading and troubleshooting on cloning a repository from GitHub [here](https://help.github.com/en/articles/cloning-a-repository).

 

Technologies and Credits
------------------------

This project was built on the [Bootstrap 4 ](https://getbootstrap.com/docs/4.0/getting-started/introduction/)framework. 

All illustrations were created using Adobe Illustrator.

The main memory game was written in Javascript with the raw structure coming from a Walkthrough video by [Ania Kubow](https://www.youtube.com/watch?v=tjyDOHzKN0w). This video was a good reminder of many concepts I’d started to become familiar with in the module but this easy to follow video got the concepts across very well.

 

Acknowledgements
----------------

Thanks to my daughter for helping suggest the game dynamic user-testing and breaking the early version and exposing bugs! Thanks for me wife for giving me time and encouragement and help with colour schemes.

I’m really grateful for help on Stack Overflow for help with … Y0urs Truly (Paul Taylor) helped me squash a double tap bug that my daughter exposed, and suggested using the null value. I tweaked this code further used it elsewhere with the disable attribute. He also spotted a speed bug which stopped the game if the user tapped too many cards which stopped the game being achievable and suggested a simple <= rule which solved it.

I’m also grateful to Tim Stacy, a friend who gave invaluable advice in the latter stages of this project. 

W3Schools for further tutorials on JS and JQ, Code Institute’s Slack channel and other CI people who have additionally helped me including Sean Young…. student Tom Nagy who passed on a iPad none interference tip and my mentor Akshat Garg.

This was created for Code Institute MS 2 Interactive development course. 

 
