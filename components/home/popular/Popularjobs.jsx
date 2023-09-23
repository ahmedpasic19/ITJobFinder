import { useState, useEffectf } from 'react'
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import { useRouter } from 'expo-router'
import useFetch from '../../../hooks/useFetch'

import { COLORS, SIZES } from '../../../constants'

import PopularJobCard from '../../common/cards/popular/PopularJobCard'

import styles from './popularjobs.style'

const Popularjobs = () => {
  const [selectedJob, setSelectedJob] = useState({})
  const router = useRouter()

  const { data, isError, isLoading } = useFetch('search', {
    query: 'React developer',
    num_pages: 1,
    page: 1,
  })

  const handlePress = (job) => {
    setSelectedJob(job)
    router.push(`/job-details/${job?.job_id}`)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular Jobs</Text>
        <TouchableOpacity style={styles.headerTitle}>
          <Text>Show All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading && !isError ? (
          <ActivityIndicator />
        ) : !isLoading && isError ? (
          <Text>Something is wrong</Text>
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <PopularJobCard
                item={item}
                handlePress={handlePress}
                selectedJob={selectedJob}
              />
            )}
            keyExtractor={(item) => item?.job_id}
            contentContainerStyle={{
              columnGap: SIZES.medium,
            }}
            horizontal
          />
        )}
      </View>
    </View>
  )
}

export default Popularjobs
