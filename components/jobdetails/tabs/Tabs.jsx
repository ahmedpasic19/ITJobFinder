import React from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'

import styles from './tabs.style'
import { SIZES } from '../../../constants'

const Tabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={tabs}
        renderItem={({ item }) => (
          <TabButton
            name={item}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        )}
        contentContainerStyle={{ columnGap: SIZES.small / 2 }}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item}
        horizontal
      />
    </View>
  )
}

export default Tabs

const TabButton = ({ name, activeTab, setActiveTab }) => {
  return (
    <TouchableOpacity
      style={styles.btn(name, activeTab)}
      onPress={() => setActiveTab(name)}
    >
      <Text style={styles.btnText}>{name}</Text>
    </TouchableOpacity>
  )
}
