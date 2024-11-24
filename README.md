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

## Prerequisites
1. Install [Docker](https://docs.docker.com/engine/install/)

## Build Project
1. Navigate to project directory
2. Run `scripts/start.sh` or `scripts/clean-start.sh` 

## Development
### Backend
To spin up backend locally, you'll need to:
1) Create a python environment
   1) `python3 -m venv env`
2) Install the backend dependecies with `pip3 install -r requirements.txt`
   1) `requirements.txt` can be found `root/backend`

### How to reload fastapi server
`uvicorn app.main:app --reload`

## Contact Information
- [Daniel Cho](https://github.com/daniel-heemang)
- [Eric Huang](https://github.com/erichugy)
- [Zuhayr Mahmood](https://github.com/zuhayrmahmood)
- [Kevin Wang](https://github.com/devkevw)

## Demo
Check out our [Devpost](https://devpost.com/software/365-days)!
