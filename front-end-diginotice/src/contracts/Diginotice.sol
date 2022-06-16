// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

//this is the Digital notice smartcontract
contract Diginotice {
    string public name;

    //Store posts
    uint public postCount = 0;
    mapping(uint => Post) public posts;


    struct Post{
        uint id;
        string message;
        string teacher;
        string year;
        address author;
        string imageHash;
        string date;
        string time;
    }

    event PostCreated(
        uint id,
        string message,
        string teacher,
        string year,
        address author,
        string imageHash,
        string date,
        string time
    );

    constructor() public {
        name = "Diginotice";
    }

    //Create posts
    function addPost(string memory _message, string memory _year, string memory _teacher,string memory _image,string memory _date,
        string memory _time) public {

        require(bytes(_message).length > 0);
        require(bytes(_year).length > 0);
        require(bytes(_teacher).length > 0);
        require(msg.sender != address(0x0));

        postCount++;

        //add post to contracr
        posts[postCount] = Post(postCount, _message, _teacher,_year, msg.sender,_image,_date,_time);

        //trigger an event
        emit PostCreated(postCount, _message, _teacher, _year, msg.sender,_image,_date,_time);

    }

    //Comments
}
