import { Poll, Vote } from '@prisma/client';

interface extendedPoll extends Poll {
  votes: Vote[];
  _count: {
    participants: number;
    votes: number;
  };
}

// finds the date of the vote that happened last
export function findLastVoteDate(votes: Vote[]) {
  const dates = votes.map(vote => vote.createdAt.getTime());
  return new Date(Math.max(...dates));
}

//sorts polls by date
export function sortPollsByDate(polls: extendedPoll[]) {
  // set endDateTime to the last vote if the poll is closed not because of passing time, but because all participants voted
  const pollsFixedDates = polls.map(poll => {
    if (
      poll.endDateTime > new Date() &&
      poll._count.votes >= poll._count.participants
    ) {
      const modifiedPoll = poll;
      modifiedPoll.endDateTime = findLastVoteDate(poll.votes);
      return modifiedPoll;
    } else return poll;
  });
  //function to use for sorting
  //sorts open polls more urgent to less urgent
  //sorts closed polls most recent to less recent
  function compareDates(a: extendedPoll, b: extendedPoll) {
    if (a.endDateTime > new Date() && b.endDateTime > new Date()) {
      if (
        (!a.votes.filter(vote => vote.userId === a.creatorId).length &&
          !b.votes.filter(vote => vote.userId === b.creatorId).length) ||
        (!!a.votes.filter(vote => vote.userId === a.creatorId).length &&
          !!b.votes.filter(vote => vote.userId === b.creatorId).length)
      ) {
        if (a.endDateTime < b.endDateTime) return -1;
        else if (a.endDateTime > b.endDateTime) return 1;
        return 0;
      } else {
        if (!a.votes.filter(vote => vote.userId === a.creatorId).length) {
          return -1;
        } else return 1;
      }
    } else {
      if (a.endDateTime > b.endDateTime) return -1;
      else if (a.endDateTime < b.endDateTime) return 1;
      return 0;
    }
  }
  return pollsFixedDates.sort(compareDates);
}
