import candidateDetails from '../../pageobjects/des/candidateDetailsCard.pageobject';

export default (table: any) => {
  const data = table.rowsHash();
  candidateDetails.checkCandidateTestDetailsCard(data);
};
