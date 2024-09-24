import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import { Issue } from '@prisma/client'
import { Heading, Flex, Card, Text } from '@radix-ui/themes'
import React from 'react'
import ReactMarkdown from 'react-markdown'

const IssueDetails = ({issue}: {issue: Issue}) => {
  return (
    <>
        <Heading>{issue.title}</Heading>
        <Flex className='gap-3'>
        <IssueStatusBadge status={issue.status}/>
                <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card className='prose max-w-full' mt="4">
                <ReactMarkdown>{issue.descrition}</ReactMarkdown>
        </Card>      
    </>
  )
}

export default IssueDetails