# CodeJam 14 Hackathon: 365 Days
## About
**365 Days** is a digital wellness journal designed to help users log and reflect on their emotional journeys. Available
as both a Chrome extension and a webpage, the platform encourages daily emotional tracking and journaling in a simple, 
user-friendly interface. By empowering users to monitor and revisit their emotional patterns, 365 Days aims to 
foster mental wellness and mindfulness over time.

## Features
- Log daily emotions using a mood tracker with five predefined options (Very Bad, Bad, Okay, Good, Very Good).
- Write short journal entries (up to 160 characters) about how you feel each day.
- Save and revisit past entries to reflect on emotional patterns and trends.

## Tech Stack
### Frontend 
- HTML
- CSS
- JavaScript
- React
- MUI
### Backend
- Python
- FastAPI
### Deployment
- Docker

## Future Enhancements
- **Feed View**: Create a feed view for all the journal entries in reverse chronological order.
- **Data Visualization**: Add visual analytics, such as mood trends, to help users track their emotional patterns.
- **Cross-Platform Support**: Expand to include mobile and web versions for broader accessibility.
- **AI Integration**: Analyse journal entries to provide insights or suggest mood-boosting activities.
- **Sharing**: Enable users to add friends and share entries with friends or join groups for added motivation and support.
- **Data Persistance**: Enable Docker Volumes to ensure data persistance when rebuilding the backend container.

## Prerequisites
1. Install [Docker](https://docs.docker.com/engine/install/)
2. Clone this GitHub project

## Build Project
### First time deployment
1. Open up docker desktop
2. Open up a terminal (like bash or zsh)
3. Navigate to project directory
4. Run `scripts/start.sh`
   1. `start.sh` will create and start both the backend and the frontend.
5. Install the chrome extension on Google Chrome

### Subsequent deployments
1) Open up Docker desktop
2) Navigate to `Containers`
3) Hit play on the `codejam2024` container

### To pause a deployment
1) Hit pause on the `codejam2024` container

## Contact Information
- [Daniel Cho](https://github.com/daniel-heemang)
- [Eric Huang](https://github.com/erichugy)
- [Zuhayr Mahmood](https://github.com/zuhayrmahmood)
- [Kevin Wang](https://github.com/devkevw)

## Demo
Check out our [Devpost](https://devpost.com/software/365-days)!
