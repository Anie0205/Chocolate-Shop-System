// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ChocolateShop {
    struct Chocolate {
        uint256 id;
        string name;
        string description;
        uint256 price;
        bool available;
    }

    mapping(uint256 => Chocolate) public chocolates;

    function addChocolate(uint256 _id, string memory _name, string memory _description, uint256 _price) public returns (uint256, string memory, string memory, uint256, bool) {
        chocolates[_id] = Chocolate(_id, _name, _description, _price, true);
        return (_id, _name, _description, _price, true);
    }

    function getChocolateDetails(uint256 _id) public view returns (string memory, string memory, uint256, bool) {
        Chocolate memory chocolate = chocolates[_id];
        return (chocolate.name, chocolate.description, chocolate.price, chocolate.available);
    }

    function updateAvailability(uint256 _id, bool _available) public {
        require(chocolates[_id].id != 0, "Chocolate does not exist");
        chocolates[_id].available = _available;
    }
}
