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
[info] Created new chat room: cf17c26bb89a554222ccc7ad86e04d198ca37f1aefacf5577e75327f087b43cf
>
```

This will created a new chatroom and save this room in the list of chatrooms(this list it's not save in disk, we stil work on that), to see the old chatrooms created, execute the next command.

### list chatrooms
```js
> :listroom
0 - cf17c26bb89a554222ccc7ad86e04d198ca37f1aefacf5577e75327f087b43cf

1 - 4d7ca6305c332a99bf471d8a83098bf142cc8dac0ac5231f180ecf29335c9ff9

```
This command list all rooms created in the app, with an assigned number to be more easy select the room with the next command

### Change of room
This option let you change between chatrooms using like parameter the number of the list or using the full key of the chatroom, even you can use the key of other chatroom out of your list.

```js
> :joinroom 0

```
or

```js
> :joinroom cf17c26bb89a554222ccc7ad86e04d198ca37f1aefacf5577e75327f087b43cf
```
