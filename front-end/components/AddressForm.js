import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Colors from '../constants/Colors';
import commonStyles from '../constants/commonStyles';
import PropTypes from 'prop-types';

const addressFormLabel = {
  name: 'name',
  address: 'address',
  postCode: 'postCode',
  city: 'city',
  phoneNumber: 'phoneNumber',
};

export default function AddressForm({
  name,
  address,
  postCode,
  city,
  phoneNumber,
  onAddressInputChange,
}) {
  return (
    <View style={styles.formContainer}>
      <Input
        label={'Full name'}
        inputContainerStyle={styles.inputContainer}
        labelStyle={styles.inputLabel}
        inputStyle={styles.inputValue}
        defaultValue={name}
        onChangeText={text =>
          onAddressInputChange({ label: addressFormLabel.name, value: text })
        }
      />
      <Input
        label={'Street and house number'}
        containerStyle={styles.inputFieldContainer}
        inputContainerStyle={styles.inputContainer}
        labelStyle={styles.inputLabel}
        inputStyle={styles.inputValue}
        backgroundColor={'transparent'}
        defaultValue={address}
        onChangeText={text =>
          onAddressInputChange({ label: addressFormLabel.address, value: text })
        }
      />
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Input
          label={'Postcode'}
          containerStyle={[styles.inputFieldContainer, styles.smallInputContainer]}
          inputContainerStyle={styles.inputContainer}
          labelStyle={styles.inputLabel}
          inputStyle={styles.inputValue}
          backgroundColor={'transparent'}
          defaultValue={postCode}
          onChangeText={text =>
            onAddressInputChange({ label: addressFormLabel.postCode, value: text })
          }
        />
        <Input
          label={'City (Finland only)'}
          containerStyle={[styles.inputFieldContainer, styles.smallInputContainer]}
          inputContainerStyle={styles.inputContainer}
          labelStyle={styles.inputLabel}
          inputStyle={styles.inputValue}
          backgroundColor={'transparent'}
          defaultValue={city}
          onChangeText={text =>
            onAddressInputChange({ label: addressFormLabel.city, value: text })
          }
        />
      </View>
      <Input
        label={'Phone number'}
        containerStyle={styles.inputFieldContainer}
        inputContainerStyle={styles.inputContainer}
        labelStyle={styles.inputLabel}
        inputStyle={styles.inputValue}
        backgroundColor={'transparent'}
        defaultValue={phoneNumber}
        onChangeText={text =>
          onAddressInputChange({ label: addressFormLabel.phoneNumber, value: text })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputFieldContainer: {
    marginTop: 18
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGrey,
    paddingLeft: 2,
    height: 24
  },
  smallInputContainer: {
    width: 150
  },
  inputLabel: {
    ...commonStyles.fontRalewayMedium,
    ...commonStyles.textGrey,
    fontSize: 10,
    paddingLeft: 2,
    marginBottom: 4
  },
  inputValue: {
    ...commonStyles.fontRalewayMedium,
    ...commonStyles.textBlack,
    fontSize: 12,
    borderWidth: 0
  },
});
