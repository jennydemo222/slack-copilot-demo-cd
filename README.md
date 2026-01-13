# slack-copilot-demo-cd

## Simple Poll App

A lightweight, self-contained polling application built with HTML, CSS, and JavaScript.

### Features

- **Simple Interface**: Clean and intuitive design for easy voting
- **Real-time Results**: View poll results immediately after voting
- **Visual Feedback**: Animated progress bars showing vote percentages
- **Persistent Data**: Votes are saved locally using localStorage
- **Responsive Design**: Works on desktop and mobile devices

### How to Use

1. Open `poll.html` in any modern web browser
2. Select your favorite programming language from the options
3. Click "Cast Your Vote" to submit your choice
4. View the results with percentage breakdowns
5. Click "Vote Again" to cast another vote

### Technical Details

- Pure HTML/CSS/JavaScript - no dependencies required
- Uses localStorage to persist votes across sessions
- Responsive design with gradient styling
- Smooth animations and transitions

### Quick Start

Simply open the `poll.html` file in your web browser:

```bash
# On Mac
open poll.html

# On Linux
xdg-open poll.html

# On Windows
start poll.html
```

Or use a local web server:

```bash
# Python 3
python -m http.server 8000

# Then visit http://localhost:8000/poll.html
```