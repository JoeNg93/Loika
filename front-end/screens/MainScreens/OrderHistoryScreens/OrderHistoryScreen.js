import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import OrderHistoryBox from '../../../components/OrderHistoryBox';
import { formatDate } from '../../../utils/dateTime';
import { setSelectedOrder } from '../../../actions/order';
import commonStyles from '../../../constants/commonStyles';
import Loader from '../../../components/Loader';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    paddingHorizontal: 30,
  },
  scrollContainerContent: {
    justifyContent: 'center',
  },
  textContainer: {
    marginTop: 45,
    marginBottom: 58,
  },
  mainText: {
    ...commonStyles.fontRalewayBold,
    ...commonStyles.textMediumCarmine,
    fontSize: 24,
  },
});

class OrderHistoryScreen extends React.Component {
  static navigationOptions = {
    headerTitle: '',
    headerBackTitle: null,
    headerTransparent: true,
    headerTitleStyle: {
      ...commonStyles.fontRalewayBold,
      fontSize: 18,
    },
    headerStyle: {
      marginTop: 10,
    },
  };

  state = {
    orderHistory: [
      {
        id: 123,
        isActive: true,
        subscriptions: [
          {
            id: 1,
            title: 'Mixed',
            isActive: true,
          },
          {
            id: 2,
            title: 'Vegan',
            isActive: true,
          },
        ],
        deliveryDayOfWeek: 'Tuesday',
        deliveryTime: '10:00-12:00',
        orderDate: '2019/02/02',
        total: 388,
      },
      {
        id: 124,
        isActive: false,
        subscriptions: [
          {
            id: 3,
            title: 'Meat',
            isActive: false,
          },
        ],
        deliveryDayOfWeek: 'Wednesday',
        deliveryTime: '16:00-18:00',
        orderDate: '2019/02/08',
        total: 388,
      },
    ],
  };

  onPressOrderHistoryDetails = order => {
    this.props.setSelectedOrder(order);
    this.props.navigation.navigate('OrderHistoryDetails');
  };

  renderOrderBoxes = () => {
    return this.props.user.orders.map(order => {
      return (
        <TouchableOpacity
          onPress={() => this.onPressOrderHistoryDetails(order)}
          key={order.id}
        >
          <OrderHistoryBox
            key={order.id}
            orderID={order.id}
            orderPrice={order.total}
            orderDate={formatDate(new Date(order.paymentDate))}
            isActive={order.cancelDate === null}
          />
        </TouchableOpacity>
      );
    });
  };

  render() {
    if (_.isEmpty(this.props.user)) {
      return <Loader />;
    }

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainerContent}
        style={styles.container}
      >
        <View style={styles.textContainer}>
          <Text style={styles.mainText}>Order History</Text>
        </View>

        <View>{this.renderOrderBoxes()}</View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(
  mapStateToProps,
  { setSelectedOrder }
)(OrderHistoryScreen);
