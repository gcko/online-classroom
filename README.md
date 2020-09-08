# Online Classroom Prototype

## Getting Started

- `yarn`
- `yarn start:<PACKAGE_NAME>` OR `yarn start` should you wish to serve both the frontend and backend in parallel

### Frontend

You'll find a React App in `packages/client`. You will find it to contain a Lobby and a Classroom:

1. Lobby
2. Classroom

note: this is not mobile responsive at the moment.

#### Lobby

This is the first page a user sees. It contains the following:

- Select dropdown for user to select "student" or "instructor" role
- Input text field for user to enter a room id.
- Button that takes the user to the Classroom as a Student or Instructor depending on the role selected.
- Each classroom hosts a maximum of one student and one instructor at a time.
- Displays error message when:
  - The room id + role is already in use.
  - The room is full.

#### Classroom

STUDENT VIEW:

The Classroom contains a Code Editor. The Code Editor is built using the [Ace editor](https://ace.c9.io/#nav=about). The specs are as follows:

- The left panel is for code input (built using the Ace editor)
- The right panel is for code output (Using an overridden Console object) 
- The Code Editor only needs to handle Javascript input.
- Above the Code Editor are two buttons:
  - The first button runs the input code and outputs its results onto the right panel.
  - The second button submits the input code to the instructor.

INSTRUCTOR VIEW:

- The Classroom displays the student's submitted code.
- Submitted code updates in real time.

### Backend

You'll find an Express app in `packages/server`. It handles:

- Rooms (stored in memory)
- Code submissions
