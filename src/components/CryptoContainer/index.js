import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import FetchCoinData from '../../config/redux/Actions/FetchCoinData';
import CoinCard from '../CoinCard';

class CryptoContainer extends Component {
  componentWillMount() {
    this.props.FetchCoinData();
  }

  renderCoinCard() {
    const {crypto} = this.props;
    return crypto.data.map((coin) => (
      <CoinCard
        key={coin.name}
        coin_name={coin.name}
        symbol={coin.symbol}
        price_usd={coin.price_usd}
        precent_change_24hr={coin.precent_change_24hr}
        precent_change_7d={coin.precent_change_7d}
      />
    ));
  }

  render() {
    const {crypto} = this.props;
    const {contentContainer} = styles;

    if (crypto.isFetching) {
      return (
        <View>
          <Spinner
            visible={crypto.isFetching}
            textContent={'Loading...'}
            textStyle={{color: '#253145'}}
            animation={fade}
          />
        </View>
      );
    }

    return (
        <ScrollView contentContainerStyle={contentContainer}>
            {this.renderCoinCard()}
        </ScrollView>
    )
  }
}

const styles = {
    contentContainer: {
        paddingBottom: 100,
        paddingTop : 55,
    }
}

const mapStateToPros = (state) => {
    return {
        crypto: state.crypto
    }
}

export default connect(mapStateToPros, {FetchCoinData})(CryptoContainer)
