import clickElement from '../../support/common/action/clickElement'
import setInputField from '../../support/common/action/setInputField'
import Page from '../base/page'

class WithdrawFixedPenaltyReason extends Page {

    fillInWithdrawFixedPenaltyReason() {
        console.info('Filling in withdraw reason for fixed penalty')
        $('//*[@id="addInfoTextInput"]/textarea').waitForDisplayed()
        $('//*[@id="addInfoTextInput"]/textarea').waitForClickable()
        $('//*[@id="addInfoTextInput"]/textarea').click()
        $('//*[@id="addInfoTextInput"]/textarea').setValue('Test')
    }
}

export default new WithdrawFixedPenaltyReason()