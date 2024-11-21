'use client';
import { CompetitionObject } from '@/types/type';
import { isAfter, parseISO, isBefore } from 'date-fns';
import { Users, Vote } from 'lucide-react';
import Countdown from '../common/Countdown';
import { Box, Button, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ParticipateModal from '@/components/LayerX/ParticipateModal';

export function CompetitionCard({
  competition,
}: {
  competition: CompetitionObject;
}) {
  const [participate, setParticipate] = useState(false);
  console.log('competition', competition);
  const router = useRouter();

  const onCompetitionClick = () => {
    router.push(`/layerx/competitions/${competition?.id}`);
  };

  return (
    <Box
      borderRadius="12px"
      border="1px solid rgba(255, 255, 255, 0.10)"
      background="#191916"
      overflow="hidden"
    >
      <Box position="relative">
        <img
          src={competition?.competition_image}
          alt={competition?.competition_name}
          className="w-full h-48 object-cover"
        />
      </Box>

      <Box p={4}>
        <Text
          color="white"
          fontSize="16px"
          fontWeight="700"
          mb={3}
          fontFamily="Plus Jakarta Sans"
        >
          {competition.competition_name}
        </Text>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <Users size={16} className="text-[#33A7FF]" />
            <Text color="white" fontSize="14px" fontFamily="Plus Jakarta Sans">
              {competition?.total_entries} Players
            </Text>
          </Box>
          <Box display="flex" alignItems="center" gap={2}>
            <Vote size={16} className="text-[#33A7FF]" />
            <Text color="white" fontSize="14px" fontFamily="Plus Jakarta Sans">
              {competition?.total_votes ? competition?.total_votes : 0} Votes
            </Text>
          </Box>
        </Box>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          borderTop="1px solid rgba(255, 255, 255, 0.10)"
          pt={4}
        >
          <Text color="#8C8C8C" fontSize="14px" fontFamily="Plus Jakarta Sans">
            {competition &&
            isAfter(parseISO(competition?.participation_starts), new Date())
              ? 'Opens in ' // Announced Stage (before participation starts)
              : isAfter(
                    new Date(),
                    parseISO(competition?.participation_starts),
                  ) &&
                  isBefore(new Date(), parseISO(competition?.voting_starts))
                ? 'Entries close in' // Participation Phase (after participation starts and before voting starts)
                : isAfter(new Date(), parseISO(competition?.voting_starts)) &&
                    isBefore(new Date(), parseISO(competition?.voting_ends))
                  ? 'Voting ends in' // Voting Phase (after voting starts and before voting ends)
                  : isAfter(new Date(), parseISO(competition?.voting_ends))
                    ? 'Closed' // Competition Closed Stage (after voting ends)
                    : ''}
          </Text>
          <Text color="#33A7FF" fontSize="14px" fontFamily="Plus Jakarta Sans">
            {isAfter(
              parseISO(competition?.participation_starts),
              new Date(),
            ) ? (
              <Countdown endDateString={competition?.participation_starts} />
            ) : isAfter(
                new Date(),
                parseISO(competition?.participation_starts),
              ) &&
              isBefore(new Date(), parseISO(competition?.voting_starts)) ? (
              <Countdown endDateString={competition?.voting_starts} />
            ) : isAfter(new Date(), parseISO(competition?.voting_starts)) &&
              isBefore(new Date(), parseISO(competition?.voting_ends)) ? (
              <Countdown endDateString={competition?.voting_ends} />
            ) : (
              isAfter(new Date(), parseISO(competition?.voting_ends)) && ''
            )}
          </Text>
        </Box>

        {isAfter(parseISO(competition?.participation_starts), new Date()) ? (
          <Box display="flex" flexDirection="row" gap="12px">
            <Button
              width="100%"
              marginTop="1rem"
              border="1px solid #33A7FF"
              color="#33A7FF"
              backgroundColor="transparent"
              fontSize={['16px', '16px', '16px']}
              fontWeight="600"
              _hover={{
                color: 'black',
                bg: '#fff',
              }}
              onClick={onCompetitionClick}
            >
              View
            </Button>
            <Button
              width="100%"
              marginTop="1rem"
              border="1px solid #33A7FF"
              color="#33A7FF"
              backgroundColor="transparent"
              fontSize={['16px', '16px', '16px']}
              fontWeight="600"
              _hover={{
                color: 'black',
                bg: '#fff',
              }}
              // onClick={(event) => {
              //   competition.is_subscribed
              //     ? unSubscribeCompetition(competition)
              //     : onGetNotifiedClick(competition);
              //   event.stopPropagation();
              // }}
            >
              {competition.is_subscribed ? 'Unsubscribe' : ' Get notified'}
            </Button>
          </Box>
        ) : isAfter(new Date(), parseISO(competition?.participation_starts)) &&
          isBefore(new Date(), parseISO(competition?.voting_starts)) ? (
          <Box display="flex" flexDirection="row" gap="12px">
            <Button
              width="100%"
              marginTop="1rem"
              border="1px solid #33A7FF"
              color="#33A7FF"
              backgroundColor="transparent"
              fontSize={['16px', '16px', '16px']}
              fontWeight="600"
              _hover={{
                color: 'black',
                bg: '#fff',
              }}
              onClick={() => setParticipate(true)}
            >
              Participate
            </Button>
            <Button
              width="100%"
              marginTop="1rem"
              border="1px solid #33A7FF"
              color="#33A7FF"
              backgroundColor="transparent"
              fontSize={['16px', '16px', '16px']}
              fontWeight="600"
              _hover={{
                color: 'black',
                bg: '#fff',
              }}
              onClick={onCompetitionClick}
            >
              Open
            </Button>
          </Box>
        ) : isAfter(new Date(), parseISO(competition?.voting_starts)) &&
          isBefore(new Date(), parseISO(competition?.voting_ends)) ? (
          <Box>
            <Button
              width="100%"
              marginTop="1rem"
              border="1px solid #33A7FF"
              color="#33A7FF"
              backgroundColor="transparent"
              fontSize={['16px', '16px', '16px']}
              fontWeight="600"
              _hover={{
                color: 'black',
                bg: '#fff',
              }}
              onClick={onCompetitionClick}
            >
              Open & Vote
            </Button>
          </Box>
        ) : (
          isAfter(new Date(), parseISO(competition?.voting_ends)) && (
            <Box>
              <Button
                width="100%"
                marginTop="1rem"
                border="1px solid #33A7FF"
                color="#33A7FF"
                backgroundColor="transparent"
                fontSize={['16px', '16px', '16px']}
                fontWeight="600"
                _hover={{
                  color: 'black',
                  bg: '#fff',
                }}
                onClick={onCompetitionClick}
              >
                View
              </Button>
            </Box>
          )
        )}
      </Box>
      {participate && (
        <ParticipateModal
          competitionId={competition.id}
          onSuccess={() => {
            onCompetitionClick();
            setParticipate(false);
          }}
          handleClose={() => setParticipate(false)}
        />
      )}
    </Box>
  );
}
