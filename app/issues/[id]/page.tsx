import prisma from '@/prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';
import DeleteIssueButton from './DeleteIssueButton';

interface Props {
    params: {id: string}  //the reaons why it's a string is because by default when you enter a number in a url (route) it is a string not a number. We'll need to parse to get a nubmer
}

//for understanding purpoes... becaues this is a page.tsx file inside of a folder [id] it automatically takes a string as a parameter
//in our case this is a nubmer that represents the issue number.
const IssueDetailPage = async ({params}: Props) => {
    // if (typeof params.id !== 'number') notFound();  doesn't seem to work very well for some reason

    const issue =  await prisma.issue.findUnique({
        where: {id: parseInt(params.id) }
    });

    if (!issue)
        notFound();


//initial is set to 1 column and md is medium sized device can move up to 2 columns
  return (
    <Grid columns={{initial: "1", md: "5"}} gap="5">
        <Box className='md:col-span-4'>
           <IssueDetails issue={issue}/>
        </Box>
        <Box>
            <Flex direction="column" gap="4">
                <EditIssueButton issueId={issue.id}/>
                <DeleteIssueButton issueId={issue.id}/>
            </Flex>
        </Box>
    </Grid>
  )
}

//both of these are equivalent server side caching
//export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default IssueDetailPage