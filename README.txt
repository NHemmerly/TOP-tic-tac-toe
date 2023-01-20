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
