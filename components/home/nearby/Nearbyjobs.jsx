import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'
import useFetch from '../../../hooks/useFetch'

import { COLORS } from '../../../constants'

import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard'

import styles from './nearbyjobs.style'

const Nearbyjobs = () => {
  const router = useRouter()

  const { data, isError, isLoading } = useFetch('search', {
    query: 'React developer',
    num_pages: 1,
    page: 1,
  })

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby Jobs</Text>
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
          data?.map((job) => (
            <NearbyJobCard
              job={job}
              key={`nearby-job-${job?.job_id}`}
              handleNavigate={() => router.push(`/job-details/${job?.job_id}`)}
            />
          ))
        )}
      </View>
    </View>
  )
}

export default Nearbyjobs
