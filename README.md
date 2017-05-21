# Chat Server

# Question 1

## Initialization
From the project root directory, run "npm install"

## Example 
1) Open 2 separate tabs
2) Run "node chatserver.js" on Terminal
3) Type "localhost:3000" on both tabs and hit enter
4) In the first tab put "John" for the username and "Michael" for the second tab.
5) Then start typing in the chatbox, messages will appear after you hit the "Send" button.

# Question 2

Based on the example that you provided, I tried to implement peer to peer application using a chat server. There is only a single page (no caller and a callee). However when I wanted to display online users, the server was not updating it automatically. I tried to use intervals and called updateUsers() periodically however it didn't quite work. Using sockets (I think it is Socket.io) would probably solve this problem.