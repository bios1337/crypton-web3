import React from "react";
import styled from "styled-components";
import CoinItem from "./CoinItem";

function CoinSelector({
  setAction,
  selectedToken,
  setSelectedToken,
  sanityTokens,
  walletAddress,
  thirdWebTokens,
}) {
  return (
    <Wrapper>
      <Title>Selected Asset</Title>
      <CoinList>
        {sanityTokens?.map((token, i) => (
          <CoinItem
            key={i}
            token={token}
            sender={walletAddress}
            selectedToken={selectedToken}
            setSelectedToken={setSelectedToken}
            thirdWebTokens={thirdWebTokens}
            sanityTokens={sanityTokens}
            setAction={setAction}
          />
        ))}
      </CoinList>
    </Wrapper>
  );
}

export default CoinSelector;

const Wrapper = styled.div``;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.3rem;
  font-weight: 600;
`;

const CoinList = styled.div`
  padding: 0px 5px;
`;
