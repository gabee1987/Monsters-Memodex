# Monsters Memodex

## Overview

Monsters Memodex is an interactive memory game built with React, designed to challenge users to match pairs of monstrous cards. The game features a dynamic grid of cards that players flip, aiming to find pairs of matching monsters. It's a perfect blend of fun and memory training, suitable for all ages.

## Features

- **Dynamic Card Grid**: The game grid adjusts dynamically based on the difficulty level and the available screen space, which can be selected by the player.
- **Multiple Game Modes**: Players can choose between Free, Time-based, and Turn-based modes. In Free mode, the players can match pairs without any restrictions. In Time-Based mode, there is a time limit, and in Turn-Based mode there is a turn limit.
- **Multiple Difficulty Levels**: Players can choose between Easy, Medium, and Hard levels, changing the number of cards on the grid.
- **Score Tracking**: The game tracks the number of moves a player makes, encouraging players to improve their memory and reduce the number of moves.
- **Interactive UI**: A lively and responsive user interface that provides feedback for each action, enhancing the gaming experience.
- **Mobile Responsive**: Fully optimized for mobile devices, allowing players to enjoy the game on the go. (Work in progress)

## Technology Stack

- **React**: Utilized for building the user interface with efficient updates and state management.
- **CSS**: Custom styles for responsive design and animations.
- **Vercel**: Chosen for hosting and seamless deployment from GitHub repositories.

## Local Development

To set up Monsters Memodex locally, follow these steps:

1. Clone the repository:
   git clone https://github.com/gabee1987/Monsters-Memodex.git

2. Navigate to the project directory:
   cd Monsters-Memodex
   
4. Install dependencies:
   npm install

4. Run the application:
   npm start

The application will be available at `http://localhost:3000`.

## Deployment

This project is configured for deployment on Vercel, enabling automatic deployments upon commits to the main branch. Follow the steps below to configure your deployment:

1. Visit [Vercel](https://vercel.com/) and sign in with your GitHub account.
2. Click on "New Project" and select the "Monsters-Memodex" repository.
3. Configure your project settings to deploy from the main branch.
4. Vercel will automatically deploy your application and provide you with a URL to access it.

## Using the RoboHash API

Monsters Memodex incorporates the RoboHash API to generate unique, robotic-themed monster images for each card in the memory game. RoboHash is an easy-to-use service that generates custom robot images based on user inputs. In my game, these inputs are derived from the card identifiers, ensuring that each card has a distinct and visually engaging picture.

For more information on RoboHash and its capabilities, visit [RoboHash.org](https://robohash.org).

### Project Dependencies (external libraries to add)

├── @testing-library/jest-dom@5.16.5\
├── @testing-library/react@13.3.0\
├── @testing-library/user-event@13.5.0\
├── framer-motion@11.0.24\
├── react-dom@18.2.0\
├── react-router-dom@6.3.0\
├── react-scripts@5.0.1\
├── react-timer-hook@3.0.5\
├── react@18.2.0\
├── sass@1.54.4\
├── vanilla-tilt@1.7.2\
└── web-vitals@2.1.4
