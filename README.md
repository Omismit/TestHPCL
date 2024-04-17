# TestHPCL
Test project using pear.
implementation of a command line chat in serverless mode, using hyperswarm,b4a,hypercore-crypto, bare-readline and bare-tty.

## Overview
This app it's a CLI program for create serverless chatrooms to communicate  with your friends.

## usage

### start
To start to use the app run the next command.
```js
pear dev  
```
After that the Cli start working, don't create a chat room by default, for that you need execute the next command

### create new chatroom
The app use the format ":<coomand>" to distinguish messages from commands to create a new room you need execute the next command.
```js
> :createroom
```

This will created a new chatroom and save this room in the list of chatrooms(this list it's not save in disk, we stil work on that), to see the old chatrooms created, execute the next command.

### list chatrooms
```js
> :listroom
```
