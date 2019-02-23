import React from 'react';
import { StyleSheet, Modal, View, Text, Image } from 'react-native';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import Colors from '../constants/Colors';
import commonStyles from '../constants/commonStyles';

export default class AddNewAddressModal extends React.Component {
  render() {
    return (
      <Modal animationType="fade" transparent visible={this.props.visible}>
        <View style={styles.popupBackground}>
          <View style={styles.popupContainer}>
            <View style={styles.topBackground}/>
            <View style={styles.popupContent}>
              <Image
                source={require('../assets/images/cancelDialogAsset.png')}
                style={styles.cancelDialogImg}
              />
              <Text style={styles.titleText}>{this.props.modalTitle}</Text>
              <Text style={styles.textContent}>
                {this.props.modalTextContent}
              </Text>
              <View style={styles.buttonGroupContainer}>
                <Button
                  type={'outline'}
                  title={'Yes'}
                  titleStyle={[
                    styles.buttonTitleDefaultStyle,
                    commonStyles.textMacaroniCheese,
                  ]}
                  buttonStyle={[
                    styles.buttonDefaultStyle,
                    styles.nonActiveButton,
                  ]}
                  onPress={this.props.onPressCancelSubscription}
                />
                <Button
                  title={'No'}
                  titleStyle={styles.buttonTitleDefaultStyle}
                  buttonStyle={[styles.buttonDefaultStyle, styles.activeButton]}
                  onPress={this.props.onPressCloseModal}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

AddNewAddressModal.propTypes = {
  visible: PropTypes.bool,
  modalTitle: PropTypes.string,
  modalTextContent: PropTypes.string,
  onPressCloseModal: PropTypes.func,
  onPressCancelSubscription: PropTypes.func,
};

AddNewAddressModal.defaultProps = {
  visible: true,
  modalTitle: '',
  modalTextContent: '',
  onPressCloseModal: () => {},
  onPressCancelSubscription: () => {},
};

const styles = StyleSheet.create({
  popupBackground: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6);',
  },

  popupContainer: {
    backgroundColor: Colors.white,
    height: 'auto',
    width: '80%',
    borderRadius: 16,

    shadowOffset: { width: 4, height: 4 },
    shadowColor: '#878787',
    shadowOpacity: 0.25,
  },
  topBackground: {
    width: '100%',
    height: 80,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: Colors.macaroniCheese
  },
  popupContent: {
    paddingBottom: 34,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  cancelDialogImg: {
    height: 156,
    width: 131,
    // marginBottom: 22,
    top: -40,
  },
  titleText: {
    ...commonStyles.fontRalewaySemiBold,
    ...commonStyles.textBlack,
    fontSize: 18,
    textAlign: 'center',
    marginTop: -22,
    marginBottom: 12,
  },
  textContent: {
    ...commonStyles.fontRalewayMedium,
    ...commonStyles.textBlack,
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 18,
    width: '80%',
  },
  buttonGroupContainer: {
    flexDirection: 'row',
    width: '82%',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  buttonTitleDefaultStyle: {
    ...commonStyles.fontRalewaySemiBold,
    fontSize: 14,
  },
  buttonDefaultStyle: {
    paddingVertical: 4,
    width: 102,
    borderRadius: 16,
  },
  activeButton: {
    backgroundColor: Colors.mediumCarmine,
  },
  nonActiveButton: {
    borderColor: Colors.macaroniCheese,
    borderWidth: 1,
  },
});
