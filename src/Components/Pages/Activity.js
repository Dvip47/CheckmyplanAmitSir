import React, { useState, useEffect } from "react";
import RTCP from "../../abi/RTCP.json";
import Swap from "../../abi/Swap.json";
import { current } from "@reduxjs/toolkit";
const ethers = require("ethers");

const RTCP_Address = "0xbafc67357ad8e7ee7aaacac8d13b2e40d823c5b4";
const Swap_Address = "0x3b6f4f4eb3bb7cd26a94e51b393f8d78a121c05c";

function Activity() {
  const [txns, setTxns] = useState([]);
  const [contractListened, setContractListened] = useState();
  const [contractInfo, setContractInfo] = useState({
    address: "-",
    name: "-",
    symbol: "-",
    totalSupply: "-",
  });

  // const [balance, setBalance] = useState({
  //   address: "",
  //   balance: "",
  // });

  useEffect(() => {
    if (contractInfo.address !== "-") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const Token = new ethers.Contract(
        contractInfo.address,
        RTCP.abi,
        provider
      );

      Token.on("Transfer", (from, to, amount, event) => {
        // console.log({ from, to, amount, event });

        setTxns((currentTxs) => [
          ...currentTxs,
          {
            txHash: event.transactionHash,
            from,
            to,
            amount: String(amount),
          },
        ]);
      });
      setContractListened(Token);

      return () => {
        contractListened.removeAllListeners();
      };
    }
  }, [contractInfo.address]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const provider = new ethers.provider.Web3Provider(window.ethereum);
    const Token = new ethers.Contract(RTCP_Address, RTCP, provider);
    const tokenName = await Token.name();
    const tokenSymbol = await Token.symbol();
    const tokenTotalSupply = await Token.totalSupply();
  };

  const handleApprove = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const Token = new ethers.Contract(RTCP_Address, RTCP.abi, signer);
    // console.log(data.get("address"));
    const tx = await Token.approve(data.get("address"), data.get("amount"));
    // console.log(tx);
  };

  return (
    <div>
      <div className="card-header">
        <h5 className="header-title mt-0">Activity</h5>
      </div>
      <form className="card-body" onSubmit={handleApprove}>
        <div className="form-group">
          <input
            className="form-control"
            type="address"
            required=""
            placeholder="Spender_address"
            name="address"
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="amount"
            pattern="[0-9]*"
            required="number"
            placeholder="amount"
            name="amount"
            // onChange={handleChange}
            // value={input.amount}
          />
        </div>
        <button
          className="btn btn-danger btn-block waves-effect waves-light"
          type="submit"
        >
          Approve
        </button>
      </form>
    </div>
  );
}
export default Activity;
