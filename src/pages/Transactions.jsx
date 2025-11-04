import React from 'react';
import './Transactions.css';

function Transactions() {
  const transactions = [
    { hash: '0x1234...5678', type: 'TaskCreated', robot: 'robot_001', amount: '100 RVM', time: '2 min ago' },
    { hash: '0x2345...6789', type: 'TaskAccepted', robot: 'robot_003', amount: '-', time: '5 min ago' },
    { hash: '0x3456...7890', type: 'TaskFinalized', robot: 'robot_007', amount: '150 RVM', time: '12 min ago' },
    { hash: '0x4567...8901', type: 'TaskCreated', robot: 'robot_001', amount: '200 RVM', time: '18 min ago' }
  ];

  return (
    <div className="transactions">
      <h1>Transactions</h1>
      <div className="transactions-table">
        <table>
          <thead>
            <tr>
              <th>Hash</th>
              <th>Type</th>
              <th>Robot</th>
              <th>Amount</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, index) => (
              <tr key={index}>
                <td className="tx-hash">{tx.hash}</td>
                <td>
                  <span className={`tx-type tx-type-${tx.type.toLowerCase()}`}>
                    {tx.type}
                  </span>
                </td>
                <td>{tx.robot}</td>
                <td className="tx-amount">{tx.amount}</td>
                <td className="tx-time">{tx.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Transactions;

