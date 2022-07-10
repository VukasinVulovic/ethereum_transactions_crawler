import Head from 'next/head';
import React from 'react';
import InputForm from '../components/InputForm';
import TransactionList from '../components/TransactionList';
import ErrorModal from '../components/ErrorModal';
import Loader from '../components/Loader';
import CryptoConverter from '../components/CryptoConverter';

class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      transactions: [],
      error: null,
      loading: false
    }

    this.pageSize = 100;
    this.pageOffset = 0;

    this.reqOps = {
      type: null,
      address: null,
      block: null
    }

    this.blockRequests = false;
  }

  createRequest(type, address, block) {
    if(!type || this.blockRequests)
      return;

    this.reqOps = {
      type,
      address,
      block
    }

    this.blockRequests = true; //faster than set state
    this.setState({ loading: true });

    fetch(`/api/transactions/${type}/${address}?block=${block}&pageSize=${this.pageSize}&pageOffset=${this.pageOffset}`)
    .then(async res => {
      const json = await res.json();

      
      if(json['error']) {
        this.setState({ error: json['error'], loading: false });
        this.blockRequests = json['error'] === 'No transactions found'; //if no transactions, don'r request
        return;
      }

      this.blockRequests = json['transactions'].length === 0; //if no transactions found

      this.setState({
        transactions: [...this.state.transactions, ...json['transactions']],
        loading: false,
        error: null
      });

    })
    .catch(error => {
      this.setState({ error: error.message, loading: false });
      this.blockRequests = false;
    });
  }

  runSearchQuery(type, address, block) { 
    this.pageOffset = 0;
    this.state.transactions = [];
    this.createRequest(type, address, block);
    this.blockRequests = false;
  } 

  scrolledToEnd() {
    this.pageOffset += this.pageSize;
    this.createRequest(this.reqOps.type, this.reqOps.address, this.reqOps.block);
  }

  render() {
    return (
      <>
        <Head>
          <title> Crypto transactions crawler </title>
          <meta name="description" content="Application for the Trace Labs Internship" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
  
        { this.state.error ? <ErrorModal message={this.state.error}/> : null }
        { this.state.loading ? <Loader/> : null }

        <main>
          <CryptoConverter onError={error => this.setState({ error: error })}/>
          <InputForm onError={error => this.setState({ error: error })} onProcessed={this.runSearchQuery.bind(this)}/>
          {this.state.transactions.length > 0 ? <TransactionList triggerOffset={0} onScrolledToEnd={this.scrolledToEnd.bind(this)} transactions={this.state.transactions}/> : null}
        </main>
      </>
    );
  }
}

export default App;