import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import styled from "styled-components";
import { BsThreeDotsVertical } from "react-icons/bs";
import { coins } from "../../static/coins";
import Coin from "./Coin";
import BalanceChart from "./BalanceChart";

function Portfolio({ thirdWebTokens, sanityTokens, walletAddress }) {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const tokenToUSD = {};
    for (const token of sanityTokens) {
      tokenToUSD[token.contractAddress] = Number(token.usdPrice);
    }

    const calculateBalance = async () => {
      let balances = await Promise.all(
        thirdWebTokens.map(async (token) => {
          const bal = await token.balanceOf(walletAddress);
          return Number(bal.displayValue) * tokenToUSD[token.getAddress()];
        })
      );
      const totalBalance = balances.reduce((acc, curr) => acc + curr, 0);
      setBalance(totalBalance.toLocaleString());
    };
    calculateBalance();
    return () => calculateBalance();
  }, [thirdWebTokens, walletAddress, sanityTokens]);

  return (
    <Wrapper>
      <Content>
        <Chart>
          <div>
            <Balance>
              <BalanceTitle>Portfolio balance</BalanceTitle>
              <BalanceValue>
                {"$"}
                {balance}
              </BalanceValue>
            </Balance>
          </div>
          <BalanceChart />
        </Chart>
        <PortfolioTable>
          <TableItem>
            <Title>Your Assets</Title>
          </TableItem>
          <Divider />
          <Table>
            <TableItem>
              <TableRow>
                <th style={{ flex: 2 }}>Name</th>
                <th style={{ flex: 2 }}>Balance</th>
                <th style={{ flex: 1 }}>Price</th>
                <th style={{ flex: 1 }}>Allocation</th>
                <th style={{ flex: 0 }}>
                  <BsThreeDotsVertical />
                </th>
              </TableRow>
            </TableItem>
            <Divider />
            <div>
              {coins.map((coin) => (
                <div key={coin.name}>
                  <Coin coin={coin} />
                  <Divider />
                </div>
              ))}
            </div>
          </Table>
        </PortfolioTable>
      </Content>
    </Wrapper>
  );
}

export default Portfolio;

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;
const Content = styled.div`
  width: 100%;
  max-width: 1000px;
  padding: 2rem 1rem;
`;

const Chart = styled.div`
  border: 1px solid #282b2f;
  padding: 1rem 2rem;
`;

const Balance = styled.div``;

const BalanceTitle = styled.div`
  color: #8a919e;
  font-size: 0.9rem;
`;

const BalanceValue = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0.5rem 0;
`;

const PortfolioTable = styled.div`
  margin-top: 1rem;
  border: 1px solid #282b2f;
`;

const Table = styled.table`
  width: 100%;
`;

const TableRow = styled.tr`
  width: 100%;
  display: flex;
  justify-content: space-between;
  & > th {
    text-align: left;
  }
`;

const TableItem = styled.div`
  padding: 1rem 2rem;
`;

const Divider = styled.div`
  border-bottom: 1px solid #282b2f;
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
`;
