import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import prisma from '@/prisma/client'
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import delay from 'delay';
import { notFound } from 'next/navigation';
import React from 'react'
import ReactMarkdown from 'react-markdown';

interface Props {
    params: {id: string}  //the reaons why it's a string is because by default when you enter a number in a url (route) it is a string not a number. We'll need to parse to get a nubmer
}

const IssueDetailPage = async ({params}: Props) => {
    // if (typeof params.id !== 'number') notFound();  doesn't seem to work very well for some reason

    const issue =  await prisma.issue.findUnique({
        where: {id: parseInt(params.id) }
    });

    if (!issue)
        notFound();



  return (
    <div>
        <Heading>{issue.title}</Heading>
        <Flex className='gap-3'>
            <IssueStatusBadge status={issue.status}/>
            <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card className='prose' mt="4">
            <ReactMarkdown>{issue.descrition}</ReactMarkdown>
        </Card>      
      
    </div>
  )
}

export default IssueDetailPage