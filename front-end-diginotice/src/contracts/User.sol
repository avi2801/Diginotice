pragma solidity ^0.8.10;

contract User {
    string public name;

    uint public teacherCount = 0;
    uint public studentCount = 0;

    mapping(uint => Teacher) public teachers;
    mapping(uint => Student) public students;


    struct Teacher{
        uint id;
        string name;
        string address1;
    }

    event TeacherCreated(
        uint id,
        string name,
        string address1
    );

    struct Student{
        uint id;
        string name;
        string address1;
    }

    event StudentCreated(
        uint id,
        string name,
        string address1
    );

    constructor() public {
        name = "User";
    }

    function addStudent(string memory _name, string memory _address1) public {

        require(bytes(_name).length > 0);
        require(bytes(_address1).length > 0);

        studentCount++;

        students[studentCount] = Student(studentCount, _name, _address1);

        emit StudentCreated(studentCount, _name, _address1);
    }

    function addTeacher(string memory _name,string memory _address1) public{

        require(bytes(_name).length > 0);
        require(bytes(_address1).length > 0);

        teacherCount++;

        teachers[teacherCount] = Teacher(teacherCount, _name, _address1);

        emit TeacherCreated(teacherCount, _name, _address1);
    }
}
