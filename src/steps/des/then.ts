import { Then } from '@cucumber/cucumber';
import checkCandidateTestDetailsCard from '../../app-actions/des-action/checkCandidateTestSlot';

Then(
    /^the candidates test details are shown for tommorow$/,
    checkCandidateTestDetailsCard
);
