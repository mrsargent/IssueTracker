import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import { Heading, Flex, Card, Box } from '@radix-ui/themes'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const LoadingIssueDetailPage = () => {
  return (
    <Box className='max-w-lg'>
     <Skeleton/>
      <Flex className='gap-3'>
          <Skeleton width="5rem"/>
          <Skeleton/>
      </Flex>
      <Card className='prose' mt="4">
      <Skeleton count={3}/>
      </Card>
    </Box>
  )
}

export default LoadingIssueDetailPage