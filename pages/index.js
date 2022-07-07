import Head from 'next/head';
import React from 'react';
import InputForm from '../components/InputForm';
import TransactionList from '../components/TransactionList';

const transactions = [
  {
    timestamp: 'Jul-07-2022 01:40:03 PM +UTC',
    block: 15095770,
    hash: '0xe75eb7022a2375bf9aca15be4612149418a507db763bec793beae93ba8edb337',
    receiver: '0x0000000000000000000000000000000000000000'
  },
  {
    timestamp: 'Jul-08-2022 02:40:03 PM +UTC',
    block: 15095220,
    hash: '0xe75eb7022a2375bf944415be4612149418a507db763bec793beae93ba8edb337',
    receiver: false
  }
];

class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      transactions: []
    };
  }

  render() {
    return (
      <>
        <Head>
          <title> Ethereum transactions crawler task </title>
          <meta name="description" content="Application for the Trace Labs Internship" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
  
        <main>
          <InputForm onProcessed={() => { this.setState({ transactions }) }}/>
          {this.state.transactions.length > 0 ? <TransactionList transactions={this.state.transactions}/> : null}
        </main>
      </>
    );
  }
}

export default App;