pragma solidity ^0.8.10;

//this is the Digital notice smartcontract
contract Diginotice {
    string public name = "Diginotice";
    
    //Store posts
    mapping(uint => Post) public posts;

    struct Post{
        uint id;
        string hash;
        string description;
        address author;
    }
    //Create posts
    function uploadImage() public {
        posts[1] = Post(1, 'abc123', 'Hello',address(0x0));
    }
    
    //Comments
}