import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableHighlight
} from "react-native";
import { Input } from "react-native-elements";
import { Constants } from "expo";
import { TextInput } from "react-native-gesture-handler";

class AddressScreen extends Component {
  render() {
    const { width } = Dimensions.get("window");

    return (
      <View style={styles.addressContainer}>
        <View style={styles.shippingAddress}>
          <Input label="Full name" />
          <Input label="Street Address" />
          <View>
            <Input label="Postal Code" />
            <Input label="City" />
          </View>
          <Input label="Phone number" />
        </View>
        <View style={styles.billingAddress}>
          <Input label="Full name" />
          <Input label="Street Address" />
          <View>
            <Input label="Postal Code" />
            <Input label="City" />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  addressContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: this.width
  },

  shippingAddress: {
    display: "flex",
    width: this.width
  },

  billingAddress: {
    display: "flex",
    width: this.width
  }
});

export default AddressScreen;
