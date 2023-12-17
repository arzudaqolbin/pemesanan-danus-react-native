import React from 'react';
import { View, Text } from 'react-native';

const StatusBadge = ({ status, count, backgroundColor = '#018BF7', textColor = '#212121' }) => {
  return (
    <View
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{
        borderRadius: 10,
        backgroundColor,
        marginBottom: 10,
      }}
    >
      <View style={{ paddingHorizontal: 40, paddingVertical: 10, borderRadius: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: textColor }}>{status}</Text>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: textColor }}>{count}</Text>
        </View>
      </View>
    </View>
  );
};

export default StatusBadge;
