Neil Hemmerly 1-11-2023

Tic-Tac-Toe

Access the live site here: https://nhemmerly.github.io/TOP-tic-tac-toe/ !

A Project for The Odin Project

Welcome to my Tic-Tac-Toe project. The Odin Project designed this project for students
to practice the essential elements of Object-Oriented Programming with Javascript
using closure, the module pattern, and factory functions. 

The Tic-Tac-Toe project forced me to focus on my app's logic before doing anything
related to DOM manipulation. I have since learned better techniques for organizing my code,
but my project is organized along basic guidelines. 

1. Every function declaration in my Tic-Tac-Toe project is nested either within 
a factory, or within a module pattern. 

2. Each player object is created by a factory function. The player objects have name, 
gamepiece('X', or 'O'), and binary value (1 or 0) attributes. The player's name is used
to populate the DOM with a name chosen by human players, or a predetermined CPU name decided
when a user clicks either the CPU or Hard buttons on the DOM. The gamepiece attribute determines
which gamepiece a player places when they click a space on the gameboard. Finally, the binary value
is used to populate the game array which checks for a winner or a draw in the game state. 

3. The display controller module pattern handles most DOM manipulation required for the project.
Functions and dom elements from the display controller are used in the gameBoard module and their primary function
is to take input and use it to act on the DOM.

4. The gameBoard module pattern handles all of the game logic in the background of the game. 
Most of the logic first enters the game through the placeGamePiece function which is called 
by an event handler present on all of the game cells. Information about the click location and 
whether any of the AIs are turned on flows through the placeGamePiece function and the game flow is routed
accordingly. 

5. The minimax algorithm used for the hard cpu is located in the gameBoard module pattern. The function is 
first called within the bestAIMove function. 

Summary: 
  Overall I am very happy with how this project turned out. I got a good grasp on what working with factories and 
  module patterns should look like, although I could've been more strict about how I divided work between them. 
  A few bugs are still present primarily in the way the display is handled after game replays and resets, as well as 
  the way the display renders on mobile devices and smaller screens. In the future I may update the page to increase
  responsiveness. 
  
