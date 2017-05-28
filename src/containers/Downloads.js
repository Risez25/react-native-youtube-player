import React, { Component } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  FlatList
} from 'react-native';

import Styles from '../styles';
import Song from '../components/Song';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ActionCreators from '../actions';
import BottomTabs from '../components/BottomTabs';
import { Actions } from 'react-native-router-flux';

class Downloads extends Component {
  state = {page: 'download'}

  componentDidMount() {
    this.props.getSongs();
  }

  onSongPlay(index) {
    Actions.player({songIndex: index})
  }

  deleteSong(index) {
    this.props.deleteSong(index, this.props.songs[index]);
  }

  render() {
    console.log(this.props.songs);
    return (
      <View style={{flex: 1}}>
        <View style={[Styles.homeContainer, {paddingBottom: 50}]}>
          <FlatList
            data={this.props.songs}
            renderItem={({item, index}) => {console.log(item);
              return (<Song
                    key={index}
                    onPress={this.onSongPlay.bind(this, index)}
                    songName={item.title}
                    artistName={item.artist}
                    songImage={item.thumb}
                    deleteSong={this.deleteSong.bind(this, index)}
                    keyExtractor={(item, index) => item.id}
            />)}}
          />
        </View>
        <BottomTabs page={this.state.page}/>

      </View>);
  }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(store) {
    return {
      songs: store.songs
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Downloads);