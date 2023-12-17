import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const SectionHeader = ({ title, onViewAllPress }) => {
  return (
    <View style={{ flexDirection: 'row', marginTop: 10 }}>
      <Text style={{ color: '#0082F7', fontWeight: 'bold' }}>{title}</Text>
      <TouchableOpacity
        style={{ justifyContent: 'center', alignItems: 'flex-end', flex: 1 }}
        onPress={onViewAllPress}
      >
        <Text style={{ color: '#FDB436', fontWeight: 'bold' }}>Lihat Semua</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SectionHeader;
