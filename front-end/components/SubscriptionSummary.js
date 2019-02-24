import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';

import commonStyles from '../constants/commonStyles';
import Colors from '../constants/Colors';
import CancelConfirmModal from './CancelConfirmModal';
import { boxNameToImageMapper } from '../utils/mapper';

export default class SubscriptionSummary extends React.Component {
  state = {
    cancelDialogVisible: false,
  };

  onPressOpenCancelDialogModal = () => {
    this.setState({ cancelDialogVisible: true });
  };

  onPressCloseCancelDialogModal = () => {
    this.setState({ cancelDialogVisible: false });
  };

  render() {
    return (
      <View style={{ width: this.props.containerWidth }}>
        {this.props.hasRemoveButton && (
          <View style={{ zIndex: 100 }}>
            <TouchableOpacity onPress={this.onPressOpenCancelDialogModal}>
              <Icon
                name="close"
                size={10}
                color={Colors.white}
                containerStyle={styles.removeSubscriptionIconContainer}
              />
            </TouchableOpacity>
            <CancelConfirmModal
              visible={this.state.cancelDialogVisible}
              onPressCancelSubscription={() =>
                this.props.onPressRemoveSubscription(this.props.id)
              }
              onPressCloseModal={this.onPressCloseCancelDialogModal}
              modalTitle={this.props.modalTitle}
              modalTextContent={this.props.modalTextContent}
            />
          </View>
        )}
        <View
          style={[
            styles.boxContainer,
            { width: this.props.containerWidth - 6 },
          ]}
        >
          <View style={styles.boxImageContainer}>
            <Image
              source={boxNameToImageMapper[this.props.boxName]}
              style={{ height: 72, width: 67 }}
            />
          </View>
          <View style={styles.boxInfoContainer}>
            <Text style={styles.boxNameText}>
              {this.props.boxName.toUpperCase()}
            </Text>
            <Text style={styles.boxWeightText}>
              {this.props.boxWeight}kg/box
            </Text>
          </View>
          <View style={styles.priceInfoContainer}>
            <Text style={styles.boxPriceText}>
              {this.props.boxPrice.toFixed(2).replace('.', ',')} {'\u20AC'}
            </Text>
            <Text style={styles.pricePerMealText}>
              {this.props.pricePerMeal}
              {'\u20AC'}/meal
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

SubscriptionSummary.propTypes = {
  id: PropTypes.string,
  boxName: PropTypes.string,
  boxWeight: PropTypes.number,
  boxPrice: PropTypes.number,
  pricePerMeal: PropTypes.number,
  hasRemoveButton: PropTypes.bool,
  onPressRemoveSubscription: PropTypes.func,
  containerWidth: PropTypes.number,
  modalTitle: PropTypes.string,
  modalTextContent: PropTypes.string,
};

SubscriptionSummary.defaultProps = {
  id: '',
  boxName: '',
  boxWeight: 0,
  boxPrice: 0,
  pricePerMeal: 0,
  hasRemoveButton: false,
  onPressRemoveSubscription: () => {},
  containerWidth: 352,
  modalTitle: '',
  modalTextContent: '',
};

const styles = StyleSheet.create({
  boxContainer: {
    flexDirection: 'row',
    borderRadius: 11,
    backgroundColor: Colors.white,
    marginTop: 8,

    shadowColor: Colors.darkGrey,
    shadowRadius: 4,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
  },
  boxInfoContainer: {
    paddingLeft: 9,
    paddingRight: 30,
    paddingTop: 32,
    paddingBottom: 38,
  },
  priceInfoContainer: {
    paddingLeft: 30,
    paddingTop: 32,
    paddingBottom: 38,
  },
  boxImageContainer: {
    paddingVertical: 16,
    paddingLeft: 22,
    paddingRight: 10,
  },
  boxNameText: {
    ...commonStyles.fontRalewayBold,
    ...commonStyles.textBlack,
    fontSize: 12,
    marginBottom: 5,
  },
  boxWeightText: {
    ...commonStyles.fontRalewaySemiBold,
    ...commonStyles.textGrey,
    fontSize: 10,
  },
  boxPriceText: {
    ...commonStyles.fontRalewayBold,
    ...commonStyles.textMediumCarmine,
    fontSize: 14,
    marginBottom: 5,
  },
  pricePerMealText: {
    ...commonStyles.fontRalewaySemiBold,
    ...commonStyles.textGrey,
    fontSize: 10,
  },
  removeSubscriptionIconContainer: {
    backgroundColor: Colors.lightGrey,
    borderRadius: 50,
    padding: 4,
    position: 'absolute',
    right: 0,
  },
});
