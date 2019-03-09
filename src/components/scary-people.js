import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';

import { fetchPeople } from '../actions/people';
import scaryPeopleStyle from './scary-people.style';

class ScaryPeople extends Component {
  componentWillMount() {
    this.props.fetchData();
  }

  mapPeople = () => {
    const { peopleData } = this.props;
    if (peopleData) {
      return peopleData.people.map((s, index) => {
        return (
          <View key={index} style={scaryPeopleStyle.itemList}>
            <Text>
              {s.name} is {s.age} years old
            </Text>
          </View>
        );
      });
    }
  };

  render() {
    return (
      <View style={scaryPeopleStyle.containerList}>
        <ScrollView>{this.mapPeople()}</ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    peopleData: state.peopleData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: () => {
      return dispatch(fetchPeople());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScaryPeople);
