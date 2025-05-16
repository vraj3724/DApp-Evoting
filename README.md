# 🗳️ E-Voting DApp – Blockchain-Based Voting Platform

**E-Voting DApp** is a decentralized electronic voting system built on the Ethereum blockchain using **React**, **Solidity**, and **ethers.js**. It enables users to cast votes securely and view all voting records with transparency and immutability guaranteed by blockchain technology.

---

## 🚀 Features

- 🗳️ Secure vote submission using MetaMask
- 🧑‍💼 Register voters by name and ID
- ✅ One vote per voter (double voting prevention)
- 📊 View all voter details and transaction hashes
- 🔍 Transparent vote audit via Etherscan links

---

## 🧱 Smart Contract Overview

The Solidity smart contract includes the following key functions:

- `vote(name, voterId, candidate)`: Casts a vote
- `updateTxHash(voterId, txHash)`: Stores transaction hash after voting
- `getVoterDetails(voterId)`: Returns voter details and vote status
- `getAllVoterIds()`: Lists all voter IDs
- `getCandidates()`: Lists all candidates
- `votesReceived(candidate)`: Total votes per candidate

Deployed to:  
**Sepolia Testnet Address**: `0x69361eCc26820703aB0c1eF116d05b2e05db07d0`

---

## 🖥️ Tech Stack

| Layer       | Tech                            |
|-------------|----------------------------------|
| Frontend    | React.js                         |
| Styling     | CSS                              |
| Blockchain  | Solidity, Ethereum (Sepolia)     |
| Web3        | ethers.js                        |
| Routing     | React Router                     |
| Wallet      | MetaMask                         |

---

## 📂 Project Structure

```bash
DApp-Evoting/
├── App.js                   # Main routing and logic
├── index.js                 # React root file
├── VotingABI.json           # Contract ABI
├── VoterTable.js            # Table UI for displaying voters
├── VoterTablePage.js        # Wrapper page for table
├── App.css / index.css      # Styling files
```

---

## 🧪 Component Overview

- **App.js** – Loads contract, handles voting, fetches voter list
- **VoterTable.js** – Displays list of all voters and their votes
- **VoterTablePage.js** – Wrapper route for viewing all votes
- **VotingABI.json** – Contains the smart contract's ABI

---

## 🔧 How to Run Locally

### Prerequisites
- Node.js and npm
- MetaMask extension
- Sepolia testnet ETH (get from faucet)

### Steps

```bash
git clone https://github.com/vraj3724/DApp-Evoting.git
cd DApp-Evoting
npm install
npm start
```

Then visit: [http://localhost:3000](http://localhost:3000)

---

## 🛠 Smart Contract Deployment (via Remix)

1. Go to [Remix IDE](https://remix.ethereum.org)
2. Paste and compile your Solidity contract
3. Deploy using **Injected Web3** (MetaMask)
4. Copy deployed contract address
5. Update `CONTRACT_ADDRESS` in `App.js`

---

## 📈 Potential Future Enhancements

- 🛡️ Admin panel to manage candidates
- 📋 Voter eligibility verification
- 🧾 IPFS for candidate profile storage
- 📱 Mobile optimization

---

## 🤝 Contributors

- Vraj Patel (https://github.com/vraj3724)

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).
