import { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native'
import { useRouter } from 'expo-router'

import { icons, COLORS, SIZES } from '../../../constants'

import styles from './welcome.style'

const Welcome = () => {
  const [activeJobType, setActiveJobType] = useState('')
  const router = useRouter()

  const jobTypes = ['Full-Time', 'Part-Time', 'Freelance']

  return (
    <View>
      <View style={styles.container}>
        <View>
          <Text style={styles.userName}>Hello Ahmed</Text>
        </View>
        <View>
          <Text style={styles.welcomeMessage}>Find youre ideal job </Text>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchWrapper}>
            <TextInput
              style={styles.searchInput}
              value=''
              onChange={() => {}}
              placeholder='What are you looking for?'
            />
          </View>
          <TouchableOpacity style={styles.searchBtn} onPress={() => {}}>
            <Image
              source={icons.search}
              resizeMode='contain'
              style={styles.searchBtnImage}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.tabsContainer}>
        <FlatList
          data={jobTypes}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tab(activeJobType, item)}
              onPress={() => {
                setActiveJobType(item)
                router.push(`/search/${item}`)
              }}
            >
              <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
        />
      </View>
    </View>
  )
}

export default Welcome
