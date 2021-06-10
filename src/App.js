import { useContext, useState } from 'react'
import { Web3Context } from 'web3-hooks';
import { ethers } from 'ethers'

function App() {
  const [web3State, login] = useContext(Web3Context)
  const [ethBalance, setEthBalance] = useState(0)
  const [address, setAddress] = useState(ethers.constants.AddressZero)
  const [eth2Send, setEth2Send] = useState(0)

  const handleClickGetBalance = async () => {
    try {
    const balance = await web3State.provider.getBalance(address)
    setEthBalance(ethers.utils.formatEther(balance))
    } catch (e) {
      console.log(e)
    }  
  }
  
const handleClickSend = async () => {
  const weiAmount = ethers.utils.parseEther(eth2Send)
  try {
  await web3State.signer.sendTransaction({ to: address, value: weiAmount })
  } catch (e) {
    console.log(e)
  }
}

  return (
    <>
     <p>Metamask installed : {web3State.isMetamask ? 'yes' : 'no' } </p>
     <p>Web3 : {web3State.isWeb3 ? 'injected' : 'no-injected'} </p>
     {!web3State.isLogged && (
      <>
        <button onClick={login}>Login</button>
      </> 
     )}
     <p>Network ID: {web3State.chainId}</p>
     <p>Network Name: {web3State.networkName}</p>
     <p>Account: {web3State.account}</p>
     <p>Balance: {web3State.balance}</p>
     <label htmlFor="BalanceOf"></label>
     <input 
     id="balanceOf" 
     type="text" 
     value={address} 
     placeholder="ethereum address" 
     onChange={(event)=> setAddress(event.target.value)}
     />
     <button onClick={handleClickGetBalance}>get balance</button>
     {}
     <p>
       Balance of {address}: {ethBalance} Ether
       </p>
     <label htmlFor="eth2Send">Send To: </label>
     <input 
      id="eth25send"
      type="text"
      placeholder="ether amount"
      value={eth2Send}
      onChange={(event)=> setEth2Send}
      />
     <button onClick={handleClickSend}>Send To: </button>
    </>
  )
}

export default App;
