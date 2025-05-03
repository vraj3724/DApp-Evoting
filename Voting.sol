// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Voting {
    address public admin;
    string[] public candidates;
    string[] public allVoterIds;

    struct Voter {
        string name;
        string voterId;
        string votedCandidate;
        string txHash;
        bool hasVoted;
    }

    mapping(string => Voter) public voters;
    mapping(string => uint256) public votesReceived;

    constructor(string[] memory _candidates) {
        admin = msg.sender;
        candidates = _candidates;
    }

    function vote(string memory name, string memory voterId, string memory candidate) public {
        require(!voters[voterId].hasVoted, "This Voter ID has already voted");
        require(validCandidate(candidate), "Invalid candidate");

        voters[voterId] = Voter(name, voterId, candidate, "", true); // txHash update later
        votesReceived[candidate] += 1;
        allVoterIds.push(voterId);
    }

    function updateTxHash(string memory voterId, string memory txHash) public {
        require(voters[voterId].hasVoted, "Voter has not voted yet");
        voters[voterId].txHash = txHash;
    }

    function getCandidates() public view returns (string[] memory) {
        return candidates;
    }

    function getAllVoterIds() public view returns (string[] memory) {
        return allVoterIds;
    }

    function getVoterDetails(string memory voterId) public view returns (
        string memory name,
        string memory votedCandidate,
        string memory txHash,
        bool hasVoted
    ) {
        Voter memory v = voters[voterId];
        return (v.name, v.votedCandidate, v.txHash, v.hasVoted);
    }

    function validCandidate(string memory candidate) internal view returns (bool) {
        for (uint i = 0; i < candidates.length; i++) {
            if (keccak256(bytes(candidates[i])) == keccak256(bytes(candidate))) {
                return true;
            }
        }
        return false;
    }
