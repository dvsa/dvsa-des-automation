import candidateDetails from '../../pageobjects/des/candidateDetailsCard.pageobject';

export default async (table: any) => {
  const data = table.rowsHash();
  await candidateDetails.checkCandidateTestDetailsCard(data);
};
