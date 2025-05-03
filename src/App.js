import { useEffect, useState } from "react";
import { BrowserProvider, Contract } from "ethers";
import VotingABI from "./VotingABI.json";
import { Link } from "react-router-dom";
import "./App.css";

const CONTRACT_ADDRESS = "0x0c142A2D69707bBAc16383798Af9a31f6F5AF8d1";

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [message, setMessage] = useState("");
  const [transactionHash, setTransactionHash] = useState(null);
  const [voterName, setVoterName] = useState("");
  const [voterId, setVoterId] = useState("");

  const connectWallet = async () => {
    if (!window.ethereum) return alert("Please install MetaMask");
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const userAddress = await signer.getAddress();
    setAccount(userAddress);
    const votingContract = new Contract(CONTRACT_ADDRESS, VotingABI, signer);
    setContract(votingContract);
    const fetchedCandidates = await votingContract.getCandidates();
    setCandidates(fetchedCandidates);
  };

  const checkIfVoted = async () => {
    if (!voterId || !contract) return false;
    const [, , hasVoted] = await contract.getVoterDetails(voterId);
    return hasVoted;
  };

  const voteFor = async (candidate) => {
    if (!voterName || !voterId) {
      setMessage("Please enter your name and Voter ID.");
      return;
    }

    try {
      const alreadyVoted = await checkIfVoted();
      if (alreadyVoted) {
        setMessage("❌ This Voter ID has already voted.");
        return;
      }

      const tx = await contract.vote(voterName, voterId, candidate);
      await tx.wait();
      await contract.updateTxHash(voterId, tx.hash);
      setTransactionHash(tx.hash);
      setMessage(`✅ Vote cast successfully for "${candidate}"`);
    } catch (err) {
      setMessage(`❌ ${err.reason || err.message}`);
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <div style={{ backgroundColor: "#0f2b3c", minHeight: "100vh", paddingTop: "60px", fontFamily: "sans-serif" }}>
      <div
        style={{
          backgroundColor: "#fff",
          maxWidth: "80%",
          margin: "auto",
          padding: "10px 50px",
          borderRadius: "10px",
          boxShadow: "0px 0px 20px rgba(0,0,0,0.2)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
        </div>
        <h2 style={{ textAlign: "center", marginBottom: "40px" }}>🗳️ E-Voting D-App</h2>

        <div className="wallet-address" style={{ marginBottom: "20px", fontSize: "20px", color: "green" }}>
          Wallet Connected: {account}
        </div>

        <input
          type="text"
          placeholder="Your Name"
          value={voterName}
          onChange={(e) => setVoterName(e.target.value)}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Voter ID"
          value={voterId}
          onChange={(e) => setVoterId(e.target.value)}
          style={inputStyle}
        />

        <div style={{ marginTop: "20px" }}>
          {candidates.map((candidate, index) => (
            <button
              key={index}
              onClick={() => voteFor(candidate)}
              style={{
                ...buttonStyle,
                width: "100%",
                marginBottom: "10px",
                fontSize: "17px",
                backgroundColor: "green",
              }}
            >
              Vote for {candidate}
            </button>
          ))}
        </div>

        {message && <div style={{ marginTop: "20px", fontWeight: "bold", color: "#444" }}>{message}</div>}

        {transactionHash && (
          <div style={{ marginTop: "15px", fontSize: "13px" }}>
            <strong>🔗 Transaction:</strong>{" "}
            <a
              href={`https://sepolia.etherscan.io/tx/${transactionHash}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {transactionHash.slice(0, 12)}...
            </a>
          </div>
        )}

        <Link
          to="/table"
          style={{
            display: "block",
            marginTop: "10px",
            textAlign: "center",
            color: "black",
            textDecoration: "none"
          }}
        >
          📊 View Voter Table
        </Link>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "15px",
  marginBottom: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "15px"
};

const buttonStyle = {
  padding: "10px",
  borderRadius: "6px",
  border: "none",
  color: "#fff",
  fontWeight: "bold",
  cursor: "pointer"
};

export default App;
