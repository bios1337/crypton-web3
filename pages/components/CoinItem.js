import imageUrlBuilder from "@sanity/image-url";
import React, { useEffect, useState } from "react";
import { client } from "../../lib/sanity";
import { FaCheck } from "react-icons/fa";
import styled from "styled-components";
import Image from "next/image";

function CoinItem({
  sender,
  token,
  setAction,
  thirdWebTokens,
  sanityTokens,
  walletAddress,
  setSelectedToken,
  selectedToken,
  key,
}) {
  const [balance, setBalance] = useState("Fetching....");
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    let activeThirdWebToken;
    const getBalance = async () => {
      console.log("hehehe", thirdWebTokens, token);
      thirdWebTokens.map((thirdWebToken) => {
        if (thirdWebToken.getAddress() === token?.contractAddress) {
          activeThirdWebToken = thirdWebToken;
          console.log("matched");
        }
      });

      const bal = await activeThirdWebToken.balanceOf(sender);
      return await setBalance(bal.displayValue.split(".")[0]);
    };

    const getImgUrl = async () => {
      const url = await imageUrlBuilder(client).image(token.logo).url();
      setImageUrl(url);
    };
    getBalance();
    getImgUrl();
  }, [sender, thirdWebTokens, token]);

  return (
    <Wrapper
      style={{
        backgroundColor: selectedToken?.name === token?.name && "#141519",
      }}
      onClick={() => {
        setSelectedToken(token);
        setAction("send");
      }}
    >
      <Main>
        <Icon>
          {imageUrl && <Image src={imageUrl} alt={token?.name} layout="fill" />}
        </Icon>
        <NameDetails>
          <Name>{token?.name}</Name>
          <Symbol>{token?.symbol}</Symbol>
        </NameDetails>
      </Main>
      <Balance>
        {balance} {token?.symbol}
      </Balance>
      <IsSelected>
        {Boolean(selectedToken?.contractAddress === token?.contractAddress) && (
          <FaCheck />
        )}
      </IsSelected>
    </Wrapper>
  );
}

export default CoinItem;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 0.5rem;
  border-radius: 0.5rem;
  margin-bottom: 0.3rem;

  &:hover {
    background-color: #0e0f14;
  }
`;

const Main = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Icon = styled.div`
  position: relative;
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
    object-fit: contain;
  }
`;

const NameDetails = styled.div`
  font-size: 1.1rem;
  margin-bottom: 0.2rem;
`;
const Name = styled.div`
  font-size: 1.1rem;
  margin-bottom: 0.2rem;
`;

const Symbol = styled.div`
  color: #888f9b;
  font-size: 0.8rem;
`;

const Balance = styled.div``;

const IsSelected = styled.div`
  margin-left: 0.5rem;
  color: #3773f5;
`;
