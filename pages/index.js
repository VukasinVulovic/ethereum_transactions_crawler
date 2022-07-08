import Head from 'next/head';
import React from 'react';
import InputForm from '../components/InputForm';
import TransactionList from '../components/TransactionList';
import ErroModal from '../components/ErrorModal';

class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      transactions: [],
      error: null
    }
  }

  createRequest(type, address, block) {
    if(type)

    fetch(`/api/transactions/${type}/${address}?block=${block}`)
    .then(async res => {
      const json = await res.json();

      if(json['error']) {
        this.setState({ error: json['error'] })
        return;
      }

      this.setState({
        transactions: json['transactions'],
        error: null
      });
    })
    .catch(error => this.setState({ error: error.message }));
  }

  render() {
    return (
      <>
        <Head>
          <title> Crypto transactions crawler </title>
          <meta name="description" content="Application for the Trace Labs Internship" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
  
        { this.state.error ? <ErroModal message={this.state.error}/> : null }

        <main>
          <InputForm onError={error => this.setState({ error: error })} onProcessed={(type, address, block) => this.createRequest(type, address, block)}/>
          {this.state.transactions.length > 0 ? <TransactionList transactions={this.state.transactions}/> : null}
        </main>
      </>
    );
  }
}

export default App;