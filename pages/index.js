import styled from "styled-components";
import { useAddress, useMetamask } from "@thirdweb-dev/react";
import Dashboard from "./Dashboard";

export default function Home() {
  const connectWithMetamask = useMetamask();
  const address = useAddress();
  return (
    <Wrapper>
      {address ? (
        <Dashboard address={address} />
      ) : (
        <WalletConnect>
          <Button onClick={() => connectWithMetamask()}>Connect Wallet</Button>
          <Details>
            You need Chrome to be
            <br /> able to run this app.
          </Details>
        </WalletConnect>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  max-width: 100vw;
  background-color: #0a0b0d;
  color: white;
  display: grid;
  place-items: center;
`;

const WalletConnect = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  border: 1px solid #282b2f;
  border-radius: 0.4rem;
  padding: 0.8rem;
  font-size: 1.3rem;
  font-weight: 500;
  color: #000;
  background-color: #3773f5;

  &:hover {
    cursor: pointer;
  }
`;

const Details = styled.div`
  color: #282b2f;
  font-weight: 500;
  font-size: 1.2rem;
  text-align: center;
  margin-top: 1rem;
`;
