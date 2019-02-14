import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import OrderHistoryBox from '../../../components/OrderHistoryBox';
import Colors from '../../../constants/Colors';
import commonStyles from '../../../constants/commonStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainerContent: {
    alignItems: 'center',
  },
  textContainer: {
    marginRight: 224,
    marginLeft: 37,
    marginTop: 45,
		marginBottom: 58,
  },
  mainText: {
		...commonStyles.fontRalewayBold,
		...commonStyles.textMediumCarmine,
		fontSize: 24,
	},
});


export default class OrderHistoryScreen extends React.Component {

  state = {
    // Fetch order history? idk, just copied the mock data
    // there's no price though, not sure how we're doing that one
    // not sure what kind of date format would you want to have, so that's what it is for now
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
      },
    ],
  };

  renderOrderBoxes = () => {
    return this.state.orderHistory.map(order => {
      formattedDate = order.orderDate.replace(/\//g,'.');
      return (
          <OrderHistoryBox
          key = {order.id}
          orderID={order.id}
          orderPrice={'388,00'}
          orderDate={formattedDate}
          isActive={order.isActive}
        />

        // not sure if the whole element has to be clickable or not, 
        // I have just the arrow clickable atm, but it can easily be changed

        // <TouchableOpacity
        //   onPress={this.onPressOrderHistoryDetails}
        //   key = {order.id}
        // >
        //   <OrderHistoryBox
        //     key = {order.id}
        //     orderID={order.id}
        //     orderPrice={'388,00'}
        //     orderDate={order.orderDate}
        //     isActive={order.isActive}
        //   />
        // </TouchableOpacity>
      );
    });
  };

  render () {
    return (
      <ScrollView
        contentContainerStyle={styles.scrollContainerContent}
        style={styles.container}
      >
        <View style={styles.textContainer}>
          <Text style={styles.mainText}>Order History</Text>
        </View>
        
        <View styles={styles.boxesContainer}>
          {this.renderOrderBoxes()}
        </View>
          
      </ScrollView>
    );
  }

  // didn't know which part did you want to be scrollable, so here's two variants
  // there are ways to make the scroll cool, we could also make the active order sticky  
  // but we don't have time for that stuff, so ayyy who even cares 

  
  // render () {
  //   return (
  //     <View style={styles.container}>
  //
  //       <View style={styles.textContainer}>
  //         <Text style={styles.mainText}>Order History</Text>
  //       </View>
        
  //       <ScrollView
  //         showsVerticalScrollIndicator={false}
  //         contentContainerStyle={styles.scrollContainerContent}
  //       >
  //         {this.renderOrderBoxes()}
  //       </ScrollView>
        
  //     </View>
  //   );
  // }
}
