import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaWallet } from "react-icons/fa";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "../../../lib/sanity";
import Image from "next/image";

function SendModal({
  selectedToken,
  setAction,
  thirdWebTokens,
  walletAddress,
}) {
  const [amount, setAmount] = useState(0);
  const [recepient, setRecepient] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [activeThirdWebToken, setActiveThirdWebToken] = useState(
    thirdWebTokens[0]
  );
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (!selectedToken || !thirdWebTokens) return;

    const [activeToken, ...rest] = thirdWebTokens.filter(
      (token) => token.getAddress() === selectedToken.contractAddress
    );

    console.log(activeToken);
    setActiveThirdWebToken(activeToken);
  }, [thirdWebTokens, selectedToken]);

  useEffect(() => {
    if (!selectedToken) {
      return;
    }
    const url = imageUrlBuilder(client).image(selectedToken.logo).url();
    setImageUrl(url);
  }, [selectedToken]);

  useEffect(() => {
    if (!activeThirdWebToken) return;
    const getBalance = async () => {
      const balance = await activeThirdWebToken.balanceOf(walletAddress);
      console.log("balance:", balance);
      setBalance(balance.displayValue);
    };
    getBalance();
  }, [activeThirdWebToken, walletAddress]);

  const sendCrypto = async (amount, recepient) => {
    console.log("sending crytpo.....", activeThirdWebToken, amount, recepient);

    if (activeThirdWebToken && amount && recepient) {
      console.log(activeThirdWebToken, amount, recepient);
      setAction("transferring");
      const tx = await activeThirdWebToken.transfer(
        recepient,
        amount.toString()
      );
      console.log(tx);
      setAction("transferred");
    } else {
      console.error("missing data");
    }
  };

  return (
    <Wrapper>
      <Amount>
        <FlexInputContainer>
          <FlexInput
            placeholder="0"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <span>{selectedToken?.symbol}</span>
        </FlexInputContainer>
        <Warning style={{ color: amount && "#0a0b0d" }}>
          Amount is a required field
        </Warning>
      </Amount>
      <TransferForm>
        <Row>
          <FieldName>To</FieldName>
          <InputArea>
            <Icon>
              <FaWallet />
            </Icon>
            <Recepient
              placeholder="Address"
              value={recepient}
              onChange={(e) => setRecepient(e.target.value)}
            />
          </InputArea>
        </Row>
        <Divider />
        <Row>
          <FieldName>Pay</FieldName>
          <CoinSelectList onClick={() => setAction("select")}>
            <Icon>
              <Image crossOrigin="" src={imageUrl} alt="coin icon"/>
            </Icon>
            <CoinName>{selectedToken?.name}</CoinName>
          </CoinSelectList>
        </Row>
      </TransferForm>
      <Row>
        <ContinueBtn onClick={() => sendCrypto(amount, recepient)}>
          Continue
        </ContinueBtn>
      </Row>
      <Row>
        <BalanceTitle>{selectedToken?.symbol} Balance</BalanceTitle>
        <Balance>
          {balance} {selectedToken?.symbol}
        </Balance>
      </Row>
    </Wrapper>
  );
}

export default SendModal;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1;
`;

const Amount = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const FlexInputContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-end;

  & > span {
    font-size: 3rem;
    margin-bottom: 0.5rem;
    color: #3773f5;
  }
`;

const FlexInput = styled.input`
  border: none;
  background: none;
  outline: none;
  color: white;
  text-wrap: wrap;
  text-align: right;
  max-width: 45%;
  margin-right: 1rem;
  font-size: 4.5rem;

  &::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;

const Warning = styled.div`
  padding: 1rem 2rem;
  text-align: center;
  color: #8a919e;
`;

const Divider = styled.div`
  border-bottom: 1px solid #282b2f;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #8a919e;
  padding: 1rem 0;
  font-size: 1.2rem;
`;

const FieldName = styled.div`
  flex: 0.5;
  padding-left: 2rem;
`;

const Icon = styled.div`
  margin-right: 1rem;
  height: 1.8rem;
  width: 1.8rem;
  border-radius: 50%;
  overflow: hidden;
  display: grid;
  place-items: center;
  & > img {
    height: 120%;
    width: 120%;
    object-fit: cover;
  }
`;

const InputArea = styled.div`
  display: flex;
  flex: 1;
`;

const Recepient = styled.input`
  flex: 1;
  border: none;
  background: none;
  outline: none;
  color: white;
  font-size: 1.2rem;
  text-wrap: wrap;
  margin-right: 0.5rem;
`;

const CoinSelectList = styled.div`
  display: flex;
  flex: 1.9;
  height: 100%;
  &:hover {
    cursor: pointer;
  }
`;

const CoinName = styled.div`
  flex: 1;
  border: none;
  background: none;
  outline: none;
  color: white;
  font-size: 1.2rem;
  text-wrap: wrap;
  margin-right: 0.5rem;
`;

const ContinueBtn = styled.button`
  color: white;
  width: 100%;
  background-color: #3773f5;
  padding: 1rem;
  text-align: center;
  border-radius: 0.4rem;
  font-size: 1.2rem;

  &:hover {
    cursor: pointer;
    background-color: #4a80f6;
  }
`;

const TransferForm = styled.div`
  border: 1px solid #282b2f;
  border-radius: 0.4rem;
`;

const BalanceTitle = styled.div``;
const Balance = styled.div``;
