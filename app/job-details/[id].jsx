import { useCallback, useState } from 'react'
import {
  Text,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  View,
  ActivityIndicator,
} from 'react-native'
import { Stack, useRouter, useSearchParams } from 'expo-router'

import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from '../../components'

import { COLORS, SIZES, icons, images } from '../../constants'

import useFetch from '../../hooks/useFetch'

const tabs = ['About', 'Qualifications', 'Responsibilites']

function JobDetails() {
  const [refreshing, setRefreshing] = useState(false)
  const [activeTab, setActiveTab] = useState('About')

  const { id } = useSearchParams()
  const router = useRouter()

  const { data, isLoading, isError, refetch } = useFetch('job-details', {
    job_id: id,
    extended_publisher_details: 'false',
  })

  const onRefresh = () => {}

  const displayTabContent = () => {
    switch (activeTab) {
      case 'Qualifications':
        return (
          <Specifics
            title='Qualifications'
            points={data[0].job_highlights?.Qualifications ?? ['N/A']}
          />
        )
      case 'About':
        return <JobAbout info={data[0].job_description ?? 'No data provided'} />
        break
      case 'Responsibilites':
        break
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension='60%'
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.share} dimension='60%' />
          ),
          headerTitle: data?.job_title || '',
        }}
      />
      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {isLoading ? (
            <ActivityIndicator size='large' color={COLORS.primary} />
          ) : isError ? (
            <Text>Something went wrong</Text>
          ) : data.length === 0 ? (
            <Text>No data to show</Text>
          ) : (
            <View
              style={{
                padding: SIZES.medium,
                paddingBottom: 100,
              }}
            >
              <Company
                companyLogo={data[0].employer_logo}
                jobTitle={data[0].job_title}
                companyName={data[0].employer_name}
                location={data[0].job_country}
              />
              <JobTabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />

              {displayTabContent()}
            </View>
          )}
        </ScrollView>

        <JobFooter url={data[0]?.job_google_link} />
      </>
    </SafeAreaView>
  )
}

export default JobDetails
