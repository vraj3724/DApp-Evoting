import { useEffect, useState } from "react";
import { BrowserProvider, Contract } from "ethers";
import VotingABI from "./VotingABI.json";
import { Link } from "react-router-dom";

const CONTRACT_ADDRESS = "0x0c142A2D69707bBAc16383798Af9a31f6F5AF8d1";

function VoterTable() {
  const [voters, setVoters] = useState([]);

  const fetchData = async () => {
    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(CONTRACT_ADDRESS, VotingABI, signer);

      const ids = await contract.getAllVoterIds();
      const voterData = await Promise.all(
        ids.map(async (id) => {
          const [name, candidate, txHash, hasVoted] = await contract.getVoterDetails(id);
          return { name, voterId: id, candidate, txHash, hasVoted };
        })
      );
      setVoters(voterData);
    } catch (error) {
      console.error("❌ Error fetching voter data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📋 Voter Table</h2>
      <Link to="/" style={styles.backLink}>← Back to Home</Link>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead style={styles.thead}>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Voter ID</th>
              <th style={styles.th}>Candidate</th>
              <th style={styles.th}>Transaction Hash</th>
            </tr>
          </thead>
          <tbody>
            {voters.map((voter, index) => (
              <tr key={index} style={index % 2 === 0 ? styles.trEven : styles.trOdd}>
                <td style={styles.td}>{voter.name}</td>
                <td style={styles.td}>{voter.voterId}</td>
                <td style={styles.td}>{voter.candidate}</td>
                <td style={styles.td}>
                  {voter.txHash && voter.txHash.startsWith("0x") ? (
                    <a
                      href={`https://sepolia.etherscan.io/tx/${voter.txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={styles.link}
                    >
                      {voter.txHash.slice(0, 12)}...
                    </a>
                  ) : (
                    "N/A"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1000px",
    margin: "40px auto",
    padding: "20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    marginBottom: "20px",
    color: "#333",
    textAlign: "center",
  },
  backLink: {
    display: "inline-block",
    marginBottom: "20px",
    color: "#007bff",
    textDecoration: "none",
  },
  tableWrapper: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    border: "1px solid #ccc",
    backgroundColor: "#fff",
  },
  thead: {
    backgroundColor: "#007bff",
    color: "#fff",
  },
  th: {
    padding: "12px 16px",
    textAlign: "left",
    fontWeight: "bold",
  },
  trEven: {
    backgroundColor: "#f2f2f2",
  },
  trOdd: {
    backgroundColor: "#fff",
  },
  td: {
    padding: "12px 16px",
    borderBottom: "1px solid #ddd",
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default VoterTable;
